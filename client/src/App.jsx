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
import CreateAccount from './components/CreateAccount';

function App() {

  return (
    <>
      {/* <LoginPage /> */}
      {/* <HomePage /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/create" element={<CreateAccount />} />
      </Routes>
    </>
  )
}

export default App;
