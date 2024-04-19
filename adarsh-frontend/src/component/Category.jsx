import React, { useState, useEffect } from 'react';  
import { Link, useParams } from 'react-router-dom';  
import axios from 'axios';  
import { QueryCard } from './QueryCard';
import "./Category.css"
  
export const Category = () => {  
  const [posts, setPosts] = useState([]);  
  const { category } = useParams();  
  
  useEffect(() => {  
    const getdata = async () => {  
      try {  
        const res = await axios.get(`http://localhost:8000/posts/${category}`);  
        setPosts(res.data.data);  
      } catch (error) {  
        console.log(error);  
      }  
    }; 
    getdata();  
  }, [category]);  
  
   
  
  return (  
    <div>  
      <p className='heading'>Posts related to {category}</p>  
      <ul>  
        {posts.map((post) => (  
           <QueryCard  
           key={post.id}  
           username={post.username}  
           category={post.category}  
           query={post.query}  
           url={post.url}  
           id={post.id}  
           showComments={true} 
         />  
        ))}  
      </ul>   
    </div>  
  );  
};  
  
