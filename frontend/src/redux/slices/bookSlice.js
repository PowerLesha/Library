import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoadingViaApi: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      console.log(res.data);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
      // Option 2
      // throw error;
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((b) => b.id !== action.payload),
      };
    },

    toggleFavorite: (state, action) => {
      state.books = state.books.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );
    },

    // toggleFavorite: (state, action) => {
    //   state.books.forEach((book, index) => {
    //     if (book.id === action.payload) {
    //       state.books[index] = { ...book, isFavorite: !book.isFavorite };
    //     }
    //   });
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaApi = true;
    });
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaApi = false;
    });
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaApi = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, "API"));
      }
    });
  },
  // Option 2
  //   extraReducers: {
  //     [fetchBook.pending]: (state, action) => {
  //       state.isLoadingViaApi = true;
  //     },
  //     [fetchBook.rejected]: (state, action) => {
  //       state.isLoadingViaApi = false;
  //     },

  //     [fetchBook.fulfilled]: (state, action) => {
  //       state.isLoadingViaApi = false;
  //       if (action.payload.title && action.payload.author) {
  //         state.books.push(createBookWithId(action.payload, "API"));
  //       }
  //     },
  //   },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const selectAddBook = (state) => state.books.books;
export const selectIsLoadingViaApi = (state) => state.books.isLoadingViaApi;
export default bookSlice.reducer;
