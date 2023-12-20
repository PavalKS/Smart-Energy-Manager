import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Login", { email, password })
      .then((response) => {
        const message = response.data;
        switch (message) {
          case "Success":
            navigate("/HomePage");
            sessionStorage.setItem("loggedInUser", email);
            break;
          case "The password is incorrect":
          case "User doesn't exist":
            window.alert(message);
            break;
          default:
            window.alert("An error occurred during login");
            break;
        }
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        window.alert("An error occurred during login");
      });
  }

  return (
    <div className="login col-4">
      <h1 className="display-3">Login</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <input type="submit" className="form-control" value="Submit" />
      </form>
      <br />
      <p>
        New User? <Link to="/Signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
