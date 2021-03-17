import './App.css';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setItems } from './module';
import axios from 'axios';

function App() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { items, pages } = useSelector(state => ({
    items: state.items,
    pages: state.pages
  }))

  const dispatch = useDispatch();
  const onSetItems = item => dispatch(setItems(item));

  const loadMoreItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://dev.dolobox.co/api/get/items/${pages}`);
      const message = await response.data.msg;
      if (message === 'success') {
        const newItems = await response.data.data;
        onSetItems(newItems);
      } else if (message === 'empty') {
        setError('마지막 페이지입니다 😢')
      } else if (message === 'error') {
        alert('error: 조회 실패');
      }
      setLoading(false);
    } catch (err) {
      alert('error: 비동기 처리 실패');
      console.log(err);
    }
  }

  const loadItems = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && !loading) loadMoreItems();
  }

  useEffect(() => {
    loadMoreItems();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', loadItems);
    return () => {
      window.removeEventListener('scroll', loadItems);
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">더식스데이 프론트엔드 과제</div>
        <div className="App-name">지원자 : 송윤지</div>
        <div className="App-container">
          {items.map((item, idx) => (
            <div className="App-box" key={idx}>
              <img className="App-box-img" src={item.thumb_small_img} alt={''}></img>
              <div className="App-box-title">{item.title}</div>
            </div>
          ))}
        </div>
        {error && <div className="App-error">{error}</div>}
      </header>
    </div>
  );
}

export default App;
