from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/<int:userId>')
def follows(userId):
    user = User.query.get(userId).to_dict()
    follows = user['following']
    return {'follows': [follow for follow in follows]}

@follow_routes.route('/<int:userId>/<int:followingId>', methods = ['POST'])
def followUser(userId, followingId):
    user = User.query.get(userId)
    following = User.query.get(followingId)
    user.followers.append(following)

    db.session.merge(user)
    db.session.flush()
    db.session.commit()
    return user.to_dict()

@follow_routes.route('/<int:userId>/<int:followingId>', methods = ['DELETE'])
def unFollowUser(userId, followingId):
    user = User.query.get(userId)
    following = User.query.get(followingId)
    user.followers.remove(following)

    db.session.commit()
    return user.to_dict()

@follow_routes.route('/user/<int:userId>')
def user_follows(userId):
    user = User.query.get(userId).to_dict()
    follows = user['following']
    return {'follows': [follow for follow in follows]}
