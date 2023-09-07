import baker_img from "../../images/baker_img.jpeg";
import "./about-us.css";
import dev_img from "../../images/jon.png";
import { BsGithub, BsLinkedin} from "react-icons/bs"

function AboutUs() {
  return (
    <div className="about-container">
        <div className="about-main-wrap">

            <div className="about-wrap-1">
                <img src={dev_img} className="about-1-img" />
                <div className="aboutme-info-wrap-1">
                <h2 className="about-1-h2">Meet the developer...</h2>
                <p className="about-1-p">
                    "Hello my peeps, i'm Jonathan! I built this project in motivation
                    for my wife who loves to bake and sells delicious bake goodies. I
                    always joked that I would attempt to work on a project for her to
                    use one day with her baking. That one day became a reality. This
                    project is built using Flask, React, HTML, and CSS. Customers can
                    sign up and create orders according to what the options are
                    available. Customers can make changes to there orders and make
                    review on the orders that have been completed. Thank you for taking
                    the time to take a look at this project!"
                </p>
                <div className="developer-wrapper">
                    <div className="developer-links">
                    <a href="https://github.com/jang55" target="_blank" className="github"><BsGithub /> GitHub</a>
                    <a href="https://www.linkedin.com/in/jonathan-ang-b1508b286/" target="_blank" className="linkedin"><BsLinkedin />LinkedIn</a>
                    </div>
                </div>
                </div>
            </div>
            <div className="about-wrap-2">
                <img src={baker_img} className="about-2-img" />
                <div className="aboutme-info-wrap-2">
                <h2 className="about-2-h2">Meet the baker...</h2>
                <p className="about-2-p">
                    "Hi i'm Chheanna! I'm a self taught baker. I never thought baking
                    was for me. Like many others during the pandemic, I found myself
                    bored during lockdown. Since most bakeries shut down during COVID-19
                    pandemic, I decied to bake my own homemade cookies. I baked my first
                    batch of chocolate chip cookies and it turned out pretty good. I
                    remembered baking the same chocolate chip cookies, but just tweaking
                    the ingridients around until i baked what I thought was the perfect
                    batch. Baking became an obsession and I started baking cupcakes,
                    cheesecakes, cookies, and more! I also took this time to practice
                    piping buttercream. I didn't get it at first. It took many trials
                    and errors and finally, I piped the most beautiful rosette and the
                    rest was history! I decided to take my passin for baking and turned
                    it into a small business. I wanted to be able to share my treats
                    with others. My home baked treats are baked and decorated with love.
                    I use high quality ingredients because I believe that it makes a
                    huge difference on the outcome. Thank you all for your support!"
                </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AboutUs;
