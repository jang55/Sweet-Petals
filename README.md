<h1 align="center">Sweet Petals <a href="https://sweet-petals.onrender.com/"></a></h1>


<img width="627" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/2d4364bf-bcb3-4bea-b040-e0f5e5ca7d27">


[Sweet Petals](https://sweet-petals.onrender.com/) is one of many AppAcademy's capstone project that was given to every student at the end of the curriculum to test there knowledge and understanding of what they have learned. This project gives the opportunity for the student to make nothing into something using their imagination. Sweet Petals is an original idea and offers a platform that gives customers a chance to customize their orders and make reviews. There is an admin side that can see all orders, make recipes.


## Technologies Used
Accord was built using the following technologies:

### Backend:
- **Python**
- **Flask**
  - flask-sqlalchemy
- **SQLAlchemy** (with Alembic for database migrations)

### Frontend:
- **JavaScript**
- **React**
- **Redux**

### Others:
- **AWS**: Cloud infrastructure and services
- **WTForms**: Forms handling


## Installation

### Backend Setup: Flask

1. **Clone the Repository**
    ```bash
    git clone git@github.com:jang55/Sweet-Petals.git
    ```

2. **Install Dependencies**
    ```bash
    pipenv install -r requirements.txt
    ```

3. **Configure Environment Settings**
    - Create a `.env` file using the provided example, adjusting settings suitable for your development environment.
    - Ensure the SQLite3 database connection URL is present in the `.env` file.
    - Set a unique name for the `SCHEMA` environment variable, using the `snake_case` convention.

4. **Setup and Start the Flask Server**
    ```bash
    pipenv shell
    flask db upgrade
    flask seed all
    flask run
    ```

### Frontend Setup: React

1. **Navigate to the React App Folder**
    ```bash
    cd react-app
    ```

2. **Install Dependencies and Start the App**
    ```bash
    npm install
    npm start
    ```

3. With both backend and frontend running, you're ready to experience Accord. Cheers!

## Operating

For subsequent sessions, ensure you have two terminal windows:

1. **Backend Server** (ensure the database is migrated and seeded as mentioned in the installation process)
    ```bash
    pipenv shell
    flask run
    ```

2. **Frontend Server**
    ```bash
    cd react-app
    npm start
    ```

