from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Recipe(db.Model, UserMixin):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'color_one': self.color_one,
            'color_two': self.color_two,
            'color_three': self.color_three,
            'style': self.style,
            'flavor': self.flavor,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
