export default function Shipping({showShipping, editShipping, handleShowShipping, handleEditShipping}) {
    return (
        <div className="border shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold ">2. Shipping</h1>
            <hr />

            {
                !showShipping && editShipping &&
                <div className="my-2">
                    <p className="font-semibold">4700 Steeles, York University, A1B 2C3</p>
                    <p className="mb-2">Ammad Qureshi</p>
                    <button
                        onClick={handleEditShipping}
                        className="p-2 border border-custom-black font-bold text-custom-black rounded-md shadow-md w-full text-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                        Edit
                    </button>
                </div>
            }

            {
                showShipping && 
                <div>
                    <div className="flex flex-row gap-8 my-4">
                        <div className="  flex flex-col w-1/2 my-2">
                            <label htmlFor="first_name" className="text-xl">Street Addess*</label>
                            <input type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"/>
                        </div>
                        <div className="  flex flex-col w-1/2 my-2">
                            <label htmlFor="first_name" className="text-xl">Apt/Unit No.*</label>
                            <input type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"/>
                        </div>
                    </div>

                    <div className="flex flex-row gap-8 my-4">
                        <div className="  flex flex-col w-1/2 my-2">
                            <label htmlFor="first_name" className="text-xl">Postal Code*</label>
                            <input type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"/>
                        </div>
                        <div className="  flex flex-col w-1/2 my-2">
                            <label htmlFor="first_name" className="text-xl">City</label>
                            <input type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"/>
                        </div>
                        <div className="  flex flex-col w-1/2 my-2">
                            <label htmlFor="first_name" className="text-xl">Province</label>
                            <input type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"/>
                        </div>
                    </div>
                
                    <div className="flex flex-row justify-start mt-8">
                        <button 
                            className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                            onClick={handleShowShipping}
                        >
                            Save & Continue
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}