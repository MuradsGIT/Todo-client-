/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UpdateTodo.scss'
const UpdateTodo = () => {
  const { id } = useParams();
  const [chosenTodo, setChosenTodo] = useState("");
  const navigate = useNavigate();

  const [link, setLink] = useState("https://backend-lhnz.onrender.com")

  const editTodo = (e) => {
    e.preventDefault();
    axios
      .put(`${link}/editTodo/` + id, {chosenTodo}, { withCredentials: true } )
      .then((res) => {
        console.log(res);
        navigate('/')
          })
      .catch((err) => console.log(err));
  };

  return (
    <div className="update">
      <div className="copy">
        <div className="copytext">
          <h1>Todo Done</h1>
          <p>keep it up</p>
        </div>

        <div className="copy-bubble">
          <p>
              dsad
          </p>
        </div>
      </div>
      <form className="update-todo" onSubmit={(e) => editTodo(e)}>
      <input
        type="text"
        value={chosenTodo}
        onChange={(e) => setChosenTodo(e.target.value)}
      />
      <button>Edit</button>
    </form>
    </div>
    
  );
};

export default UpdateTodo;


