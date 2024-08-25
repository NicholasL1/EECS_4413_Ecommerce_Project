import React, { useEffect, useState } from "react";

import AddProductModal from "./AddProductModal";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {
  faCirclePlus,
  faEdit,
  faTrashCan,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import AdminServices from "../../services/adminServices";
import EditProductModal from "./EditProductModal";
import SearchTable from "../ui/SearchTable";
import Loading from "../ui/Loading";
import { getToken } from "@/lib/utils";

export default function InventoryDashboard() {
  //#region States
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  const [search_results, setSearchResults] = useState(null);
  const [newProductInfo, setNewProductInfo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [errorLabel, setErrorLabel] = useState(null);

  const handleShowEditModal = (product) => {
    setNewProductInfo(product);
    setShowEditModal(true);
  };
  //#endregion

  //#region On Mount functions
  const GetAllProducts = async () => {
    try {
      const response = await AdminServices.GetAllProducts();
      setSearchResults(response.data);
    } catch (err) {
      setErrorLabel(err.message);
      setSearchResults(null);
    }
  };

  useEffect(() => {
    GetAllProducts();
  }, []);
  //#endregion

  //#region Components
  const RowActions = (rowData) => {
    const btn_style = `block h-[32px] w-full my-2 p-1 text-sm text-center rounded-md shadow-sm text-white font-bold`;
    return (
      <div className="justify-center align-middle text-center">
        <button
          onClick={() => handleShowEditModal(rowData)}
          className={`${btn_style} bg-custom-black`}
        >
          <FontAwesomeIcon icon={faEdit} size="md" />
        </button>
        <button
          onClick={() => {
            RemoveProduct(rowData);
          }}
          className={`${btn_style} bg-custom-red`}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    );
  };

  const ProductIDcomponent = (rowData) => {
    return (
      <div className="">
        <a href={`/shoeView?id=${rowData._id}`} className=" text-xs">
          {rowData._id}
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="ml-1 mt-1 text-blue-500"
            size="sm"
          />
        </a>
      </div>
    );
  };

  const RemoveProduct = async (rowData) => {
    const confirmation = confirm(
      "Are you sure you want to remove this product?"
    );
    if (confirmation) {
      await AdminServices.RemoveProduct(
        getToken(),
        rowData._id
      );
      window.location.reload();
    }
  };
  //#endregion

  return (
    <div
      id="ProductsDashboard"
      className="h-full w-full ml-4 p-4 shadow-md rounded-md bg-white"
    >
      <h2 className="text-3xl font-medium">Inventory</h2>
      <hr className="my-3" />

      {errorLabel === null && search_results === null && <Loading />}

      {errorLabel !== null && search_results === null && (
        <div className="text-center">
          <span>{errorLabel}</span>
        </div>
      )}

      {search_results !== null && search_results.length > 0 && (
        <div>
          <div
            id="ProductSearch"
            className="flex py-2 my-2 justify-between align-middle"
          >
            <SearchTable
              placeholder={"Search Inventory"}
              setFilters={setFilters}
            />
            <button
              onClick={() => {
                setShowAddModal(true);
              }}
              className="h-[48px] w-[96px] px-4 rounded-md shadow-md bg-custom-black text-white"
            >
              Add <FontAwesomeIcon icon={faCirclePlus} size="lg" />
            </button>
          </div>
          <div id="ProductResultPage" className="">
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
                header="Product ID"
                body={ProductIDcomponent}
                sortable
              />
              <Column field="brand" header="Brand" sortable />
              <Column field="size" header="Size" sortable />
              <Column field="name" header="Name" sortable />
              <Column field="colour" header="Colour" sortable />
              <Column field="gender" header="Gender" sortable />
              <Column
                field="stock"
                header="Stock"
                body={(rowData) => <p>{rowData.stock.toLocaleString()}</p>}
                sortable
              />
              <Column
                field="price"
                header="Price"
                body={(rowData) => <p>${rowData.price.toLocaleString()}</p>}
                sortable
              />
              <Column
                field="rating"
                header="Rating"
                body={(rowData) => <p>{rowData.rating.toFixed(1)}/5</p>}
                sortable
              />
              <Column field="category" header="Category" sortable />
              <Column header="Actions" body={RowActions} />
            </DataTable>
          </div>
          <AddProductModal
            showModal={showAddModal}
            setShowModal={setShowAddModal}
          />
          <EditProductModal
            showModal={showEditModal}
            setShowModal={setShowEditModal}
            product={newProductInfo}
          />
        </div>
      )}
    </div>
  );
}
