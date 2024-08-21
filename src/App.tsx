import { useState } from 'react'
import './App.css'

export default function App() {
  const [todoCount, setTodoCount] = useState(0);
  const [todoList, setTodoList] = useState<Array<string>>([]);


  const createTodo = (newTodo: string) => {
    if(newTodo){
      setTodoList((previousTodo) => [...previousTodo, newTodo]);
      setTodoCount(todoList.length+1);
    }
  }

  const removeTodo = (index: number) => {
    setTodoList((previousTodo) => {
      let todos = [...previousTodo];
      todos.splice(index, 1);
      return todos;
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
          (<TodoItem key={i} index={i} todo={todo} removeTodo={removeTodo}/>)
        )}
      </ul>
    </>
  )
}

interface TodoProps {
  index: number,
  todo: string,
  removeTodo: Function
}

function TodoItem({index, todo, removeTodo}:TodoProps){
  const [completed, setCompleted] = useState<boolean>(false);
  return (
      <li className="todo">
        <input type="checkbox" onClick={()=>{setCompleted(!completed)}}/>
        <button type="button" onClick={()=>{removeTodo(index)}}>Remove</button>
        <p className={['text', completed ? 'complete' : ''].join(' ')}>{todo}</p>
      </li>
  )
}
