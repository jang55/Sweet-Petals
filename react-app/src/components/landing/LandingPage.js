import LandingBody from "./LandingBody"
import LandingFooter from "./LandingFooter"
import "./landing-css/landing-page.css"

function LandingPage() {


    return (
        <div className="landing-outer-container">
            <div className="landing-container">
                <LandingBody />
                <LandingFooter />
            </div>
        </div>
    )
}


export default LandingPage