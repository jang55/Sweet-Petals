from app.models import db, Cupcake, environment, SCHEMA
from sqlalchemy.sql import text



def seed_cupcakes():
    cupcake_one = Cupcake(order_id=1, user_id=1, color_one="red", color_two="white", color_three="blue", style="semi-floral", flavor="vanilla")
    cupcake_two = Cupcake(order_id=7, user_id=8, color_one="green", color_two="white", style="floral", flavor="chocolate")
    cupcake_three = Cupcake(order_id=8, user_id=1, color_one="purple", style="simple-swirl", flavor="lemon")

    db.session.add(cupcake_one)
    db.session.add(cupcake_two)
    db.session.add(cupcake_three)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cupcakes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cupcakes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cupcakes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cupcakes"))
        
    db.session.commit()