import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import SongNavbar from './components/SongNavbar';
import BigImagePage from './components/BigImagePage';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import RegisterForm from './components/RegisterForm';
import AddContentForm from './components/AddContentForm';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SongsProviader } from './context/SongContext';
import { ProtectedRoute } from './helpers/utils';
import { UserProvider } from './context/UserContext';
import LoadingPage from './components/LoadingPage';
function App() {
  const [isRegisterForm,isRegisterFormSet]=useState(false)
  const [isAddContentForm,isAddContentFormSet]=useState(false)
  return (<>
    <UserProvider>
      <SongsProviader>
        {isRegisterForm&&<RegisterForm closeHandler={isRegisterFormSet}/>}
        {isAddContentForm&&<AddContentForm closeHandler={isAddContentFormSet}/>}
        <div className="App flex p-2 flex-col">
            <BrowserRouter>
              <div className='flex overflow-auto h-full'>
                <div className='flex flex-col sm:mr-2'>
                  <Navbar/>
                  <Sidebar openHandler={isAddContentFormSet}/>
                </div>
                <div className="BigImagePage text-white p-5 flex backgroundColorClass rounded-xl gradientBackgroundClass flex-col w-full">
                  <Header openHandler={isRegisterFormSet}/>
                  <Routes>
                    <Route path='/' element={<Navigate to="/home"/>}></Route>
                    <Route path='/home' element={<SongList/>}></Route>
                    <Route path='/search' element={<SearchPage/>}></Route>
                    <Route path='/likedSongs' element={<ProtectedRoute><BigImagePage/></ProtectedRoute>}></Route>
                  </Routes>
                </div>
              </div>
              <SongNavbar/>
            </BrowserRouter>
        </div>
      </SongsProviader>
    </UserProvider>
  </>);
}

export default App;
