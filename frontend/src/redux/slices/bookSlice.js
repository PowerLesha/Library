import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";

const initialState = [];

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((b) => b.id !== action.payload);
    },
    toggleFavorite: (state, action) =>
      state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      ),
  },
});

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithId(res.data, "API")));
    }
  } catch (error) {
    console.log("error");
  }
};

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const selectAddBook = (state) => state.books;

export default bookSlice.reducer;
