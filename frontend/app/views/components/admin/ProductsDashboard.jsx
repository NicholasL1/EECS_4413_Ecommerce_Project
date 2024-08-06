import React, { useEffect, useState } from "react";

import ProductEditModal from "./ProductEditModal";
import AddProductModal from "./AddProductModal";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';

import { faMagnifyingGlass, faCirclePlus, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import AdminServices from "./adminServices";

export default function ProductsDashboard() {
  
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS }
    });
    const [search_results, setSearchResults] = useState([])

    const [newProductInfo, setNewProductInfo] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowEditModal = (product) => {
        setNewProductInfo(product)
        setShowEditModal(true)
    }

    const GetAllProducts = async () => {
        try {
            const response = await AdminServices.GetAllProducts()
            setSearchResults(response.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        GetAllProducts()
    }, [])

    const RowActions = (rowData) => {
        const btn_style = `block h-[32px] w-full my-2 p-1 text-sm text-center rounded-md shadow-sm text-white font-bold` 
        return (
            <div className="justify-center align-middle text-center">
                <button onClick={() => handleShowEditModal(rowData)} className={`${btn_style} bg-[#272f29]`}>
                    <FontAwesomeIcon icon={faEdit} size="md"/>
                </button>
                <button onClick={() => {RemoveProduct(rowData)}} className={`${btn_style} bg-[#dd2c2c]`}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        )
    }

    const ProductIDcomponent = (rowData) => {
        return (
            <div className="">
                <a href="" className=" text-xs">{rowData._id}</a>
            </div>  
        )
    }

    const RemoveProduct = async (rowData) => {
        const confirmation = confirm('Are you sure you want to remove this product?')
        if (confirmation) {
            await AdminServices.RemoveProduct(JSON.parse(localStorage.getItem('Authorization')), rowData._id)
            window.location.reload()
        }
    }

    return (
        
        <div id="ProductsDashboard" className="h-full w-full ml-4 p-4 border border-gray-300 rounded-md">
            
            <h2 className="text-lg font-medium">Products</h2>

            <div id="ProductSearch" className="flex py-2 my-2 justify-between align-middle">
                <InputText 
                    onInput={(e) => setFilters({
                        global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                    })}
                    placeholder="Search Inventory"
                    className="h-[48px] w-1/3 p-4 rounded-s-md border border-[#272f29]"
                />   

                <button onClick={() => {setShowAddModal(true)}} className="w-[48px] h-[48px] rounded-md shadow-md bg-[#272f29] text-white">
                    <FontAwesomeIcon icon={faCirclePlus} size="xl"/>
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
                    <Column field="_id" header="Product ID" body={ProductIDcomponent} sortable/>
                    <Column field="brand" header="Brand" sortable/>
                    <Column field="size" header="Size" sortable/>
                    <Column field="name" header="Name" sortable/>
                    <Column field="colour" header="Colour" sortable/>
                    <Column field="gender" header="Gender" sortable/>
                    <Column field="stock" header="Stock" sortable/>
                    <Column field="price" header="Price" sortable/>
                    <Column field="rating" header="Rating" sortable/>
                    <Column field="category" header="Category" sortable />
                    <Column header="Actions" body={RowActions}/>
                </DataTable>
            </div>

            <AddProductModal showModal={showAddModal} setShowModal={setShowAddModal}/>
            <ProductEditModal showModal={showEditModal} setShowModal={setShowEditModal} product={newProductInfo}/>
            
            

        </div>
    )  
}