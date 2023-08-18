from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Recipe, db
from app.forms import RecipeForm

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


# creates a new recipe
@recipe_routes.route("", methods=["POST"])
@login_required
def create_recipe():
    form = RecipeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if current_user.to_dict()["role"] != "admin":
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    if form.validate_on_submit():
        data = form.data
        new_recipe = Recipe(
            user_id=current_user.get_id(),
            title=data["title"],
            ingredients=data["ingredients"],
            description=data["description"]
        )
        db.session.add(new_recipe)
        db.session.commit()

        return new_recipe.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400





# *******************************************************


# edit a recipe
@recipe_routes.route("/<int:id>", methods=["PUT", "PATCH"])
@login_required
def edit_a_recipe(id):
    form = RecipeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # query for the review
    recipe = Recipe.query.get(id)

    if recipe is None:
        return jsonify({"message": "Recipe not found"}), 404

    if str(recipe.user_id) != current_user.get_id() or current_user.to_dict()["role"] != "admin":
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    if form.validate_on_submit():
        data = form.data
        recipe.title=data["title"]
        recipe.ingredients=data["ingredients"]
        recipe.description=data["description"]
        db.session.commit()
        return recipe.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************


# delete an recipe
@recipe_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_a_review(id):
    recipe = Recipe.query.get(id)

    if recipe is None:
        return jsonify({"message": "Recipe not found"}), 404

    if str(recipe.user_id) != current_user.get_id() or current_user.to_dict()["role"] != "admin":
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({"message": "Recipe succesfully deleted!"}), 200



