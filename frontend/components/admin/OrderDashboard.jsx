import React, { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import AdminServices from "../../services/adminServices";
import Loading from "../ui/Loading";
import SearchTable from "../ui/Loading";

export default function OrderDashboard() {
  //#region States
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });

  const [searchResults, setSearchResults] = useState(null);
  const [label, setLabel] = useState(null);
  const [errorLabel, setErrorLabel] = useState(null);

  //#endregion

  //#region On Mount Functions
  const getAllOrders = async () => {
    const token = JSON.parse(localStorage.getItem("Authorization"));
    try {
      const results = await AdminServices.GetAllOrders(token);
      if (results.data.length === 0) {
        setLabel(results.message);
      } else {
        setSearchResults(results.data);
        setLabel("");
      }
    } catch (err) {
      console.error(err.message);
      setSearchResults(null);
      setLabel(err.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  //#endregion

  //#region Child Components
  const DateComponent = (rowData) => {
    const date = new Date(rowData.order.date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return (
      <span>
        {formattedMonth}-{formattedDay}-{year}
      </span>
    );
  };

  const ShoeDisplay = (rowData) => {
    return (
      <div className="">
        {rowData.shoes.map((shoe, i) => {
          return (
            <div className="p-2 pl-0 pt-0" key={i}>
              <div className="flex flex-row align-middle items-center">
                <a
                  href={`Product/${shoe.shoe._id}`}
                  className="block underline text-blue-600"
                >
                  {shoe.qty} x {shoe.shoe.name} @ ${shoe.shoe.price}
                </a>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="ml-1 mt-1 text-blue-500"
                  size="sm"
                />
              </div>
              <span className="text-sm">
                Size {shoe.shoe.size} | Colour: {shoe.shoe.colour} | Gender:{" "}
                {shoe.shoe.gender}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  //#endregion

  return (
    <div
      id="OrdersDashboard"
      className="h-full w-full ml-4 p-4 rounded-md shadow-md bg-white"
    >
      <h2 className="text-3xl font-medium">Orders</h2>
      <hr className="my-3" />

      {label === null && searchResults === null && <Loading />}

      {label !== null && searchResults === null && (
        <div className="text-center">
          <span>{label}</span>
        </div>
      )}

      {searchResults !== null && (
        <div>
          <div
            id="OrderSearch"
            className="flex my-2 py-2 justify-center align-middle"
          >
            <SearchTable
              placeholder={"Search Orders"}
              setFilters={setFilters}
            />
          </div>
          <DataTable
            value={searchResults}
            paginator
            rows={5}
            rowsPerPageOptions={[10, 50, 100]}
            stripedRows
            filters={filters}
          >
            <Column
              field="order.order_id"
              header="Order ID"
              sortable
              className="align-top"
            />
            <Column
              field="user.email"
              header="Ordered By"
              sortable
              body={(data) => {
                return (
                  <div className="flex flex-row align-middle items-center">
                    <a href={`/user/${data.user._id}`}>{data.user.email}</a>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="ml-1 mt-1 text-blue-500"
                      size="sm"
                    />
                  </div>
                );
              }}
              className="align-top"
            />
            <Column
              field="order.date"
              header="Date (dd-mm-yyyy)"
              body={DateComponent}
              sortable
              className="align-top"
            />
            <Column
              field="shoes"
              header="Details"
              body={ShoeDisplay}
              sortable
            />
            <Column
              field="order.total"
              header="Total"
              body={(data) => <p>${data.order.total.toLocaleString()}</p>}
              sortable
            />
          </DataTable>
        </div>
      )}
    </div>
  );
}
