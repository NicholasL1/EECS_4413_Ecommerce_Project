import Loading from "./Loading"

import {faCcVisa, faCcMastercard, faApplePay, faCcPaypal} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreditCart({card}) {

    if (card === null)
        return <Loading />

    const generateCardIcon = () => {
        const icons = [faCcMastercard, faCcPaypal, faCcVisa, faApplePay]
        return icons[Math.floor(Math.random() * 4)]
    }

    const genRandColor = () => {
        const col = ['#6290C8', '#FF6F59', '#F4B860', '#7AE582']
        return col[Math.floor(Math.random() * 4)]
    }

    return (
        <div id="card" style={{ backgroundColor: genRandColor() }} className="rounded-md shadow-md flex flex-row justify-between p-2 ">
            <div className="w-1/3 ">
                <FontAwesomeIcon size="2xl" className="text-left" icon={generateCardIcon()}/>
                <p className="flex flex-col justify-end">{card?.cvc}</p>
            </div>

            <div className="text-right w-fit flex flex-col justify-between">
                <p>**** {card?.card_number ? card?.card_number.slice(-4) : 'N/A'}</p>
                <p>Exp: {card?.expiry_date}</p>
            </div>
        </div>
    )
}