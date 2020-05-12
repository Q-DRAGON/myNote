from flask import session
from flask import request
from flask import Blueprint
from flask import redirect, url_for
import json
import time

from functools import wraps
from models.user import User


def api_response(code='', data={}, message=''):
    r = dict(
        code=code,
        data=data,
        message=message
    )
    return json.dumps(r, ensure_ascii=False)


def current_user():
    uid = session.get('user_id')
    if uid is not None:
        user = User.query.get(uid)
        return user
    else:
        return None


# 因为前端已经做了这个工作，所以不要用到了
def login_required(f):
    @wraps(f)
    def function(*args, **kwargs):
        u = current_user()
        if u is None:
            return redirect(url_for('user.login'))
        return f(u, *args, **kwargs)
    return function
