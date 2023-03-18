import React, { useContext } from 'react'
import './Todo.css'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../firebase/Config'
import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Todos from '../Todos/Todos'


function Todo() {
    const [todo, setTodo] = useState('')
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date()

    //add Todo
    const addTodo = (e) => {
        e.preventDefault()
        if (todo.length !== 0 && user) {
            addDoc(collection(db, "todo-details"), {
                text: todo,
                status: false,
                userId: user.uid,
                username: user.displayName
            })
        }
        else if (user === null) {
            alert('Please Login')
        }
        else if (todo.length === 0 && user) {
            alert('Enter a Task')
        }
        setTodo("")
    }

    //signout
    const handleLogout = () => {
        signOut(auth).then(() => navigate('/login')).catch((error) => alert(error.message))
    }

    return (
        <div className="main-container">
            <div className="user-details ms-auto d-flex flex-row justify-content-between p-4">
                {user && <span className='user-name pe-none fw-bold'>Welcome {user.displayName}</span>}
                {user && <div><span className='fw-bold pe-none'>Signout</span><i onClick={handleLogout} className="fa-solid fa-right-from-bracket login-icon ms-3"></i></div>}
            </div>
            <div className="container">
                <div className="row">
                    <div className="todo-container col-11 col-lg-5">
                        <h1 className='fw-bold'>ToDo List</h1>
                        <p className='pe-none'>{`Hey, it's ${weekday[day.getDay()]}`}</p>
                        <form onSubmit={addTodo}>
                            <div className="input-section">
                                <input className='form-control' value={todo} onChange={(e) => {
                                    setTodo(e.target.value)
                                }} type="text" placeholder='Add Task...' />
                                <button type='submit' className='add-btn'><i className="fa-regular fa-plus"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Todos />
            <div className='text-center mt-4'>
                {!user && <Link style={{ cursor: "pointer", textDecoration: "none" }} className='fw-bold fs-4 border text-white rounded ' to='/login'>Login</Link>}
            </div>
        </div>
    )
}

export default Todo


