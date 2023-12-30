import React, { useState } from "react";
import styles from "../App.module.css";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Pass the search term to the parent component
  };

  return (
    <div className={styles["allsearchInputWrapper"]}>
      <div className={styles["searchInputWrapper"]}>
        <input
          type="search"
          placeholder="輸入公立醫院名稱以搜尋急症室路線"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <button id={styles["searchButton"]}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    </div>
  );
}
export default SearchBar;
