"use client"

import CartView from "@/components/cart/CartView"
import CreditCart from "@/components/ui/CreditCart"
import { useEffect, useState } from "react"
import CartService from "@/services/cartServices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/ui/Loading"
import AccessDenied from "@/components/AccessDenied"
import { isAdmin, getToken } from "@/lib/utils"

export default function Page() {

    const [showSummary, setShowSummary] = useState(true)
    const [showPayment, setShowPayment] = useState(false)
    const [showDelivery, setShowDelivery] = useState(false)

    const [cart, setCart] = useState(null)
    const [payment, setPayment] = useState(null)
    const [delivery, setDelivery] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(true) // Loading state

    const fetch = async () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("orderId");
            setOrderId(id)

            const token = getToken()
            const orderInfo = await CartService.getOrderSummary(id, token)

            console.log(orderInfo)

            const items = []
            const cart_info = CartService.transformCart(items, orderInfo?.cart)
            cart_info.items = items

            setCart(cart_info)
            setDelivery(orderInfo.delivery)
            setPayment(orderInfo.payment)
        } catch (error) {
            console.error("Error fetching order information:", error)
        } finally {
            setIsLoading(false) // Set loading to false after data is fetched
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        console.log(cart)
    }, [cart])

    //#region State handlers

    const handleShowSummary = () => {
        setShowSummary(true)
        setShowDelivery(false)
        setShowPayment(false)
    }

    const handleShowPayment = () => {
        setShowPayment(true)
        setShowDelivery(false)
        setShowSummary(false)
    }

    const handleShowDelivery = () => {
        setShowDelivery(true)
        setShowPayment(false)
        setShowSummary(false)
    }

    //#endregion

    if ((!payment || !cart || !delivery) && !isLoading) {
        return <AccessDenied />
    }

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className=" sm:mx-32 md:mx-48 lg:mx-64 p-4 sm:p-6 md:p-8 lg:p-10 mb-10 font-signika-negative shadow-md rounded-md bg-white">
            <h1 className="block text-3xl font-bold">Order Summary</h1>
            <span className="font-normal">Order ID: {orderId}</span>

            <p className="text-lg my-4">Thank you for ordering from 6ixKicks 🎉</p>

            <div className="flex flex-row my-4">
                <div id="nav-links" className="flex flex-row w-fit">
                    <button onClick={handleShowSummary} className={`${showSummary ? 'bg-blue-500 font-bold text-lg text-white rounded-t-md' : 'border-b-2 border-blue-500'}  h-full px-4`}>Summary</button>
                    <button onClick={handleShowPayment} className={`${showPayment ? 'bg-blue-500 font-bold text-lg  text-white rounded-t-md' : 'border-b-2 border-blue-500'}  h-full px-4`}>Payment</button>
                    <button onClick={handleShowDelivery} className={`${showDelivery ? 'bg-blue-500 font-bold text-lg text-white  rounded-t-md' : 'border-b-2 border-blue-500'} h-full px-4`}>Delivery</button>
                </div>
                <div className="w-full border-b-2 border-blue-500"></div>
            </div>
            <div>
                {showSummary && (
                    <CartView
                        cart={cart?.items}
                        total={cart?.total}
                        gst={cart?.gst}
                        estTotal={cart?.estTotal}
                        mini={true}
                    />
                )}

                {showPayment && (
                    <div className="mt-8 w-64 flex flex-col gap-4">
                        <CreditCart card={payment} />
                        <a href="/" className="flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faEdit}/>
                            <span>Edit Payment Method(s)</span>
                        </a>
                    </div>
                )}

                {showDelivery && (
                    <div className="mt-8 mb-4">
                        <p className="flex flex-row justify-between border border-b-0 text-2xl p-4 rounded-t-md">
                            <span>Address </span>
                            <span>{delivery?.address}</span>
                        </p>
                        <p className="flex flex-row justify-between border text-2xl p-4 rounded-b-md">
                            <span>Contact </span>
                            <span>{delivery?.email}</span>
                        </p>

                    </div>
                )}
            </div>
            <div className="flex text-center pt-2">
                <a href="/shoes" className="p-4 mt-4 flex gap-4 justify-center text-xl items-center border bg-custom-black text-white rounded-md w-full text-center">
                    <span>Continue Shopping</span>
                    <FontAwesomeIcon icon={faShoppingBag}/>
                </a>
            </div>
        </div>
    )
}
