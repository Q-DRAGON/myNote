from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask import redirect, url_for, abort
from flask_bootstrap import Bootstrap
from flask import request, render_template
import os
import json

app = Flask(__name__)
db = SQLAlchemy()

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'todo.sqlite')
app.config['SECRET_KEY'] = 'random key'
db.init_app(app)
bootstrap = Bootstrap(app)
Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


class ModelMixin(object):
    def __repr__(self):
        classname = self.__class__.__name__
        properties = ('{}:{}'.format(k, v) for k, v in self.__dict__.items())
        return '{}:\r\n{}'.format(classname, '\n'.join(properties))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Todo(db.Model, ModelMixin):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String())
    time = db.Column(db.Integer)
    done = db.Column(db.Boolean)

    def __init__(self, form):
        print('form', form)
        self.content = form.get('content', '')
        self.time = form.get('time', '')
        self.done = form.get('done', False)

    def json(self):
        d = dict(
            id=self.id,
            content=self.content,
            time=self.time,
            done=self.done
        )
        return json.dumps(d)


@app.route('/', methods=['get', 'post'])
def index():
    todos = Todo.query.all()
    return render_template('test.html', todos=todos)


@app.route('/api/todo/add', methods=['post'])
def add():
    data = request.get_data()
    data = data.decode('utf-8')
    form = json.loads(data)
    print('form', form)
    t = Todo(form)
    r = {
        'data': {}
    }
    if t is not None:
        t.save()
        data = t.json()
        r['success'] = True
        r['data'] = data
    else:
        r['success'] = False
        r['message'] = 'todo add failure'
    return json.dumps(r, ensure_ascii=False)


@app.route('/api/todo/delete/<int:id>', methods=['post'])
def delete(id):
    t = Todo.query.get(id)
    ts = Todo.query.all()
    [m.delete() for m in ts if (t.id == m.id)]
    r = {
        'success': True,
        'id': id
    }
    return json.dumps(r, ensure_ascii=False)


@app.route('/api/todo/update', methods=['post'])
def update():
    data = request.get_data()
    data = data.decode('utf-8')
    t = Todo(data)
    td = Todo.query.get(t.id)
    r = {
        'data': {}
    }
    if t is not None:
        td = t
        td.save()
        data = td.json()
        r['success'] = True
        r['data'] = data
    else:
        r['success'] = False
        r['message'] = 'todo update failure'
    return json.dumps(r, ensure_ascii=False)


@manager.command
def db_built():
    db.drop_all()
    db.create_all()

@manager.command
def server():
    config = dict(
        debug=True,
        host='localhost',
        port=5000,
    )
    app.run(**config)


if __name__ == '__main__':
    manager.run()
    server()

