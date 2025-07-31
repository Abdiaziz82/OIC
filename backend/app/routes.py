from flask import Blueprint ,request ,jsonify,session
from app.models import User
from app import db
import bcrypt
auth_bp = Blueprint('auth_bp' , __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    
    data = request.get_json()
    password = data.get('password')
    if not data or not data.get('email') or not data.get('password') or not data.get('confirmPassword') or not data.get('name'):
        return jsonify({'error': "missing required fields"}), 400
    if not any(c.isupper() for c in  password):
        return(jsonify({'error':"password must contain at least one uppercase letter"}) , 400)
    if not any(c.islower() for c in  password):
        return(jsonify({'error':"password must contain at least one lowercase letter"}) , 400)
    if not any(c.isdigit() for c in  password):
        return(jsonify({'error':"password must contain at least one digit"}) , 400)
    if len(data['password']) < 5:
        return(jsonify({'error':"password must be at least 5 characters long"}) , 400)
    if data['password'] != data['confirmPassword']:
        return(jsonify({'error':"passwords do not match"}) , 400)
    if User.query.filter_by(email=data['email']).first():
        return(jsonify({'error':"this email is already registered"}) , 400)
    hashed_password = bcrypt.hashpw(data.get('password').encode('utf-8'), bcrypt.gensalt())
    
    user = User(
        fullname = data.get('name'),
        email = data.get('email'),
        password = hashed_password.decode('utf-8')
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        "message":"user registered successfully",
        "user":{
            "id": user.id,
            "fullname":user.fullname,
        }
        }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"error":"please provide the correct emailaddress and the password "}) ,404
    
    session.permanent = True
    session['user_id'] = user.id
    session['user_name'] = user.fullname
    
    return jsonify({
        "message" :"you are logged in successfully",
        "user" :{
            "id" :user.id,
            "fullname": user.fullname,
        }
    }) , 200

@auth_bp.route('/logout', methods=['POST'])
def logout_user():
    session.clear()
    return jsonify({"message":"you are logged out successfully"}), 200

@auth_bp.route('/access_user_dash' , methods=['GET'])
def access_user_dash():
    if 'user_id' not in session:
        return jsonify({"error": "you are not authorized to access this page"}), 401
    
    return jsonify({
        "message": "welcome to your dashboard",
        "user":{
            "id": session['user_id'],
            "fullname": session['user_name']
        }
    }), 200
    
@auth_bp.route('/get_current_user', methods=['GET'])
def get_current_user():
    if 'user_id' not in session:
        return jsonify({"error": "you are not authorized to access this page"}), 401
    
    user = User.query.filter_by(id=session['user_id']).first()
    if not user:
        return jsonify({"error": "user not found in the database  "}), 404
    
    return jsonify({
        
            "id" :user.id,
            "fullname": user.fullname,
            "email": user.email
       
    })
    
