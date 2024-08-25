import userServices from "@/services/userServices";
import { useState } from "react";
import { getToken } from "@/lib/utils";

export default function Shipping({showShipping, editShipping, handleShowShipping, handleEditShipping, address}) {

    const parsingAddress = () => {
        const x = address?.split(', ')

        if (!x) return

        const newAddress = {
            unit: x[0]?.substring(0, x[0].indexOf(' ')).trim(),
            street_address: x[0]?.substring(x[0].indexOf(' ') + 1, x[0].length).trim(),
            city: x[1]?.trim(),
            province: x[2]?.split(' ')[0],
            postal_code: x[2]?.split(' ')[1]
        }

        address = newAddress
    }

    parsingAddress()

    const provinces = [{ name: "Alberta", abrv: "AB" }, { name: "British Columbia", abrv: "BC" }, { name: "Manitoba", abrv: "MB" }, { name: "New Brunswick", abrv: "NB" }, { name: "Newfoundland and Labrador", abrv: "NL" }, { name: "Nova Scotia", abrv: "NS" }, { name: "Ontario", abrv: "ON" }, { name: "Prince Edward Island", abrv: "PE" }, { name: "Quebec", abrv: "QC" }, { name: "Saskatchewan", abrv: "SK" }, { name: "Northwest Territories", abrv: "NT" }, { name: "Nunavut", abrv: "NU" }, { name: "Yukon", abrv: "YT" }];
    const getProvince = (p) => {
        return provinces.find(prov => p === prov.abrv)?.name;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target)
        const formData = new FormData(e.target)
        const formObj = Object.fromEntries(formData.entries())

        for (const[key, value] of Object.entries(formObj)) {
            if (key == 'postal_code') continue
            formObj[key] = value.split(' ').map(w => {return w.charAt(0).toUpperCase() + w.substring(1, w.length)}).join(' ')
        }

        const full_address = `${formObj['unit']} ${formObj['street_address']}, ${formObj['city']}, ${formObj['province']}, ${formObj['postal_code']}`
        const token = getToken()
        await userServices.UpdateUser({address: full_address})
        handleShowShipping(false)
    }
    
    return (
        <div className="border shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold ">2. Shipping</h1>
            <hr />

            {
                !showShipping && editShipping &&
                <div className="my-2">
                    <p className="font-semibold">4700 Steeles, York University, A1B 2C3</p>
                    <p className="mb-2">Ammad Qureshi</p>
                    <button
                        onClick={handleEditShipping}
                        className="p-2 border border-custom-black font-bold text-custom-black rounded-md shadow-md w-full text-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                        Edit
                    </button>
                </div>
            }

            {
                showShipping && 
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-8 my-4">
                            <div className="  flex flex-col w-1/2 my-2">
                                <label htmlFor="street_address" className="text-xl">Street Addess*</label>
                                <input name="street_address" type="text" defaultValue={address?.street_address} className="border rounded-sm p-2 bg-gray-200" required/>
                            </div>
                            <div className="  flex flex-col w-1/2 my-2">
                                <label htmlFor="unit" className="text-xl">Apt/Unit No.*</label>
                                <input name="unit" type="text" defaultValue={address?.unit} className="border rounded-sm p-2 bg-gray-200" required/>
                            </div>
                        </div>

                        <div className="flex flex-row gap-8 my-4">
                            <div className="  flex flex-col w-1/2 my-2">
                                <label htmlFor="postal_code" className="text-xl">Postal Code*</label>
                                <input name="postal_code" type="text" defaultValue={address?.postal_code} className="border rounded-sm p-2 bg-gray-200" required/>
                            </div>
                            <div className="  flex flex-col w-1/2 my-2">
                                <label htmlFor="city" className="text-xl">City</label>
                                <input name="city" type="text" defaultValue={address?.city} className="border rounded-sm p-2 bg-gray-200" required/>
                            </div>
                            <div className="  flex flex-col w-1/2 my-2">
                                <label htmlFor="province" className="text-xl">Province</label>
                                <select name="province" id="" defaultValue={getProvince(address?.province)} className="border rounded-sm p-3 bg-gray-200"required>
                                    {
                                        provinces.map((p, i) => {
                                            return <option value={p.abrv} key={i}>{p.name}</option>
                                        })
                                    }
                                </select>
                                {/* <input name="province" type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"required/> */}
                            </div>
                        </div>
                    
                        <div className="flex flex-row justify-start mt-8">
                            <button 
                                className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                                type="submit"
                            >
                                Save & Continue
                            </button>
                        </div>
                    </form>
                </div>
            }

        </div>
    )
}