export default function Contact({showContact, handleShowContact, editContact, handleEditContact}) {
    return (
        <div className="border shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold ">1. Contact</h1>
            <hr />

            {
                !showContact && editContact &&
                <div className="my-2">
                    <p className="font-semibold">Ammad Qureshi</p>
                    <p className="mb-2">ammad@mail.com</p>
                    <button
                        onClick={handleEditContact}
                        className="p-2 border border-custom-black font-bold text-custom-black rounded-md shadow-md w-full text-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                        Edit
                    </button>
                </div>
            }

            {
                showContact && 
                <div>
                    <div className="flex flex-row gap-8 my-4">
                        <div className="  flex flex-col w-1/2 my-2">
                            <label htmlFor="first_name" className="text-xl">First Name*</label>
                            <input type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"/>
                        </div>
                        <div className="  flex flex-col w-1/2 my-2">
                            <label htmlFor="first_name" className="text-xl">Last Name*</label>
                            <input type="text" defaultValue={'ammad'} className="border rounded-sm p-2 bg-gray-200"/>
                        </div>
                    </div>

                    <div className="  flex flex-col w-full my-4">
                        <label htmlFor="email" className="text-xl">Email*</label>
                        <input type="email" defaultValue={'ammad@mail.com'} className="border rounded-sm p-2 bg-gray-200"/>
                    </div>
                
                    <div className="flex flex-row justify-start mt-8">
                        <button 
                            className="p-2 bg-custom-black font-bold text-white rounded-md shadow-md w-1/3 text-lg hover:bg-gray-600 flex items-center justify-center"
                            onClick={handleShowContact}
                        >
                            Save & Continue
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}