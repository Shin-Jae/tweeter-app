import datetime
from flask import Blueprint, jsonify, request
from app.forms.reply_form import ReplyForm
from app.forms.tweet_form import TweetForm
from app.models import db, Tweet, Reply, User

like_routes = Blueprint('likes', __name__)

@like_routes.route('/<int:userId>')
def user_likes(userId):
    user = User.query.get(userId).to_dict()
    tweet_likes = user['tweet_likes']

    # print('fsdf----------------', {'tweetLikes': [tweet for tweet in tweet_likes], 'replyLikes': [reply for reply in reply_likes]})
    return {'tweetLikes': [tweet for tweet in tweet_likes]}

@like_routes.route('/<int:tweetId>/<int:userId>', methods = ['POST'])
def like_tweet(tweetId, userId):
    tweet = Tweet.query.get(tweetId)
    user = User.query.get(userId)

    tweet.like_tweet.append(user)

    db.session.merge(tweet)
    db.session.flush()
    db.session.commit()
    return tweet.to_dict()

@like_routes.route('/unlike/<int:tweetId>/<int:userId>', methods = ['DELETE'])
def unlike_tweet(tweetId, userId):
    tweet = Tweet.query.get(tweetId)
    user = User.query.get(userId)

    tweet.like_tweet.remove(user)

    db.session.commit()
    return tweet.to_dict()
