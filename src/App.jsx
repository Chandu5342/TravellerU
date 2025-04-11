import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Route,Router, Routes} from "react-router-dom"
import FirstPage from './components/FirstPage';
import Dashboard from './components/Dashboard';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import Portfolio from './components/Portfolio';
import Inputs from './components/Inputs';
import Profile from './components/Profile';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         <BrowserRouter>
         <Routes>
            <Route path="/" element={<FirstPage />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="inputs" element={<Inputs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
