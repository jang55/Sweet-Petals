from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', role="customer", email='demo@aa.io', password='password')
    demo_admin = User(
        username='DemoAdmin', role="admin", email='demo_admin@aa.io', password='password')
    marnie = User(
        username='Marnie', role="customer", email='marnie@aa.io', password='password')
    bobbie = User(
        username='Bobbie', role="customer", email='bobbie@aa.io', password='password')
    mike = User(
        username='Mike', role="customer", email='mike@aa.io', password='password')
    bill = User(
        username='Bill', role="customer", email='bill@aa.io', password='password')
    julianna = User(
        username='Julianna', role="customer", email='julianna@aa.io', password='password')
    john = User(
        username='John', role="customer", email='john@aa.io', password='password')
    cedrick = User(
        username='Cedrick', role="customer", email='cedrick@aa.io', password='password')
    jerry = User(
        username='Jerry', role="customer", email='jerry@aa.io', password='password')
    andrew = User(
        username='Andrew', role="customer", email='andrew@aa.io', password='password')

    db.session.add(demo)
    db.session.add(demo_admin)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(mike)
    db.session.add(bill)
    db.session.add(julianna)
    db.session.add(john)
    db.session.add(cedrick)
    db.session.add(jerry)
    db.session.add(andrew)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()