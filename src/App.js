import './App.css';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setItems, nextPage } from './module';
import axios from 'axios';

function App() {
  const { items, pages } = useSelector(state => ({
    items: state.items,
    pages: state.pages
  }))

  const dispatch = useDispatch();
  const onSetItems = item => dispatch(setItems(item));
  const onNextPage = () => dispatch(nextPage());

  const loadMoreItems = async () => {
    try {
      const response = await axios.get(`http://dev.dolobox.co/api/get/items/${pages}`);
      const message = await response.data.msg;
      if (message === 'success') {
        const newItems = await response.data.data;
        onSetItems(newItems);
        onNextPage(pages + 1);
      } else if (message === 'empty') {
        alert('마지막 페이지입니다.');
      } else if (message === 'error') {
        alert('error: 조회 실패');
      }
    } catch (err) {
      alert('error: 비동기 처리 실패');
      console.log(err);
    }
  }

  const loadItems = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) loadMoreItems();
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
        <div className="box">
          {items.map((item, idx) => (
            <div className="container" key={idx}>
              <img className="img" src={item.thumb_small_img} alt={''}></img>
              <div className="title">{item.title}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
