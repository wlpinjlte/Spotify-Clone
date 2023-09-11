import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import SongNavbar from './components/SongNavbar';
function App() {
  const [highlighted,highlightedSet]=useState("home")
  const highlightedHandler=(name)=>{
    highlightedSet(prev=>name)
  }
  return (
    <div className="App flex p-2 flex-col">
      <div className='flex overflow-auto h-full'>
        <div className='flex flex-col sm:mr-2'>
          <Navbar highlighted={highlighted} highlightedHandler={highlightedHandler}/>
          <Sidebar highlighted={highlighted} highlightedHandler={highlightedHandler}/>
        </div>
        <SongList/>
      </div>
      <SongNavbar/>
    </div>
  );
}

export default App;
