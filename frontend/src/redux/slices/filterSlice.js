import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  isFavorite: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setFavoriteFilter: (state) => {
      state.isFavorite = !state.isFavorite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setTitleFilter,
  resetFilters,
  setAuthorFilter,
  setFavoriteFilter,
} = filterSlice.actions;
export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectFavoriteFilter = (state) => state.filter.isFavorite;
export default filterSlice.reducer;
