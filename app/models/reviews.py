from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
    review = db.Column(db.String(300), nullable=False)
    stars = db.Column(db.Integer(), nullable=False)
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # this is the many side relationship with user
    user = db.relationship("User", back_populates="reviews")

    # this is the many side relationship with order
    order = db.relationship("Order", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'order_id': self.order_id,
            'review': self.review,
            'star': self.star,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
