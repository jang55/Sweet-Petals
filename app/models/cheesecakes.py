from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Cheesecake(db.Model, UserMixin):
    __tablename__ = 'cheesecakes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, nullable=False)
    flavor = db.Column(db.String(40), nullable=False)
    strawberries = db.Column(db.Boolean(), default=False)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'flavor': self.flavor,
            'strawberries': self.strawberries,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
