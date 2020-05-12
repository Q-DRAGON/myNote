from routes import *
from models.user import User

main = Blueprint('user', __name__)

tokenMap = {
    'admin': 'admin-token',
    'user': 'user-token',
}


@main.route('/user/login', methods=['post'])
def login():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    u = User(form)
    user, msg = u.validate_login()
    code = ''
    if user is None:
        code = '-1'
        data = {},
    else:
        code = '0'
        user.token = tokenMap.get(user.role)
        user.save()
        data = user.json()
        session['user_id'] = user.id
    return api_response(code, data, msg)


@main.route('/user/getInfo', methods=['get'])
def getInfo():
    u = current_user()
    if u is not None:
        data = {
            'role': u.role,
            'username': u.username,
            'id': u.id,
        }
        return api_response('0', data, '查询成功')
    return api_response('-1', {}, '查询失败')


@main.route('/user/logout', methods=['get'])
def logout():
    session.pop('user_id', None)
    return api_response('0', [], '退出成功')


@main.route('/user/editUser', methods=['POST'])
def editUser():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    id = form.get('id')
    u = User.query.filter_by(id=id).first()
    if u is None:
        return api_response('-1', [], '修改失败')
    u.username = form.get('username')
    u.password = form.get('password')
    u.role = form.get('role')
    u.save()
    return api_response('0', [], '修改成功')


@main.route('/user/deleteUser', methods=['POST'])
def deleteUser():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    id = form.get('id')
    u = User.query.filter_by(id=id).first()
    if u is None:
        return api_response('-1', [], '删除失败')
    u.delete()
    return api_response('0', [], '删除成功')


@main.route('/user/deleteUsers', methods=['POST'])
def deleteUsers():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    ids = form.get('ids')
    if len(ids) == 0:
        return api_response('-1', [], '删除失败')
    for id in ids:
        u = User.query.filter_by(id=id).first()
        u.delete()
    return api_response('0', [], '删除成功')


@main.route('/user/register', methods=['POST'])
def register():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    m = ['role', 'password', 'username']
    status = True
    for k, v in form.items():
        if k in m:
            m.remove(k)
    if len(m) != 0:
        status = False
    if status:
        username = form.get('username')
        if User.query.filter_by(username=username).first():
            return api_response('-1', [], '用户名已存在')
        u = User(form)
        u.role = form.get('role')
        u.save()
        return api_response('0', [], '注册成功')
    else:
        return api_response('-1', [], '用户添加失败')


@main.route('/user/all', methods=['GET'])
def getAlluser():
    print("==============")
    users = User.query.all()
    users = [{
        'username': u.username,
        'role': u.role,
        'password': u.password,
        'id': u.id,
    } for u in users]
    return api_response('0', users, '查询成功')


@main.route('/user/test', methods=['GET'])
def getUserTest():
    print("============== test")
    return api_response('0', "hhhhh", '查询成功')
