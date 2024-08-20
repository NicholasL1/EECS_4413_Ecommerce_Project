import { useState } from "react";

export default function PaymentSelection({ showPayment, paymentMethods, setShowPayment, setPaymentMethod, setEditPayment }) {
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false);

    const selectPaymentSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData.entries());
        setPaymentMethod(formObj.payment_method)
        setShowPayment(false)
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    // Your submit logic here

    setShowPayment(false)

  };

  const handleShowNewPaymentForm = () => {
    setShowNewPaymentForm(!showNewPaymentForm);
  };

  /**
   * Checks if a given date in "MM/YY" format is expired.
   *
   * @param {string} date
   * @returns {boolean} - Returns true if the date is expired
   */
  const isExpired = (date) => {
    const [_month, _year] = date.split('/').map(Number);
    const currDate = new Date();
    const currYear = currDate.getFullYear() % 100; // Get last two digits of the year
    const currMonth = currDate.getMonth() + 1;

    return _year < currYear || (_year === currYear && _month < currMonth);
  };

  return (
    <div className="border shadow-md rounded-md p-4">
      <h1 className="text-2xl font-bold">3. Payment</h1>
      <hr />

      <div className="my-2">
        {!showPayment && 
          <div className="my-2">
            <p className="mb-2">Payment Info</p>
            <button
                onClick={setEditPayment}
                className="p-2 border border-custom-black font-bold text-custom-black rounded-md shadow-md w-full text-lg hover:bg-gray-100 flex items-center justify-center"
            >
                Edit
            </button>
          </div>
        }

        {showPayment && !showNewPaymentForm && (
          <form id="select_payment" className="block" onSubmit={selectPaymentSubmit}>
            <span>Select a Payment Method</span>
            <div className="flex overflow-x-scroll w-[650px] gap-2 py-4">
              {paymentMethods?.map((method, i) => (
                <div key={i} className="border w-96 rounded-sm shadow-sm p-2">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      disabled={isExpired(method.expiry_date)}
                      name="payment_method"
                      value={method._id}
                      required
                    />
                    <p>Card #{i + 1}</p>
                  </div>
                  <p>{method.card_number}</p>
                  <div className="flex justify-between">
                    <p>{method.cvc}</p>
                    <p>{method.expiry_date}</p>
                  </div>
                  <p className="text-custom-red">
                    {isExpired(method.expiry_date) ? "Expired" : ""}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleShowNewPaymentForm}
              className="text-blue-500 w-fit my-2"
            >
              Add New Payment Method
            </button>

            <button
              className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
              type="submit"
            >
              Save & Continue
            </button>
          </form>
        )}

        {showNewPaymentForm && (
          <div id="new_payment">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row gap-8 my-4">
                <div className="flex flex-col w-1/2 my-2">
                  <label htmlFor="card_number" className="text-xl">
                    Card Number*
                  </label>
                  <input
                    name="card_number"
                    type="text"
                    className="border rounded-sm p-2 bg-gray-200"
                  />
                </div>
                <div className="flex flex-col w-1/2 my-2">
                  <label htmlFor="cvc" className="text-xl">
                    CVC*
                  </label>
                  <input
                    name="cvc"
                    type="text"
                    className="border rounded-sm p-2 bg-gray-200"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full my-4">
                <label htmlFor="expiry_date" className="text-xl">
                  Expiry Date*
                </label>
                <input
                  name="expiry_date"
                  type="text"
                  placeholder="MM/YY"
                  className="border rounded-sm p-2 bg-gray-200"
                />
              </div>

                <button
                    type="button"
                    onClick={handleShowNewPaymentForm}
                    className="text-blue-500 w-fit my-2"
                >
                    View Current Payment Methods
                </button>

              <div className="flex flex-row justify-start mt-8">
                <button
                  className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                  type="submit"
                >
                  Save & Continue
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
