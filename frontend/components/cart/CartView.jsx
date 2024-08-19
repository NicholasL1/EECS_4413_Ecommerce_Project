import { faArrowRight, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ShoeView from "../ui/ShoeView";
import Loading from "../ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartService from "@/services/cartServices";
import OrderSummaryInfo from "../ui/OrderSummaryInfo";
import Link from "next/link";

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

    const IsLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem('Authorization'))
        if (token == null)
          return (
              <div className="border rounded-md shadow-md p-3 mb-4 text-sm">
                  <FontAwesomeIcon icon={faUser} className="mr-1"/>
                  <a href="/login" className="text-blue-500">Login</a> / <a href="/signup" className="text-blue-500">Create an account</a> to checkout
              </div>
          )
    }

    function CartViewList() {
        return (
        <div id="container" className="flex flex-col md:flex-row justify-between gap-4 w-full mb-4">
          <div id="cart_view_scrollable" className="flex-1 overflow-auto">
            {cart?.map((shoe, i) => (
              <ShoeView shoe={shoe} key={i} className="border shadow-sm rounded-sm mb-4" />
            ))}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            {IsLoggedIn()}
            <div id="order_summary_container" className="w-full h-fit border shadow-md bg-white rounded-md">
              <div id="order_summary" className="h-fit p-4 flex flex-col">
                
                <OrderSummaryInfo cart={cart} total={total} gst={gst} estTotal={estTotal} />

                <div id="action_center" className="flex flex-col space-y-2">
                  <button
                    onClick={clearCart}
                    className="text-custom-red text-left font-semibold underline mb-1"
                  >
                    Clear cart
                  </button>

                  <Link
                    className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-full text-lg hover:bg-gray-600 flex items-center justify-center"
                    href='/checkout'
                  >
                    <span className="mr-2">Checkout</span>
                    <FontAwesomeIcon icon={faShoppingBasket} />
                  </Link>
                </div>
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