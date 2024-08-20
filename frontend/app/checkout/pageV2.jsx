import { use, useEffect, useState } from "react"
import userServices from "@/services/userServices"
import CartService from "@/services/cartServices"
import OrderSummaryInfo from "@/components/ui/OrderSummaryInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTruck } from "@fortawesome/free-solid-svg-icons";
import PaymentSelection from "@/components/checkout/PaymentSelection";
import PaymentServices from "@/services/paymentServices";

export default function PageV2() {

    const [user, setUser] = useState(null)
    const [cart, setCart] = useState(null)
    const [address, setAddress] = useState(null)
    const [checkoutStatus, setCheckoutStatus] = useState({contact: false, shipping: false, payment: false})
    const [addNewPayment, setAddNewPayment] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)

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
        setUser(response?.data?.message)
        parsingAddress(user?.address)
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

    const handleCheckoutStatus = (label, value) => {
        const x = checkoutStatus
        x[label] = value
        setCheckoutStatus({...x})
    }

    const canPlaceOrder = () => {
        return checkoutStatus.contact && checkoutStatus.payment && checkoutStatus.shipping
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObj = Object.fromEntries(formData.entries())

        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        await userServices.updateUser(token, formObj)
        handleCheckoutStatus('contact', true)
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
    }

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData.entries());
        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        const response = await PaymentServices.addPaymentMethod(token, formObj)
        console.log(response)
        setPaymentMethod(response.data.message._id)
        handleCheckoutStatus('payment', true)
    }

    const selectPaymentSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData.entries());
        setPaymentMethod(formObj.payment_method)
        handleCheckoutStatus('payment', true)
    }

    const isExpired = (date) => {
        const [_month, _year] = date.split('/').map(Number);
        const currDate = new Date();
        const currYear = currDate.getFullYear() % 100; // Get last two digits of the year
        const currMonth = currDate.getMonth() + 1;
        return _year < currYear || (_year === currYear && _month < currMonth);
    };

    const checkout = async () => {
        if (!canPlaceOrder()) {
            alert('Cannot place order yet. please fill all feilds')
            return
        }

        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        const response = await CartService.checkout(token, paymentMethod)
        console.log(response)
        alert(response)
        // window.location.href = '/'
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

                        <div id="payment-selection" className="border shadow-md rounded-md p-4 my-4">
                            <div id="header" className="flex justify-between">
                                <h1 className="text-2xl font-bold ">3. Payment</h1>
                                {
                                    (user?.payment_info.length == 0 || user?.payment_info == null) && 
                                    <button onClick={() => {setAddNewPayment(!addNewPayment)}} className="text-blue-500 font-medium">
                                        {
                                            addNewPayment ? 'View Existing Payment Methods ' : 'Add New Payment Method'
                                        }
                                    </button>
                                }
                            </div>

                            {
                                addNewPayment &&   
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="flex flex-row gap-8 my-4">
                                        <div className="flex flex-col w-1/2 my-2">
                                            <label htmlFor="card_number" className="text-xl">
                                                Card Number*
                                            </label>
                                            <input
                                                name="card_number"
                                                type="text"
                                                className="border rounded-sm p-2 bg-gray-200"
                                            />
                                        </div>
                                        <div className="flex flex-col w-1/2 my-2">
                                            <label htmlFor="cvc" className="text-xl">
                                                CVC*
                                            </label>
                                            <input
                                                name="cvc"
                                                type="text"
                                                className="border rounded-sm p-2 bg-gray-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full my-4">
                                        <label htmlFor="expiry_date" className="text-xl">
                                            Expiry Date*
                                        </label>
                                        <input
                                            name="expiry_date"
                                            type="text"
                                            placeholder="MM/YY"
                                            className="border rounded-sm p-2 bg-gray-200"
                                        />
                                    </div>
                                    <div className="flex flex-row justify-start">
                                        <button
                                            className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                                            type="submit"
                                        >
                                            Save & Continue
                                        </button>
                                    </div>
                                </form>
                            }

                            {
                                !addNewPayment && 
                                <form id="select_payment" className="block" onSubmit={selectPaymentSubmit}>
                                    <span>Select a Payment Method</span>
                                    <div className="flex overflow-x-scroll w-[650px] gap-2 py-4">
                                    {
                                        user?.payment_info?.map((method, i) => (
                                            <div key={i} className="border w-96 rounded-sm shadow-sm p-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="radio"
                                                        disabled={isExpired(method.expiry_date)}
                                                        name="payment_method"
                                                        value={method._id}
                                                        required
                                                    />
                                                    <p>Card #{i + 1}</p>
                                                </div>
                                                <p>{method.card_number}</p>
                                                <div className="flex justify-between">
                                                    <p>{method.cvc}</p>
                                                    <p>{method.expiry_date}</p>
                                                </div>
                                                <p className="text-custom-red">
                                                    {isExpired(method.expiry_date) ? "Expired" : ""}
                                                </p>
                                                </div>
                                            )
                                        )
                                    }
                                    </div>
                                    <button
                                        className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                                        type="submit"
                                    >
                                        Save & Continue
                                    </button>
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