import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Counter from './Counter';
import OtherPage from './OtherPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/page/:id" element={<OtherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
