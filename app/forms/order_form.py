from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Order


class OrderForm(FlaskForm):
    owner_id = IntegerField('Owner id', validators=[DataRequired()])
    order_number = StringField('Order number', validators=[DataRequired()])
    pick_up_time = DateField("Pick up day and time", validators=[DataRequired()])
    order_completed = BooleanField("Order completed")
