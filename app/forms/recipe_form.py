from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Recipe


class RecipeForm(FlaskForm):
    user_id = IntegerField('User id', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    ingredients = StringField('Ingredients', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])

