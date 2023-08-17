from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Message

message_routes = Blueprint('messages', __name__)


@message_routes.route('/')
@login_required




