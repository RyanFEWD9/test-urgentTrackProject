import React, { useState } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchInputWrapper">
      <input
        className="searchInput"
        type="search"
        placeholder="輸入公立醫院名稱以搜尋急症室路線"
        onChange={handleChange}
        value={searchInput}
      />
      <button className="searchButton">
        <img src="/SearchIcon.png" />
      </button>
    </div>
  );
};
export default SearchBar;
