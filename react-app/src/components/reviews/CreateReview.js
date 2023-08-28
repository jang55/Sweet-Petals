import StarRating from "./StarRating";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./css/create-review.css";
import { dateFormat } from "../../utils/helperFunctions";
import { createReviewThunk } from "../../store/reviewReducer";
import { useHistory } from "react-router-dom";


function CreateReview({ order, setShowModal }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  // const {setNewReview} = useReview();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

      try {
        await dispatch(createReviewThunk(order.id, review, stars))
        setShowModal(false);
      } catch (err) {
        if (err.status === 403) {
          setErrors({ alreadyCreated: "Review already exist for this spot" });
        }
        const data = await err.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
  };

  return (
    <>
      <form className="create-review-container" onSubmit={submitHandler}>
        <h2>Write a review for your order!</h2>
        <fieldset className="c-review-wrapper">
      <legend className="order-number">Orders ID: {order.order_number} </legend>
      <div className="c-review-information-wrapper">
        <p className="c-review-pickup">
          Pick up Date/Time:{" "}
          <span className="order-info-text">
            {dateFormat(order.pick_up_time)}
          </span>
        </p>
        <span className="c-review-received">
          <span>Order Received: </span>
          {order.order_completed ? (
            <span className="order-info-text">
              Yes <span className="validity-received-yes">✓</span>
            </span>
          ) : (
            <span className="order-info-text">
              No <span className="validity-received-no">✖</span>
            </span>
          )}
        </span>
        </div>
        </fieldset>
        <ul className="c-review-errors-container">
          <li>
            {errors.review && (
              <p className="errors">
                Review is required with atleast 10 characters
              </p>
            )}
          </li>
          <li>
            {errors.alreadyCreated && <p className="errors">{errors.alreadyCreated}</p>}
          </li>
        </ul>
        <textarea
          placeholder="Leave your review here..."
          className="c-review-textbox"
          value={review}
          onChange={(e) => setReview(e.target.value)}
      ></textarea>
        <StarRating stars={stars} setStars={setStars} />
        <button
        className={
          review.length >= 10 && stars !== 0
            ? "c-review-submit-button"
            : "c-review-submit-button-not-ready"
        }
        type="submit"
        disabled={review.length < 10 || stars === 0}
      >
        Submit Review
      </button>
      </form>
    </>
  );
}

export default CreateReview;
