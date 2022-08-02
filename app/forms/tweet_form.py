from flask_wtf import FlaskForm
# from sqlalchemy import Integer
from wtforms import StringField, IntegerField,DateField
from wtforms.validators import DataRequired, ValidationError

def content_length(form, field):
    content = field.data
    if len(content) < 2:
        raise ValidationError('should be at least 2 characters')

class TweetForm(FlaskForm):
    content = StringField('content', validators=[DataRequired(), content_length])
    image = StringField('image')
