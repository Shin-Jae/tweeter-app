import datetime
from flask import Blueprint, jsonify, request
from app.forms.reply_form import ReplyForm
from app.forms.tweet_form import TweetForm
from app.models import db, Tweet, Reply
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
    print('first--------fffffffffff', request.files["image"])

    if "image" in request.files:
        image = request.files["image"]
        # image = form.data['image']
        # if not image:
        #     image = None
        print('requestfiles--------cxzcxzcxzcxz', image)

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        print('allowed_fillessss------ddsdsdssdsds')

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
    else:
        url = None
    print('url----url---,', url)
    if form.validate_on_submit():
        reply = Reply(
            user_id=userId,
            tweet_id=tweetId,
            content=form.data['content'],
            image=url,
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
