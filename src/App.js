// import logo from './logo.svg';
import './App.css';

import React from 'react';
import CreateNote from './components/CreateNote';
import DisplayNotes from './components/DisplayNotes';

const App = () => {
  return (
    <div>
      <CreateNote />
      <DisplayNotes />
    </div>
  );
};

export default App;
