import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import SongNavbar from './components/SongNavbar';
import BigImagePage from './components/BigImagePage';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [highlighted,highlightedSet]=useState("home")
  const highlightedHandler=(name)=>{
    highlightedSet(prev=>name)
  }
  return (
    <div className="App flex p-2 flex-col">
      <BrowserRouter>
        <div className='flex overflow-auto h-full'>
          <div className='flex flex-col sm:mr-2'>
            <Navbar highlighted={highlighted} highlightedHandler={highlightedHandler}/>
            <Sidebar highlighted={highlighted} highlightedHandler={highlightedHandler}/>
          </div>
          <div className="BigImagePage text-white p-5 flex backgroundColorClass rounded-xl gradientBackgroundClass flex-col w-full">
            <Header/>
            <Routes>
              <Route path='/' element={<Navigate to="/home"/>}></Route>
              <Route path='/home' element={<SongList/>}></Route>
              <Route path='/search' element={<SearchPage/>}></Route>
              <Route path='/likedSongs' element={<BigImagePage/>}></Route>
            </Routes>
            {/* <SongList/> */}
            {/* <BigImagePage/> */}
            {/* <SearchPage/> */}
          </div>
        </div>
        <SongNavbar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
