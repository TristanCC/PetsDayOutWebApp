import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Theme } from '@chakra-ui/react'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//

  return (
    <>
      <Theme appearance='light' colorPalette="blue">
        <div className='outerWrapper'>
          <div className='wrapperLeft'>
            <Navbar />
            <div className=''>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
                  <Route path='/login' element={<Login/>}></Route>
                </Routes>
              </BrowserRouter>
            </div>
          </div>
          <div className='wrapperLeft'>
            <Navbar />
            <div className=''>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path='/login' element={<Login/>}></Route>
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </Theme>
    </>
  );
}

export default App;
