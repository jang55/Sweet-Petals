import LandingBody from "./LandingBody"
import LandingFooter from "./LandingFooter"
import "./landing-css/landing-page.css"

function LandingPage() {


    return (
        <div className="landing-container">
            <LandingBody />
            <LandingFooter />
        </div>
    )
}


export default LandingPage