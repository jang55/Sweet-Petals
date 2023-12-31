from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Order(db.Model, UserMixin):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    order_number = db.Column(db.String(40), nullable=False)
    pick_up_time = db.Column(db.DateTime(timezone=True), nullable=False)
    order_completed = db.Column(db.Boolean(), default=False)
    is_new = db.Column(db.Boolean(), default=True)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # this is the many side relationship with user
    owner = db.relationship("User", back_populates="orders")

    # one-to-many relationship with reviews
    reviews = db.relationship("Review", back_populates="order")

    # one-to-many relationship with cheesecakes
    cheesecakes = db.relationship("Cheesecake", cascade="all,delete", back_populates="order")

    # one-to-many relationship with cupcakes
    cupcakes = db.relationship("Cupcake", cascade="all,delete", back_populates="order")

    # one-to-many relationship with cookies
    cookies = db.relationship("Cookie", cascade="all,delete", back_populates="order")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'order_number': self.order_number,
            'pick_up_time': self.pick_up_time,
            'order_completed': self.order_completed,
            'is_new': self.is_new,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
