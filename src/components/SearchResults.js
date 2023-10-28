import React from 'react';

export const SearchResults = ({ menu }) => {
  return (
    <div
      className="search-result px-3 py-1.5 hover:bg-gray-300 cursor-pointer text-lg font-medium"
      onClick={() => alert(`You clicked ${menu.name}`)}
    >
      {menu.name}
    </div>
  );
};
