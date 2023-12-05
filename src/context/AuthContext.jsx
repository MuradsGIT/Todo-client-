/* eslint-disable react/prop-types */
import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [link, setLink] = useState("https://backend-lhnz.onrender.com");
  const getLoggedIn = async () => {
    try {
      const loggedInRes = await axios.get(`${link}/api/user/loggedIn`, {withCredentials:true});
      console.log(loggedInRes)
      setLoggedIn(loggedInRes.data);
    } catch (error) {
      // Handle errors, log them, or update state accordingly
      console.error('Error fetching loggedIn status:', error);
      setLoggedIn(false); // Set to false in case of an error
    }
  };
  

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
