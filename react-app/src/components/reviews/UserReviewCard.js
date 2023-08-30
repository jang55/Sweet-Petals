import "./css/user-review-card.css";
import { dateFormatTwo } from "../../utils/helperFunctions";
import { useEffect } from "react";
import { useState } from "react";
import { FcAddImage, FcRemoveImage } from "react-icons/fc"

function UserReviewCard({ review, hoverShowEdit, setHoverShowEdit, showEditForm, setShowEditForm }) {
    const [starsCountArr, setStarsCountArr] = useState([]);
    const [stars, setStars] = useState(review.stars);
    const [currReviewText, setCurrReviewText] = useState(review.review);
    const [image, setImage] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [hover, setHover] = useState(0);



    useEffect(() => {
        const starsArr = [];
        for (let i = 0; i < review.stars; i++) {
        starsArr.push(i + 1);
        }
        setStarsCountArr(starsArr);
    }, [review, setStarsCountArr]);


    const editReviewHandler = (e) => {
        e.preventDefault()
    }


    return (
        review && showEditForm === review.id ? (
        <form onSubmit={editReviewHandler}>
            <div className="user-review-user-date-stars-wrapper">
            <div className="user-review-user-date-wrapper">
                <p className="user-review-user">{review.User.username}</p>
                <p className="user-review-date">
                {dateFormatTwo(review.created_at).slice(4, 17)}
                </p>
            </div>
            <div>
            <div className="user-review-star-rating-wrap">
                {/********************** start of star rating ***************/}
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                    <button
                        id="user-review-star-buttons"
                        type="button"
                        key={index}
                        className={index <= (hover || stars) ? "user-review-on" : "user-review-off"}
                        onClick={() => setStars(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(stars)}
                    >
                        <span className="user-review-star">&#9733;</span>
                    </button>
                    );
                })}
                </div>
                {/********************* end of star rating*************** */}
            </div>
            </div>
            <div>
            {review.image_url ? (
                <>
                    <img
                    src={review.image_url}
                    alt="review-img"
                    className="user-review-img"
                    />
                    <span className="user-review-remove-image">
                        Remove Image
                    </span>
                </>
            ) : (<>
                <div className="user-review-image-input-wrapper">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="user-review-file-input"
                    />
                    {image ? (<div className="user-review-remove-upload-image" onClick={e => setImage("")}>
                        <FcRemoveImage className="user-review-remove-image-icon"/>
                    </div>) :(<div className="user-review-add-upload-image">
                        <FcAddImage className="user-review-add-image-icon"/>
                    </div>)}
                </div>
            </>)}
                <textarea
                    placeholder="Leave your review here..."
                    className="user-review-textbox"
                    value={currReviewText}
                    onChange={(e) => {
                        setCurrReviewText(e.target.value);
                        setCharCount(e.target.value.length)
                    }}
                    maxLength={300}
                ></textarea>
                <p className="c-review-char-count">Count:{300 - charCount}</p>
            </div>
            <span className="user-review-cancel-edit" onClick={e => setShowEditForm("")}>Cancel</span>
            <button className="user-review-save-button" type="submit">
                Save Changes
            </button>
        </form>
        ) : 
        
        
        
        (
            <>
                <div 
                className="user-review-user-date-stars-wrapper"
                >
                <div className="user-review-user-date-wrapper">
                    <p className="user-review-user">{review.User.username}</p>
                    <p className="user-review-date">
                    {dateFormatTwo(review.created_at).slice(4, 17)}
                    </p>
                </div>
                <div>
                    {starsCountArr.map((count, i) => (
                    <span className="user-review-stars" key={`${review.id}${i}`}>
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
                    className="user-review-img"
                    />
                )}
                <p className="user-review-text">"{review.review}"</p>
                </div>
                {hoverShowEdit === review.id && (
                    <span
                    className="user-review-edit-review-text"
                    onClick={(e) => setShowEditForm(review.id)}
                    >
                    EDIT
                    </span>
                )}
            </>
            )
    );
}

export default UserReviewCard;
