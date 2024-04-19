import { useState } from "react";
import { uploadImage } from "../utils/blob";
import axios from "axios";
import { useSelector } from "react-redux";
import './QueryCreate.css'

export const QueryCreate = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user.user);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div>
      <div className="mainbox">
      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            let url = null;
            if (file) {
              url = await uploadImage(file);
            }
            if (category && query) {
              axios.post("http://localhost:8000/upload", {
                query,
                url,
                category,
                username: user.username,
              });
            }
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option className="select"> Select a category</option>
            <option value="Leave">Leave</option>
            <option value="Certification">Certification</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <input
          type="text"
          className="input"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <input
          type="submit"
          value="submit"
          className="button text-white bg-black px-3 rounded"
        />
      </form>
      </div>
    </div>
  );
};
