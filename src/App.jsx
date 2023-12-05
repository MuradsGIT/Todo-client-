/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import UpdateTodo from "./components/UpdateTodo";
import Home from "./Home";
import AuthContext from "./context/AuthContext";
function App() {
 const {loggedIn} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ===false && <Route path="/" element={<Home />} />}
        {loggedIn === true && (
          <>
            <Route path="/" element={<Todo />} />
            <Route path="/update/:id" element={<UpdateTodo />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
