from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review


def validate_stars(form, field):
    stars = form.data["stars"]

    if stars > 5 or stars < 1:
        raise ValidationError("Star rating needs to be between 1 to 5.")


class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[DataRequired(), validate_stars])
    image_url = StringField('Image url')
