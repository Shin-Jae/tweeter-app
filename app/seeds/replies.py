from app.models import db, Reply
import datetime

def seed_replies():
    reply1 = Reply(
        user_id=1,
        tweet_id=1,
        content='YESSIR, another day to be great',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    reply2 = Reply(
        user_id=2,
        tweet_id=1,
        content='just got better',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    reply3 = Reply(
        user_id=3,
        tweet_id=1,
        content='I feel its more benign',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    reply4 = Reply(
        user_id=1,
        tweet_id=2,
        content='Agreed',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    reply5 = Reply(
        user_id=2,
        tweet_id=2,
        content="Back in the good ol'days you could walk to the market and get 20 socks for $5, not like today with your fancy'smancy socks that cost $25 a pair!",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    reply6 = Reply(
        user_id=2,
        tweet_id=4,
        content='History made.',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )

    db.session.add(reply1)
    db.session.add(reply2)
    db.session.add(reply3)
    db.session.add(reply4)
    db.session.add(reply5)
    db.session.add(reply6)

    db.session.commit()


def undo_replies():
    db.session.execute('TRUNCATE replies RESTART IDENTITY CASCADE;')
    db.session.commit()
