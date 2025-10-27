import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query); // pass query to parent
    }
  };

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <svg
        className="search-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M15.5 14h-.79l-.28-.27a6 6 0 10-.7.7l.27.28v.79L20 
                 21.5 21.5 20 15.5 14zM10 15a5 5 0 110-10 
                 5 5 0 010 10z"/>
      </svg>
      <input
        type="text"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
 