# FIHackTeam12


Learn Link is a React/Flask app that allows users to save a profile and automatically query AI tools based on aspects of their profile to save modified and more accessible versions of educational resources.

## Set up

Make sure you are up to date with React 6 and Python 3

### For Hackathon Adjuticating

The OpenAI APIKEY and the Sessions SECRET_KEY are both in a .env file that was not uploaded to GitHub for security reasons, please create your own or contact Jonathan Moore at jonathanmoorevla@gmail.com if you would like test the project yourselves. 

Otherwise, the demo video in Slide 10 of our presentation shows a walkthrough of the main capabilities.


### Front End

npm install

npm start


### Back End

(in a separate terminal)

pipenv install 

pipenv shell

export FLASK_APP=backend/app.py

run python backend/app.py
