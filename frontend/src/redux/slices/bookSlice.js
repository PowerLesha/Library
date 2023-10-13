import { createSlice } from "@reduxjs/toolkit";

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

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const selectAddBook = (state) => state.books;

export default bookSlice.reducer;
