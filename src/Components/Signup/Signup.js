import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase/Config'
import { useForm } from "react-hook-form";
import './Signup.css'

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile(result.user, {
        displayName: username
      }).then(() => {
        addDoc(collection(db, "user"), {
          id: result.user.uid,
          username: username
        }).catch((error) => {
          alert(error.message)
        }).then(() => {
          navigate('/login')
        })
      })
    })
  }
  return (
    <div className="signup-container col-10 col-md-6 col-lg-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <img className="logo-image img-fluid" alt='todo-logo' />
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="row">
            <div className="col-md-12">
              <div className='mb-3'>
                <input type="text" {...register("username", {
                  value: username,
                  onChange: (e) => { setUsername(e.target.value) },
                  required: {
                    value: true,
                    message: "Username is required"
                  },
                })} placeholder='Username' className={`form-control ${errors.username ? "is-invalid" : ""
                  }`} />
                <div className='text-start'>
                  <span className='error-message'>{errors?.username?.message}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className='mb-3'>
                <input type="email" {...register("email", {
                  value: email,
                  onChange: (e) => { setEmail(e.target.value) },
                  required: {
                    value: true,
                    message: "Email is required"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: "Enter a valid email address",
                  },
                })} placeholder='Email' className={`form-control ${errors.email ? "is-invalid" : ""
                  }`} />
                <div className='text-start'>
                  <span className='error-message'>{errors?.email?.message}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className='mb-3'>
                <input type="text" {...register("password", {
                  value: password,
                  onChange: (e) => { setPassword(e.target.value) },
                  required: {
                    value: true,
                    message: "Password is required"
                  },
                  pattern: {
                    value: /^[a-zA-Z]+[0-9]+$/,
                    message: "Password must be alpha numeric",
                  },
                  minLength: {
                    value: 5,
                    message: "Password must be atleast 5 characters",
                  },
                })} placeholder='Password' className={`form-control ${errors.password ? "is-invalid" : ""
                  }`} />
                <div className='text-start'>
                  <span className='error-message'>{errors?.password?.message}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <input type="submit" value='Sign Up' className="btn btn-light" />
          </div>
        </form>
        <div>
          <p className='p-2'>Already have an account ? <Link to='/login' className='login'>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup