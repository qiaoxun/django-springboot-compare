from flask import Flask
import settings
from apps.deployment.views import deployment_bp
from apps.user.views import user_bp
from ext import db, api
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    app.config.from_object(settings.DevelopmentConfig)
    db.init_app(app)
    # db.create_all()

    api.init_app(app)

    # user
    app.register_blueprint(user_bp)

    # deployment
    app.register_blueprint(deployment_bp)

    print('----------------------')
    print(app.url_map)

    return app
