from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_orders():
    order_one = Order(owner_id=1, order_number="JHGH3JH2G", pick_up_time= datetime.now())
    order_two = Order(owner_id=1, order_number="KJGJ3542", pick_up_time= datetime.now())
    order_three = Order(owner_id=3, order_number="C25C2H5CH", pick_up_time= datetime.now())
    order_four = Order(owner_id=4, order_number="KBH35B335B", pick_up_time= datetime.now())

    db.session.add(order_one)
    db.session.add(order_two)
    db.session.add(order_three)
    db.session.add(order_four)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the orders table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))
        
    db.session.commit()