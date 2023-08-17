from app.models import db, Cheesecake, environment, SCHEMA
from sqlalchemy.sql import text



def seed_cheesecakes():
    cheesecake_one = Cheesecake(order_id=1, flavor="macha")
    cheesecake_two = Cheesecake(order_id=3, flavor="original", strawberries=True)
    cheesecake_three = Cheesecake(order_id=4, flavor="original", strawberries=True)
    cheesecake_four = Cheesecake(order_id=5, flavor="original")
    cheesecake_five = Cheesecake(order_id=8, flavor="original", strawberries=True)

    db.session.add(cheesecake_one)
    db.session.add(cheesecake_two)
    db.session.add(cheesecake_three)
    db.session.add(cheesecake_four)
    db.session.add(cheesecake_five)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cheesecakes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cheesecakes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cheesecakes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cheesecakes"))
        
    db.session.commit()