from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Cookie


class CookieForm(FlaskForm):
    flavor = StringField('Flavor', validators=[DataRequired()])
    amount = IntegerField("Amount", validators=[DataRequired()])