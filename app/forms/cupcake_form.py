from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Cupcake


class CupcakeForm(FlaskForm):
    color_one = StringField('Color one', validators=[DataRequired()])
    color_two = StringField('Color two')
    color_three = StringField('Color three')
    style = StringField('Style', validators=[DataRequired()])
    flavor = StringField('Flavor', validators=[DataRequired()])
