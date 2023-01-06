import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCategory, getSearchResult } from '../../store/slices/searchSlice';
import './Searchbar.css';


const Searchbar = () => {
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const searchbarRef = useRef(null);
  const [searchbarValue, setSearchbarValue] = useState('');

  const onFocus = () => {
    selectRef.current.style.borderWidth = '2px';
    searchbarRef.current.style.borderWidth = '2px';
  };

  const onOffFocus = () => {
    selectRef.current.style.borderWidth = '1px';
    searchbarRef.current.style.borderWidth = '1px';
  };

  const submitSearch = () => {
    dispatch(getSearchResult(searchbarValue));
  };

  return (
    <>
      <select className='category-select' ref={selectRef}
        onFocus={onFocus} onBlur={onOffFocus}
        onChange={(e) => dispatch(changeCategory(e.target.value))}>
        <option value='users'>Users</option>
        <option value='repositories'>Repos</option>
      </select>
      <input type='search' placeholder='Search...'
        className='searchbar' ref={searchbarRef}
        onFocus={onFocus} onBlur={onOffFocus}
        value={searchbarValue} onChange={(e) => setSearchbarValue(e.target.value)} />
      <button className='button search-button'
        onClick={submitSearch}>
        <i className="bi bi-search"></i>
      </button>
    </>
  )
};

export default Searchbar;