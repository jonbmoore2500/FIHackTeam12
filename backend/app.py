#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Original, ModifiedResource, Text, Image, Caption
import os
from dotenv import load_dotenv
load_dotenv()
import openai
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.post('/GPT')
def modify_user_input():
    data = request.get_json()
    text = data.get('toModify')

    openai.api_key = os.getenv('APIKEY')
    prompt = f"Please simplify the following text and return it with obvious paragraph breaks: {text}"
    print(prompt)
    response = openai.Completion.create(
    engine="text-davinci-002",  # Use the appropriate GPT-3 engine
    prompt=prompt,
    max_tokens=200,  # Adjust as needed for the desired output length
    )

    simplified_text = response.choices[0].text.strip()

    return simplified_text, 201


@app.patch('/user/<int:id>')
def edit_user_preferences(id):
    user = User.query.filter_by(id=id).first()
    data = request.get_json()

    if not user:
        return {'error': 'not user found'}, 404
    if not data:
        return {'error': 'unable to process your input'}, 422
    
    try:
        for attr in data:
            setattr(user, attr, data[attr])
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 200
    except ValueError:
        return {'error': 'unable to process your input'}, 422
    


@app.post('/signup')
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    new_user = User(
        username=username
    )
    new_user.password_hash = password
    try:
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    except ValueError:
        return {'error': 'unable to process your input'}, 422
    
@app.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.authenticate(data['password']):
        return {'error': 'invalid input'}, 400
    return user.to_dict(), 201

if __name__ == '__main__':
    app.run(port=5555, debug=True)

