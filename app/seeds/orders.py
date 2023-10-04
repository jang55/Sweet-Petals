from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_orders():
    order_one = Order(owner_id=1, order_number="JHGH3JH", order_completed=True, pick_up_time= datetime(2023, 10, 2, 9, 15))
    order_two = Order(owner_id=3, order_number="KJGJ35Y", order_completed=True, pick_up_time= datetime(2023, 10, 3, 10, 15))
    order_three = Order(owner_id=4, order_number="C25C2H", order_completed=True, pick_up_time= datetime(2023, 10, 3, 11, 15))
    order_four = Order(owner_id=5, order_number="KBH35B3", order_completed=True, pick_up_time= datetime(2023, 10, 1, 12, 15))
    order_five = Order(owner_id=6, order_number="L4JH6VL", pick_up_time= datetime.now())
    order_six = Order(owner_id=7, order_number="46VH4JV", pick_up_time= datetime.now())
    order_seven = Order(owner_id=1, order_number="GU3G534", pick_up_time= datetime(2023, 10, 7, 15, 15))
    order_eight = Order(owner_id=1, order_number="GER325G", order_completed=True, pick_up_time= datetime(2023, 10, 1, 12, 15))
    order_nine = Order(owner_id=1, order_number="KERG25G", order_completed=True, pick_up_time= datetime(2023, 10, 15, 9, 45))
    order_ten = Order(owner_id=9, order_number="GER54TG", pick_up_time= datetime.now())
    order_eleven = Order(owner_id=10, order_number="34GRGE3", pick_up_time= datetime.now())
    order_twelve = Order(owner_id=11, order_number="544DFG3", pick_up_time= datetime.now())
    order_thirteen = Order(owner_id=1, order_number="ERERT34", pick_up_time= datetime(2023, 10, 9, 11, 30))
    order_fourteen = Order(owner_id=1, order_number="DHFGT34", order_completed=True, pick_up_time= datetime(2023, 9, 27, 11, 45))
    order_fifteen = Order(owner_id=1, order_number="DGDFG44", order_completed=True, pick_up_time= datetime(2023, 10, 2, 11, 20))
    order_sixteen = Order(owner_id=1, order_number="KJHKDRT", order_completed=True, pick_up_time= datetime(2023, 10, 8, 11, 50))

    db.session.add(order_one)   #cup, cook, cheese
    db.session.add(order_two)   #cook
    db.session.add(order_three) #cheese
    db.session.add(order_four)  #cook, cheese
    db.session.add(order_five)  #cook, cheese
    db.session.add(order_six)   #cook
    db.session.add(order_seven) #cup
    db.session.add(order_eight) #cup, cheese
    db.session.add(order_nine)  #cupcake
    db.session.add(order_ten)   #cupcake, cookie
    db.session.add(order_eleven) # cookie, cheesecake
    db.session.add(order_twelve) # cheesecake
    db.session.add(order_thirteen) # cheesecake
    db.session.add(order_fourteen) #cookie
    db.session.add(order_fifteen) # cupcake
    db.session.add(order_sixteen) #cookie
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