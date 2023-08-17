from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Order, Cupcake, Cookie, Cheesecake

order_routes = Blueprint('orders', __name__)


@order_routes.route('/')
@login_required




