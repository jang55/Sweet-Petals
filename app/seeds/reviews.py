from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_reviews():
    review_one = Review(user_id=1, order_id=1, review="These cupcakes were delicious!", stars=5)
    review_two = Review(user_id=3, order_id=2, review="Best cookies ever!", stars=5)
    review_three = Review(user_id=4, order_id=3, review="I really enjoyed these cheesecakes very much!", stars=4)
    review_four = Review(user_id=5, order_id=4, review="Cookies were good, but my wife better ones.", stars=3)
    review_five = Review(user_id=1, order_id=14, review="Cookies were delicious! Could not stop eating them!", stars=5)
    review_six = Review(user_id=1, order_id=15, review="Bought the cupcakes for my wife and she loved it!.", image_url="https://i.imgur.com/JBirxgX.jpg", stars=5)

    db.session.add(review_one)
    db.session.add(review_two)
    db.session.add(review_three)
    db.session.add(review_four)
    db.session.add(review_five)
    db.session.add(review_six)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the reviews table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()