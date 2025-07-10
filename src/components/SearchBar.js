import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ searchValue, onSearchChange, isDarkMode, toggleTheme }) => {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search by category or description..."
        className={`search-input ${isDarkMode ? "dark" : ""}`}
        aria-label="Search expenses"
      />
      <button
        onClick={toggleTheme}
        className={`theme-toggle ${isDarkMode ? "dark" : ""}`}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default SearchBar;
