from email.policy import default
from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm, EditUserForm
from flask_login import current_user, login_user, logout_user, login_required
import datetime
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        userEmail = User.query.filter(User.email == form.data['credential']).first()
        userUsername = User.query.filter(User.username == form.data['credential']).first()
        user = userEmail or userUsername
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            name=form.data['name'],
            username=form.data['username'],
            email=form.data['email'],
            birthday=form.data['birthday'],
            bio='',
            profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fthe-sun-vanished%2Fimages%2F5%2F5d%2FTwitter-avi-gender-balanced-figure.png%2Frevision%2Flatest%3Fcb%3D20180713020754&f=1&nofb=1',
            banner_img='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F11%2F64%2FkEgxZh.png&f=1&nofb=1',
            password=form.data['password'],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/edit/<int:userId>', methods=['PUT'])
def edit_user(userId):
    user = User.query.get(userId)
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "profile_img" in request.files:
        profile_img = request.files["profile_img"]
        # image = form.data['image']
        # if not image:
        #     image = None

        if not allowed_file(profile_img.filename):
            return {"errors": "file type not permitted"}, 400

        profile_img.filename = get_unique_filename(profile_img.filename)

        upload = upload_file_to_s3(profile_img)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        profile_pic = upload["url"]

    if "banner_img" in request.files:
        banner_img = request.files["banner_img"]
        # image = form.data['image']
        # if not image:
        #     image = None

        if not allowed_file(banner_img.filename):
            return {"errors": "file type not permitted"}, 400

        banner_img.filename = get_unique_filename(banner_img.filename)

        upload = upload_file_to_s3(banner_img)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        banner_pic = upload["url"]

    if form.validate_on_submit():
        user.name=form.data['name']
        user.username=form.data['username']
        user.email=form.data['email']
        user.birthday=form.data['birthday']
        user.bio=form.data['bio']
        if profile_pic:
            user.profile_img=profile_pic,
        if banner_pic:
            user.banner_img=banner_pic
        user.password=form.data['password']
        user.created_at=datetime.datetime.now()
        user.updated_at=datetime.datetime.now()

        db.session.merge(user)
        db.session.flush()
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
