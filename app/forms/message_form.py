from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired()])
    is_read = BooleanField("Read messages")
    # sender = StringField("Sender", validators=[DataRequired()])
