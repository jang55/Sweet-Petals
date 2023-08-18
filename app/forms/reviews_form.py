from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review


def validate_stars(form, field):
    stars = form.data["stars"]

    if stars > 5 or stars < 1:
        raise ValidationError("Star rating needs to be between 1 to 5.")

def validate_reviews(form, field):
    review = form.data["review"]

    if len(review) > 300:
        raise ValidationError("Review can not exceed 300 characters.")


class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), validate_reviews])
    stars = IntegerField('Stars', validators=[DataRequired(), validate_stars])
    image_url = StringField('Image url')
