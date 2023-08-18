from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Order, Cupcake, Cookie, Cheesecake

order_routes = Blueprint('orders', __name__)


# gets all the orders created
@order_routes.route('/')
@login_required
def get_all_orders():
    orders = Order.query.all()
    return {"Orders": [order.to_dict() for order in orders]}


# gets one single order details
@order_routes.route('/<int:id>')
@login_required
def get_order_detail(id):
    order = Order.query.get(id)

    if order is None:
        return {"error": "Order not found"}, 404

    return order.to_dict()




@order_routes.route("/orders", methods=["POST"])
@login_required
def create_order():
    pass





# @order_routes.route("", methods=[])
# @login_required



# @order_routes.route("", methods=[])
# @login_required
# @order_routes.route("", methods=[])
# @login_required
# @order_routes.route("", methods=[])
# @login_required
# @order_routes.route("", methods=[])
# @login_required
# @order_routes.route("", methods=[])
# @login_required
