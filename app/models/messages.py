from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Message(db.Model, UserMixin):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    message = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # many to many relationship between admin and customers
    admin = db.relationship('User', foreign_keys=[admin_id], back_populates='admin_messages')
    customer = db.relationship('User', foreign_keys=[customer_id], back_populates='customer_messages')


    def to_dict(self):
        return {
            'id': self.id,
            'admin_id': self.admin_id,
            'customer_id': self.customer_id,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
