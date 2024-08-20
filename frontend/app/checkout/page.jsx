"use client";
import { useState, useEffect } from "react"
import CartView from "@/components/cart/CartView"
import CartService from "@/services/cartServices";
import OrderSummaryInfo from "@/components/ui/OrderSummaryInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTruck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Contact from "@/components/checkout/Contact";
import Shipping from "@/components/checkout/Shipping";
import PaymentSelection from "@/components/checkout/PaymentSelection";
import userServices from "@/services/userServices";
import PaymentServices from "@/services/paymentServices";


// Checkout
export default function page() {
    
    const [cart, setCart] = useState(null)
  
    const [user, setUser] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)

    //#region Edit/Save button states
    const [showContact, setShowContact] = useState(true)
    const [editContact, setEditContact] = useState(false)
    const [showShipping, setShowShipping] = useState(false)
    const [editShipping, setEditShipping] = useState(true)
    const [showPayment, setShowPayment] = useState(false)
    const [editPayment, setEditPayment] = useState(true)


    const handleShowContact = () => {
        console.log(showShipping + ' ' + showPayment)
        if (showShipping || showPayment) {
            return
        } else {
            setShowContact(false)
            setEditContact(true)
            setShowShipping(true)
            setEditShipping(false)
        }
    }

    const handleEditContact = () => {
        if (showShipping || showPayment) {
            return
        }
        else {
            setShowContact(true)
            setEditContact(false)
        }
    }

    const handleShowShipping = () => {
        if (showContact || showPayment) {
            console.log('cant show shipping')
            return
        } else {
            setShowShipping(false)
            setEditShipping(true)
            setShowContact(false)
            setEditContact(true)
            setShowPayment(true)
        }
    }

    const handleEditShipping = () => {
        if (!showContact) {
            setShowShipping(true)
            setEditShipping(false)
        }
    }

    const handleShowPayment = () => {
        if (showPayment) {
            setShowPayment(false)
        }
    }
    //#endregion

    const getUserInfo = async () => {
        const token = JSON.parse(localStorage.getItem('Authorization'))
        const response = await userServices.getUser(token)
        console.log(response)
        setUser(response)
    }

    const getCart = async () => {
        const token = JSON.parse(localStorage.getItem('Authorization'))
        const response = await CartService.getCart()
        setCart(response)
        
    }     

    const checkout = async () => {
        const token = JSON.parse(localStorage.getItem('Authorization'))
        const response = await CartService.checkout(token, paymentMethod)
    }

    useEffect(() => {
        getUserInfo()
        getCart()
    }, [])

    return (
        <div id="checkout-page" className=" sm:mx-32 md:mx-48 lg:mx-64 p-4 sm:p-6 md:p-8 lg:p-10 mb-10 font-signika-negative shadow-md rounded-md bg-white">
            
            <h1 className="block text-3xl mb-4 font-bold">Checkout</h1>


            <div id="container" className="flex flex-col md:flex-row justify-between gap-4 w-full mb-4">
                                
                <div id="order-info-container" className="w-3/4 text-custom-black font-signika-negative flex flex-col gap-4">

                    <Contact 
                        showContact={showContact} 
                        handleShowContact={handleShowContact} 
                        handleEditContact={handleEditContact} 
                        editContact={editContact}
                        user={user}
                    />

                    <Shipping
                        showShipping={showShipping}
                        handleShowShipping={handleShowShipping}
                        handleEditShipping={handleEditShipping}
                        editShipping={editShipping}
                        address={user?.address}
                    />

                    <PaymentSelection 
                        showPayment={showPayment} 
                        paymentMethods={user?.payment_info}
                        setPaymentMethod={setPaymentMethod}
                        setShowPayment={handleShowPayment}
                        setEditPayment={setEditPayment}
                    />

                </div>

                <div id="order-summary-info" className="w-full h-fit md:w-1/2 lg:w-1/3 p-4 border shadow-md rounded-md">
                    <OrderSummaryInfo cart={cart?.items} total={cart?.total} gst={cart?.gst} estTotal={cart?.estTotal} onCheckout={true}/>
                    <button
                        className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-full text-lg hover:bg-gray-600 flex items-center justify-center"
                        onClick={checkout}
                        disabled={(showContact || showPayment || showShipping)}
                    >           
                    <span className="mr-2">Place Order</span>
                    <FontAwesomeIcon icon={faTruck} />
                  </button>
                </div>
            </div>
        </div>
    )
}