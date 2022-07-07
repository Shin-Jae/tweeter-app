import datetime
from flask import Blueprint, jsonify, request
from app.forms.tweet_form import TweetForm
from app.models import db, Tweet, Reply

reply_routes = Blueprint('replies', __name__)

@reply_routes.route('/<int:tweetId>')
def replies(tweetId):
    replies = Reply.query.filter(Reply.tweet_id == tweetId).all()

    return {'replies': [reply.to_dict() for reply in replies]}
