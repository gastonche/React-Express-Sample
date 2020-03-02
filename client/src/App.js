import React from 'react';
import './App.css';
import Navbar from './core/components/nav.component';
import Products from './pages/products';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Products />
    </div>
  );
}

export default App;
