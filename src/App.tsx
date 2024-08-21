import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [todoCount, setTodoCount] = useState(0);
  const [todoList, setTodoList] = useState<Array<Todo>>([]);


  const createTodo = (desc: string) => {
    if(desc){
      const newTodo: Todo = {id: uuidv4(), desc: desc};
      setTodoList((previousTodo) => [...previousTodo, newTodo]);
      setTodoCount(todoList.length+1);
    }
  }

  const removeTodo = (id: string) => {
    setTodoList((previousTodo) => {
      return previousTodo.filter( todo => todo.id !== id);
    });
    setTodoCount(todoCount-1);
  }

  return (
    <>
      <h1>{todoCount > 0 ? todoCount : null} TODO{todoCount > 0 ? 'S' : null}</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        let nextTodo = e.currentTarget.todo.value;
        e.currentTarget.todo.value = null;
        createTodo(nextTodo);
      }}>
        <input placeholder="Enter new todo" type="text" id="todo" name="todo"></input>
      </form>
      <ul className='todo-list'>
        {todoList.map( (todo, i) => 
          (<TodoItem key={todo.id} id={todo.id} todo={todo.desc} removeTodo={removeTodo}/>)
        )}
      </ul>
    </>
  )
}

type Todo = {
  id: string,
  desc: string
}

interface TodoProps {
  id: string,
  todo: string,
  removeTodo: Function
}

function TodoItem({id, todo, removeTodo}:TodoProps){
  const [completed, setCompleted] = useState<boolean>(false);
  return (
      <li className="todo">
        <input type="checkbox" onClick={()=>{setCompleted(!completed)}}/>
        <button type="button" onClick={()=>{removeTodo(id)}}>Remove</button>
        <p className={['text', completed ? 'complete' : ''].join(' ')}>{todo}</p>
      </li>
  )
}
