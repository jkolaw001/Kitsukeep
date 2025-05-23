import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import WatchlistPage from './pages/Watchlist.jsx'
import Login from './loginpages/Login.jsx'
import Logout from './loginpages/Logout.jsx'
import Signup from './loginpages/Signup.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Watchlist' element={<WatchlistPage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>


  )
}

export default App
