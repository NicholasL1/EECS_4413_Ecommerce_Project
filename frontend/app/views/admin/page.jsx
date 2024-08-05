"use client";

import OrderDashboard from "@/components/admin/OrderDashboard";
import ProductsDashboard, {} from "@/components/admin/ProductsDashboard";
import React, { useEffect, useState } from "react";


function page() {

  const menu_items = ['Products', 'Orders', 'Sales', 'Customers']

  //#region Hooks and Handles
  const [selected_item, setSelectedItem] = useState(menu_items[0])
  //#endregion

  useEffect(() => {
    console.log(selected_item)
  }, [selected_item])


  //#region Components
  const DashboardMenu = (menu_items) => {
    return (
      <div id="DashboardMenu" className="w-1/12 border h-fit border-gray-300 rounded-md shadow-sm">
          <ul>
            {
              menu_items.map((item, i) => {
                return (
                  <li key={i} className="w-full p-2 text-center">
                    <button 
                      id={`${item}_btn`}
                      className={`w-full p-2 text-sm font-medium ${item === selected_item ? 'bg-[#dd2c2c] text-white rounded-md shadow-md' : ''}`}
                      onClick={() => {setSelectedItem(item)}}
                      >{item}</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
    )
  }  
  //#endregion

  return (
    <div id="container" className="">
      <h2 className="m-4 font-bold text-3xl">Admin Dashboard</h2>

      <div className="flex justify-items-center align-middle p-4">
        {DashboardMenu(menu_items)}

        {GenerateDashboard(selected_item)}
      </div>

      


    </div>
  )  
}

const GenerateDashboard = (menu_item) => {
  if (menu_item === 'Products') 
    return <ProductsDashboard/>
  else if (menu_item === 'Orders')
    return <OrderDashboard/>
}


export default page;
