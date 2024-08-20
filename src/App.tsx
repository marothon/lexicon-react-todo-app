import { useState } from 'react'
import './App.css'

function App() {
  const [todoCount, setTodoCount] = useState(0);
  const [todoList, setTodoList] = useState<Array<string>>([]);


  const createTodo = (newTodo: string) => {
    if(newTodo){
      todoList.push(newTodo);
      setTodoList(todoList);
      setTodoCount(todoList.length);
    }
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
      <ul>
        {todoList.map( (todo, i) => 
          (<li key={i}>{todo}</li>)
        )}
      </ul>
    </>
  )
}



export default App
