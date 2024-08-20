import userServices from "@/services/userServices"

export default function Contact({showContact, handleShowContact, editContact, handleEditContact, user}) {
    
    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObj = Object.fromEntries(formData.entries())

        const token = JSON.parse(sessionStorage.getItem('Authorization'))
        await userServices.updateUser(token, formObj)
        handleShowContact(false)
    }
    
    
    return (
            <div className="border shadow-md rounded-md p-4">
                <h1 className="text-2xl font-bold ">1. Contact</h1>
                <hr />
                {
                    !showContact && editContact &&
                    <div className="my-2">
                        <p className="font-semibold">{user?.first_name + ' ' + user?.last_name}</p>
                        <p className="mb-2">{user?.email}</p>
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
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-8 my-4">
                                <div className="  flex flex-col w-1/2 my-2">
                                    <label htmlFor="first_name" className="text-xl">First Name*</label>
                                    <input name="first_name" type="text" defaultValue={user?.first_name} className="border rounded-sm p-2 bg-gray-200"/>
                                </div>
                                <div className="  flex flex-col w-1/2 my-2">
                                    <label htmlFor="last_name" className="text-xl">Last Name*</label>
                                    <input name="last_name" type="text" defaultValue={user?.last_name} className="border rounded-sm p-2 bg-gray-200"/>
                                </div>
                            </div>
                            <div className="  flex flex-col w-full my-4">
                                <label htmlFor="email" className="text-xl">Email*</label>
                                <input name="email" type="email" defaultValue={user?.email} className="border rounded-sm p-2 bg-gray-200"/>
                            </div>
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
                }
            </div>
    )
}