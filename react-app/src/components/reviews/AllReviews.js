import "./css/all-reviews.css";
import { getAllReviewsThunk } from "../../store/reviewReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

function AllReviews() {
  const dispatch = useDispatch();
  const all_reviews = useSelector((state) => state.reviewState);
  const [reviews, setReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalAverage, setTotalAverage] = useState(0);
  const [fiveStars, setFiveStars] = useState(0);
  const [fourStars, setFourStars] = useState(0);
  const [threeStars, setThreeStars] = useState(0);
  const [twoStars, setTwoStars] = useState(0);
  const [oneStars, setOneStars] = useState(0);

  useEffect(() => {
    dispatch(getAllReviewsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  // sets the reviews to be mapped
  useEffect(() => {
    setReviews(Object.values(all_reviews));
  }, [all_reviews]);

  // helper function to get average
  const getAverage = (reviews) => {
    let total = 0;

    reviews.forEach((review) => {
      total += review.stars;
    });
    return total / reviews.length;
  };

  // sets the count for all the review stars
  useEffect(() => {
    setTotalAverage(getAverage(reviews));
    let total5 = 0;
    let total4 = 0;
    let total3 = 0;
    let total2 = 0;
    let total1 = 0;

    reviews.forEach((review) => {
      if (review.stars === 5) {
        total5 += 1;
      } else if (review.stars === 4) {
        total4 += 1;
      } else if (review.stars === 3) {
        total3 += 1;
      } else if (review.stars === 2) {
        total2 += 1;
      } else if (review.stars === 1) {
        total1 += 1;
      }
    });

    setFiveStars(total5);
    setFourStars(total4);
    setThreeStars(total3);
    setTwoStars(total2);
    setOneStars(total1);
  }, [reviews]);

  // helper function to calculate width for average bar
  const calculateWidth = (num) => {
    return `${(num / reviews.length) * 100}%`;
  };

  // helper function to reverse the array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

  return (
    isLoaded && (
      <div className="all-reviews-container">
        <div className="all-reviews-outer-wrapper">
          <h1 className="all-reviews-h1">Customer Reviews</h1>
          <div className="all-reviews-wrapper">
            <div className="average-container">
              <div className="average-rating-text">
                Averge Rating: <span className="avg-num">{totalAverage}/5</span>
              </div>
              <div className="star-average-bar-wrapper">
                <div className="star-average-wrapper">
                  <p>★★★★★</p>
                  <p>★★★★</p>
                  <p>★★★</p>
                  <p>★★</p>
                  <p>★</p>
                </div>
                <div className="star-bar-wrapper">
                  <div className="star-5-wrap">
                    <p
                      className="star-rate5"
                      style={{ width: calculateWidth(fiveStars) }}
                    ></p>
                    <span>{`(${fiveStars})`}</span>
                  </div>
                  <div className="star-5-wrap">
                    <p
                      className="star-rate4"
                      style={{ width: calculateWidth(fourStars) }}
                    ></p>
                    <span
                      style={{ marginBottom: "5px" }}
                    >{`(${fourStars})`}</span>
                  </div>
                  <div className="star-5-wrap">
                    <p
                      className="star-rate3"
                      style={{ width: calculateWidth(threeStars) }}
                    ></p>
                    <span>{`(${threeStars})`}</span>
                  </div>
                  <div className="star-5-wrap">
                    <p
                      className="star-rate2"
                      style={{ width: calculateWidth(twoStars) }}
                    ></p>
                    <span>{`(${twoStars})`}</span>
                  </div>
                  <div className="star-5-wrap">
                    <p
                      className="star-rate1"
                      style={{ width: calculateWidth(oneStars) }}
                    ></p>
                    <span>{`(${oneStars})`}</span>
                  </div>
                </div>
              </div>
            </div>
            {reverseArray([...reviews]).map((review, i) => (
              <div
                key={`${review.id}${i}`}
                className={`${
                  i % 2 === 0 ? `review-wrapper-left` : `review-wrapper-right`
                }`}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default AllReviews;
