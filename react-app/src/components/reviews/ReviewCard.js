import "./css/review-card.css";
import { dateFormatTwo } from "../../utils/helperFunctions";
import { useEffect } from "react";
import { useState } from "react";

function ReviewCard({ review }) {
  const [starsCountArr, setStarsCountArr] = useState([]);

  useEffect(() => {
    const starsArr = [];
    for (let i = 0; i < review.stars; i++) {
      starsArr.push(i + 1);
    }
    setStarsCountArr(starsArr);
  }, [review, setStarsCountArr]);

  return (
    review && (
      <>
        <div className="review-user-date-stars-wrapper">
          <div className="review-user-date-wrapper">
            <p className="review-user">{review.User.username}</p>
            <p className="review-date">
              {dateFormatTwo(review.created_at).slice(4, 17)}
            </p>
          </div>
          <div>
            {starsCountArr.map((count, i) => (
              <span className="review-stars" key={`${review.id}${i}`}>
                {"★"}
              </span>
            ))}
          </div>
        </div>
        <div>
          {review.image_url && (
            <img
              src={review.image_url}
              alt="review-img"
              className="review-img"
            />
          )}
          <p className="review-text">"{review.review}"</p>
        </div>
      </>
    )
  );
}

export default ReviewCard;
