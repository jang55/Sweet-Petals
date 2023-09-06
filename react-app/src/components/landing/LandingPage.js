import LandingBody from "./LandingBody"
import LandingFooter from "./LandingFooter"
import "./landing-css/landing-page.css"

function LandingPage({ isLoaded }) {


    return (
        isLoaded && <div>
            <LandingBody />
            <LandingFooter />
        </div>
    )
}


export default LandingPage