import { faShoppingBasket, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ShoeView from "../ui/ShoeView";
import Loading from "../ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartService from "@/services/cartServices";
import OrderSummaryInfo from "../ui/OrderSummaryInfo";
import ShoePlaceholder from "../../public/4413 Shoe Pics/NIKE+AIR+MAX+270+WHITE+1.png"
import Image from "next/image";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from "@/lib/utils";

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

    const proceedToCheckout = async () => {
      const response = await CartService.proceedToCheckout()
      if (response) {
        window.location.href = '/checkout'
      } else {
        toast.error('Please Login / Sign-up to Continue')
      }
    }

    const clearCart = async () => {
        const response = await CartService.clearCart()
        if (response.data.message)
          toast.error(response.data.message)
        else 
          toast.success('Cart cleared')

        setCart(response.data.data)
        window.location.reload()
    }

    const IsLoggedIn = () => {
        const token = getToken()
        if (token == "undefined")
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
                    onClick={proceedToCheckout}
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
    
  function CartViewSummary() {
    return (
      <div id="CartViewSummary" className="h-full">

        <div id="list-of-items" className={`overflow-y-scroll my-8 ${cart?.length > 1 ? 'h-[500px]' : 'h-fit'}`}>
        {
          cart?.map((shoe, i) => {

            return (
              <div key={i} className="flex flex-row justify-between border shadow-md rounded-md my-4">

                <div id="Product" className="w-2/3 flex flex-row justify-start items-center align-middle p-4 gap-4">
                  <Image
                    src={ShoePlaceholder} // TODO: Replace with shoe.image
                    alt={shoe.colour}
                    className="border shadow-sm rounded-md"
                    width={192}
                    height={192}
                  />

                  <div id="Info" className="">
                    <a className="font-bold text-2xl flex flex-row gap-2 items-center align-middle" href={`/showView?id=${shoe._id}`}>{shoe?.name}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" className="text-blue-500"/>
                    </a>
                    <h4 className="text-sm font-thin mb-2">{shoe?.brand}</h4>
                    <h2>
                      {shoe?.colour} | {shoe?.gender} | {shoe?.size}
                    </h2>
                    <h2>Category: <span>{shoe?.category}</span></h2>
                  </div>
                </div>


                <div id="PriceInfo" className="flex flex-col w-1/4 margin-auto text-left justify-center items-center align-middle">
                  <div>
                    <h1 className="font-bold text-2xl">${(shoe?.price * shoe?.qty)?.toFixed(2).toLocaleString()}</h1>
                    <h2>
                      <p>Shoe Price: ${shoe?.price}</p>
                      <p>Qty: {shoe?.qty}</p>
                    </h2>
                  </div>
                </div>


              </div>
            )

          })
        }
        </div>

        <div className="flex flex-col shadow-md">
          <p className="flex flex-row justify-between border text-2xl p-4 rounded-t-md">
            <span>Subtotal:</span>
            <span>${total?.toFixed(2).toLocaleString()}</span>
          </p>
          <p className="flex flex-row justify-between border-x text-2xl p-4">
            <span>GST/HST:</span>
            <span>${gst?.toFixed(2).toLocaleString()}</span>
          </p>
          <p className="flex flex-row justify-between border text-2xl p-4 rounded-b-md text-blue-500">
            <span>Total: </span>
            <span>${estTotal?.toFixed(2).toLocaleString()}</span>
          </p>
        </div>


      </div>
    )
  }
    
  return (
      <>
          {
              mini && CartViewSummary()
          }

          {
              !mini && CartViewList()
          } 
      </>
  )
}