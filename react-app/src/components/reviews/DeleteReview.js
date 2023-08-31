import "./css/delete-review.css"
import ReviewCard from "./ReviewCard"
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviewReducer";


function DeleteReview({ review, setShowModal }) {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteReviewThunk(review.id));
        setShowModal(false);
    }
    
    return(
        <div className="delete-review-container">
            <h1 className="delete-review-h1">Are you sure you want to delete this review?</h1>
            <div className="delete-review-wrapper">
                <ReviewCard review={review} />
            </div>
            <div className="delete-review-buttons-wrap">
                <button className="delete-review-close-button delete-review-button" onClick={e => setShowModal(false)} >Close</button>
                <button className="delete-review-confirm-button delete-review-button" onClick={handleDelete} >Confirm</button>
            </div>
        </div>
    )
}

export default DeleteReview;