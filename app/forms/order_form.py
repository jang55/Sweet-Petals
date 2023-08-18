from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Order


class OrderForm(FlaskForm):
    pick_up_time = StringField("Pick up day and time", validators=[DataRequired()])
    order_completed = BooleanField("Order completed")
