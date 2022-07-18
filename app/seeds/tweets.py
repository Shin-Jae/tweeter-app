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
        content='I want whatever the people who run at 6am have',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet7 = Tweet(
        user_id=4,
        content='hmm',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet8 = Tweet(
        user_id=6,
        content='not a fan, will be contacting the manager.',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet12 = Tweet(
        user_id=8,
        content="How do they know an animal is extinct like??? U looked everywhere????",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet13 = Tweet(
        user_id=8,
        content="most cutting thing you can say is 'who's this clown?' because it implies they're a) a clown & b) not even one of the better-known clowns",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet9 = Tweet(
        user_id=7,
        content='Great PUMP today!',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet10 = Tweet(
        user_id=5,
        content="uh I think I'm in the wrong place",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    tweet11 = Tweet(
        user_id=8,
        content="are you okay? you didn't say “cows” when we drove by cows",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.add(tweet5)
    db.session.add(tweet6)
    db.session.add(tweet7)
    db.session.add(tweet8)
    db.session.add(tweet12)
    db.session.add(tweet13)
    db.session.add(tweet9)
    db.session.add(tweet10)
    db.session.add(tweet11)

    db.session.commit()


def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()
