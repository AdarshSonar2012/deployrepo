import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./CommentItem.css"

export const CommentItem = ({ comment, username, id }) => {
  const user = useSelector((state) => state.user.user);
  const [visible, setVisible] = useState(false);
  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState([]);
  useEffect(() => {
    const getReply = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/reply/${id}`);
        setReplyList(res.data.replies);
      } catch (error) {
        console.log(error);
      }
    };
    getReply();
  }, [id, reply]);
  return (
    <div>
      <div className="mainbox">
      <div className="reply">
        <p>User: {username}</p>
        <p>Comment: {comment}</p> 
      </div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
        className="text-blue-500 underline"
      >
        <div className="replybutton">{visible ? "hide replies" : "show replies"}</div>
      </button>
      {visible &&
        replyList.length > 0 &&
        replyList.map((item, key) => {
          return (
            <div key={key} className="flex justify-between">
              <p className="content">{item.reply}</p>
              <p className="content">{item.username}</p>
            </div>
          );
        })}
      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            if (reply) {
              await axios.post(`http://localhost:8000/reply/${id}`, {
                reply,
                username: user.username,
              });
            }
            setReply("");
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <input
          type="text"
          placeholder="reply"
          className="border rounded w-full bg-gray-200 text-black p-1 mt-4"
          onChange={(e) => {
            setReply(e.target.value);
          }}
        />
      </form>
      </div>
    </div>
  );
};
