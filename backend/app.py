#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Original, ModifiedResource, Text, Image, Caption
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

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

