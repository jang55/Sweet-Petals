from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Cookie(db.Model, UserMixin):
    __tablename__ = 'cookies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    flavor = db.Column(db.String(40), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # this is the many side relationship with order
    order = db.relationship("Order", back_populates="cookies")


    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'user_id': self.user_id,
            'flavor': self.flavor,
            'amount': self.amount,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
