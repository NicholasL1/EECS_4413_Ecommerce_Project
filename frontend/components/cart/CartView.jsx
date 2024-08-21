import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ShoeView from "../ui/ShoeView";
import Loading from "../ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartView({mini = false, cart = []}) {

    if (!cart) {
        return <Loading/>
    }

    /**
     * @param {number[]} cart
     * @returns 
     */
    function getTotal() {
        let total = 0
        cart.forEach((item) => {
            total += item.qty * item.price
        })
        return total
    }

    function CartViewList() {
        return (
            <div id="container" className="flex flex-row justify-between gap-4 w-full mb-4">
                <div id="cart_view_scrollable" className="w-full flex justify-items-center align-middle">
                    {
                        cart?.map((shoe, i) => {
                            return (
                                    <ShoeView shoe={shoe} key={i} className="border shadow-sm rounded-sm mb-4"/>
                            )
                        })
                    }
                </div>

                <div id="order_summary_container" className="w-1/2 h-fit border shadow-md bg-white rounded-sm">
                    {
                        // check for sign-in, refer to cart page on footlocker
                    }

                    <div id="order_summary" className="h-fit p-4 flex flex-col">
                        <header className="font-bold text-2xl text-custom-black">Order Summary</header>
                        <hr />
                        
                        <div className="py-2 text-lg flex-grow">
                            <div className="">
                                <p className="flex justify-between my-4">
                                    <span>
                                        <span>Subtotal</span> 
                                        <span className="mx-1">({cart?.length} {cart?.length > 1 ? 'items' : 'item'}):</span> 
                                    </span>
                                    <span>${getTotal().toLocaleString()}</span>                    
                                </p>
                            </div>
                            <div className="flex justify-between my-2">
                                <span>HST/GST:</span>
                                <span>${(getTotal() * .13).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between my-2 font-semibold">
                                <span>Estimated Total:</span>
                                <span>${(getTotal() * 1.13).toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <button className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-full text-lg">
                            <span className="mr-2">Checkout</span>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </button>

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