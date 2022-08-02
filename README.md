# Tweeter App

Welcome to Tweeter, a clone of Twitter!

## Index

- [Live site](https://app-tweeter.herokuapp.com/)

- [Home](https://github.com/Shin-Jae/tweeter-app/wiki)

- [Database Schema](https://github.com/Shin-Jae/tweeter-app/wiki/Database-Schema)

- [Feature List](https://github.com/Shin-Jae/tweeter-app/wiki/Feature-List)

- [User Stories](https://github.com/Shin-Jae/tweeter-app/wiki/Users-Stories)


## Developed By
- [Jae Shin](https://github.com/Shin-Jae)


## Technologies Used
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" title="javascript" width="60" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="html5" title="html5" width="60" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="css3" title="css3" width="60" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" style="width:60px;" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain-wordmark.svg" style="width:60px;" />


## Getting Started
1. Clone this repistory

    ```bash
    https://github.com/Shin-Jae/tweeter-app.git
    ```

2. Install the project's backend dependencies at root directory

    ```bash
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
    ```

    ```bash
    pipenv install psycopg2-binary
    ```

3. Navigate to react-app direct and install the project's frontend dependencies

    ```bash
    npm install
    ```

4. Add an .env file in root file containing the variables from the .env.example file

5. Create user and database based on what you setup in .env file
   ```bash
   psql -c "CREATE USER <database_username> PASSWORD '<password>' CREATEDB"
   ```
   ```bash
   psql -c "CREATE DATABASE <database_name> WITH OWNER <database_username>"
   ```

6. Use the following commands to apply the provided database migrations and seeder.

    ```bash
   pipenv shell
   ```  

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

8. You can now test the application. (Please make sure to flask run on root directory and npm start on react-app directory!!!)
   ```bash
   flask run
   ```

    ```bash
    npm start
    ```

9. You can sign in via Demo User or create an account yourself

## Features
1. Users
* User can log in, and log out of the site
* User can sign up as a new user
* User can view profile pages.
* User can also choose to log in as a demo user.

<img width="1440" alt="Screen Shot 2022-07-20 at 7 55 29 PM" src="https://user-images.githubusercontent.com/95829246/182245362-da040c0f-675c-4f51-b09b-4498219e74ed.png">

2. Tweets
* Logged-in users can create, edit, and delete tweets
* Logged-in users can view tweets of their following on the home page
* Logged-in users can view tweets of user they don't follow on the explore page
* Logged-in users can view tweets they posted on their profile page

<img width="1440" alt="Screen Shot 2022-08-01 at 5 00 51 PM" src="https://user-images.githubusercontent.com/95829246/182245887-6546641f-a5b6-471b-b59e-7d5bde9679df.png">

3. Replies
* Logged-in users can create, edit, and delete replies
* Logged-in users can view replies on the page that individual tweet is on

<img width="1440" alt="Screen Shot 2022-08-01 at 5 01 51 PM" src="https://user-images.githubusercontent.com/95829246/182246012-6289ed2b-dd1e-4b79-bfc7-b78f7de42f59.png">

4. Follow
* Users can follow other users using the follow button on the right side-bar
* Users can follow other users by using the follow button on the desired user's profile page
* Users can view followers and following on desired user's profile page by clicking said text

<img width="1364" alt="Screen Shot 2022-08-01 at 5 04 14 PM" src="https://user-images.githubusercontent.com/95829246/182246448-cac6bd57-54e5-46eb-94c1-1cf98cffd771.png">

5. Search
* Logged-in users can search other users

<img width="442" alt="Screen Shot 2022-08-01 at 5 04 45 PM" src="https://user-images.githubusercontent.com/95829246/182246461-3a9a664c-6f74-409b-a72e-b74b906c564c.png">

## Future Implementations
1. Likes
* Users should be able to like other users post

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |

