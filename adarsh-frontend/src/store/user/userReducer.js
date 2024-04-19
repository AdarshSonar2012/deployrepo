import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    full_name: "",
    id: "",
    email: "",
  },
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: () => {
      return { username: "", full_name: "", id: "", email: "" };
    },
  },
});

export const { addUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
