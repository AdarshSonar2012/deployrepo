import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CommentItem } from "./CommentItem";
import "./QueryCard.css"

export const QueryCard = ({ username, query, url, category, id }) => {
  const [commentList, setCommentList] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [comment, setComment] = useState();
  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/comment/${id}`);
        setCommentList(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, [id, comment]);
  return (
    <div className="mainbox">
      <h1 className="category">User: {username}</h1>
      <h1 className="category">Category: {category}</h1>
      <p className="mainquery">Query : {query}</p>
      {url && <img src={url} alt="" className="size-96 object-cover mt-2" />}
      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            console.log("i am submitted");
            if (comment) {
              await axios.post(`http://localhost:8000/comment/${id}`, {
                comment,
                username: user.username,
              });
            }
            setComment("");
          } catch (error) {
            console.log(error.message);
          }
        }}
        className="gap-2 flex"
      >
        <input
          type="text"
          placeholder="comment"
          className=" border rounded w-full bg-gray-200 text-black p-4 mt-4"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </form>
      {commentList.length > 0 && (
        <div className="mt-4 border p-2">
          {commentList.map((comment, key) => (
            <CommentItem
              key={key}
              comment={comment.comment}
              username={comment.username}
              id={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
