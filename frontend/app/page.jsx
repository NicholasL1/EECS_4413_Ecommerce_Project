"use client";

import React, {useState, useEffect} from 'react';
import './App.css';
import './ProductCard/ProductCard.css';
import './Sidebar/Sidebar.css';
import Sidebar1 from './Sidebar/Sidebar1.jsx';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ProductList from './ProductList/ProductList.jsx';
import SearchBar from './SearchBar/SearchBar.jsx';
import ProductServices from './ProductServices.js';
import {Paginator} from 'primereact/paginator';

function page() {

  const App = () => {
    const [products, setProducts] = useState([]);               // state var used to keep/update a list of products to be displayed
    const [filter, setFilter] = useState({});                   // state var used to query for products based on user-chosen filter(s)
    const [currentPage, setCurrentPage] = useState(1);          // state var used to keep track of current page for pagination of products
    const [totalProducts, setTotalProducts] = useState(0);      // state var used to track total products returned from query so pagination can divide them accordingly
    const [searchQuery, setSearchQuery] = useState('');         // state var used to maintain query entered in search bar


    useEffect(() => {
      const fetchAllProducts = async () => {
        const result = await ProductServices.getAllProducts();      // List all products when the page is loaded
  
        if (result.message) {
          console.error(result.message);
        }
  
        setProducts(result.data);
        setTotalProducts(result.data.length);
      };
  
      fetchAllProducts();
  
    }, []);
  
  
    useEffect(() => {
      const fetchFilteredProducts = async () => {
  
        try {
          
          if (Object.keys(filter).length > 0) {
            const result = await ProductServices.getProductsFiltered(filter);
  
            if (result && result.data) {
              setProducts(result.data);
              setTotalProducts(result.data.length);
            } else {
              console.error('Error: API did not respond with any data', result);
            }
          } else {
            const result = await ProductServices.getAllProducts();

            if (result.message) {
              console.error(result.message);
            }

            setProducts(result.data);
            setTotalProducts(result.data.length);
          }

        } catch (error) {
          console.error('Error fetching filtered Products');
        }
  
      };
  
      fetchFilteredProducts();
    }, [filter]);                       // this useEffect will be called when [filter] is modified (dependency array)


    useEffect(() => {
      const fetchSearchedProducts = async () => {

        if (searchQuery.trim() === '') {                // won't run unless a search term has been entered
          return;
        }

        try {

          if (searchQuery) {
            const result = await ProductServices.getProductsFiltered({name: searchQuery});      // sets the search term as the "name" parameter

            if (result && result.data) {
              setProducts(result.data);
              setTotalProducts(result.data.length);
            }

          }

        } catch (error) {
          console.log(error.message);
        }

      };

      fetchSearchedProducts();
    }, [searchQuery]);
  
  
    const handleMenuClick = (filterParam, filterValue) => {
  
      console.log('Current filter (handleClick): ', filter);
      
      setFilter((prevFilter) => {             // prevFilter is really just the current filter before the change has been made
  
        if (prevFilter[filterParam] === filterValue) {      // if filter parameter has already been selected, selecting it again will remove it
          const newFilter = {...prevFilter};
          delete newFilter[filterParam];
          return newFilter;
        } else {
          return {                                        // otherwise add the new filter parameter to the filter and perform the query
            ...prevFilter,
            [filterParam]: filterValue
          };
  
        }
  
      });
  
    };


    const handlePageChange = (event) => {             // event handler used to handle pagination
      setCurrentPage(event.page + 1);
    };
  
  
    return (
  
        <div id='page-container'>
          <h2>Product Search</h2>
            <SearchBar setSearchQuery={setSearchQuery} />
            <Sidebar1 handleMenuClick={handleMenuClick} />
          <div className='results-container'>
            <h3>Search Results</h3>
            <ProductList products={products} currentPage={currentPage} />
            <Paginator first={0} rows={20} totalRecords={totalProducts} onPageChange={handlePageChange} page={currentPage - 1}/>
          </div>
  
        </div>
  
  
    );
  };

  return (
      <div>
        <App />
      </div>
  );
  
}

export default page;
