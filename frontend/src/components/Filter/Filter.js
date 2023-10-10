import React from "react";
import "./Filter.css";
import {
  resetFilters,
  selectAuthorFilter,
  selectFavoriteFilter,
  selectTitleFilter,
  setAuthorFilter,
  setFavoriteFilter,
  setTitleFilter,
} from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const favoriteFilter = useSelector(selectFavoriteFilter);

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const handleFavoriteFilterChange = (e) => {
    dispatch(setFavoriteFilter());
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            value={titleFilter}
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            value={authorFilter}
            type="text"
            placeholder="Filter by author..."
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              value={favoriteFilter}
              onChange={handleFavoriteFilterChange}
            />
            Only favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
