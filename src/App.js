import React from 'react';
import './App.css';
import MembersManageGrid from './components/MembersManageGrid/MembersManageGrid.js';
import Header from './components/Header/Header.js';

function App() {
  return (
    <div>
      <Header />
      <MembersManageGrid />
    </div>
  );
}

export default App;
