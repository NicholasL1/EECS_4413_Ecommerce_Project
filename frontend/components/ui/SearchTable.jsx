import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

export default function SearchTable({placeholder, setFilters}) {
    return (
        <div className='flex flex-row align-middle items-center w-full'>
            <div className='bg-custom-black h-[48px] w-[48px] rounded-s-md flex items-center justify-center'>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' className='text-white'/>
            </div>
            <InputText 
                onInput={(e) => setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                })}
                placeholder={placeholder}
                className="h-[48px] w-1/4 p-4 rounded-s-none rounded-e-md border border-custom-black"
            />   
        </div>
    )
}