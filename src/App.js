import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(0);

  const loadMoreItems = async () => {
    const newItems = (await axios.get(`http://dev.dolobox.co/api/get/items/${pages}`)).data.data;
    setItems(items.concat(newItems));
    setPages(pages + 1);
  }
  //컨텐트 불러오기 <div dangerouslySetInnerHTML={{ __html: item.contents }}></div>

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

  // useEffect(() => {
  //   const firstLoad = async () => {
  //     const newItems = (await axios.get('http://dev.dolobox.co/api/get/items/0')).data.data;
  //     setItems(items.concat(newItems));
  //     setPages(pages + 1);
  //   }
  //   firstLoad();
  // }, [])

  useEffect(() => {
    window.addEventListener('scroll', loadItems);
    return () => {
      window.removeEventListener('scroll', loadItems);
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        {items.map((item, idx) => (
          <div className="container" key={idx}>
            <div className="img">{item.thumb_small_img}</div>
            <div className="title">{item.title}</div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
