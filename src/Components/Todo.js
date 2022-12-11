import React from 'react'
import './Todo.css'
import { useState } from 'react'


function Todo() {
    const [toDo, setTodo] = useState('')
    const [toDos, setTodos] = useState([])
    return (
        <div className="main-container">
            <div className="todo-container">
                <h1>ToDo List</h1>
                <div className="input-section">
                    <input value={toDo} onChange={(e) => {
                            setTodo(e.target.value)
                    }} type="text" placeholder='Add Task...' />
                    <button onClick={() => {
                        if(toDo.length!==0){
                            setTodos([...toDos, {id: Date.now(), text: toDo, status: false }])
                        }else{
                            alert('Enter a task')
                        }
                        return setTodo("")
                    }} className='add-btn'><i className="fa-regular fa-plus"></i></button>
                </div>
            </div>
            {toDos.map((obj) =>
                <div className="todo-list">
                    <div className="task">
                        <input value={obj.status} onChange={(e) => {
                            setTodos(toDos.filter((obj2) => {
                                if (obj2.id === obj.id) {
                                obj.status = e.target.checked
                                }
                                return obj2
                            }))
                        }} type="checkbox" />
                        {obj.status === false ? <p>{obj.text}</p> : <p><del>{obj.text}</del></p>}
                    </div>
                    <button onClick={() => {
                        setTodos(toDos.filter((obj3) =>
                            obj3.id !== obj.id
                        ))
                    }} className='delete-btn'><i className="fa-solid fa-trash-can"></i></button>
                </div>
            )
            }
        </div>
    )
}

export default Todo