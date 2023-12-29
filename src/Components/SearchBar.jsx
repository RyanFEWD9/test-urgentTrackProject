import React, { useState } from "react";
import styles from "../App.module.css";

function SearchBar({ distances, handleHospitalClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <input 
        type="text" 
        placeholder="輸入公立醫院名稱以搜尋急症室路線" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={styles["hospital-container"]}>
        {distances
          .filter((item) => item.hospital.institution_tc.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item, index) => (
            <div
              key={index}
              className={styles["hospital-item"]}
              onClick={() => handleHospitalClick(item.hospital)}
            >
              {/* ... */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
