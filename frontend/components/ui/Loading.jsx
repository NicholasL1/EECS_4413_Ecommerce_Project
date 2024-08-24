import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
    return (
        <div className="text-center w-full">
            <FontAwesomeIcon icon={faSpinner} spinPulse size='xl'/>
        </div>
    )
}