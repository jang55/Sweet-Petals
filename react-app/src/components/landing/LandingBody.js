import "./landing-css/landing-body.css";
import InfiniteCarousel from "react-leaf-carousel";

function LandingBody() {
  return (
    <div className="landing-main-body-container">
      <div className="landing-body-wrapper-1">
        <div>
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
            ]}
            dots={true}
            showSides={true}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={4}
            slidesToShow={4}
            scrollOnDevice={true}
            autoCycle={true}
          >
            <div>
              <img
                alt=""
                src="https://placeholdit.imgix.net/~text?txtsize=20&bg=55b64e&txtclr=ffffff&txt=215%C3%97215&w=215&h=215"
              />
            </div>
            <div>
              <img
                alt=""
                src="https://placeholdit.imgix.net/~text?txtsize=20&bg=904098&txtclr=ffffff&txt=215%C3%97215&w=215&h=215"
              />
            </div>
            <div>
              <img
                alt=""
                src="https://placeholdit.imgix.net/~text?txtsize=20&bg=ef4d9c&txtclr=ffffff&txt=215%C3%97215&w=215&h=215"
              />
            </div>
            <div>
              <img
                alt=""
                src="https://placeholdit.imgix.net/~text?txtsize=20&bg=00f3d1&txtclr=ffffff&txt=215%C3%97215&w=215&h=215"
              />
            </div>
            <div>
              <img
                alt=""
                src="https://placeholdit.imgix.net/~text?txtsize=20&bg=00ffff&txtclr=ffffff&txt=215%C3%97215&w=215&h=215"
              />
            </div>
          </InfiniteCarousel>
          ,
        </div>
      </div>
      <div className="landing-body-wrapper-2"></div>
    </div>
  );
}

export default LandingBody;
