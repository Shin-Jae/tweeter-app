from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:userId>/<int:followingId>', methods = ['DELETE'])
def unFollowUser(userId, followingId):
    user = User.query.get(userId)
    following = User.query.get(followingId)
    user.followers.remove(following)

    db.session.commit()
    return user.to_dict()
