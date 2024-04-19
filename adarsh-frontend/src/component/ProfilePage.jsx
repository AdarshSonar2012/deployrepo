import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { QueryCard } from "./QueryCard";
import { CommentItem } from "./CommentItem";
import "./ProfilePage.css"

export const ProfilePage = () => {
  const [userQuery, setUserQuery] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [userDetails, setUserDetails] = useState({});  

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/${user.username}`);
        setUserQuery(res.data);

      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [user]);
  return (
    <div>
      <div className="box">
      <h1 className="maintag">Profile</h1>
      <div className="details">
          <p className="username">Hey, {user.username}</p>
          <p className="email">Email id : {user.email}</p>
          <p className="fullname">Full Name : {user.full_name}</p>
      </div>
      {userQuery?.length > 0
        ? userQuery?.map((query, key) => (
            <QueryCard
              key={key}
              category={query.category}
              id={query.id}
              query={query.query}
              url={query.url}
              username={query.user}
            />
          ))
        : "No queries to display"}
      </div>
    </div>
  );
};
