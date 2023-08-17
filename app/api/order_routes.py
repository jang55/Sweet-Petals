from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Order, Cupcake, Cookie, Cheesecake

order_routes = Blueprint('orders', __name__)


@order_routes.route('/')
@login_required
def get_all_orders() {
    orders = Order.query.all()
    return {"Orders": [order.to_dict() for order in orders]}
}
