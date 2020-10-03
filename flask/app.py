from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from apps.user.models import *
from apps import create_app

app = create_app()

manager = Manager(app)

migrate = Migrate(app=app, db=db)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
