import { faArrowRight, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ShoeView from "../ui/ShoeView";
import Loading from "../ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartService from "@/services/cartServices";
import OrderSummaryInfo from "../ui/OrderSummaryInfo";
import { jwtDecode } from "jwt-decode";
import userServices from "@/services/userServices";

export default function CartView({mini = false, cart = [], total, gst, estTotal, setCart}) {
    if (cart == null) {
        return <Loading/>
    }

    if (cart.length === 0) {
        return (
          <p className="text-center flex-col gap-2">
            <span className="block">Oops! Looks like you haven't chosen any shoes yet.</span>
            <span>Browse our <a href="/" className="text-blue-500 font-medium underline"> products</a> and view it right here in your cart!</span>   
          </p>
        )
    }

    const isTokenExpired = () => {
      const token = JSON.parse(sessionStorage.getItem('Authorization'))
      if (!token) return true
      
      try {
        const decodedToken = jwtDecode(token)
        const exp = decodedToken.exp
        const currentTime = Math.floor(Date.now() / 1000)
        return exp < currentTime
      } catch (error) {
        console.error('Error decoding token:', error)
        return true
      }
    }

    const proccedToCheckout = async () => {
      if (isTokenExpired()) {
        alert('Please Login/SignUp to continue to checkout')
        window.location.href = '/signup'
      } else {
        window.location.href = '/checkout'
      }

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
        const token = JSON.parse(sessionStorage.getItem('Authorization'))
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

                  <button
                    className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-full text-lg hover:bg-gray-600 flex items-center justify-center"
                    onClick={proccedToCheckout}
                  >
                    <span className="mr-2">Checkout</span>
                    <FontAwesomeIcon icon={faShoppingBasket} />
                  </button>
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