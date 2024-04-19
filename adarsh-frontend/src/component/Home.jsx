import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user/userReducer";
import { QueryCard } from "./QueryCard";
import './Home.css'
export const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.post("http://localhost:8000/verify", {
            token,
          });
          const { user } = res.data;
          const userData = {
            username: user.username,
            full_name: user.full_name,
            email: user.email,
          };
          dispatch(addUser(userData));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/");
        setData(res.data.data);
        const uniqueCategories = [
          ...new Set(res.data.data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [dispatch]);
 
  return (  
    <div className="main">
    <div className="border-vertical">  
        <h2 className="categorieshead">Categories:</h2>  
        <ul className="categoriesbody">  
          {categories?.length > 0 &&  
            categories?.map((category, key) => (  
              <li className="categorieslist" key={key}>  
                <Link to ={`/posts/${category}`}>{category} </Link>  
              </li>  
            ))}  
        </ul>  
      </div>  
      <div className="listqueries">  
        <h1 className="text-2xl font-bold">List of queries</h1>  
   
        {data.map((query, key) => (  
          <div key={key}>  
            <QueryCard  
              username={query.username}  
              category={query.category}  
              query={query.query}  
              url={query.url}  
              id={query.id}  
            />  
          </div>  
        ))}  
      </div>  
      <Link className="create-button" to="/create">  
          Create Query  
      </Link>  
 
     
    </div>
  )};