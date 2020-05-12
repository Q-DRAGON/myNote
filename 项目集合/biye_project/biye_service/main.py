from flask import Flask
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_cors import CORS
from flask import render_template, redirect, url_for
from models import db
from routes.user import main as routes_user
from routes.post import main as routes_post

app = Flask(__name__)
# CORS(app, supports_credentials=True)
# db_path = 'biye.sqlite'
manager = Manager(app)


def configure_app():
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.secret_key = 'random_string'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(db_path)
    # mysql_str = 'mysql+pymysql://root:password@39.96.21.121:8557/biye'
    mysql_str = 'mysql+pymysql://root:password@49.234.21.254:8570/biye'
    app.config['SQLALCHEMY_DATABASE_URI'] = mysql_str
    db.init_app(app)
    app.register_blueprint(routes_user)
    app.register_blueprint(routes_post)


def configured_app():
    configure_app()
    return app


@manager.command
def server():
    app = configured_app()
    config = dict(
        debug=True,
        host='0.0.0.0',
        port=8562,
    )
    app.run(**config)


@app.route('/test')
def hello_world():
    return 'Hello World!'


@manager.command
def db_built():
    db.drop_all()
    db.create_all()


def configure_manager():
    Migrate(app, db)
    manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    print("--------------")
    configure_manager()
    configured_app()
    # manager.run()
    server()
    # app.run(debug=True)
