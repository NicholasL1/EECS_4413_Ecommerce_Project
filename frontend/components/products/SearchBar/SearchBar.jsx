import React, { useState } from "react";
import "primeicons/primeicons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleInput = (i) => {
    setQuery(i.target.value);
  };

  const handleKeyDown = (k) => {
    if (k.key === "Enter") {
      setSearchQuery(query);
    }
  };

  return (
    <div
      id="search-container"
      className="flex flex-row h-full w-full lg:w-3/4 border shadow-md rounded-lg"
    >
      <div className="w-16 h-full flex justify-center align-middle items-center text-white rounded-s-lg bg-custom-black">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="w-full rounded-e-lg px-4"
        placeholder="Find products by name..."
      />
    </div>
  );
};

export default SearchBar;
