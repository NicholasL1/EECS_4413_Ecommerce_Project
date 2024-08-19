import Link from "next/link"

/*
ToDo
- add link for edit payments
*/

export default function PaymentSelection({showPayment}) {


    return (
       
       <div className="border shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold ">3. Payment</h1>
            <hr />
            
            <div className="my-2">
                <Link
                    className="p-2 border border-custom-black font-bold text-custom-black rounded-md shadow-md w-full text-lg hover:bg-gray-100 flex items-center justify-center"
                    href='/payments'
                >
                    {
                        showPayment &&
                        <span>Add/Edit Payment Method</span>
                    }

                    {
                        !showPayment &&
                        <span>Default Payment Method: </span>
                    }
                    
                </Link>
            </div>


        </div>
    )
}