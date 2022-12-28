import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Link from './components/ShortLink';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:shorturl' element={<Link />} />
      </Routes>
    </div>
  );
}

export default App;
