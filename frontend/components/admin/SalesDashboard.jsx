import { useEffect, useState } from "react"
import AdminServices from "./adminServices"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faS, faSackDollar , faUsers, faCartShopping, faBoxOpen, faShoppingBag, faUser, faStar, faStarHalf} from '@fortawesome/free-solid-svg-icons'


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS

export default function SalesDashboard () {
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS }
    });

    const [totals_data, setTotalsData] =  useState(null)

    const [showProductSpecific, setShowProductSpecific] = useState(false)
    
    const [productSpecificInfo, setProductSpecificInfo] = useState([])

    const handleShowProductSpecific = (current_tab) => {
        if (current_tab === 'general_sales' && showProductSpecific) {
            setShowProductSpecific(false)
        } else if (current_tab === 'product_stats' && !showProductSpecific) {
            setShowProductSpecific(true)
        }
    }

    const GetIcon = (type) => {
        const style = 'w-[16px] h-[16px] p-2 mr-3 rounded-full text-white shadow-md'
        if (type === 'Total Sales')
            return <FontAwesomeIcon icon={faSackDollar} className={`${style} bg-[#F9C610]`}/>
        else if (type === 'Total Sold')
            return <FontAwesomeIcon icon={faBoxOpen} className={`${style} bg-[#F9844D]`}/>
        else if (type === 'Total Products')
            return <FontAwesomeIcon icon={faShoppingBag} className={`${style} bg-[#FF70BF]`}/>
        else if (type === 'Total Customers')
            return <FontAwesomeIcon icon={faUsers} className={`${style} bg-[#5982C5]`}/>
        else if (type === 'Total Orders')
            return <FontAwesomeIcon icon={faCartShopping} className={`${style} bg-[#6EB257]`}/>

    }

    const fetchData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('Authorization'))
            const response = await AdminServices.GetTotals(token)
            setTotalsData(response.data.totals)
            setProductSpecificInfo(response.data.shoes)
        } catch (err) {

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const ReviewStars = (amt) => {
        const stars = Array(Math.ceil(amt)).fill(null)
        return (
            <div className="flex py-1 justify-start items-center">
                {
                    stars.map((star, i) => {
                        return (
                            <FontAwesomeIcon key={i} icon={i < Math.floor(amt) ? faStar : faStarHalf} size="lg" className={`text-yellow-400 ${i > 1 ? 'mx-1' : 'mr-1'}`}/>
                        )
                    })
                }
                <span className="text-sm font-thin">({amt})</span>
            </div>
        )
    }

    const ShoeView = (product) => {
        return (
            <div id="shoe_info" className="flex w-fit">
                <div>
                    <img src="" alt="img" width='256px' height='256px' className="border border-red-500"/>
                </div>
                <div className="flex flex-col justify-between h-full w-fit p-4">
                    <div>
                        <h1 className="font-bold text-2xl">{product.shoe.name}</h1>
                        <h4 className="text-sm font-thin mb-2">{product.shoe.brand}</h4>
                        <h2 className="text-md">
                            {product.shoe.colour} | {product.shoe.gender} | {product.shoe.size}
                        </h2>
                        <h2> Category: <span>{product.shoe.category}</span></h2>
                        <h2> 
                            Stock: <span>{product.shoe.stock}</span>
                            {
                                product.shoe.stock < 20 &&
                                <span className="p-1 mx-2 text-sm font-bold text-white rounded-md bg-orange-500">Low Stock</span>
                            }
                        </h2>
                        <h2> Sale Price: $<span>{product.shoe.price.toLocaleString()}</span></h2>
                        {ReviewStars(product.shoe.rating)}
                    </div>
                </div>
            </div>
        )
    }

    const OrderedByView = (product) => {
        return (
            <div id="user_info" className="p-2 ">
                <div className="h-[256px] overflow-y-scroll">
                {
                    product.users?.map((user, i) => {
                        return (
                            <div key={i} className="flex justify-start items-center my-3 shadow-sm rounded-sm border border-gray-100 mr-4">
                                <FontAwesomeIcon icon={faUser} size="lg" className="p-2 rounded-full"/> 
                                <div className="flex flex-col space-y-0">
                                    {/* TODO -- Add link to user profile */}
                                    <a href="">
                                        <p className="text-custom-black font-medium p-0 m-0">{user?.first_name + ' ' + user?.last_name}</p>
                                    </a>
                                    <p className="text-gray-500 text-sm p-0 m-0">{user?.email}</p>
                                </div>

                            </div>

                        )
                    })
                }
                </div>
            </div>
        )
    }

    const CashView = (data) => {
        return (
            <p>${data.price.toLocaleString()}</p>
        )
    }

    const SoldView = (data) => {
        return (
            <p>{data.qty.toLocaleString()}</p>
        )
    }

    return (
        <>
            <div id="SalesDashboard" className="h-full w-full ml-4 p-4 shadow-md rounded-md bg-white">
                <h2 className="text-3xl font-medium">Sales</h2>
                <div className="mt-2 flex flex-row gap-4 text-gray-500">
                    <button onClick={() => {handleShowProductSpecific('general_sales')}} className={`${!showProductSpecific ? 'text-blue-500 underline' : ''}`}>General Sales</button>
                    <button onClick={() => {handleShowProductSpecific('product_stats')}} className={`${showProductSpecific ? 'text-blue-500 underline' : ''}`}>Product Stats</button>
                </div>
              
                {
                    !showProductSpecific && totals_data === null &&
                    <div className="text-center">
                        <span>Loading...</span>
                    </div>
                }
                {
                    !showProductSpecific && 
                    <div className="mt-2 flex">
                        {
                            totals_data !== null &&
                            totals_data?.map((total, i) => {
                                return (
                                    <div key={i} className="h-[96px] w-1/5 mx-2 text-center rounded-md shadow-md flex flex-col justify-center bg-white border border-gray-100">
                                        <div className="flex justify-center items-center">
                                            {GetIcon(total.title)}
                                            <p className="text-gray-600 text-lg pb-1">{total.title}</p>
                                        </div>
                                        <p className="text-custom-black text-3xl font-bold pt-1 pb-2">{total.value}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                
                {
                    showProductSpecific && productSpecificInfo.length === 0 &&
                    <div className="text-center">
                        <span>Loading...</span>
                    </div>
                }
                
                {
                    showProductSpecific && productSpecificInfo.length > 0 && 
                    <div>
                        <div id="CustomerResultPage" className="my-4">
                            <DataTable 
                                value={productSpecificInfo} 
                                paginator 
                                rows={50} 
                                rowsPerPageOptions={[50, 100, 200]}
                                stripedRows
                                filters={filters}
                                sortField="price"
                                sortOrder={-1}
                                showGridlines
                            >
                                <Column header="Shoe" body={ShoeView}/>
                                <Column field="qty" header="Units Sold" body={SoldView} sortable/>
                                <Column field="price" header="Total Made" body={CashView} sortable/>
                                <Column header="Ordered By" body={OrderedByView}/>
                            </DataTable>
                        </div>
                    </div>
                }
            </div>            
        </>
    )
}