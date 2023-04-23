import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Appbar from './Components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Appbar/>
      <Routes>
            <Route path='/' element={<Home/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App