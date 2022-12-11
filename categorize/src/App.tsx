import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import ImageSources from './image_sources';
import { captureParameterValues } from './util';
import Component from './Component';

function App() {
  const [index, setIndex] = useState(0);
  return (
    <div className="App">
      <h1>{index}</h1>
      <Component onIndexChange={(idx: number) => {
        setIndex(idx);
      }} />
    </div>
  );
}

export default App;
