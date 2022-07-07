from app.models import db, User
import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    lebron = User(
        first_name='Lebron',
        last_name='James',
        username='KingJames',
        email='le@bron.com',
        birthday='1990-03-12',
        bio="EST. AKRON - ST.V/M Class of '03 http://LeBronJamesFamilyFoundation.org #IPROMISE",
        profile_img='https://pbs.twimg.com/media/E7pKiA5VkAET73_?format=jpg&name=small',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    demo = User(
        first_name='Demo',
        last_name='User',
        username='DemoLiTion',
        email='demo@aa.io',
        birthday='2000-11-22',
        bio='',
        profile_img='',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        following=[lebron],
        )
    elon = User(
        first_name='Elon',
        last_name='Musk',
        username='elonmusk',
        email='musk@elon.com',
        birthday='1995-08-06',
        bio='',
        profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFTpXU-xX0AABLTK%3Fformat%3Djpg%26name%3Dlarge&f=1&nofb=1',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        following=[demo]
        )

    db.session.add(lebron)
    db.session.add(demo)
    db.session.add(elon)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
