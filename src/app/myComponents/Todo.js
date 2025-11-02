"use client";
import React, { useEffect, useState } from "react";
import "@/app/myComponents/Todo.css";

// storage
export default function Todo() {
  const [data, setData] = useState([]);

  // add input
  const [inputValue, setInputValue] = useState("");
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  // edit input

  // Fetch existing todos from the backend when the component mounts

  useEffect(() => {
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

  // add Todo function
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
    console.log("Frontend received from backend");

    setInputValue("");
  };

  // delete Todo function
  const deleteTodo = async (todoToBeDeleted) => {
    console.log(todoToBeDeleted);

    const copyData = data.filter((el, index, arr) => {
      if (index !== todoToBeDeleted) {
        return true;
      } else {
        return false;
      }
    });
    setData(copyData);

    // send delete data to backend
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ deleteTodo: todoToBeDeleted }),
    });
    console.log(`Frontend is sending delete data to backend `);
  };

  // edit Modal
  const [showModal, setShowModal] = useState(false);
  const toogleShowModal = () => {
    setShowModal(!showModal);
  };

  // edit input
  const [editInputValue, setEditInputValue] = useState("");
  const editInputHandler = (e) => {
    setEditInputValue(e.target.value);
  };

  let [oldValue, setOldValue] = useState();

  const editConform = async () => {
    setEditInputValue("");
    toogleShowModal();

    console.log("editInputValue : " + editInputValue);
    console.log("oldValue : " + oldValue);

    let copyData = [...data];
    copyData = copyData.map((el, index, arr) => {
      if (index === oldValue) {
        return editInputValue;
      } else {
        return el;
      }
    });
    setData(copyData);

    // send edit data to backend
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ editTodo: editInputValue, oldValue: oldValue }),
    });
    console.log(`Frontend is sending edit data to backend `);
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
                <button
                  className="editTodo"
                  role="button"
                  aria-label="Edit todo"
                  onClick={() => {
                    toogleShowModal();
                    setOldValue(index);
                  }}
                >
                  Edit
                </button>
                <button
                  className="deleteTodo"
                  role="button"
                  aria-label="Delete todo"
                  onClick={() => {
                    deleteTodo(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {showModal ? (
        <div className="todoEditModalContainer">
          <div className="todoEditModal">
            <input
              onChange={editInputHandler}
              value={editInputValue}
              className="editInput"
              type="text"
            />
            <button onClick={editConform} className="conform">
              Conform
            </button>
            <button onClick={toogleShowModal} className="close">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
