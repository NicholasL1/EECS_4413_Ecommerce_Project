import React, {useState} from 'react';
import './SearchBar.css';
import 'primeicons/primeicons.css';
import ProductServices from '@/services/ProductServices';

const SearchBar = ({setSearchQuery}) => {

    const [query, setQuery] = useState('');

    const handleInput = (i) => {
        setQuery(i.target.value);
    };

    const handleKeyDown = (k) => {
        if (k.key === 'Enter') {
            setSearchQuery(query);
        }
    };


    return (
        <div className='search-bar-container'>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
            <input type="text" placeholder="Find products by name..." className="search-bar" value={query} onChange={handleInput} onKeyDown={handleKeyDown} />
            </span>
        </div>
    );


};

export default SearchBar;