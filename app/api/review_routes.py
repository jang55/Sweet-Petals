from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

# creates validation errors format
def validation_errors_to_error_messages(validation_errors):
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


# *******************************************************


# get all the reviews
@review_routes.route('/')
@login_required
def get_all_reviews():
    reviews = Review.query.all()
    return {"Reviews": [review.to_dict() for review in reviews]}


# *******************************************************


# get the review details by id
@review_routes.route('/<int:id>')
@login_required
def get_a_review(id):
    review = Review.query.get(id)

    if review is None:
        return {"error": "Review not found"}, 404

    return review.to_dict()


# *******************************************************


# create review is located in order routes at the bottom


# *******************************************************


# edit a review
@review_routes.route("/<int:id>", methods=["PUT", "PATCH"])
@login_required
def edit_a_review(id):
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # query for the review
    review = Review.query.get(id)

    if review is None:
        return jsonify({"message": "Review not found"}), 404

    if str(review.user_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    if form.validate_on_submit():
        data = form.data
        review.review=data["review"]
        review.stars=data["stars"]
        db.session.commit()
        return review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************


# delete an review
@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_a_review(id):
    review = Review.query.get(id)

    if review is None:
        return jsonify({"message": "Review not found"}), 404

    if str(review.user_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review succesfully deleted!"}), 200


