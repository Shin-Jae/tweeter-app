import datetime
from flask import Blueprint, jsonify, request
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

@tweet_routes.route('/<int:userId>')
def tweets(userId):
    user = User.query.get(userId).to_dict()
    tweets = Tweet.query.filter(Tweet.user_id == userId).all()
    if user['following']:
        for ele in user['following']:
            tweets += (Tweet.query.filter(Tweet.user_id == ele['id'] ).all())

    return {'tweets': [tweet.to_dict() for tweet in tweets]}

@tweet_routes.route('/explore/<int:userId>')
def exploreTweets(userId):
    user = User.query.get(userId).to_dict()

    ids = [userId]
    for ele in user['following']:
        ids.append(int(ele['id']))

    tweets = Tweet.query.filter(Tweet.user_id.not_in(ids)).all()

    return {'tweets': [tweet.to_dict() for tweet in tweets]}


@tweet_routes.route('/<int:tweetId>')
def tweet(tweetId):
    tweet = Tweet.query.get(tweetId)

    return tweet.to_dict()

@tweet_routes.route('/profile/<int:profileId>')
def userTweets(profileId):
    tweets = Tweet.query.filter(Tweet.user_id == profileId).all()

    return {'tweets': [tweet.to_dict() for tweet in tweets]}

@tweet_routes.route('/<int:userId>', methods = ['POST'])
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


@tweet_routes.route('/<int:tweetId>', methods = ['PUT'])
def edit_tweet(tweetId):
    tweet = Tweet.query.get(tweetId)
    data = request.json

    content = data['content']
    updated_at = datetime.datetime.now()

    tweet.content = content
    tweet.updated_at = updated_at
    db.session.merge(tweet)
    db.session.flush()
    db.session.commit()
    return tweet.to_dict()


@tweet_routes.route('/<int:tweetId>', methods = ['DELETE'])
def delete_tweet(tweetId):
    tweet = Tweet.query.get(tweetId)

    db.session.delete(tweet)
    db.session.commit()
    return "ok"
