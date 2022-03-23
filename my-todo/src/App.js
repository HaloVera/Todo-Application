import React, { useState, useEffect } from 'react';
// Importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';

import './App.css';

function App() {
  
  // state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setfilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);
  // functions
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setfilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setfilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setfilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos, status]);

  // save to local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    const saveLocalTodos = () => {
      if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }
    };
  }
  return (
    <div>
      <header>
        <h1>Vera's Todo List</h1>
      </header>
      <Form 
        setInputText={setInputText} 
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText} 
        status={status}
        setStatus={setStatus}
      />
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;

