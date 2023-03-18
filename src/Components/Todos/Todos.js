import { async } from '@firebase/util';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase/Config';
import './Todos.css'

function Todos() {
    const [todos, setTodos] = useState([])
    const { user } = useContext(AuthContext)

    const getTodos = async () => {
        const { uid } = user
        await getDocs(query(collection(db, "todo-details"), where("userId", "==", uid))).then((snapshot) => {
            const allTodos = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            setTodos(allTodos)
        }).catch((error) => {
            console.log(error.message);
            alert('Login')
        })
    }

    useEffect(() => {
        getTodos()
    })

    return (
        <div>
            {user && todos.map((obj, index) =>
                <div key={index} className='container'>
                    <div className='row'>
                        <div className={obj.status ? "todo-list-completed col-11 col-lg-5 mt-2" : "todo-list mt-2 col-11 col-lg-5"}>
                            <div className="task">
                                <input style={{ cursor: "pointer" }} value={obj.status} checked={obj.status ? 'checked' : ''} onChange={() => {
                                    //update Todo
                                    updateDoc(doc(db, "todo-details", obj.id), {
                                        status: !obj.status
                                    });
                                }} type="checkbox" />
                                <p className={obj.status ? 'completed' : 'not-completed'}>{obj.text}</p>
                            </div>
                            <button onClick={() => {
                                //delete Todo
                                deleteDoc(doc(db, 'todo-details', obj.id))
                            }} className='delete-btn'><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Todos