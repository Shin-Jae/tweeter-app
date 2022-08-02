from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


follows = db.Table(
    'follows',
    db.Column('follower_id', db.Integer, db.ForeignKey(
        'users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey(
        'users.id'))
)

tweet_likes = db.Table(
    'tweet_likes',
    db.Column('users', db.Integer, db.ForeignKey(
        'users.id')),
    db.Column('tweets', db.Integer, db.ForeignKey(
        'tweets.id'), primary_key=True)
)

reply_likes = db.Table(
    'reply_likes',
    db.Column('users', db.Integer, db.ForeignKey(
        'users.id')),
    db.Column('replies', db.Integer, db.ForeignKey(
        'replies.id'), primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    birthday = db.Column(db.Date)
    bio = db.Column(db.String(280))
    profile_img = db.Column(db.String(2000))
    banner_img = db.Column(db.String(2000))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    tweets = db.relationship("Tweet", back_populates="user")

    replies = db.relationship("Reply", back_populates="user")

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    user_tweet_likes = db.relationship(
        "Tweet",
        secondary=tweet_likes,
        back_populates="like_tweet",
    )

    user_reply_likes = db.relationship(
        "Reply",
        secondary=reply_likes,
        back_populates="like_reply",
    )

    def follow(self, follow):
        if follow not in self.followers:
            self.followers.append(follow)


    def unfollow(self, follow):
        if follow in self.followers:
            self.followers.remove(follow)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'username': self.username,
            'birthday': self.birthday,
            'bio': self.bio,
            'profile_img': self.profile_img,
            'banner_img': self.banner_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'following': [follow.to_dict_followers() for follow in self.followers],
        }

    def to_dict_followers(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'username': self.username,
            'birthday': self.birthday,
            'bio': self.bio,
            'profile_img': self.profile_img,
        }

    def to_dict_followers(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'username': self.username,
            'birthday': self.birthday,
            'bio': self.bio,
            'profile_img': self.profile_img,
            'banner_img': self.banner_img,
        }

class Tweet(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(280), nullable=False)
    image = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="tweets")

    replies = db.relationship("Reply", back_populates="tweets", cascade="all, delete")

    like_tweet = db.relationship(
        "User",
        secondary=tweet_likes,
        back_populates="user_tweet_likes",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "image": self.image,
            "user": self.user.to_dict(),
            "created_at": self.created_at,
        }


class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id'), nullable=False)
    content = db.Column(db.String(280), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="replies")

    tweets = db.relationship("Tweet", back_populates="replies")

    like_reply = db.relationship(
        "User",
        secondary=reply_likes,
        back_populates="user_reply_likes",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tweet_id": self.tweet_id,
            "content": self.content,
            "created_at": self.created_at,
        }
