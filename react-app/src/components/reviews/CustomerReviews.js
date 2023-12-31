import "./css/customer-reviews.css";
import { getAllReviewsThunk } from "../../store/reviewReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserReviewCard from "./UserReviewCard";

function CustomerReviews() {
  const dispatch = useDispatch();
  const all_reviews = useSelector((state) => state.reviewState);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [hoverShowEdit, setHoverShowEdit] = useState("");
  const [showEditForm, setShowEditForm] = useState("");

  useEffect(() => {
    dispatch(getAllReviewsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  // sets the reviews to be mapped
  useEffect(() => {
    setReviews(Object.values(all_reviews));
  }, [all_reviews]);

  // helper function to reverse the array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

  return (
    isLoaded && user && (
        <div className="customer-reviews-container">
          <h1 className="all-reviews-h1">Customer Reviews</h1>
          <div className="customer-reviews-wrapper">
            {reviews.length > 0 ? (
              reverseArray([...reviews]).map((review, i) => (
                <div
                  key={`${review.id}${i}`}
                  className={`${
                    i % 2 === 0 ? `customer-review-wrapper-left` : `customer-review-wrapper-right`
                  }`}
                  onMouseEnter={(e) => setHoverShowEdit(review.id)}
                  onMouseLeave={(e) => setHoverShowEdit("")}
                >
                  <UserReviewCard
                    review={review}
                    hoverShowEdit={hoverShowEdit}
                    setHoverShowEdit={setHoverShowEdit}
                    showEditForm={showEditForm}
                    setShowEditForm={setShowEditForm}
                    pageType={"Customer-Reviews"}
                  />
                </div>
              ))
            ) : (
              <div className="no-reviews-messages">
                <h3>You currently do not have any reviews from any customers.</h3>
              </div>
            )}
          </div>
        </div>
    )
  );
}

export default CustomerReviews;
