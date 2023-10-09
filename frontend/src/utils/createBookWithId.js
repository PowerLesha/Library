import React from "react";
import { v4 } from "uuid";

const createBookWithId = (book) => {
  return {
    ...book,
    isFavorite: false,
    id: v4(),
  };
};

export default createBookWithId;
