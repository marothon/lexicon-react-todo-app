import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [todoCount, setTodoCount] = useState(0);
  const [todoList, setTodoList] = useState<Array<Todo>>([]);


  const createTodo = (desc: string) => {
    if(desc){
      const newTodo: Todo = {id: uuidv4(), desc: desc, completed: false};
      setTodoList((previousTodo) => [...previousTodo, newTodo]);
      setTodoCount(todoList.length+1);
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
    let completedTodos = todoList.filter( todo => todo.completed);
    setTodoList((previousTodo) => {
      return previousTodo.filter( todo => !todo.completed);
    });
    setTodoCount(todoCount-completedTodos.length);
  }

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
        {todoList.map( (todo, i) => 
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

type Todo = {
  id: string,
  desc: string,
  completed: boolean
}

interface TodoProps {
  todo: Todo,
  removeTodo: Function,
  propogateCompletedTodo: Function
}

function TodoItem({todo, removeTodo, propogateCompletedTodo}: TodoProps){
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleCompleteTodo = () => {
    setCompleted(!completed);
    todo.completed = !todo.completed;
    propogateCompletedTodo(todo);
  }

  return (
      <li className="todo">
        <input type="checkbox" onClick={handleCompleteTodo}/>
        <button type="button" onClick={()=>{removeTodo(todo)}}>Remove</button>
        <p className={['text', completed ? 'complete' : ''].join(' ')}>{todo.desc}</p>
      </li>
  )
}
