import React from 'react';
import { SearchResults } from './SearchResults';

export const SearchResultsList = ({ searchResults }) => {
  return (
    <div className="search-results absolute max-h-56 bg-white rounded mt-3 px-2 w-[368px] left-px overflow-y-scroll">
      {searchResults.map((menu, index) => (
        <SearchResults menu={menu} key={index} />
      ))}
    </div>
  );
};
