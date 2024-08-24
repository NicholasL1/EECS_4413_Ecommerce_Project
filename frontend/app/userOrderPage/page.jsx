"use client";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import UserService from "../../services/userServices";


const UserOrdersPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem("Authorization"));
                if (!token) {
                    setFeedbackMessage('No authentication token found. Please log in.');
                }

                const result = await UserService.GetUserOrders(token);
                setSearchResults(result.data || []);
                setFeedbackMessage(result.message || '');
            } catch (err) {
                console.error('Error in component while fetching user orders:', err);
                setFeedbackMessage('An unexpected error occurred. Please try again later.');
            }
        }
        getUserOrders();
    }, []);

    return (
        <>
            {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
            {searchResults.length > 0 ? (
                <DataTable value={searchResults} tableStyle={{ minWidth: '50rem' }} paginator rows={8} rowsPerPageOptions={[5, 10, 25]} >
                    <Column field="_id" header="Order ID"></Column>
                    <Column field="date" sortable header="Date" body={DateComponent} />
                    <Column field="shoes" header="Shoes" body={ShoeDisplay} />
                    <Column field="total" sortable header="Total" body={(rowData) => `$${rowData.total}`} />
                </DataTable>
            ) : (
                <div> </div>
            )}
        </>
    );
};

const DateComponent = (rowData) => {
    if (rowData && rowData.date) {
        const date = new Date(rowData.date);

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        return (
            <span>
                {`${year}-${formattedMonth}-${formattedDay} ${hours}:${minutes}`}
            </span>
        );
    } else {
        return (
            <span>
                Invalid Date
            </span>
        )
    }




};

const ShoeDisplay = (rowData) => {
    const [shoeDetails, setShoeDetails] = useState({});

    useEffect(() => {
        const getShoeData = async () => {
            if (rowData && rowData.shoes) {
                const shoeMap = {};
                try {
                    for (const shoeId in rowData.shoes) {
                        const shoeData = await UserService.GetShoeById(shoeId);
                        shoeMap[shoeId] = shoeData;
                    }
                    console.log(shoeMap)
                } catch (err) {
                    console.error('Error fetching shoe details:', err);
                }
                setShoeDetails(shoeMap);
            }
        };
        getShoeData();
    }, [rowData]);

    if (!rowData || !rowData.shoes) {
        return <div>No shoe data available</div>;
    }

    return (
        <div>
            {Object.entries(rowData.shoes).map(([shoeId, shoeData]) => (
                <div key={shoeId}>
                    Quantity: {shoeData.qty}
                    , Price: ${shoeData.price}
                    {shoeDetails[shoeId] && (
                        <span>
                            , Name: {shoeDetails[shoeId].data.name || 'N/A'}
                            , Size: {shoeDetails[shoeId].data.size || 'N/A'}
                            , Color: {shoeDetails[shoeId].data.colour || 'N/A'}
                            ,<a href={`http://localhost:3000/shoeView?id=${shoeId}`}>
                                <b>Shoe Link</b>
                            </a>
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserOrdersPage;