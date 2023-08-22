from app.models import db, Cookie, environment, SCHEMA
from sqlalchemy.sql import text



def seed_cookies():
    cookie_one = Cookie(order_id=2, user_id=3, flavor="chocolate-chip", amount=1)
    cookie_two = Cookie(order_id=4, user_id=5, flavor="snicker-doodle", amount=1)
    cookie_three = Cookie(order_id=5, user_id=6, flavor="ube", amount=1)
    cookie_four = Cookie(order_id=1, user_id=1, flavor="peanut-butter", amount=1)
    cookie_five = Cookie(order_id=6, user_id=7, flavor="chocolate-chip", amount=1)

    db.session.add(cookie_one)
    db.session.add(cookie_two)
    db.session.add(cookie_three)
    db.session.add(cookie_four)
    db.session.add(cookie_five)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cookies table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cookies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cookies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cookies"))
        
    db.session.commit()