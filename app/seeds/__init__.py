from flask.cli import AppGroup
from .users import seed_users, undo_users
from .orders import seed_orders, undo_orders
from .reviews import seed_reviews, undo_reviews
from .recipes import seed_recipes, undo_recipes
from .cupcakes import seed_cupcakes, undo_cupcakes
from .cookies import seed_cookies, undo_cookies
from .cheesecakes import seed_cheesecakes, undo_cheesecakes
from .messages import undo_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_orders()
        undo_reviews()
        undo_recipes()
        undo_cupcakes()
        undo_cookies()
        undo_cheesecakes()
        undo_messages()
    seed_users()
    seed_orders()
    seed_reviews()
    seed_recipes()
    seed_cupcakes()
    seed_cookies()
    seed_cheesecakes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_orders()
    undo_reviews()
    undo_recipes()
    undo_cupcakes()
    undo_cookies()
    undo_cheesecakes()
    undo_messages()
    # Add other undo functions here