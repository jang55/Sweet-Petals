import "./landing-css/landing-body.css";
import InfiniteCarousel from "react-leaf-carousel";
// import logo from "../../images/SWEET_PETALS_wlogo.png";
import img_1 from "../../images/IMG_1.JPEG";
import img_2 from "../../images/IMG_2.JPEG";
import img_3 from "../../images/IMG_3.JPEG";
import img_4 from "../../images/IMG_4.JPEG";
import img_5 from "../../images/IMG_5.JPEG";
import img_6 from "../../images/IMG_6.JPEG";
// import img_7 from "../../images/IMG_7.JPEG";
// import img_8 from "../../images/IMG_8.JPEG";
// import img_9 from "../../images/IMG_9.JPEG";
import img_10 from "../../images/IMG_10.JPEG";
import img_11 from "../../images/IMG_11.JPEG";
// import baker_img from "../../images/baker_img.jpeg";

function LandingBody() {
  return (
    <div className="landing-main-body-container">
      {/* ****** section 1 ******* */}
      <div className="landing-body-wrapper-1"></div>
      {/* ****** section 2 ******* */}
      {/* <div className="landing-body-wrapper-2">
        <div className="lb-wrap-2">
          <img src={baker_img} className="lb-2-img" />
          <div className="landing-aboutme-info-wrap">
            <h2 className="lb-2-h2">So, who am I...</h2>
            <p className="lb-2-p">
              "Hi i'm Chheanna! I'm a self taught baker. I never thought baking
              was for me. Like many others during the pandemic, I found myself
              bored during lockdown. Since most bakeries shut down during
              COVID-19 pandemic, I decied to bake my own homemade cookies. I
              baked my first batch of chocolate chip cookies and it turned out
              pretty good. I remembered baking the same chocolate chip cookies,
              but just tweaking the ingridients around until i baked what I
              thought was the perfect batch. Baking became an obsession and I
              started baking cupcakes, cheesecakes, cookies, and more! I also
              took this time to practice piping buttercream. I didn't get it at
              first. It took many trials and errors and finally, I piped the
              most beautiful rosette and the rest was history! I decided to take
              my passin for baking and turned it into a small business. I wanted
              to be able to share my treats with others. My home baked treats
              are baked and decorated with love. I use high quality ingredients
              because I believe that it makes a huge difference on the outcome.
              Thank you all for your support!"
            </p>
          </div>
        </div>
      </div> */}
      {/* ****** section 3 ******* */}
      <div className="landing-body-wrapper-3">
        <div className="lb-wrap-3">
          <img src={"https://i.imgur.com/JBirxgX.jpg"} className="lb-3-img" alt=""/>
          <div className="lb-3-info-wrap">
            <h2 className="lb-3-h2">Not just beautiful, but delicious...</h2>
            <p className="lb-3-p">
              Not only are the cupcakes beautiful, but they taste amazing! The
              cupcakes are soft and fluffy. The buttercream isn't too sweet. We
              specialized in semi-floral and floral style cupcakes. We hand piped
              each one ourselves. We offered different flavors for the cupcakes like
              vanilla, chocolate, and lemon. We only use All American vnilla
              buettercream because it holds the style in place
            </p>
          </div>
        </div>
      </div>
      {/* ****** section 4 ******* */}
      <div className="landing-body-wrapper-4">
        <div className="lb-wrap-4">
          <img src={img_5} className="lb-4-img" alt=""/>
          <div className="lb-4-info-wrap">
            <h2 className="lb-4-h2">A perfect bite...</h2>
            <p className="lb-4-p">
              Our cheesecake bites are the perfect balance of creamy, sweet, and
              tangy. We used fresh lemons to balance off the sweetness. It has a
              nice buttery think crust. Once you take a bite, you will be back for
              seconds or thirds. You can order it in its original flavor, matcha,
              or many more! You will have the option to order the cheesecake bites
              with or without strawberries.
            </p>
          </div>
        </div>
      </div>
      {/* ****** section 5 ******* */}
      <div className="landing-body-wrapper-5">
        <div className="lb-wrap-5">
          <img src={"https://i.imgur.com/HhxM6ko.jpg"} className="lb-5-img" alt=""/>
          <div className="lb-5-info-wrap">
            <h2 className="lb-5-h2">Why take one, when you can take two...</h2>
            <p className="lb-5-p">
              Everyone has that perfect idea of there perfect chocolate chip
              cookies. Our cookies are
              brown butter based. They have the perfect balance of sweet and
              salty. The outside is slightly crispy and chewy in the middle. The
              chocolate just melts in your mouth. Warning! You will go for another
              cookie.
            </p>
          </div>
        </div>
      </div>
      {/* ********** section 6 ************** */}
      <div className="landing-body-wrapper-6">
        <h2 className="lb-6-h2">Some of our creations</h2>
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
            showSides={false}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={1}
            slidesToShow={1}
            scrollOnDevice={true}
            autoCycle={true}
            animationDuration={100}
            // arrows={false}
          >
            <div>
              <img className="landing-images" alt="" src={img_1} />
            </div>
            <div>
              <img className="landing-images" alt="" src={img_2} />
            </div>
            <div>
              <img className="landing-images" alt="" src={img_3} />
            </div>
            <div>
              <img className="landing-images" alt="" src={img_4} />
            </div>
            <div>
              <img className="landing-images" alt="" src={img_5} />
            </div>
            <div>
              <img className="landing-images" alt="" src={img_6} />
            </div>
            {/* <div>
              <img
                className="landing-images"
                alt=""
                src={img_7}
              />
            </div>
            <div>
              <img
                className="landing-images"
                alt=""
                src={img_8}
              />
            </div>
            <div>
              <img
                className="landing-images"
                alt=""
                src={img_9}
              />
            </div> */}
            <div>
              <img className="landing-images" alt="" src={img_10} />
            </div>
            <div>
              <img className="landing-images" alt="" src={img_11} />
            </div>
          </InfiniteCarousel>
        </div>
      </div>
    </div>
  );
}

export default LandingBody;
