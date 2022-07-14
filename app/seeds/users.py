from app.models import db, User
import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    lebron = User(
        first_name='LeBron',
        last_name='James',
        username='KingJames',
        email='le@bron.com',
        birthday='1990-03-12',
        bio="EST. AKRON - ST.V/M Class of '03 http://LeBronJamesFamilyFoundation.org #IPROMISE",
        profile_img='https://pbs.twimg.com/media/E7pKiA5VkAET73_?format=jpg&name=small',
        banner_img='https://pbs.twimg.com/profile_banners/23083404/1529843462/1500x500',
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
        profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fthe-sun-vanished%2Fimages%2F5%2F5d%2FTwitter-avi-gender-balanced-figure.png%2Frevision%2Flatest%3Fcb%3D20180713020754&f=1&nofb=1',
        banner_img='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F11%2F64%2FkEgxZh.png&f=1&nofb=1',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    elon = User(
        first_name='Elon',
        last_name='Musk',
        username='elonmusk',
        email='musk@elon.com',
        birthday='1995-08-06',
        bio='',
        profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFTpXU-xX0AABLTK%3Fformat%3Djpg%26name%3Dlarge&f=1&nofb=1',
        banner_img='https://pbs.twimg.com/profile_banners/44196397/1576183471/1500x500',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    jae = User(
        first_name='Jae',
        last_name='Shin',
        username='TheMaker',
        email='shin@jae.com',
        birthday='1998-07-30',
        bio='Hello my name is Jae and I developed "Tweeter", which is a clone of "Twitter". Hope you like it!',
        profile_img='',
        banner_img='',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    karen = User(
        first_name='Karen',
        last_name='Smith',
        username='trueKaren',
        email='true@karen.com',
        birthday='1985-03-06',
        bio='The one true Karen',
        profile_img='',
        banner_img='',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    chad = User(
        first_name='Chad',
        last_name='Giga',
        username='giga-chad',
        email='alpha@chad.com',
        birthday='1993-11-26',
        bio='Jersey Shore shaped my life',
        profile_img='',
        banner_img='',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    elon = User(
        first_name='Elon',
        last_name='Musk',
        username='elonmusk',
        email='musk@elon.com',
        birthday='1995-08-06',
        bio='',
        profile_img='',
        banner_img='',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    elon = User(
        first_name='Elon',
        last_name='Musk',
        username='elonmusk',
        email='musk@elon.com',
        birthday='1995-08-06',
        bio='',
        profile_img='',
        banner_img='',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    demo.followers.append(lebron)
    elon.followers.append(lebron)
    elon.followers.append(demo)
    jae.followers.append(demo)
    karen.followers.append(jae)
    chad.followers.append(jae)


    db.session.add(lebron)
    db.session.add(demo)
    db.session.add(elon)
    db.session.add(jae)
    db.session.add(karen)
    db.session.add(chad)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
