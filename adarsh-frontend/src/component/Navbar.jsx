import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/user/userReducer";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear("token");
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <nav className="bg-black flex text-white p-4 items-center">
      <div className="navbarcontents">
      <div className="appname"><h1>KnowShare</h1></div>
      <div className="items">
      <Link to={"/"}>Home</Link>
      {!user?.username && <Link to={"/login"}>Login</Link>}
      {!user?.username && <Link to={"/register"}>Register</Link>}
      {user?.username && <Link to={"/profile"}>{user.username}</Link>}
      {user?.username && (
        <button
          className="text-white bg-black p-1 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}</div>
      </div>
    </nav>
  );
};
