import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { auth } from './firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './Context/AuthContext';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';

function App() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    //current user
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='/todo-app' element={<HomePage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
