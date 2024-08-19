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


// Checkout
export default function page() {
    
    const [cart, setCart] = useState(null)
    const [label, setLabel] = useState(null)
  
    const [showContact, setShowContact] = useState(true)
    const [editContact, setEditContact] = useState(false)

    const [showShipping, setShowShipping] = useState(false)
    const [editShipping, setEditShipping] = useState(true)

    const [showPayment, setShowPayment] = useState(false)
    const [editPayment, setEditPayment] = useState(true)

    const [showReview, setShowReview] = useState(false)
    const [editReview, setEditReview] = useState(true)


    const handleShowContact = () => {
        if (showShipping) {
            return
        } else {
            setShowContact(false)
            setEditContact(true)
            setShowShipping(true)
            setEditShipping(false)
        }
        /*
        debugger
        if (showContact) {
            setShowContact(false)
            setEditContact(true)

            setShowShipping(false)
            setEditShipping(true)

            setShowPayment(false)
            setEditPayment(true)
            
            setShowReview(false)
        } else {
            setShowContact(false)
            setEditContact(true)

            setShowShipping(false)
            setEditShipping(true)

            setShowPayment(false)
            setEditPayment(true)
            
            setShowReview(false)
        }*/
    }

    const handleEditContact = () => {
        if (showShipping) {
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
            setShowPayment(true)
        }
    }

    const handleEditShipping = () => {
        if (!showContact) {
            setShowShipping(true)
            setEditShipping(false)
        }
    }

    const getUserInfo = () => {
        const token = JSON.parse(localStorage.getItem('Authorization'))
        const response = userServices.getUser(token)
        console.log(response)
    }

    const getCart = async () => {
        const response = await CartService.getCart()
        console.log(response)
        setCart(response)
        if (response === null) {
            setLabel('Empty Cart... nothing to see here')
        }
    }
  
    useEffect(() => {
        // getCart()
    }, [])
    
    useEffect(() => {
        getUserInfo()
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
                    />

                    <Shipping
                        showShipping={showShipping}
                        handleShowShipping={handleShowShipping}
                        handleEditShipping={handleEditShipping}
                        editShipping={editShipping}
                    />

                    <PaymentSelection showPayment={showPayment}/>

                </div>

                <div id="order-summary-info" className="w-full h-fit md:w-1/2 lg:w-1/3 p-4 border shadow-md rounded-md">
                    <OrderSummaryInfo cart={cart?.items} total={cart?.total} gst={cart?.gst} estTotal={cart?.estTotal} onCheckout={true}/>
                    <Link
                    className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-full text-lg hover:bg-gray-600 flex items-center justify-center"
                    href='/checkout'
                  >
                    <span className="mr-2">Place Order</span>
                    <FontAwesomeIcon icon={faTruck} />
                  </Link>
                </div>
            </div>
        </div>
    )
}