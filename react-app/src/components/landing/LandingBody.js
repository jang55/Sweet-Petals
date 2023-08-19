import "./landing-css/landing-body.css";
import InfiniteCarousel from "react-leaf-carousel";
import logo from "../../images/SWEET_PETALS_wlogo.png" 

function LandingBody() {
  return (
    <div className="landing-main-body-container">
      <div className="landing-body-wrapper-1">
        <div className="landing-carousel-wrap">
          <InfiniteCarousel
            className="landing-carousel"
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              // {
              //   breakpoint: 768,
              //   settings: {
              //     slidesToShow: 3,
              //     slidesToScroll: 3,
              //   },
              // },
            ]}
            // dots={true}
            showSides={true}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={1}
            slidesToShow={1}
            scrollOnDevice={true}
            autoCycle={true}
          >
            <div>
              <img
                alt=""
                src={logo}
              />
            </div>
            <div>
              <img
                alt=""
                src={logo}
              />
            </div>
            <div>
              <img
                alt=""
                src={logo}
              />
            </div>
            <div>
              <img
                alt=""
                src={logo}
              />
            </div>
            <div>
              <img
                alt=""
                src={logo}
              />
            </div>
          </InfiniteCarousel>
        </div>
      </div>
      <div className="landing-body-wrapper-2"></div>
    </div>
  );
}

export default LandingBody;
