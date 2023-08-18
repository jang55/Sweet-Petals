from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Cheesecake(db.Model, UserMixin):
    __tablename__ = 'cheesecakes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
    flavor = db.Column(db.String(40), nullable=False)
    strawberries = db.Column(db.Boolean(), default=False)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # this is the many side relationship with order
    order = db.relationship("Order", back_populates="cheesecakes")


    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'user_id': self.user_id,
            'flavor': self.flavor,
            'strawberries': self.strawberries,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
