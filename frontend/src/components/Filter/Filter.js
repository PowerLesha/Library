import React from "react";
import "./Filter.css";
import {
  resetFilters,
  selectTitleFilter,
  setTitleFilter,
} from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
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
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
