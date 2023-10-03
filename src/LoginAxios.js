import React, { useState } from "react";
import axios from "axios";

const LoginAxios = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      uname: username,
      pass: password,
    };

    try {
      const response = await axios.post(
        "http://shserver.top:8080/test/users/login",
        requestBody
      );

      if (response.status === 200) {
        const data = response.data;
        //based on the API response
        if (data.uname === "admin" && data.pass === "admin") {
          console.log("Successful login");
        } else {
          setError("Invalid Username or Password");
        }
      } else {
        const data = response.data;
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <h3>Login</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginAxios;
