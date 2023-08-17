from app.models import db, Cookie, environment, SCHEMA
from sqlalchemy.sql import text



def seed_cookies():
    cookie_one = Cookie(order_id=2, flavor="chocolate-chip")
    cookie_two = Cookie(order_id=4, flavor="snicker-doodle")
    cookie_three = Cookie(order_id=5, flavor="ube")
    cookie_four = Cookie(order_id=1, flavor="peanut-butter")
    cookie_five = Cookie(order_id=6, flavor="chocolate-chip")

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