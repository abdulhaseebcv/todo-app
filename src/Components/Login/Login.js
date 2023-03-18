import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../../firebase/Config'
import '../Login/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  //login
  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then(() => navigate('/todo-app')).catch((error) => alert(error.message))
  }

  return (
    <div className='login-container col-10 col-md-6 col-lg-4 text-center'>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <img className='login-img img-fluid' src="" alt="todo-logo" />
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="row">
            <div className="col-md-12">
              <div className='mb-3'>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className='mb-3'>
                <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="form-control" id="exampleInputPassword1" />
              </div>
            </div>
          </div>
          <div className='p-3'>
            <input type="submit" value='Login' className="btn btn-light" />
          </div>
        </form>
        <p className='p-2'>Don't have an account ? <Link to='/signup' className='login'>Signup</Link> </p>
      </div>
    </div>

  )
}

export default Login