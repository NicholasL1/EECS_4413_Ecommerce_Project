"use client";
import { useEffect, useState } from "react"
import userServices from "@/services/userServices"
import CartService from "@/services/cartServices"
import OrderSummaryInfo from "@/components/ui/OrderSummaryInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {faCcVisa, faCcMastercard, faApplePay, faCcPaypal} from "@fortawesome/free-brands-svg-icons"
import PaymentServices from "@/services/paymentServices";

export default function page() {

    const [user, setUser] = useState(null)
    const [cart, setCart] = useState(null)
    const [address, setAddress] = useState(null)
    const [checkoutStatus, setCheckoutStatus] = useState({contact: false, shipping: false, payment: false})
    const [addNewPayment, setAddNewPayment] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)

    const [checkoutSave, setCheckoutSave] = useState(false)
    const [shippingSave, setShippingSave] = useState(false)
    const [paymentSave, setPaymentSave] = useState(false)


    const provinces = [{ name: "Alberta", abrv: "AB" }, { name: "British Columbia", abrv: "BC" }, { name: "Manitoba", abrv: "MB" }, { name: "New Brunswick", abrv: "NB" }, { name: "Newfoundland and Labrador", abrv: "NL" }, { name: "Nova Scotia", abrv: "NS" }, { name: "Ontario", abrv: "ON" }, { name: "Prince Edward Island", abrv: "PE" }, { name: "Quebec", abrv: "QC" }, { name: "Saskatchewan", abrv: "SK" }, { name: "Northwest Territories", abrv: "NT" }, { name: "Nunavut", abrv: "NU" }, { name: "Yukon", abrv: "YT" }];
    const getProvince = (p) => {
        return provinces.find(prov => p === prov.abrv)?.name;
    };

    const parsingAddress = (a) => {
        const x = a?.split(', ')

        if (!x) return

        const newAddress = {
            unit: x[0]?.substring(0, x[0].indexOf(' ')).trim(),
            street_address: x[0]?.substring(x[0].indexOf(' ') + 1, x[0].length).trim(),
            city: x[1]?.trim(),
            province: x[2]?.split(' ')[0],
            postal_code: x[2]?.split(' ')[1]
        }

        setAddress(newAddress)
    }

    const getUserInfo = async () => {
        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        const response = await userServices.getUser(token)
        setUser(response)
        parsingAddress(response.address)
    }

    const getCart = async () => {
        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        const response = await CartService.getCart()
        setCart(response)
    }  

    useEffect(() => {
        getUserInfo()
        getCart()
    }, [])

    //#region Submission calls

    const handleContactSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObj = Object.fromEntries(formData.entries())

        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        await userServices.updateUser(token, formObj)
        handleCheckoutStatus('contact', true)
        setCheckoutSave(true)
    }

    const handleShippingSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObj = Object.fromEntries(formData.entries())

        for (const[key, value] of Object.entries(formObj)) {
            if (key == 'postal_code') continue
            formObj[key] = value.split(' ').map(w => {return w.charAt(0).toUpperCase() + w.substring(1, w.length)}).join(' ')
        }

        const full_address = `${formObj['unit']} ${formObj['street_address']}, ${formObj['city']}, ${formObj['province']}, ${formObj['postal_code']}`
        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        await userServices.updateUser(token, {address: full_address})
        handleCheckoutStatus('shipping', true)
        setShippingSave(true)
    }

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData.entries());
        
        const expiry_date_regex = /^\d{2}\/\d{2}$/
        const card_number_regex = /^\d{16}$/
        const cvc_regex = /^\d{3}$/

        const {card_number, cvc, expiry_date} = formObj

        if (!expiry_date_regex.test(expiry_date))
            return alert('Please enter the Date in MM/YY format')

        if (!card_number_regex.test(card_number))
            return alert('Please enter your Card number (16 digits)')

        if (!cvc_regex.test(cvc)) 
            return alert('Please enter your CVC number (3 digits)')

        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        const response = await PaymentServices.addPaymentMethod(token, formObj)
        console.log(response)
        setPaymentMethod(response.data.message._id)
        handleCheckoutStatus('payment', true)
        setPaymentSave(true)
    }

    const selectPaymentSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData.entries());
        setPaymentMethod(formObj.payment_method)
        handleCheckoutStatus('payment', true)
        setPaymentSave(true)
    }

    //#endregion

    //#region Save Indicators
    
    useEffect(() => {
        // Create a timeout ID reference
        const timeouts = [];

        // Set timeouts only if the save states are true
        if (checkoutSave) {
            const checkoutTimeout = setTimeout(() => {
                setCheckoutSave(false);
            }, 3000);
            timeouts.push(checkoutTimeout);
        }

        if (shippingSave) {
            const shippingTimeout = setTimeout(() => {
                setShippingSave(false);
            }, 3000);
            timeouts.push(shippingTimeout);
        }

        if (paymentSave) {
            const paymentTimeout = setTimeout(() => {
                setPaymentSave(false);
            }, 3000);
            timeouts.push(paymentTimeout);
        }

        // Cleanup function to clear all timeouts
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [checkoutSave, shippingSave, paymentSave, setCheckoutSave, setShippingSave, setPaymentSave]);

    //#endregion

    //#region Validations

    const isExpired = (date) => {
        const [_month, _year] = date.split('/').map(Number);
        const currDate = new Date();
        const currYear = currDate.getFullYear() % 100; // Get last two digits of the year
        const currMonth = currDate.getMonth() + 1;
        return _year < currYear || (_year === currYear && _month < currMonth);
    };

    const handleCheckoutStatus = (label, value) => {
        const x = checkoutStatus
        x[label] = value
        setCheckoutStatus({...x})
    }

    const canPlaceOrder = () => {
        return checkoutStatus.contact && checkoutStatus.payment && checkoutStatus.shipping
    }

    const checkout = async () => {
        if (!canPlaceOrder()) {
            return alert('Cannot place order yet. please fill all feilds')
        }

        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        const response = await CartService.checkout(token, paymentMethod)
        console.log(response)
        alert(response.data.message)
        window.location.href = '/'
    }

    //#endregion

    const generateCardIcon = () => {
        const icons = [faCcMastercard, faCcPaypal, faCcVisa, faApplePay]
        return icons[Math.floor(Math.random() * 4)]
    }

    const genRandColor = () => {
        const col = ['#6290C8', '#FF6F59', '#F4B860', '#7AE582']
        return col[Math.floor(Math.random() * 4)]
    }


    return (

        <div className=" sm:mx-32 md:mx-48 lg:mx-64 p-4 sm:p-6 md:p-8 lg:p-10 mb-10 font-signika-negative shadow-md rounded-md bg-white">

            <h1 className="block text-3xl mb-4 font-bold">Checkout</h1>

            {
                (cart == null || cart.length == 0) && 
                <p className="text-center flex-col gap-2">
                    <span className="block">Hey! You have to add some shoes to your cart, silly.</span>
                    <span>Check out some kicks <a href="/" className="text-blue-500 font-medium underline">here</a>.</span>   
                </p>
            }

            {
                !(cart == null || cart.length == 0) &&  

                <div className="flex justify-between">
                    <div id="forms">
                        <div id="contact" className="border shadow-md rounded-md p-4">
                            <h1 className="text-2xl font-bold ">1. Contact</h1>
                            <form onSubmit={handleContactSubmit}>
                                <div className="flex flex-row gap-8 my-4">
                                    <div className="  flex flex-col w-1/2 my-2">
                                        <label htmlFor="first_name" className="text-xl">First Name*</label>
                                        <input name="first_name" type="text" defaultValue={user?.first_name} className="border rounded-sm p-2 bg-gray-200"/>
                                    </div>
                                    <div className="  flex flex-col w-1/2 my-2">
                                        <label htmlFor="last_name" className="text-xl">Last Name*</label>
                                        <input name="last_name" type="text" defaultValue={user?.last_name} className="border rounded-sm p-2 bg-gray-200"/>
                                    </div>
                                </div>
                                <div className="  flex flex-col w-full my-4">
                                    <label htmlFor="email" className="text-xl">Email*</label>
                                    <input name="email" type="email" defaultValue={user?.email} className="border rounded-sm p-2 bg-gray-200"/>
                                </div>
                                <div className="flex flex-row justify-between items-center align-middle mt-8">
                                    <button 
                                        className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                                        type="submit"
                                    >
                                        Save & Continue
                                    </button>

                                    {
                                        checkoutSave && 
                                        <div className="flex flex-row gap-2 justify-center align-middle items-center">
                                            <span className="text-lg">Saved</span>
                                            <FontAwesomeIcon size="xl" className="text-green-500" icon={faCheckCircle}/>
                                        </div>
                                    }

                                </div>
                            </form>
                        </div>

                        <div id="shipping" className="border shadow-md rounded-md p-4 my-4">
                            <h1 className="text-2xl font-bold ">2. Shipping</h1>
                            <form onSubmit={handleShippingSubmit}>
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
                                    </div>
                                </div>
                            
                                <div className="flex flex-row justify-between mt-4">
                                    <button 
                                        className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                                        type="submit"
                                    >
                                        Save & Continue
                                    </button>

                                    {
                                        shippingSave && 
                                        <div className="flex flex-row gap-2 justify-center align-middle items-center">
                                            <span className="text-lg">Saved</span>
                                            <FontAwesomeIcon size="xl" className="text-green-500" icon={faCheckCircle}/>
                                        </div>
                                    }
                                </div>
                            </form>
                        </div>

                        <div id="payment-selection" className="border shadow-md rounded-md p-4 my-4">
                            <div id="header" className="flex justify-between">
                                <h1 className="text-2xl font-bold ">3. Payment</h1>
                                <button onClick={() => {setAddNewPayment(!addNewPayment)}} className="text-blue-500 font-medium">
                                    {
                                        addNewPayment ? 'View Existing Payment Methods ' : 'Add New Payment Method'
                                    }
                                </button>
                            </div>

                            {
                                addNewPayment &&   
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="flex flex-col w-full my-4">
                                        <label htmlFor="card_number" className="text-xl">
                                            Card Number*
                                        </label>
                                        <input
                                            name="card_number"
                                            type="text"
                                            placeholder=""
                                            className="border rounded-sm p-2 bg-gray-200" required
                                        />
                                    </div>
                                    <div className="flex flex-row gap-8 my-4">
                                        <div className="flex flex-col w-1/2 my-2">
                                            <label htmlFor="cvc" className="text-xl">
                                                CVC*
                                            </label>
                                            <input
                                                name="cvc"
                                                type="text"
                                                className="border rounded-sm p-2 bg-gray-200" required
                                            />
                                        </div>
                                        <div className="flex flex-col w-1/2 my-2">
                                            <label htmlFor="expiry_date" className="text-xl">
                                                Expiry Date*
                                            </label>
                                            <input
                                                name="expiry_date"
                                                type="text"
                                                className="border rounded-sm p-2 bg-gray-200" required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-between">
                                        <button
                                            className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                                            type="submit"
                                        >
                                            Save & Continue
                                        </button>

                                        {
                                            paymentSave && 
                                            <div className="flex flex-row gap-2 justify-center align-middle items-center">
                                                <span className="text-lg">Saved</span>
                                                <FontAwesomeIcon size="xl" className="text-green-500" icon={faCheckCircle}/>
                                            </div>
                                        }
                                    </div>
                                </form>
                            }

                            {
                                !addNewPayment && 
                                <form id="select_payment" className="block" onSubmit={selectPaymentSubmit}>
                                    <span>Select a Payment Method</span>
                                    <div className="flex overflow-x-scroll w-[650px] gap-2 py-4 mb-8">
                                    {
                                        user?.payment_info?.map((method, i) => (
                                            <div key={i} className="min-w-48">
                                                <div id="card" style={{ backgroundColor: genRandColor() }} className="rounded-md shadow-md flex flex-row justify-between p-2 ">
                                                    <div className="w-1/3 ">
                                                        <FontAwesomeIcon size="2xl" className="text-left" icon={generateCardIcon()}/>
                                                        <p className="flex flex-col justify-end">{method.cvc}</p>
                                                    </div>

                                                    <div className="text-right w-fit flex flex-col justify-between">
                                                        <p>**** {method.card_number ? method.card_number.slice(-4) : 'N/A'}</p>
                                                        <p>Exp: {method.expiry_date}</p>
                                                    </div>
                                                </div>

                                                <div id="action">
                                                {
                                                    isExpired(method.expiry_date) ? 
                                                    <span className="ml-2 text-custom-red">Expired</span>
                                                    :
                                                    <div className="flex flex-row gap-2 ml-2">
                                                        <input type="radio" name="payment_method" value={method._id} required/>
                                                        <label htmlFor="payment_method">Select</label>
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                            )
                                        )
                                    }
                                    </div>
                                    
                                    <div className="flex flex-row justify-between">

                                        <button
                                            className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                                            type="submit"
                                            >
                                            Save & Continue
                                        </button>

                                        {
                                            paymentSave && 
                                            <div className="flex flex-row gap-2 justify-center align-middle items-center">
                                                <span className="text-lg">Saved</span>
                                                <FontAwesomeIcon size="xl" className="text-green-500" icon={faCheckCircle}/>
                                            </div>
                                        }
                                    </div>

                                </form>
                            }
                        </div>
                    </div>

                    <div id="order-summary-info" className="w-full h-fit md:w-1/2 lg:w-1/3 p-4 border shadow-md rounded-md">
                        <OrderSummaryInfo cart={cart?.items} total={cart?.total} gst={cart?.gst} estTotal={cart?.estTotal} onCheckout={true}/>
                        <button
                            className={`${canPlaceOrder() ? '' : 'bg-gray-200'} p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-full text-lg hover:bg-gray-600 flex items-center justify-center`}
                            onClick={checkout}
                        >           
                            <span className="mr-2">Place Order</span>
                            <FontAwesomeIcon icon={faTruck} />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}