from flask import Flask
import settings
from apps.deployment.views import deployment_bp
from apps.user.views import user_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(settings)

    # user
    app.register_blueprint(user_bp)

    # deployment
    app.register_blueprint(deployment_bp)

    return app
