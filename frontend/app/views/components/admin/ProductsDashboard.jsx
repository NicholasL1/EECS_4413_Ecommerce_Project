import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';

import { faMagnifyingGlass, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function ProductsDashboard() {
  
  
    const search_results = []

    return (
        
        <div id="ProductsDashboard" className="h-full w-full ml-4 p-4 border border-gray-300 rounded-md">
            
            <h2 className="text-lg font-medium">Products</h2>

            <div id="ProductSearch" className="flex h-[64px] w-1/3 py-2 justify-center align-middle">
                <input className="w-full p-4 rounded-s-md border border-[#272f29]" type="text" placeholder="Search Inventory by Name, Brand, Gender, etc"/>
                <button className="w-[64px] rounded-e-md text-sm bg-[#272f29] text-white">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/>
                </button>
            </div>

            <div id="ProductResultPage" className="">
                {
                    search_results.map((data, i) => {
                        return ResultItem(data, i)
                    })
                }

            </div>

            <div id="AddProductRow" className="flex flex-row justify-end">
                <button className="w-[48px] h-[48px] flex justify-center align-middle p-4 rounded-md shadow-md bg-[#272f29] text-white">
                    <FontAwesomeIcon icon={faCirclePlus}/>
                </button>
            </div>

        </div>
    )  
}

const ResultItem = (data, i) => {
    return (
        <div id="ResultItem" key={i}>
            <div id="">
                <img alt="Product Image"></img>
            </div>
            <div id="ResultInfo">
                <p>Result Info</p>
            </div>
            <div id="actions">
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}