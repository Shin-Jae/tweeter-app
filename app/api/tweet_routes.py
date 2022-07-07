from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.user_routes import user
from app.models import User, Tweet, follows

tweet_routes = Blueprint('tweets', __name__)

@tweet_routes.route('/<int:userId>/<following>')
def tweets(userId, following):
    if "," in following:
        following = following.split(",")

    tweets = Tweet.query.filter(Tweet.user_id == userId).all()
    for ele in following:
        tweets += (Tweet.query.filter(Tweet.user_id == ele ).all())

    return {'tweets': [tweet.to_dict() for tweet in tweets]}
