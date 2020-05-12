from . import ModelMixin
from . import db
from datetime import datetime
from routes import current_user


class Post(db.Model, ModelMixin):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    content = db.Column(db.String(1000))

    def __init__(self, form):
        self.content = form.get('content', '')
        self.user = current_user()
