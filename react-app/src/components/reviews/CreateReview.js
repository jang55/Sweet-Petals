import StarRating from "./StarRating";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./css/create-review.css";
import { dateFormat } from "../../utils/helperFunctions";
import { createReviewThunk, uploadReviewImageThunk } from "../../store/reviewReducer";
import { useHistory } from "react-router-dom";

function CreateReview({ order, setShowModal }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState("");
  const [charCount, setCharCount] = useState(0)
  const dispatch = useDispatch();
  const history = useHistory();

  const createReviewHandler = async (e) => {
    e.preventDefault();

    const newReview = await dispatch(createReviewThunk(order.id, review, stars))
    
    if (image) {
      const formData = new FormData();
      formData.append("image_url", image);
      await dispatch(uploadReviewImageThunk(newReview.id, formData));
    
    }
    
    setShowModal(false);
    history.push("/reviews/users")
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
          onChange={(e) => {
            setReview(e.target.value);
            setCharCount(e.target.value.length)
          }}
          maxLength={245}
      ></textarea>
      <p className="c-review-char-count">Count:{245 - charCount}</p>
        <StarRating stars={stars} setStars={setStars} />
        <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="c-file-input"
            />
            <div className="c-file-image">
              <button className="c-file-image-button" type="button">Add Image</button>
              {image ? <span className="c-image-text">Image selected</span> : <span className="c-image-text">No image selected</span>}
              {image ? <span className="c-remove" onClick={e => setImage("")}>remove</span> : <></>}
            </div>
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
