import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import "./Home.scss";
const Home = (e) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [link, setLink] = useState("https://backend-lhnz.onrender.com");
  const { getLoggedIn } = useContext(AuthContext);
  const [account, setAccount] = useState(true);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${link}/api/user/register`,
        { email: registerEmail, password: registerPassword },
        { withCredentials: true }
      );
      getLoggedIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${link}/api/user/login`,
        { email: loginEmail, password: loginPassword },
        { withCredentials: true }
      );
      getLoggedIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="nav">
        <div className="to-login" onClick={(e) => setAccount(true)}>
          Login
        </div>
        /{" "}
        <div className="to-register" onClick={(e) => setAccount(false)}>
          Register
        </div>
      </div>
      {account === false && (
        <div className="register">
          <h2>Register</h2>
          <form onSubmit={(e) => handleRegister(e)}>
            <input
              type="text"
              value={registerEmail}
              placeholder="Email"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
      {account === true && (
        <>
          <div className="login">
            <h2>Login</h2>
            <form onSubmit={(e) => handleLogin(e)}>
              <input
                type="text"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                value={loginPassword}
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
