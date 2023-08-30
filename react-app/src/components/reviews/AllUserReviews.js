import "./css/all-user-reviews.css";
import { getAllUserReviewsThunk } from "../../store/reviewReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserReviewCard from "./UserReviewCard";

function AllUserReviews() {
  const dispatch = useDispatch();
  const all_reviews = useSelector((state) => state.reviewState);
  const [reviews, setReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverShowEdit, setHoverShowEdit] = useState("");
  const [showEditForm, setShowEditForm] = useState("");

  useEffect(() => {
    dispatch(getAllUserReviewsThunk()).then(() => {
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
    isLoaded && (
      <div className="all-reviews-container">
        <div className="all-reviews-outer-wrapper">
          <h1 className="all-reviews-h1">My Reviews</h1>
          <div className="all-reviews-wrapper">
            {reverseArray([...reviews]).map((review, i) => (
              <div
                key={`${review.id}${i}`}
                className={`${
                  i % 2 === 0 ? `review-wrapper-left` : `review-wrapper-right`
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default AllUserReviews;
