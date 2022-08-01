"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 02:07:02.230689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ffdc0a98111c"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('birthday', sa.Date()),
    sa.Column('profile_img', sa.String(length=2000)),
    sa.Column('banner_img', sa.String(length=2000)),
    sa.Column('bio', sa.String(length=280)),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('tweets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=280), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('replies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('tweet_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=280), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.ForeignKeyConstraint(['tweet_id'], ['tweets.id']),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('follows',
    sa.Column('follower_id', sa.Integer()),
    sa.Column('followed_id', sa.Integer()),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id']),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id']),
    )
    op.create_table('tweet_likes',
    sa.Column('users', sa.Integer()),
    sa.Column('tweets', sa.Integer()),
    sa.ForeignKeyConstraint(['users'], ['users.id']),
    sa.ForeignKeyConstraint(['tweets'], ['tweets.id']),
    )
    op.create_table('reply_likes',
    sa.Column('users', sa.Integer()),
    sa.Column('replies', sa.Integer()),
    sa.ForeignKeyConstraint(['users'], ['users.id']),
    sa.ForeignKeyConstraint(['replies'], ['replies.id']),
    )
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    # op.drop_table('tweet_likes')
    # op.drop_table('reply_likes')
    op.drop_table('replies')
    op.drop_table('tweets')
    op.drop_table('users')
    # ### end Alembic commands ###
