from app.models import db, User
import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    lebron = User(
        name='LeBron James',
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
        name='Demo User',
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
        name='Elon Musk',
        username='elonmusk',
        email='musk@elon.com',
        birthday='1980-08-06',
        bio='',
        profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFTpXU-xX0AABLTK%3Fformat%3Djpg%26name%3Dlarge&f=1&nofb=1',
        banner_img='https://pbs.twimg.com/profile_banners/44196397/1576183471/1500x500',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    jack = User(
        name='jack',
        username='jack',
        email='jack@dors.com',
        birthday=None,
        bio='#bitcoin',
        profile_img='https://pbs.twimg.com/profile_images/1115644092329758721/AFjOr-K8_400x400.jpg',
        banner_img='https://pbs.twimg.com/profile_banners/12/1584998840/1500x500',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    karen = User(
        name='The Karen',
        username='trueKaren',
        email='true@karen.com',
        birthday='1985-03-06',
        bio="You know why I'm here",
        profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstayhipp.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fkaren.jpg&f=1&nofb=1',
        banner_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.tUzHBQKX37tw1GYKoY6LoAHaEo%26pid%3DApi&f=1',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    chad = User(
        name='Chad Giga',
        username='giga-chad',
        email='giga@chad.com',
        birthday='1983-11-26',
        bio='Eat, Sleep, Lift',
        profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.g97EKfg7T-OC5i4yt2q6CQHaEK%26pid%3DApi&f=1',
        banner_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.a1IQcN8inZARPPwflhRCqwHaDW%26pid%3DApi&f=1',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    mark = User(
        name='Mark Zuc',
        username='metaMark',
        email='metak@make.com',
        birthday='1955-08-06',
        bio='',
        profile_img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.n1D7DNqXc6tLGKxtKUtRFgHaE7%26pid%3DApi&f=1',
        banner_img='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F11%2F64%2FkEgxZh.png&f=1&nofb=1',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    funny = User(
        name='Copy Paste',
        username='swiper',
        email='copy@paste.com',
        birthday='1997-02-18',
        bio='I steal tweets',
        profile_img='https://twitter.com/memeadikt/photo',
        banner_img='https://twitter.com/FreeMemesKids__/header_photo',
        password='password',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        )
    demo.followers.append(lebron)
    elon.followers.append(lebron)
    elon.followers.append(demo)
    jack.followers.append(elon)
    karen.followers.append(elon)
    karen.followers.append(jack)
    chad.followers.append(jack)
    mark.followers.append(chad)
    mark.followers.append(karen)
    funny.followers.append(mark)
    funny.followers.append(lebron)
    funny.followers.append(chad)
    funny.followers.append(karen)
    funny.followers.append(jack)


    db.session.add(lebron)
    db.session.add(demo)
    db.session.add(elon)
    db.session.add(jack)
    db.session.add(karen)
    db.session.add(chad)
    db.session.add(mark)
    db.session.add(funny)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
