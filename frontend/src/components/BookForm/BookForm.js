import React, { useState } from "react";
import "./BookForm.css";
import booksData from "../../data/books.json";
import { addBook } from "../../redux/slices/bookSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author })));

      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandom = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithId(randomBook)));
  };

  const handleAddRandomBookViaApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/random-boo7k");
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data)));
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button type="submit">Add book</button>
        <button type="button" onClick={handleAddRandom}>
          Add random
        </button>
        <button type="button" onClick={handleAddRandomBookViaApi}>
          Add random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
