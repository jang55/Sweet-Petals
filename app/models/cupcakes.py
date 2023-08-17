from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Cupcake(db.Model, UserMixin):
    __tablename__ = 'cupcakes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
    color_one = db.Column(db.String(40), nullable=False)
    color_two = db.Column(db.String(40))
    color_three = db.Column(db.String(40))
    style = db.Column(db.String(40), nullable=False)
    flavor = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # this is the many side relationship with order
    order = db.relationship("Order", back_populates="cupcakes")

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
