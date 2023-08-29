import "./css/all-reviews.css"
import { getAllReviewsThunk } from "../../store/reviewReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";


function AllReviews() {
    const dispatch = useDispatch();
    const all_reviews = useSelector(state => state.reviewState)
    const [reviews, setReviews] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllReviewsThunk()).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch])

    useEffect(() => {
        setReviews(Object.values(all_reviews));
    }, [all_reviews])

    return (
        isLoaded && <div className="all-reviews-container">
            <div className="all-reviews-outer-wrapper">
                <h1>Customer Reviews</h1>
                <div className="all-reviews-wrapper" >
                    {reviews.map((review, i) => (
                        <div key={`${review.id}${i}`} className={`${i%2 === 0 ? `review-wrapper-left` : `review-wrapper-right`}`}>
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default AllReviews;