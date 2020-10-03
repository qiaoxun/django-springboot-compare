from flask import Blueprint
# from .models import User
from ext import db

deployment_bp = Blueprint('deployment', __name__)


@deployment_bp.route('/deploy', methods=['GET'])
def deploy():
    # user_list = User.query.all()
    # print(user_list)
    return 'GET'


@deployment_bp.route('/deploy', methods=['POST'])
def deploy_update():
    # admin = User(username='admin', email='admin@example.com')
    # guest = User(username='guest', email='guest@example.com')
    # db.session.add(admin)
    # db.session.add(guest)
    # db.session.commit()
    return 'POST'

