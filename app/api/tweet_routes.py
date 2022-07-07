from crypt import methods
import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.user_routes import user
from app.forms.tweet_form import TweetForm
from app.models import db, Tweet, User


tweet_routes = Blueprint('tweets', __name__)

def validation_errors_to_error_tweets(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@tweet_routes.route('/<int:userId>/<following>')
def tweets(userId, following):
    if "," in following:
        following = following.split(",")

    tweets = Tweet.query.filter(Tweet.user_id == userId).all()
    for ele in following:
        tweets += (Tweet.query.filter(Tweet.user_id == ele ).all())

    return {'tweets': [tweet.to_dict() for tweet in tweets]}


@tweet_routes.route('/<int:tweetId>')
def tweet(tweetId):
    tweet = Tweet.query.get(tweetId)

    return tweet.to_dict()


@tweet_routes.route('<int:userId>', methods = ['POST'])
def post_tweet(userId):
    form = TweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        tweet = Tweet(
            user_id=userId,
            content=form.data['content'],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        db.session.add(tweet)
        db.session.commit()

        return tweet.to_dict()

    return {'errors': validation_errors_to_error_tweets(form.errors)}, 401
