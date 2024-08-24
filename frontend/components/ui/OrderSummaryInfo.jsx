export default function OrderSummaryInfo ({cart = [], total = 0, gst = 0, estTotal = 0, onCheckout = false}) {
    
  const onCheckoutCss = 'p-4 border shadow-sm'
  
  return (
        <div id="order_summary_info" className={`bg-white h-fit flex flex-col w-full rounded-md`}> 
          <header className="font-bold text-2xl text-custom-black ">Order Summary</header>
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
        </div>
    )
}