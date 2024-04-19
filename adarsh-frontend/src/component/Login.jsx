import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export const Login = () => {
  const [user, setUser] = useState("");
  const navigate=useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && password) {
      const res = await axios.post("http://localhost:8000/login", {
        username: user,
        password,
      });
      const { accessToken } = res.data;
      localStorage.setItem("token", accessToken);
      navigate('/');
    }
  };
  return (
    <div className="maincontainer p-4">
      <div className="containerlogin">
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label className="label" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="field"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </div>
        <div className="password">
          <label className="label" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="field"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="submitbutton">
          Submit
        </button>
      </form>
      <Link to="/register" className="registerbutton">
        Dont have an Account? Register here
      </Link>
      </div>
    </div>
  );
};
