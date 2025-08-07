import { useState, useEffect } from 'react'
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
import '../src/css/PopupModal.css'
import CreateAccount from './components/CreateAccount';
import ProfilePage from './components/ProfilePage';
import WithAuth from './components/WithAuth';
import Aurora from './components/Styling/Aurora';

function App() {
  const { userID } = useParams()

  return (
    <>
      <Aurora
          colorStops={["#2f3e46", "#354f52", "#52796f"]}
          blend={1.0}
          amplitude={1.5}
          speed={0.6}
          className="aurora-container"
      />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount userID={userID}/>} />
      </Routes>

      <footer>Pulse 2025 | Created by Paloma Levy</footer>
    </>
  )
}

export default App;
