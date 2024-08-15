import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

/**
 * Generates a group of stars based on the rating number
 * @returns a group of stars
 */
export default function ReviewStars({rating}) {
    const stars = Array(Math.ceil(rating)).fill(null)
    return (
        <div className="flex py-1 justify-start items-center">
            {
                stars.map((star, i) => {
                    return (
                        <FontAwesomeIcon key={i} icon={i < Math.floor(rating) ? faStar : faStarHalf} size="lg" className={`text-yellow-400 ${i > 1 ? 'mx-1' : 'mr-1'}`}/>
                    )
                })
            }
            <span className="text-sm font-thin">({rating})</span>
        </div>
    )
}