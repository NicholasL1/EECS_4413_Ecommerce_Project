import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList/ProductList";
import { Paginator } from "primereact/paginator";
import SideBarV2 from "@/components/products/Sidebar/SideBarV2";
import ProductServices from "@/services/ProductServices";
import SearchBar from "@/components/products/SearchBar/SearchBar";

export default function pageV2() {
  const [results, setResults] = useState([]);
  const [queryParams, setQueryParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // state var used to maintain query entered in search bar

  // On mount, fetches all the shoes based on URL parameters
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const brand = params.get("brand");
      const size = params.get("size");
      const colour = params.get("colour");
      const gender = params.get("gender");
      const category = params.get("category");
      const price = params.get("price");

      const newQueryParams = { brand, size, colour, gender, category, price };
      setQueryParams(newQueryParams);

      await fetchShoes(newQueryParams);

    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchSearchedProducts();
  }, [searchQuery]);

  /**
   * Retrieves shoes based on input query params (URL or RefineSearch)
   * @param {Object{}} queryParams
   */
  const fetchShoes = async (queryParams) => {
    try {
      const results = await ProductServices.fetchShoes(queryParams);
      console.log(results);
      setResults(results);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  /**
   * Takes current_filter input from RefineSearch and places in URL searchs for products
   * @param {string} current_filter
   * @param {string} value
   */
  const addFilter = async (current_filter, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(current_filter, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.location.href = newUrl;
  };

  /**
   * event handler used to handle pagination
   * @param {*} event
   */
  const handlePageChange = (event) => {
    setCurrentPage(event.page + 1);
  };

  const fetchSearchedProducts = async () => {
    // won't run unless a search term has been entered
    if (searchQuery.trim() === "") return;

    try {
      if (searchQuery) {
        const result = await ProductServices.getProductsFiltered({
          name: searchQuery,
        }); // sets the search term as the "name" parameter

        if (result && result.data) {
          setResults(result.data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center xl:pl-96 md:pl-72 ">
        <h1 className="text-5xl font-signika-negative text-custom-black font-bold italic">
          Search Shoes
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8 px-8">
        <div
          id="filters"
          className="h-full lg:w-1/4 flex flex-col justify-center"
        >
          <SideBarV2 addFilter={addFilter} filters={queryParams} />
        </div>

        <div id="search-results" className="w-full p-4 rounded-md">
          <div>
            <div id="search-header" className="flex justify-center h-16">
              <SearchBar setSearchQuery={setSearchQuery} />
            </div>
          </div>

          <div className="text-center p-10">
            Showing {1 + (currentPage - 1) * 20}-
            {20 + (1 + (currentPage - 1) * 20)} of {results?.length || 0}{" "}
            Result(s) found
          </div>

         {
            results?.length == 0 &&
              <div className="flex w-full h-full items-center justify-center">
                <img src="/spinner.svg" alt="Loading..." />
              </div>
          }
          
          {results != null && (
            <div id="products">
              <div>
                <ProductList products={results} currentPage={currentPage} />
              </div>
              {results != null && results?.length > 0 && (
                <Paginator
                  first={0}
                  rows={20}
                  totalRecords={results?.length}
                  onPageChange={handlePageChange}
                  page={currentPage - 1}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
