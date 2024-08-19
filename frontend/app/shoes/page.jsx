"use client";

import React, { useState, useEffect } from "react";
import "./App.css";
import "@/components/products/ProductCard/ProductCard.css";
import "@/components/products/Sidebar/Sidebar.css";
import Sidebar1 from "@/components/products/Sidebar/Sidebar1.jsx";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ProductList from "@/components/products/ProductList/ProductList.jsx";
import SearchBar from "@/components/products/SearchBar/SearchBar.jsx";
import ProductServices from "@/services/productServices";
import { Paginator } from "primereact/paginator";
import { useSearchParams } from "next/navigation";
import { parseSearchParams } from "@/lib/utils";

export default function shoes() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]); // state var used to keep/update a list of products to be displayed
  const [filter, setFilter] = useState({}); // state var used to query for products based on user-chosen filter(s)
  const [currentPage, setCurrentPage] = useState(1); // state var used to keep track of current page for pagination of products
  const [totalProducts, setTotalProducts] = useState(0); // state var used to track total products returned from query so pagination can divide them accordingly
  const [searchQuery, setSearchQuery] = useState(""); // state var used to maintain query entered in search bar

  const fetchFilteredProducts = async () => {
    try {
      if (Object.keys(filter).length > 0) {
        const result = await ProductServices.getProductsFiltered(filter);

        if (result && result.data) {
          setProducts(result.data);
          setTotalProducts(result.data.length);
        } else {
          console.error("Error: API did not respond with any data", result);
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
      console.error("Error fetching filtered Products");
    }
  };

  const fetchSearchedProducts = async () => {
    if (searchQuery.trim() === "") {
      // won't run unless a search term has been entered
      return;
    }

    try {
      if (searchQuery) {
        const result = await ProductServices.getProductsFiltered({
          name: searchQuery,
        }); // sets the search term as the "name" parameter

        if (result && result.data) {
          setProducts(result.data);
          setTotalProducts(result.data.length);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMenuClick = (filterParam, filterValue) => {
    console.log("Current filter (handleClick): ", filter);

    setFilter((prevFilter) => {
      // prevFilter is really just the current filter before the change has been made

      if (prevFilter[filterParam] === filterValue) {
        // if filter parameter has already been selected, selecting it again will remove it
        const newFilter = { ...prevFilter };
        delete newFilter[filterParam];
        return newFilter;
      } else {
        return {
          // otherwise add the new filter parameter to the filter and perform the query
          ...prevFilter,
          [filterParam]: filterValue,
        };
      }
    });
  };

  useEffect(() => {
    // Parse and set the filter based on searchParams
    const parsedFilter = parseSearchParams(searchParams);
    for (const [key, value] of Object.entries(parsedFilter)) {
      filter[key] = value;
    }
    console.log(filter);
  }, [searchParams]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const result = await ProductServices.getAllProducts(); // List all products when the page is loaded

      if (result.message) {
        console.error(result.message);
      }

      setProducts(result.data);
      setTotalProducts(result.data.length);
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [filter, searchQuery]); // this useEffect will be called when [filter] is modified (dependency array)

  const handlePageChange = (event) => {
    // event handler used to handle pagination
    setCurrentPage(event.page + 1);
  };

  return (
    <div id="page-container">
      <SearchBar setSearchQuery={setSearchQuery} />
      <Sidebar1 handleMenuClick={handleMenuClick} />
      <div className="flex-1 mx-auto max-w-[calc(100%-750px)] bg-white pl-[5px] pb-[40px] mt-[10px] mb-[40px] box-border shadow-[0_0_5px_rgba(0,0,0,0.1)] border border-[rgba(39,47,41,0.2)] rounded-[8px] absolute right-[350px] min-w-[calc(100%-750px)] items-center justify-center">
        <h3>Search Results</h3>
        <ProductList products={products} currentPage={currentPage} />
        <Paginator
          first={0}
          rows={20}
          totalRecords={totalProducts}
          onPageChange={handlePageChange}
          page={currentPage - 1}
        />
      </div>
    </div>
  );
}
