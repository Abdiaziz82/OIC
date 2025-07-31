
from flask import Flask ,send_from_directory ,request,jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import timedelta
import os
db = SQLAlchemy()


def create_app():

    app = Flask(__name__ , static_folder='../../frontend/dist' ,static_url_path='/')

    # Config 
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///site.db')

    app.secret_key = os.getenv('SECTRET_KEY')

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.update({
        "SESSION_COOKIE_SAMESITE": "lax",
         "SESSION_COOKIE_NAME": "user_session",
        "SESSION_COOKIE_SECURE": True, # in production 
        "SESSION_COOKIE_PATH": "/",
        "SESSION_COOKIE_DOMAIN": None, 
        "PERMANENT_SESSION_LIFETIME": timedelta(minutes=35),
        
    })

    CORS(app,  supports_credentials=True)

    db.init_app(app)
    Migrate(app, db)
    
    @app.route('/')
    def serve_react():
        return send_from_directory(app.static_folder , 'index.html')
    @app.route('/<path:path>')
    def serve_static(path):
            return send_from_directory(app.static_folder, path)
        
    @app.errorhandler(404)
    def not_found(e):
        if request.path.startswith('/api/'):
            return jsonify({"error": "Resource not found"}), 
        return send_from_directory(app.static_folder, 'index.html')
    
    from .routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix ='/api')

    return app
