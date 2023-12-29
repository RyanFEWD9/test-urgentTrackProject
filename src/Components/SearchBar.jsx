import React, { useState } from "react";
import styles from "../App.module.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles["allsearchInputWrapper"]}>
      <div className={styles["searchInputWrapper"]}>
        <input
          type="search"
          placeholder="輸入公立醫院名稱以搜尋急症室路線"
          onChange={handleChange}
          value={searchInput}
        />
        <button id={styles["searchButton"]}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
