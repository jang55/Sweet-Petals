import "./404Page.css"
import { useHistory } from "react-router-dom";

function FourOhFourPage() {
    const history = useHistory();

    const handleHome = (e) => {
        e.preventDefault()
        history.push("/")
    }

    return (
        <div className="fof-page-outer-container">
            <div className="fof-page-container">
                <div className="fof-error-message">404 Error</div>
                <button className="fof-page-home-button" onClick={handleHome}>Back to home</button>
                <div className="fof-error-message-2">Page not found</div>
            </div>
        </div>
    )
}

export default FourOhFourPage;