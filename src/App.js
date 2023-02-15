import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main.js';
import Signup from './Signup.js';
import Signin from './Signin.js';
import Todo from './Todo.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
