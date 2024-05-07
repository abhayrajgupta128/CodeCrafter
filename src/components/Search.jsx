import React from "react";

const Search = ({ search, handleSearch }) => {
  return (
    <div className="flex gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        className="flex gap-2 border border-gray-300 rounded-xl py-2 px-4 shadow-sm shadow-gray-200 w-40 md:w-64 bg-transparent"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
