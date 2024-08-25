"use client";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import UserService from "../../services/userServices";
import Loading from "@/components/ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSitemap,
  faUser,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { getToken } from "@/lib/utils";

const UserOrdersPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const token = getToken();
        if (token == "undefined") {
          setFeedbackMessage("No authentication token found. Please log in.");
        }

        const result = await UserService.GetUserOrders(token);
        setSearchResults(result.data || []);
        setFeedbackMessage(result.message || "");
      } catch (err) {
        console.error("Error in component while fetching user orders:", err);
        setFeedbackMessage(
          "An unexpected error occurred. Please try again later."
        );
      } finally {
        setLoaded(true);
      }
    };
    getUserOrders();
  }, []);

  return (
    <>
      {!loaded && <Loading />}

      {loaded && (
        <div className="h-full w-5/6 m-auto p-8 rounded-md shadow-md font-signika-negative bg-white">
          <p className="font-medium text-3xl">
            Your Orders: {searchResults?.length}
          </p>
          <hr className="my-3" />
          {searchResults.length > 0 ? (
            <DataTable
              stripedRows
              value={searchResults}
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={8}
              rowsPerPageOptions={[5, 10, 25]}
            >
              <Column field="_id" header="Order ID"></Column>
              <Column
                field="date"
                sortable
                header="Date"
                body={DateComponent}
              />
              <Column field="shoes" header="Shoes" body={ShoeDisplay} />
              <Column
                field="total"
                sortable
                header="Total"
                body={(rowData) => `$${rowData.total}`}
              />
            </DataTable>
          ) : (
            <div> </div>
          )}
        </div>
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
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return (
      <span>
        {`${year}-${formattedMonth}-${formattedDay} ${hours}:${minutes}`}
      </span>
    );
  } else {
    return <span>Invalid Date</span>;
  }
};

const ShoeDisplay = (rowData) => {
  const [shoeDetails, setShoeDetails] = useState({});

  if (!shoeDetails) return <Loading />;

  useEffect(() => {
    const getShoeData = async () => {
      if (rowData && rowData.shoes) {
        const shoeMap = {};
        try {
          for (const shoeId in rowData.shoes) {
            const shoeData = await UserService.GetShoeById(shoeId);
            shoeMap[shoeId] = shoeData;
          }
          console.log(shoeMap);
        } catch (err) {
          console.error("Error fetching shoe details:", err);
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
    <div className="flex flex-col gap-2">
      {Object.entries(rowData.shoes).map(([shoeId, shoeData]) => (
        <div key={shoeId} className="p-2 text-left">
          <div className="flex flex-row gap-2 justify-start">
            <span className="font-light">
              {shoeDetails[shoeId]?.data?.brand}:{" "}
            </span>
            <a
              href={`/shoeView?id=${shoeId}`}
              className="flex flex-row gap-1 items-center underline text-blue-500"
            >
              {shoeData.qty} x {shoeDetails[shoeId]?.data?.name} @ $
              {shoeDetails[shoeId]?.data?.price} each
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-blue-500"
                size="sm"
              />
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">
              Size: {shoeDetails[shoeId]?.data?.size} | Colour:{" "}
              {shoeDetails[shoeId]?.data?.colour} | Gender:{" "}
              {shoeDetails[shoeId]?.data?.gender}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrdersPage;
