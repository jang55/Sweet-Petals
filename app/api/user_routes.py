from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Order, Review

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()



# gets all the current user orders created
@user_routes.route('/orders')
@login_required
def get_all_current_user_orders():
    orders = Order.query.filter(Order.owner_id == current_user.get_id()).all()

    all_orders = []

# loop through each order and set the dessert order to each one
    for order in orders:
        current_order = order.to_dict()

        if order.cupcakes:
            current_order["Cupcakes"] = [cupcake.to_dict() for cupcake in order.cupcakes]

        if order.cheesecakes:
            current_order["Cheesecakes"] = [cheesecake.to_dict() for cheesecake in order.cheesecakes]

        if order.cookies:
            current_order["Cookies"] = [cookie.to_dict() for cookie in order.cookies]
        
        if order.reviews:
            current_order["Reviews"] = [review.to_dict() for review in order.reviews]
        
        all_orders.append(current_order)

    return {"Orders": all_orders}



# gets all the users reviews
@user_routes.route('/reviews')
@login_required
def get_all_users_reviews():
    reviews = Review.query.filter(Review.user_id == current_user.get_id()).all()
    return {"Reviews": [review.to_dict() for review in reviews]}