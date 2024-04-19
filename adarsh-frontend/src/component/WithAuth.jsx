import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user/userReducer";

export const WithAuth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const getValidation = async () => {
      try {
        const res = await axios.post("http://localhost:8000/verify", {
          token,
        });
        const { username, full_name, email } = res.data.user;
        dispatch(addUser({ username, full_name, email }));
      } catch (error) {
        navigate("/login");
      }
    };
    getValidation();
  }, [navigate, dispatch]);
  return <>{children}</>;
};
