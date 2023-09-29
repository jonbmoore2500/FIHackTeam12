#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Original, ModifiedResource, Text, Image
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
    response = openai.Completion.create(
    engine="text-davinci-002",  # Use the appropriate GPT-3 engine
    prompt=prompt,
    max_tokens=200,  # Adjust as needed for the desired output length
    )

    simplified_text = response.choices[0] 
    # breaking down the response too much on the backend kept throwing errors on the front
    # this returns more data, but in a way that the front can then process

    return simplified_text, 201

@app.post('/saveResource')
def save_resource():
    data = request.get_json()
    # this is what the structure of the object should look like {
    # "title": "Sample Title7",
    # "url": "https://example.com/sample-url",
    # "userId": id,
    # "texts": [
    #     {"text": "This is the first text."},
    #     {"text": "Here's another text."},
    #     {"text": "And one more text."}
    # ],
    # "images": [
    #     {"url": "https://example.com/image1.jpg", "location": 1, "caption": "Image 1 Caption"},
    #     {"url": "https://example.com/image2.jpg", "location": 2, "caption": "Image 2 Caption"},
    #     {"url": "https://example.com/image3.jpg", "location": 3, "caption": "Image 3 Caption"}
    # ]
    # }
    if not data:
        return {'error': 'unable to process your input'}, 422
    
    try:
        original = Original(
            title = data.get('title'),
            url = data.get('url')
        )
        db.session.add(original)
        db.session.commit()

        mod = ModifiedResource(
            userId = data.get('userId'),
            originalId = original.id
        )
        db.session.add(mod)
        db.session.commit()
        # since many texts and images belong to one modified resource we'll need to loop through it 
        text_list = data.get('texts')
        if text_list:
            for text in text_list:
                curText = Text(
                    modifiedId = mod.id,
                    text = text['text']
                )
                db.session.add(curText)
        
        image_list = data.get('images')
        if image_list:
            for image in image_list:
                curImage = Image(
                    modifiedId = mod.id,
                    url = image['url'],
                    location = image['location'],
                    caption = image['caption']
                )
                db.session.add(curImage)
                
        db.session.commit()
        return [original.to_dict(rules=('-modifiedResource.image', '-modifiedResource.text',)), mod.to_dict(rules=('-image', '-text',)), text_list, image_list], 201

    except ValueError:
        return {'error': 'unable to process your input'}, 422


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
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except ValueError:
        return {'error': 'unable to process your input'}, 422

@app.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.authenticate(data['password']):
        return {'error': 'invalid input'}, 400
    session['user_id'] = user.id
    return user.to_dict(), 201

@app.get('/check_session')
def auto_login():
    user = User.query.filter_by(id=session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    return {'error': 'unauthorized'}, 401

@app.delete('/logout')
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return {'message': 'logged out'}, 204
    return {'error': 'session not found'}, 404

if __name__ == '__main__':
    app.run(port=5555, debug=True)

