from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Recipe(db.Model, UserMixin):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    notes = db.Column(db.String())
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # this is the many side relationship with user
    user = db.relationship("User", back_populates="recipes")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'ingredients': self.ingredients,
            'description': self.description,
            'notes': self.notes,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
