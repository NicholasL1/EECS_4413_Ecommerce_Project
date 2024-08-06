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
import EditCustomerModal from "./EditCustomerModal";

export default function CustomersDashboard() {
  
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS }
    });
    const [search_results, setSearchResults] = useState([])

    const [newCustomerInfo, setNewCustomerInfo] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowEditModal = (customer) => {
        setNewCustomerInfo(customer)
        setShowEditModal(true)
    }

    const GetAllCustomers = async () => {
        try {
            const response = await AdminServices.GetAllCustomers(JSON.parse(localStorage.getItem('Authorization')))
            setSearchResults(response.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        GetAllCustomers()
    }, [])

    const RowActions = (rowData) => {
        const btn_style = `block w-full my-2 p-1 text-sm text-center rounded-md shadow-sm` 
        return (
            <div className="justify-center align-middle">
                <button onClick={() => handleShowEditModal(rowData)} className={`${btn_style} bg-[#272f29] text-white font-bold`}>
                    <FontAwesomeIcon icon={faEdit} className="ml-1"/>
                </button>
                <button onClick={() => {RemoveUser(rowData)}} className={`${btn_style} bg-[#dd2c2c] text-white font-bold`}>
                    <FontAwesomeIcon icon={faTrashCan} className="ml-1"/>
                </button>
            </div>
        )
    }

    // ToDo -- Make link go to user's actual page
    const UserIDcomponent = (rowData) => {
        return (
            <div className="">
                <a href="" className=" text-xs">{rowData._id}</a>
            </div>  
        )
    }

    const RemoveUser = async (rowData) => {
        const confirmation = confirm('Are you sure you want to remove this User?')
        if (confirmation) {
            await AdminServices.RemoveUser(JSON.parse(localStorage.getItem('Authorization')), rowData._id)
            window.location.reload()
        }
    }

    return (
        
        <div id="CustomersDashboard" className="h-full w-full ml-4 p-4 border border-gray-300 rounded-md">
            
            <h2 className="text-lg font-medium">Customers</h2>

            <div id="CustomerSearch" className="flex py-2 my-2 justify-between align-middle">
                <InputText 
                    onInput={(e) => setFilters({
                        global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                    })}
                    placeholder="Search Customers"
                    className="h-[48px] w-1/3 p-4 rounded-s-md border border-[#272f29]"
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
                    <Column field="_id" header="User ID" body={UserIDcomponent} sortable/>
                    <Column field="email" header="Email" sortable/>
                    <Column field="first_name" header="First Name" sortable/>
                    <Column field="last_name" header="Last Name" sortable/>
                    <Column field="address" header="Address" sortable/>
                    <Column field="isAdmin" header="Admin Priveleges" sortable/>
                    <Column header="Actions" body={RowActions}/>
                </DataTable>
            </div>

            <AddProductModal showModal={showAddModal} setShowModal={setShowAddModal}/>
            <EditCustomerModal showModal={showEditModal} setShowModal={setShowEditModal} customer={newCustomerInfo}/>
            
            

        </div>
    )  
}