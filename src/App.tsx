import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './components/todo-item';
import { Todo } from './types/todo';

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
function App() {
  const [count, setCount] = useState(0)
=======
>>>>>>> Stashed changes
export default function App() {
  const [todoCount, setTodoCount] = useState(0);
  const [todoList, setTodoList] = useState<Array<Todo>>([]);


  const createTodo = (desc: string) => {
    if(desc){
      const newTodo: Todo = {id: uuidv4(), desc: desc, completed: false};
      setTodoList((previousTodo) => [...previousTodo, newTodo]);
<<<<<<< Updated upstream
      setTodoCount(todoList.length+1);
=======
      setTodoCount(tc => tc+1);
>>>>>>> Stashed changes
    }
  }

  const removeTodo = (todo: Todo) => {
    setTodoList((previousTodo) => {
      return previousTodo.filter( elem => elem.id !== todo.id);
    });

    if(!todo.completed){
      setTodoCount(todoCount-1);
    }
  }

  const updateTodosCount = (todo: Todo) => {
    setTodoCount(todoCount + (todo.completed ? -1 : 1));
  }

  const clearCompletedTodos = () => {
    setTodoList((previousTodo) => {
      return previousTodo.filter( todo => !todo.completed);
    });
  }
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes

  return (
    <>
      <h1>{todoCount > 0 ? todoCount : null} TODO{todoCount > 0 ? 'S' : null}</h1>
      <form className="todo-form" onSubmit={(e) => {
        e.preventDefault();
        let nextTodo = e.currentTarget.todo.value;
        e.currentTarget.todo.value = null;
        createTodo(nextTodo);
      }}>
        <input placeholder="Enter new todo" type="text" id="todo" name="todo"></input>
        <button type="button" onClick={clearCompletedTodos}>Clear completed</button>
      </form>
      <ul className='todo-list'>
        {todoList.map( (todo) => 
          (<TodoItem 
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              propogateCompletedTodo={updateTodosCount}
            />)
        )}
      </ul>
    </>
  )
}

