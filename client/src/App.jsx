import { useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import './App.css'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import '../src/css/Discover.css'
import '../src/css/LeftNavBar.css'
import '../src/css/RightNavBar.css'
import '../src/css/LoginPage.css'
import '../src/css/ProfilePage.css'
import './index.css'
import '../src/css/CreateAccount.css'
import CreateAccount from './components/CreateAccount';
import ProfilePage from './components/ProfilePage';
import WithAuth from './components/WithAuth';

function App() {
  const { userID } = useParams()

  return (
    <>
      <Routes>
        <Route path="/:userID" element={<HomePage />} />
        <Route path="/profile/:userID" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount userID={userID}/>} />
      </Routes>

      <footer>Pulse 2025 | Created by Paloma Levy</footer>
    </>
  )
}

export default App;
