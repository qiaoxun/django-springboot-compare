from flask import Blueprint

user_bp = Blueprint('user', __name__)


@user_bp.route('/')
def index():

    return 'index'


@user_bp.route('/login')
def login():

    return 'login'

