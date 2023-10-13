import React from "react";
import { v4 } from "uuid";

const createBookWithId = (book, source) => {
  return {
    ...book,
    source,
    isFavorite: false,
    id: v4(),
  };
};

export default createBookWithId;
