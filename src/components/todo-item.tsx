import { useState } from "react";
import { Todo } from "../types/todo";
  
interface TodoProps {
    todo: Todo,
    removeTodo: Function,
    propogateCompletedTodo: Function
}

export default function TodoItem({todo, removeTodo, propogateCompletedTodo}: TodoProps){
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
  