import './App.css';
import axios from 'axios';
import { useState } from 'react'

function App() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const newItems = (await axios.get('http://dev.dolobox.co/api/get/items/2')).data.data;
    setItems(items.concat(newItems))
    console.log(newItems);
  }
  //컨텐트 불러오기 <div dangerouslySetInnerHTML={{ __html: item.contents }}></div>

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={loadItems}>불러오기</button>
        {items.map((item) => (
          <>
            <div>{item.thumb_small_img}</div>
            <div>{item.title}</div>
          </>
        ))}
      </header>
    </div>
  );
}

export default App;
