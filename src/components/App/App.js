import React, {useEffect, useState} from 'react';
import './App.css';
import { api } from '../../utils/fetch'

function App() {
  const [todoList, setTodoList] = useState([])
  const [todoItem, setTodoItem] = useState('')

  useEffect(() => {
    api.getInitialTodos()
        .then((data) => {
          setTodoList([...data])
        })
        .catch((e) => {
          console.error(`Get todos fail: ${e}`)
        })
  },[])

  const completeTodo = (id) => {
    setTodoList((prevState) => prevState.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
    ))
  }

  const createTodo = () => {
    setTodoList((prevState) => {
      return [{
        userId: 1,
        id: Date.now(),
        title: todoItem,
        completed: false
      }, ...prevState]
    })
  }

  return (
    <div className="todo">
      <div className="todo__control">
        <input type="text" value={todoItem} onInput={(e) => {setTodoItem(() => e.target.value)}}/>
        <button onClick={createTodo}>Add</button>
      </div>
      <ul className="todo__list">
        {todoList.map(({id, title, completed}) => {
          return <li key={id} className={`todo__item ${completed ? 'todo__item--done' : ''}`}>{title} {completed ? '' : <button className='todo__btn' onClick={() => completeTodo(id)}>Done</button>}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
