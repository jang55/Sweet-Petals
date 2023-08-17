from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .messages import Message


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # one-to-many relationship with orders
    orders = db.relationship("Order", cascade="all,delete", back_populates="owner")

    # one-to-many relationship with reviews
    reviews = db.relationship("Review", cascade="all,delete", back_populates="user")

    # one-to-many relationship with recipes
    recipes = db.relationship("Recipe", cascade="all,delete", back_populates="user")

    # Many-to-Many relationship with messages
    admin_messages = db.relationship('Message', foreign_keys=[Message.admin_id], back_populates='admin')
    customer_messages = db.relationship('Message', foreign_keys=[Message.customer_id], back_populates='customer')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'role': self.role,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
