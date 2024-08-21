import CartService from "@/services/cartServices";
import { useEffect } from "react";

export default function page() {
    
    const getCart = async () => {
        const response = await CartService.getCart()
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div>
            Cart Page
        </div>
    )
}