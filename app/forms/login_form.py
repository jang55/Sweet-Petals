from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('Email provided not found.')


# def password_matches(form, field):
#     # Checking if password matches
#     password = field.data
#     email = form.data['email']
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('No such user exists.')
#     if not user.check_password(password):
#         raise ValidationError('Password was incorrect.')


def user_exists(form, field):
    # Checking if user exists
    data = field.data
    user = User.query.filter((User.username == data) | (User.email == data)).first()
    if not user:
        raise ValidationError('Login or password is invalid.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    data = form.data
    user = User.query.filter((User.username == data['credentials']) | (User.email == data['credentials'])).first()

    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Login or password is invalid.')


class LoginForm(FlaskForm):
    credentials = StringField('username', validators=[DataRequired(), user_exists])
    # email = StringField('email', validators=[user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])