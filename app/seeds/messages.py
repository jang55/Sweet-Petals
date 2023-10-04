from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text



def seed_messages():
    message_one = Message(admin_id=2, customer_id=7, message="Hello! How many colors can we choose for cupcakes?", is_read=True, sender="customer")
    message_two = Message(admin_id=2, customer_id=6, message="you there?", is_read=True, sender="customer")
    message_three = Message(admin_id=2, customer_id=5, message="LOL.", is_read=True, sender="customer")
    message_four = Message(admin_id=2, customer_id=4, message="My wife loves your cookies!", is_read=True, sender="customer")
    message_five = Message(admin_id=2, customer_id=3, message="What flavor do you recommend?", is_read=True, sender="customer")
    message_six = Message(admin_id=2, customer_id=1, message="Hi, I wanted to ask you a question please.", is_read=True, sender="customer")

    db.session.add(message_one) 
    db.session.add(message_two) 
    db.session.add(message_three) 
    db.session.add(message_four) 
    db.session.add(message_five) 
    db.session.add(message_six) 
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cupcakes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
        
    db.session.commit()