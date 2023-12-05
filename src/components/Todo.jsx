/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Todo.scss";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import AuthContext from "../context/AuthContext";

const Todo = () => {
  const [todos, setTodos] = new useState([]);
  const [todo, setTodo] = useState("");
  const [amountDone, setAmountDone] = useState(0);
  const [amount, setAmount] = useState(0);
  const [link, setLink] = useState("https://backend-lhnz.onrender.com");
  const { getLoggedIn } = useContext(AuthContext);

  const handleStatus = async (e) => {
    try {
      const updatedStatus = !e.status;

      const response = await axios.put(`${link}/handleStatus/${e._id}`, {
        status: updatedStatus,
      },  { withCredentials: true });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === e._id ? { ...todo, status: updatedStatus } : todo
        )
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    setTodo("");

    if (todo.length >= 1) {
      try {
        const response = await axios.post(`${link}/createTodo`, {
          todo: todo,
          status: false,
        }, { withCredentials: true });

        setTodos([...todos, response.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${link}/deleteTodo/${id}`, { withCredentials: true });

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get(`${link}/`, { withCredentials: true })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.status);
    setAmountDone(completedTodos.length);

    setAmount(todos.length);
  }, [todos]);

  const handleLogout = async () => {
    try {
      await axios.get(`${link}/api/user/logout`, { withCredentials: true });
      getLoggedIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-info">
        <div className="todo-info-text">
          <h1>Todo Done</h1>
          <p>keep it up</p>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>

        <div className="todo-info-bubble">
          <p>
            {amountDone}/{amount}
          </p>
        </div>
      </div>
      <form className="create-todo" onSubmit={(e) => addTodo(e)}>
        <input
          type="text"
          value={todo}
          placeholder="Write your todo.."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>+</button>
      </form>

      <div className="todo-list">
        {todos.toReversed().map((todo) => {
          if (todo.status) {
            return (
              <div className="todo" key={todo._id}>
                <div className="action">
                  {" "}
                  <button
                    className="true"
                    onClick={() => handleStatus(todo)}
                  ></button>{" "}
                  <p>{todo.todo}</p>
                </div>

                <div className="todo-actions">
                  <Link to={`/update/${todo._id}`}>
                    <h1>{<FaRegEdit />}</h1>
                  </Link>
                  <h1 onClick={() => deleteTodo(todo._id)}>
                    {<MdOutlineDelete />}
                  </h1>
                </div>
              </div>
            );
          } else {
            return (
              <div className="todo" key={todo._id}>
                <div className="action">
                  {" "}
                  <button
                    className="false"
                    onClick={() => handleStatus(todo)}
                  ></button>{" "}
                  <p>{todo.todo}</p>
                </div>

                <div className="todo-actions">
                  <Link to={`/update/${todo._id}`}>
                    <h1>{<FaRegEdit />}</h1>
                  </Link>
                  <h1 onClick={() => deleteTodo(todo._id)}>
                    {<MdOutlineDelete />}
                  </h1>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Todo;
