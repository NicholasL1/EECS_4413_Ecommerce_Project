"use client"

import CartView from "@/components/cart/CartView";
import CartService from "@/services/cartServices";
import { useEffect, useState } from "react";

export default function page() {

    const [cart, setCart] = useState(null)
    const [label, setLabel] = useState(null)

    const getCart = async () => {
        const response = await CartService.getCart()
        console.log(response)
        setCart(response)
        if (response === null) {
            setLabel('Empty Cart... nothing to see here')
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className="mx-56 p-8 font-signika-negative shadow-md rounded-md bg-white">
            <header className="flex flex-row justify-between align-middle mb-6">
                <h1 className="text-3xl font-bold">My Cart</h1>
                <h2 className="text-2xl font-extralight underline">${cart?.estTotal.toLocaleString() || '0.00'}</h2>
            </header>

            {
                label !== null &&
                <p>{label}</p>
            }

            {
                label === null && 
                <CartView cart={cart?.items} total={cart?.total} gst={cart?.gst} estTotal={cart?.estTotal} setCart={setCart}/>
            }

        </div>
    )
}