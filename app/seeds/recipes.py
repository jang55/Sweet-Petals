from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text



def seed_recipes():
    recipe_one = Recipe(user_id=2, title="chocolate chip cookie", ingredients="egg, flour, milk", description="bake it good")
    recipe_two = Recipe(user_id=2, title="cheesecake", ingredients="cream cheese, egg, butter", description="bake it good")
    recipe_three = Recipe(user_id=2, title="cupcake", ingredients="flour, egg, vegetable-oil", description="bake it good")
    recipe_four = Recipe(user_id=2, title="ube cookie", ingredients="ube, sugar", description="bake it good")
    recipe_five = Recipe(user_id=2, title="peanut butter cookie", ingredients="peanut-butter, egg, flour", description="bake it good")



    db.session.add(recipe_one)
    db.session.add(recipe_two)
    db.session.add(recipe_three)
    db.session.add(recipe_four)
    db.session.add(recipe_five)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the recipes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))
        
    db.session.commit()