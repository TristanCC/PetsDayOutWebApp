import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {

//

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='bg-[#FAF9F6] flex-1 text-neutral-600 flex flex-col w-full h-full text-center gap-2 justify-center'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path='/login' element={<Login/>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
