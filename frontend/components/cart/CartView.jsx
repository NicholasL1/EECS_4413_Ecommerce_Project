import { faArrowRight, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import ShoeView from "../ui/ShoeView";
import Loading from "../ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartService from "@/services/cartServices";

export default function CartView({mini = false, cart = [], total, gst, estTotal, setCart}) {
    if (cart == null) {
        return <Loading/>
    }

    if (cart.length === 0) {
        return <p className="text-center">Find something interesting? Add it to your cart and view it here!</p>
    }

    const clearCart = async () => {
        const response = await CartService.clearCart()
        if (response.data.message) 
            alert(response.data.message)
        else
            alert('Cart cleared')

        setCart(response.data.data)
        window.location.reload()
    }


    function CartViewList() {
        return (
            <div id="container" className="flex flex-row justify-between gap-4 w-full mb-4">
                <div id="cart_view_scrollable" className="w-full justify-items-center align-middle">
                    {
                        cart?.map((shoe, i) => {
                            return (
                                <ShoeView shoe={shoe} key={i} className="border shadow-sm rounded-sm mb-4"/>
                            )
                        })
                    }
                </div>

                <div id="order_summary_container" className="w-1/2 h-fit border shadow-md bg-white rounded-md">
                    {
                        // check for sign-in, refer to cart page on footlocker
                    }

                    <div id="order_summary" className="h-fit p-4 flex flex-col">
                        <header className="font-bold text-2xl text-custom-black">Order Summary</header>
                        <hr />
                        
                        <div className="py-1 text-lg flex-grow">
                            <div className="">
                                <p className="flex justify-between my-4">
                                    <span>
                                        <span>Subtotal</span> 
                                        <span className="mx-1">({cart?.length} {cart?.length > 1 ? 'items' : 'item'}):</span> 
                                    </span>
                                    <span>${total?.toLocaleString()}</span>                    
                                </p>
                            </div>
                            <div className="flex justify-between my-2">
                                <span>HST/GST:</span>
                                <span>${gst?.toLocaleString()}</span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-xl py-2 my-2 font-semibold">
                                <span>Estimated Total:</span>
                                <span>${estTotal?.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div id="action_center">

                            <div>
                                <button 
                                onClick={clearCart}
                                 className="text-custom-red font-semibold underline mb-1">Clear cart</button>
                            </div>

                            <button 
                                className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-full text-lg hover:bg-gray-600">
                                <span className="mr-2">Checkout</span>
                                <FontAwesomeIcon icon={faShoppingBasket}/>
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        )    
    }
    
    function CartViewMini() {

    }
    
    return (
        <>
            {
                mini && CartViewMini()
            }

            {
                !mini && CartViewList()
            } 
        </>
    )
}