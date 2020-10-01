from flask import Blueprint

deployment_bp = Blueprint('deployment', __name__)


@deployment_bp.route('/deploy', methods=['GET'])
def deploy():
    return 'GET'


@deployment_bp.route('/deploy', methods=['POST'])
def deploy_update():
    return 'POST'

