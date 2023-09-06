from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Order, Cupcake, Cookie, Cheesecake, db, Review
from app.forms import OrderForm, CupcakeForm, CheesecakeForm, CookieForm, ReviewForm
import random
from datetime import datetime
from .helper_functions import generate_random_id


order_routes = Blueprint('orders', __name__)

# # creates validation errors format
# def validation_errors_to_error_messages(validation_errors):
#     print(validation_errors)
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f"{field} : {error}")
#     return errorMessages

# creates validation errors format
def validation_errors_to_error_messages(validation_errors):
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


# *******************************************************


# gets all the orders created
@order_routes.route('/')
@login_required
def get_all_orders():
    
    if current_user.to_dict()["role"] != "admin":
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    orders = Order.query.all()

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




# *******************************************************




# gets one single order details
@order_routes.route('/<int:id>')
@login_required
def get_order_detail(id):
    order = Order.query.get(id)

    if order is None:
        return {"error": "Order not found"}, 404

    if str(order.owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    current_order = order.to_dict()

    if order.cupcakes:
        current_order["Cupcakes"] = [cupcake.to_dict() for cupcake in order.cupcakes]

    if order.cheesecakes:
        current_order["Cheesecakes"] = [cheesecake.to_dict() for cheesecake in order.cheesecakes]

    if order.cookies:
        current_order["Cookies"] = [cookie.to_dict() for cookie in order.cookies]

    if order.reviews:
        current_order["Reviews"] = [review.to_dict() for review in order.reviews]
        
    return current_order



# *******************************************************


# creates a new order
@order_routes.route("/", methods=["POST"])
@login_required
def create_order():
    form = OrderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        # this is the format that the date is suppose to be in
        format ='%Y-%m-%d %H:%M'
        new_order = Order(
            owner_id=current_user.get_id(),
            order_number=generate_random_id(), 
            pick_up_time=datetime.strptime(data["pick_up_time"], format)
        )
        db.session.add(new_order)
        db.session.commit()

        return new_order.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************


# creates a new cupcake order to add to the order
@order_routes.route("/<int:id>/cupcakes", methods=["POST"])
@login_required
def create_cupcake(id):
    form = CupcakeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        # create the cupcake with this 
        new_cupcake_order = Cupcake(
            order_id=id,
            user_id=current_user.get_id(),
            color_one=data["color_one"],
            color_two=data["color_two"],
            color_three=data["color_three"],
            style=data["style"],
            flavor=data["flavor"],
            amount=data["amount"],
        )
        db.session.add(new_cupcake_order)
        db.session.commit()

        return new_cupcake_order.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************



# creates a new cheesecake order to add to the order
@order_routes.route("/<int:id>/cheesecakes", methods=["POST"])
@login_required
def create_cheesecake(id):
    form = CheesecakeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        # create the cheesecake with this
        new_cheesecake_order = Cheesecake(
            order_id=id,
            user_id=current_user.get_id(),
            flavor=data["flavor"],
            strawberries=data["strawberries"],
            amount=data["amount"],
        )
        db.session.add(new_cheesecake_order)
        db.session.commit()

        return new_cheesecake_order.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400




# *******************************************************



# creates a new cookie order to add to the order
@order_routes.route("/<int:id>/cookies", methods=["POST"])
@login_required
def create_cookie(id):
    form = CookieForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        # create the cookie with this
        new_cookie_order = Cookie(
            order_id=id,
            user_id=current_user.get_id(),
            flavor=data["flavor"],
            amount=data["amount"],
        )
        db.session.add(new_cookie_order)
        db.session.commit()

        return new_cookie_order.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400




# *******************************************************



# edit a order
@order_routes.route("/<int:id>", methods=["PUT", "PATCH"])
@login_required
def edit_a_order(id):
    print("hit function *******************************")
    form = OrderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # query for the order
    order = Order.query.get(id)

    if order is None:
        return jsonify({"message": "Order not found"}), 404

    # all admins are allow to make changes to the order
    # incase they want to adjust order completed to true
    if current_user.to_dict()["role"] == "admin":
        pass
    elif str(order.owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    if form.validate_on_submit():
        data = form.data
        # format for the date
        format ='%Y-%m-%d %H:%M'
        order.pick_up_time=datetime.strptime(data["pick_up_time"], format)
        order.order_completed = data["order_completed"]
        db.session.commit()
        return order.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400




# *******************************************************



# edit a cupcake order
@order_routes.route("/<int:order_id>/cupcakes/<int:cupcake_id>", methods=["PUT", "PATCH"])
@login_required
def edit_a_cupcake_order(order_id, cupcake_id):
    form = CupcakeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    cupcake = Cupcake.query.get(cupcake_id)

    if cupcake is None:
        return jsonify({"message": "Cupcake not found"}), 404

    # validates if the current user is the appropiate user for this order
    # validates if the order is the correct order as well
    if str(cupcake.user_id) != current_user.get_id() or str(cupcake.order_id) != str(order_id):
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    if form.validate_on_submit():
        data = form.data
        cupcake.color_one=data["color_one"]
        cupcake.color_two=data["color_two"]
        cupcake.color_three=data["color_three"]
        cupcake.style=data["style"]
        cupcake.flavor=data["flavor"]
        cupcake.amount=data["amount"]
        db.session.commit()
        return cupcake.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************


# edit a cheesecake order
@order_routes.route("/<int:order_id>/cheesecakes/<int:cheesecake_id>", methods=["PUT", "PATCH"])
@login_required
def edit_a_cheesecake_order(order_id, cheesecake_id):
    form = CheesecakeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    cheesecake = Cheesecake.query.get(cheesecake_id)

    if cheesecake is None:
        return jsonify({"message": "Cheesecake not found"}), 404

    # validates if the current user is the appropiate user for this order
    # validates if the order is the correct order as well
    if str(cheesecake.user_id) != current_user.get_id() or str(cheesecake.order_id) != str(order_id):
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    if form.validate_on_submit():
        data = form.data
        cheesecake.flavor=data["flavor"]
        cheesecake.strawberries=data["strawberries"]
        cheesecake.amount=data["amount"]
        db.session.commit()
        return cheesecake.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************



# edit a cookie order
@order_routes.route("/<int:order_id>/cookies/<int:cookie_id>", methods=["PUT", "PATCH"])
@login_required
def edit_a_cookie_order(order_id, cookie_id):
    form = CookieForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    cookie = Cookie.query.get(cookie_id)

    if cookie is None:
        return jsonify({"message": "Cookie not found"}), 404

    # validates if the current user is the appropiate user for this order
    # validates if the order is the correct order as well
    if str(cookie.user_id) != current_user.get_id() or str(cookie.order_id) != str(order_id):
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    if form.validate_on_submit():
        data = form.data
        cookie.flavor=data["flavor"]
        cookie.amount=data["amount"]
        db.session.commit()
        return cookie.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *******************************************************


# delete an order
@order_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_a_order(id):
    order = Order.query.get(id)

    if order is None:
        return jsonify({"message": "Order not found"}), 404

    if str(order.owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order succesfully deleted!"}), 200



# *******************************************************



# delete an cupcake order
@order_routes.route("/<int:order_id>/cupcakes/<int:cupcake_id>", methods=["DELETE"])
@login_required
def delete_a_cupcake(order_id, cupcake_id):
    cupcake = Cupcake.query.get(cupcake_id)

    if cupcake is None:
        return jsonify({"message": "Cupcake not found"}), 404

    if str(cupcake.user_id) != current_user.get_id() or str(cupcake.order_id) != str(order_id):
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    db.session.delete(cupcake)
    db.session.commit()
    return jsonify({"message": "Cupcake succesfully deleted!"}), 200



# *******************************************************


# delete an cheesecake order
@order_routes.route("/<int:order_id>/cheesecakes/<int:cheesecake_id>", methods=["DELETE"])
@login_required
def delete_a_cheesecake(order_id, cheesecake_id):
    cheesecake = Cheesecake.query.get(cheesecake_id)

    if cheesecake is None:
        return jsonify({"message": "Cheesecake not found"}), 404

    if str(cheesecake.user_id) != current_user.get_id() or str(cheesecake.order_id) != str(order_id):
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    db.session.delete(cheesecake)
    db.session.commit()
    return jsonify({"message": "Cheesecake succesfully deleted!"}), 200



# *******************************************************


# delete an cookie order
@order_routes.route("/<int:order_id>/cookies/<int:cookie_id>", methods=["DELETE"])
@login_required
def delete_a_cookie(order_id, cookie_id):
    cookie = Cookie.query.get(cookie_id)

    if cookie is None:
        return jsonify({"message": "Cookie not found"}), 404

    if str(cookie.user_id) != current_user.get_id() or str(cookie.order_id) != str(order_id):
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    db.session.delete(cookie)
    db.session.commit()
    return jsonify({"message": "Cookie succesfully deleted!"}), 200




# *******************************************************


# creates a new review
@order_routes.route("/<int:id>/reviews", methods=["POST"])
@login_required
def create_review(id):
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    reviews = Review.query.filter(Review.order_id == int(id)).all()

    if len(reviews) >= 1:
        return {"errors": [{"Forbidden": "Forbidden Action"}]}, 403

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
