<h1 align="center">Sweet Petals <a href="https://sweet-petals.onrender.com/"></a></h1>


<img width="100%" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/2d4364bf-bcb3-4bea-b040-e0f5e5ca7d27">


[Sweet Petals](https://sweet-petals.onrender.com/) is one of many AppAcademy's capstone project that was given to every student at the end of the curriculum to test there knowledge and understanding of what they have learned. This project gives the opportunity for the student to make nothing into something using their imagination. Sweet Petals is an original idea and offers a platform that gives customers a chance to customize their orders and make reviews. There is an admin side that can see all orders and make recipes to be used.

***
## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup: Flask](#backend-setup-flask)
  - [Frontend Setup: React](#frontend-setup-react)
- [Operating](#operating)
- [Wiki Documents](#wiki-documents)
- [Future Features](#future-features)
- [Sweet Petals showcase](#sweet-petals-Showcase)

***
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
- Using socketIO to give the user and admin a source to communicate in real-time

***
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
    
***
## [Wiki Documents](git@github.com:jang55/Sweet-Petals.git)
- [Database Schema](https://github.com/jang55/Sweet-Petals/wiki/Database-Schema)
- [Features](https://github.com/jang55/Sweet-Petals/wiki/Feature-List)
- [Backend Routes](https://github.com/jang55/Sweet-Petals/wiki/Backend-Routes)
- [User Stories](https://github.com/jang55/Sweet-Petals/wiki/User-Stories)


***
## Future Features

### Payment
- Gives the user a source to make payments upon completion of creating an order


***

## Sweet Petals showcase
<img width="934" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/be749aad-96b5-4c51-bce8-ec37a8563125">
<img width="1034" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/be5b8e9a-b91c-4862-9ce8-f3ba212d4c3d">
<img width="1053" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/99a93248-626c-4b80-8908-ed855b1888d9">
<img width="964" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/abe84f38-a8fc-4b3d-b789-e7cdeb892ad7">
<img width="912" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/3e1a586f-cba0-4846-b281-23470174f096">
<img width="1043" alt="image" src="https://github.com/jang55/Sweet-Petals/assets/95331968/0ceddbce-e6cc-468e-adca-eb36ba821bd7">











