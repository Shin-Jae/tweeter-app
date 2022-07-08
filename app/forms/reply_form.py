from flask_wtf import FlaskForm
# from sqlalchemy import Integer
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def content_length(form, field):
    content = field.data
    if len(content) > 280:
        raise ValidationError('Tweet must be shorter than 280 characters')

class ReplyForm(FlaskForm):
    content = StringField('content', validators=[DataRequired(), content_length])
