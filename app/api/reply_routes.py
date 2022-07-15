import datetime
from flask import Blueprint, jsonify, request
from app.forms.reply_form import ReplyForm
from app.forms.tweet_form import TweetForm
from app.models import db, Tweet, Reply

reply_routes = Blueprint('replies', __name__)

def validation_errors_to_error_replies(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@reply_routes.route('/<int:tweetId>')
def replies(tweetId):
    replies = Reply.query.filter(Reply.tweet_id == tweetId).all()

    return {'replies': [reply.to_dict() for reply in replies]}


@reply_routes.route('/<int:userId>/<int:tweetId>', methods = ['POST'])
def post_reply(userId, tweetId):
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        reply = Reply(
            user_id=userId,
            tweet_id=tweetId,
            content=form.data['content'],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        db.session.add(reply)
        db.session.commit()

        return reply.to_dict()
    return {'errors': validation_errors_to_error_replies(form.errors)}, 401


@reply_routes.route('/<int:replyId>', methods = ['PUT'])
def edit_reply(replyId):
    reply = Reply.query.get(replyId)
    data = request.json

    content = data['content']
    updated_at = datetime.datetime.now()

    reply.content = content
    reply.updated_at = updated_at
    db.session.merge(reply)
    db.session.flush()
    db.session.commit()
    return reply.to_dict()


@reply_routes.route('/<int:replyId>', methods = ['DELETE'])
def delete_reply(replyId):
    reply = Reply.query.get(replyId)

    db.session.delete(reply)
    db.session.commit()
    return "ok"
