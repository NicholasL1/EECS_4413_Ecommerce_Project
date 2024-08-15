"use client";

import CustomersDashboard from "../../components/admin/CustomersDashboard";
import OrderDashboard from "../../components/admin/OrderDashboard";
import InventoryDashboard from "../../components/admin/InventoryDashboard";
import React, { useState } from "react";
import { isAdmin } from "@/lib/utils";
import AccessDenied from "@/components/AccessDenied";
import SalesDashboard from "@/components/admin/SalesDashboard";

function page() {

  if (!isAdmin()) {
    return <AccessDenied/>  
  }

  const menu_items = ['Inventory', 'Orders', 'Sales', 'Customers']
  const dashboard_mapping = {
    'Inventory': <InventoryDashboard/>,
    'Orders': <OrderDashboard/>,
    'Customers': <CustomersDashboard/>,
    'Sales': <SalesDashboard/>
  }

  const [selected_item, setSelectedItem] = useState(menu_items[3])

  const DashboardMenu = (menu_items) => {

    return (
      <div id="DashboardMenu" className="w-1/12 border h-fit rounded-md shadow-sm bg-white">
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

  return (
    <div id="container" className="">
      <h2 className="m-4 font-bold text-3xl">Admin Dashboard</h2>

      <div className="flex justify-items-center align-middle p-4">
        {DashboardMenu(menu_items)}
        {dashboard_mapping[selected_item]}
      </div>
    </div>
  )  
}

export default page;