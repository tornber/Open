import React, { useEffect, useState }  from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import BlogPage from './components/blogPage/BlogPage';
import AddBlog from './components/addBlog/AddBlog';

function App() {

  const [loginOrAdd, setLoginOrAdd] = useState("შესვლა")

  useEffect(() => {
    localStorage.setItem('token', '85e88f7b06be2f5eba5dcef4a8a067e148d81f655499affd50a1e42e49d1aaa1')
  },[]) 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home loginOrAdd={loginOrAdd} setLoginOrAdd={setLoginOrAdd}/>} />
        <Route path='/blog/:id' element={<BlogPage loginOrAdd={loginOrAdd} setLoginOrAdd={setLoginOrAdd}/>} />
        <Route path='/blog/add' element={<AddBlog loginOrAdd={loginOrAdd}/>} />
      </Routes>
    </div>
  );
}

export default App;
