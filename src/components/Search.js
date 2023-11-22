import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchResultsList } from './SearchResultsList';

export const Search = () => {
  const [searchIterm, setSearchIterm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchIterm.trim() !== '') {
      setIsLoading(true);

      // Send a request to the backend to fetch search results
      fetch(
        `https://food-ordering-b921316c67e7.herokuapp.com/api/products/search?q=${searchIterm}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setIsLoading(false);
        });
    } else {
      setSearchResults([]); // Clear results when search term is empty
    }
  }, [searchIterm]);

  const handleSearchChange = (value) => {
    setSearchIterm(value);
  };

  return (
    <div className="search-container bg-black w-full p-4">
      <div className="input-wrapper px-3 rounded mx-9 py-2.5 bg-white w-1/3 relative">
        <FaSearch id="search-icon" className="inline" />
        <input
          type="text"
          placeholder="Search menus..."
          className="ml-1 text-xl outline-none"
          value={searchIterm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        <SearchResultsList searchResults={searchResults} />
      </div>
    </div>
  );
};
