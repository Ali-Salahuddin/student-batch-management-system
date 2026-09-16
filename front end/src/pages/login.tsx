import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../stylesheet/login.css";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
     
      const { data } = await api.post("/auth/login", {
    email,
    password,
    });
     console.log(data);
      if (data.user.role === "student") {
  navigate("/profile");
} else {
  navigate("/dboard");
}

      } 
      catch (error: any) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      console.error(error);
      alert("Unable to connect to the server.");
    }
  }
};
      

  return (
    
  <div className="login-container">
      <h1 className="app-title">
      Institute Management System
    </h1>


    <div className="login-card">

      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>

      <p className="register-text">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>
  </div>
);
}
export default Login;
