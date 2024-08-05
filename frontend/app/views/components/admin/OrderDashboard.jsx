import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AdminServices from './adminServices'; // Adjust the path as needed

export default function OrderDashboard() {

    // ToDo -- TEMPORARY -- Remove once this has been implmented in Login and Registration page
    localStorage.setItem('Authorization', JSON.stringify(`
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6WyI2Njk3ZjFjOTM4NDA3MTdiYjI3MGFiNjIiLCI2Njk3ZjFjOTM4NDA3MTdiYjI3MGFiNWYiLCJhZG1pbkBtYWlsLmNvbSIsIiQyYiQxMCQ2bE1pR3M4aG9wWUxWbjMzOTRrdG0ua2pybGtBaVE0VElLQzlBL2FkSXBaVDlzUVp6WHhWZSIsIkFkbWluaXN0cmF0b3IiLCJBY2NvdW50IiwiNDcwMCBLZWVsZSBTdCwgTm9ydGggWW9yaywgT04gTTNKIDFQMyIsdHJ1ZV0sImlhdCI6MTcyMjg4MDMxOSwiZXhwIjoxNzI1NDcyMzE5fQ.RpQm5S1j6AQwQX0T5Hch55foN2bq4kYFiRwMKqukIQc
        `));


    //#region States
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS }
    });

    const [searchResults, setSearchResults] = useState([]);
    const [showNoOrdersLbl, setShowNoOrdersLbl] = useState(false)
    //#endregion

    //#region On Mount Functions
    const getAllOrders = async () => {
        const token = JSON.parse(localStorage.getItem('Authorization'));
        try {
            const results = await AdminServices.GetAllOrders(token);
            if (results.data.length === 0) {
                setShowNoOrdersLbl(true)
            } else {
                setSearchResults(results.data);
            }
        } catch (err) {
            console.error(err.message);
            setSearchResults([]);
        }
    };
    //#endregion

    useEffect(() => {
        getAllOrders();
    }, []); 
    
    //#region Child Components
    const OrderIDComponent = (rowData) => {
        return <a href={`Order/${rowData.order.order_id}`}>{rowData.order.order_id}</a>
    }

    const TotalComponent = (rowData) => {
        return <span>${rowData.order.total}</span>
    }

    const DateComponent = (rowData) => {
        const date = new Date(rowData.order.date);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        return <span>{formattedMonth}-{formattedDay}-{year}</span>;
    }

    const ShoeDisplay = (rowData) => {
        return (
            <div className="">
                {
                    rowData.shoes.map((shoe, i) => {
                        return (
                            <div className="p-2 pl-0">
                                <a href={`Order/${shoe.shoe._id}`} className="block underline text-blue-600">{shoe.qty} x {shoe.shoe.name} @ ${shoe.shoe.price}</a>
                                <span className="text-sm">Size {shoe.shoe.size} | Colour: {shoe.shoe.colour} | Gender: {shoe.shoe.gender}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    //#endregion

    return (
        <div id="OrdersDashboard" className="h-full w-full ml-4 p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-medium">Orders</h2>
            <div id="OrderSearch" className="flex h-[64px] w-1/3 my-2 py-2 justify-center align-middle">
                <InputText 
                    onInput={(e) => setFilters({
                        global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                    })}
                    placeholder="Search Inventory"
                    className="w-full p-4 rounded-s-md border border-[#272f29]"
                />                
            </div>
            {
                searchResults.length > 0 && 
                <DataTable 
                    value={searchResults} 
                    paginator 
                    rows={5} 
                    rowsPerPageOptions={[10, 50, 100]}
                    stripedRows
                    filters={filters}
                >
                    <Column field="order.order_id" header="ID" body={OrderIDComponent} sortable className="align-top"/>
                    <Column field="user.email" header="User Email" sortable className="align-top"/>
                    <Column field="order.date" header="Date" body={DateComponent} sortable className="align-top"/>
                    <Column field="shoes" header="Details" body={ShoeDisplay} sortable/>
                    <Column field="order.total" header="Total" body={TotalComponent} sortable />
                </DataTable>
            }
            {
                showNoOrdersLbl && 
                <div className="text-center">
                    <span>No Orders Have Been Placed Yet</span>
                </div>
            }
            {
                searchResults.length === 0 && !showNoOrdersLbl && 
                <div className="text-center">
                    <span>Loading...</span>
                </div>

            }
        </div>
    );
}