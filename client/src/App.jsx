import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import '../src/css/Discover.css'
import '../src/css/LeftNavBar.css'
import '../src/css/RightNavBar.css'
import '../src/css/LoginPage.css'
import '../src/css/ProfilePage.css'
import CreateAccount from './components/CreateAccount';
import ProfilePage from './components/ProfilePage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount />} />
      </Routes>

      <footer>Pulse 2025 | Created by Paloma Levy</footer>
    </>
  )
}

export default App;
