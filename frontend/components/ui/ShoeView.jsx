import ReviewStars from "../ui/ReviewStars";

export default function ShoeView({shoe, adminView}) {
    return (
        <div id="shoe_info" className="flex w-fit">
            <div>
                <img src="" alt="img" width='256px' height='256px' className="border border-red-500"/>
            </div>
            <div className="flex flex-col justify-between h-full w-fit p-4">
                <div>
                    <h1 className="font-bold text-2xl">{shoe.name}</h1>
                    <h4 className="text-sm font-thin mb-2">{shoe.brand}</h4>
                    <h2 className="text-md">
                        {shoe.colour} | {shoe.gender} | {shoe.size}
                    </h2>
                    <h2> Category: <span>{shoe.category}</span></h2>
                    
                    {
                        adminView && 
                        <h2> 
                            Stock: <span>{shoe.stock}</span>
                            {
                                shoe.stock < 20 &&
                                <span className="p-1 mx-2 text-sm font-bold text-white rounded-md bg-orange-500">Low Stock</span>
                            }
                        </h2>
                    }
                    
                    {
                        !adminView && 
                        <h2> 
                            Quantity: <span>{shoe.qty || 'N/A'}</span>
                        </h2>
                    }
                    
                    <h2> Sale Price: $<span>{shoe.price.toLocaleString()}</span></h2>
                    <ReviewStars rating={shoe.rating}/>
                </div>
            </div>
        </div>
    )
}