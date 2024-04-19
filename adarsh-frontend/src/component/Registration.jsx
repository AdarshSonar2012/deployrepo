import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"

export const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [full_name, setFullname] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username,
        full_name,
        email,
        password,
      });
      console.log(response.data.message);
      setRegistered(true);
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {error && error}
      <div className="maincontainer p-4">
      <div className="containerregister"> 
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label className="label" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="border"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="fullname">
          <label className="label" htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            className="border"
            value={full_name}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>
        <div className="email">
          <label className="label" htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="border"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>

        <div className="password">
          <label className="label" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="border"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="password">
          <label className="label" htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            className="border"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="submitbutton">
          Submit
        </button>
      </form>
      </div> 
      </div>
      {registered && (
        <div className="popup">
          <p>Registered successfully! Redirecting...</p>
        </div>
      )}
    </div>
  );
};
