from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Optional
from app.models import User
import re

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def email_length(form, field):
    email = field.data
    if len(email) < 3:
        raise ValidationError('should be at least 3 characters')
    if len(email) > 40:
        raise ValidationError('should be within 40 characters')

def valid_email(form, field):
    email = field.data
    if not re.fullmatch(regex, email):
        raise ValidationError('should include "@" and end in .com, .org, etc')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    id = form.data['id']
    user = User.query.filter(User.username == username).first()

    if user and user.id != id:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    if len(username) < 3:
        raise ValidationError('should be at least 3 characters')
    if len(username) > 40:
        raise ValidationError('should be within 40 characters')

def name_check(form, field):
    name = field.data
    if len(name) < 2:
        raise ValidationError('should be at least 2 characters')
    if len(name) > 40:
        raise ValidationError('should be within 40 characters')


class EditUserForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('name', validators=[DataRequired(), name_check])
    username = StringField('username', validators=[DataRequired(), username_exists, username_length])
    bio = TextAreaField('bio')
    profile_img = StringField('profile_img')
    banner_img = StringField('banner_img')
