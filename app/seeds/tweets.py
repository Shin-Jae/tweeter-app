from app.models import db, Tweet
import datetime

def seed_tweets():
    tweet1 = Tweet(
        user_id=2,
        content='Todays a good day',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet2 = Tweet(
        user_id=3,
        content='Sock tech is so advanced that you can get pretty much anything in sock form these days!',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet3 = Tweet(
        user_id=1,
        content='Gametime',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet4 = Tweet(
        user_id=1,
        content='CLEVELAND, this is for you!',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet5 = Tweet(
        user_id=3,
        content='I must confess to a penchant for creative socks',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet6 = Tweet(
        user_id=2,
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )

    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.add(tweet5)
    db.session.add(tweet6)

    db.session.commit()


def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()
