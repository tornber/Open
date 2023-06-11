import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Mainpage from './components/mainpage/Mainpage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Addproduct from './components/addProduct/Addproduct';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/addProduct' element={<Addproduct />} />
        </Routes>
      </BrowserRouter>
      <div className='border'></div>
      <p className='footer--header'>Scandiweb Test assignment</p>
    </div>
  );
}

export default App;
