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
    <>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 p-4 sm:p-6 md:p-8 lg:p-10 mb-10 font-signika-negative shadow-md rounded-md bg-white">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">My Cart</h1>
          <h2 className="text-xl sm:text-2xl font-extralight underline mt-2 sm:mt-0">
            ${cart?.estTotal?.toFixed(2).toLocaleString() || '0.00'}
          </h2>
        </header>
        {label !== null && <p className="text-sm sm:text-base">{label}</p>}
        {label === null && (
          <CartView 
            cart={cart?.items} 
            total={cart?.total?.toFixed(2).toLocaleString()} 
            gst={cart?.gst} 
            estTotal={cart?.estTotal} 
            setCart={setCart} 
          />
        )}
      </div>
    </>
  )
}