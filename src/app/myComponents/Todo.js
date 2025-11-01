"use client";
import React, { useEffect, useState } from "react";
import "@/app/myComponents/Todo.css";

export default function Todo() {
  const [data, setData] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // Fetch existing todos from the backend when the component mounts
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);

      if (result.todos.length === 0) {
        console.log("not found");
      } else {
        console.log("found it");
        setData(result.todos);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    const copyData = [...data];
    copyData.push(inputValue);
    setData(copyData);

    console.log(`Frontend is sending data to backend `);

    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ todo: inputValue }),
    });

    const result = await response.json();
    console.log("Frontend received from backend:", result.todos);

    setInputValue("");
  };
  return (
    <div className="app">
      <div className="addTodoContainer">
        <input
          className="inputTodo"
          type="text"
          placeholder="Enter a todo..."
          value={inputValue}
          onChange={inputHandler}
        />
        <div className="addButtonContainer">
          <button
            onClick={addTodo}
            className="addTodo"
            aria-label="Add todo"
          ></button>
        </div>
      </div>

      {data.map((el, index) => {
        return (
          <div key={index} className="todos">
            <div className="todo">
              <span className="todoData">{el}</span>
              <div className="TodoEditDelete">
                <div className="editTodo" role="button" aria-label="Edit todo">
                  Edit
                </div>
                <div
                  className="deleteTodo"
                  role="button"
                  aria-label="Delete todo"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
