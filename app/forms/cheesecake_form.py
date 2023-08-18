from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Cheesecake


class CheesecakeForm(FlaskForm):
    order_id = IntegerField('Order id', validators=[DataRequired()])
    flavor = StringField('Flavor', validators=[DataRequired()])
    strawberries = BooleanField('Strawberries')
