from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Cheesecake


class CheesecakeForm(FlaskForm):
    flavor = StringField('Flavor', validators=[DataRequired()])
    strawberries = BooleanField('Strawberries')
    amount = IntegerField("Amount", validators=[DataRequired()])