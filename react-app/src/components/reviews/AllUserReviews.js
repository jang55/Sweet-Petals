import "./css/all-user-reviews.css";
import { getAllUserReviewsThunk } from "../../store/reviewReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserReviewCard from "./UserReviewCard";
import { NavLink } from "react-router-dom";

function AllUserReviews() {
  const dispatch = useDispatch();
  const all_reviews = useSelector((state) => state.reviewState);
  const user = useSelector((state) => state.session.user);
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
    isLoaded && user && (
      <div className="all-reviews-container">
        <div className="all-reviews-outer-wrapper">
          <h1 className="all-reviews-h1">My Reviews</h1>
          {reviews.length > 0 ? <div className="yes-reviews-messages">
            <NavLink to="/orders/users">Click here </NavLink>
            <span>to see if you have any previous orders completed to make a review!</span>
          </div> : <></>}
          <div className="all-reviews-wrapper">
            {reviews.length > 0 ? reverseArray([...reviews]).map((review, i) => (
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
                  pageType={"User Reviews"}
                />
              </div>
            )) : 
            <div className="no-reviews-messages">
              <h3>You currently do not have any reviews created.</h3>
              <NavLink to="/orders/users">Click here </NavLink>
              <span>to see if you have any previous orders completed to make a review!</span>
            </div>}
          </div>
        </div>
      </div>
    )
  );
}

export default AllUserReviews;
