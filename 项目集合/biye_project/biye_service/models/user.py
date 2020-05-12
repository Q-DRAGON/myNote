from . import ModelMixin
from . import db


class User(db.Model, ModelMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(200))
    username = db.Column(db.String(200))
    password = db.Column(db.String(200))
    posts = db.relationship('Post', backref='user',
                            lazy='dynamic')
    about_me = db.Column(db.String(200))
    token = db.Column(db.String(200))
    
    def __init__(self, form):
        self.username = form.get('username', '')
        self.password = form.get('password', '')

    def set_password(self, password):
        self.password = password

    def validate_login(self):
        user = User.query.filter_by(username=self.username).first()
        if user.password == self.password:
            return user, '登录成功'
        else:
            return None, '登录失败'
        
    def json(self):
        d = dict(
            id=self.id,
            role=self.role,
            token=self.token,
            username=self.username,
        )
        return d


