import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan} from "@fortawesome/free-solid-svg-icons";

import ReviewStars from "../ui/ReviewStars";
import CartService from "@/services/cartServices";
import Loading from "./Loading";

export default function ShoeView({shoe, adminView}) {

    if (!shoe)
        return <Loading />

    const removeFromCart = async (shoe_id) => {
        const confirmOption = confirm('Are you sure you want to remove this item from your cart?')
        
        if (!confirmOption) return
        debugger
        await CartService.removeFromCart(shoe_id)
        window.location.reload()
    }

    const updateQuantity = async (qty, shoe_id) => {
        if (qty?.length === 0) {
            qty = 0
        }

        const response = await CartService.updateQuantity(qty, shoe_id)
        if (response.data.message) {
            alert(response.data.message)
        }
        window.location.reload()
    }

    return (
      <>
        <div id="shoe_info" className="flex flex-col sm:flex-row w-full mb-4 rounded-md border bg-white">
          <div className=" w-full md:w-1/3 flex justify-center md:justify-start ">
            <img 
              src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6d4c9304-2078-4f17-b5de-0282180af1e8/AIR+JORDAN+1+MID+SE.png" 
              alt="img" 
              className="w-auto h-auto object-contain"
            />
          </div>
        <div className="flex-1 p-4 flex flex-col border">
          <div className="flex flex-row justify-between items-center w-full mb-4">
            <h1 className="font-bold text-2xl">{shoe?.name}</h1>
            <button 
              onClick={() => {removeFromCart(shoe?._id)}} 
              className="w-8 h-8 rounded-sm shadow-sm bg-custom-red text-white hover:bg-red-700 hover:shadow-md"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>

          <h4 className="text-sm font-thin mb-2">{shoe?.brand}</h4>
          <h2 className="text-md">
            {shoe?.colour} | {shoe?.gender} | {shoe?.size}
          </h2>
          <h2>Category: <span>{shoe?.category}</span></h2>
          <h2>Sale Price: $<span>{shoe?.price?.toLocaleString()}</span></h2>
      
          {adminView && (
            <div>
              <h2>
                Stock: <span>{shoe?.stock}</span>
                {shoe.stock < 20 && (
                  <span className="p-1 mx-2 text-sm font-bold text-white rounded-md bg-orange-500">Low Stock</span>
                )}
              </h2>
              <ReviewStars rating={shoe?.rating} />
            </div>
          )}
      
          {!adminView && (
            <div className="flex flex-row justify-between w-full">
              <div>
                <label htmlFor="qty">Qty:</label>
                <input 
                  type="number" 
                  min={1} 
                  max={shoe?.stock} 
                  step={1} 
                  defaultValue={shoe?.qty} 
                  onBlur={(e) => {updateQuantity(e.target.value, shoe?._id)}} 
                  className="w-24 pl-2 border border-gray-500 rounded-md mx-2"
                />
              </div>
            </div>                        
          )}
        </div>
      </div>
    </>

  )
}