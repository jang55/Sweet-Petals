from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review


class ReviewForm(FlaskForm):
    user_id = IntegerField('User id', validators=[DataRequired()])
    order_id = IntegerField('Order id', validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[DataRequired()])
    image_url = StringField('Image url')
