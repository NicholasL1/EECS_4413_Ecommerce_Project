import React, { useEffect, useState } from "react";

import AddProductModal from "./AddProductModal";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArrowUpRightFromSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import AdminServices from "../../services/adminServices";
import EditCustomerModal from "./EditCustomerModal";
import SearchTable from "../ui/SearchTable";
import Loading from "../ui/Loading";

export default function CustomersDashboard() {
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  const [search_results, setSearchResults] = useState([]);
  const [errorLabel, setErrorLabel] = useState(null);

  const [newCustomerInfo, setNewCustomerInfo] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = (customer) => {
    setNewCustomerInfo(customer);
    setShowEditModal(true);
  };

  const GetAllCustomers = async () => {
    try {
      const response = await AdminServices.GetAllCustomers(
        JSON.parse(localStorage.getItem("Authorization"))
      );
      setSearchResults(response.data);
    } catch (err) {
      setErrorLabel(err.message);
      setSearchResults(null);
    }
  };

  useEffect(() => {
    GetAllCustomers();
  }, []);

  const RowActions = (rowData) => {
    const btn_style = `block w-full my-2 p-1 text-sm text-center rounded-md shadow-sm`;
    return (
      <div className="justify-center align-middle">
        <button
          onClick={() => handleShowEditModal(rowData)}
          className={`${btn_style} bg-custom-black text-white font-bold`}
        >
          <FontAwesomeIcon icon={faEdit} className="ml-1" />
        </button>

        {/* <button onClick={() => {RemoveUser(rowData)}} className={`${btn_style} bg-custom-red text-white font-bold`}>
                    <FontAwesomeIcon icon={faTrashCan} className="ml-1"/>
                </button> */}
      </div>
    );
  };

  /**
   * @deprecated
   * @param {*} rowData
   */
  const RemoveUser = async (rowData) => {
    const confirmation = confirm("Are you sure you want to remove this User?");
    if (confirmation) {
      await AdminServices.RemoveUser(
        JSON.parse(localStorage.getItem("Authorization")),
        rowData._id
      );
      window.location.reload();
    }
  };

  return (
    <div
      id="CustomersDashboard"
      className="h-full w-full ml-4 p-4 rounded-md shadow-md bg-white"
    >
      <h2 className="text-3xl font-medium">Customers</h2>
      <hr className="my-3" />

      {errorLabel === null && search_results === null && <Loading />}

      {errorLabel !== null && search_results === null && (
        <div className="text-center">
          <span>{errorLabel}</span>
        </div>
      )}

      {search_results !== null && search_results?.length > 0 && (
        <div>
          <div
            id="CustomerSearch"
            className="flex py-2 my-2 justify-between align-middle"
          >
            <SearchTable
              placeholder={"Search Customers"}
              setFilters={setFilters}
            />
          </div>
          <div id="CustomerResultPage" className="">
            <DataTable
              value={search_results}
              paginator
              rows={5}
              rowsPerPageOptions={[10, 50, 100]}
              stripedRows
              filters={filters}
            >
              <Column
                field="_id"
                header="User ID"
                body={(data) => {
                  return (
                    <div className="flex flex-row align-middle items-center">
                      <a href={`/user/${data._id}`}>{data._id}</a>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="ml-1 mt-1 text-blue-500"
                        size="sm"
                      />
                    </div>
                  );
                }}
                sortable
              />
              <Column field="email" header="Email" sortable />
              <Column field="first_name" header="First Name" sortable />
              <Column field="last_name" header="Last Name" sortable />
              <Column field="address" header="Address" sortable />
              <Column field="isAdmin" header="Admin Priveleges" sortable />
              <Column header="Actions" body={RowActions} />
            </DataTable>
          </div>
          <AddProductModal
            showModal={showAddModal}
            setShowModal={setShowAddModal}
          />
          <EditCustomerModal
            showModal={showEditModal}
            setShowModal={setShowEditModal}
            customer={newCustomerInfo}
          />
        </div>
      )}
    </div>
  );
}
