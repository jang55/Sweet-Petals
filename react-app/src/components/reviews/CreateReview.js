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
  const [image, setImage] = useState("")
  const dispatch = useDispatch();

  const createReviewHandler = async (e) => {
    e.preventDefault();

    await dispatch(createReviewThunk(order.id, review, stars))
    setShowModal(false);
    
  };

  return (
    <>
      <form className="create-review-container" encType="multipart/form-data" onSubmit={createReviewHandler}>
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
        <textarea
          placeholder="Leave your review here..."
          className="c-review-textbox"
          value={review}
          onChange={(e) => setReview(e.target.value)}
      ></textarea>
        <StarRating stars={stars} setStars={setStars} />
        <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
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
