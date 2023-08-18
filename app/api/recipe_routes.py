from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Recipe, db

recipe_routes = Blueprint('recipes', __name__)


# @recipe_routes.route('/')
# @login_required



def validation_errors_to_error_messages(validation_errors):
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


# *******************************************************


# get all the recipes
@recipe_routes.route('/')
@login_required
def get_all_recipes():
    recipes = Recipe.query.all()
    return {"Recipes": [recipe.to_dict() for recipe in recipes]}


# *******************************************************


# get the recipes details by id
@recipe_routes.route('/<int:id>')
@login_required
def get_a_recipe(id):
    recipe = Recipe.query.get(id)

    if recipe is None:
        return {"error": "Recipe not found"}, 404

    return recipe.to_dict()


# *******************************************************


# creates a new review
@order_routes.route("/<int:id>/reviews", methods=["POST"])
@login_required
def create_review(id):
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_review = Review(
            user_id=current_user.get_id(),
            order_id=id,
            review=data["review"],
            stars=data["stars"]
        )
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400





# *******************************************************


# # edit a review
# @recipe_routes.route("/<int:id>", methods=["PUT", "PATCH"])
# @login_required
# def edit_a_review(id):
#     form = ReviewForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     # query for the review
#     review = Review.query.get(id)

#     if review is None:
#         return jsonify({"message": "Review not found"}), 404

#     if str(review.user_id) != current_user.get_id():
#         return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

#     if form.validate_on_submit():
#         data = form.data
#         review.review=data["review"]
#         review.stars=data["stars"]
#         db.session.commit()
#         return review.to_dict()
#     return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************


# # delete an review
# @recipe_routes.route("/<int:id>", methods=["DELETE"])
# @login_required
# def delete_a_review(id):
#     review = Review.query.get(id)

#     if review is None:
#         return jsonify({"message": "Review not found"}), 404

#     if str(review.user_id) != current_user.get_id():
#         return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

#     db.session.delete(review)
#     db.session.commit()
#     return jsonify({"message": "Review succesfully deleted!"}), 200



