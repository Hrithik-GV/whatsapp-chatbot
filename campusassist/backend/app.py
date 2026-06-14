import jwt
import datetime
import bcrypt
import os
from functools import wraps
from bson.objectid import ObjectId
from flask import Flask, request, jsonify,Response
from flask_cors import CORS
from twilio.twiml.messaging_response import MessagingResponse
from db import faq_collection, admin_collection

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET', 'super-secret-default-key')
CORS(app)

# JWT Middleware
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_admin = admin_collection.find_one({"_id": ObjectId(data['admin_id'])})
            if not current_admin:
                return jsonify({'message': 'Admin not found!'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_admin, *args, **kwargs)
    return decorated


def get_bot_response(message):
    message_lower = message.lower()

    print(f"Incoming message: {message}")

    if faq_collection is None:
        return "I'm sorry, our database is currently down for maintenance. Please try again later."

    try:
        # Fetch all FAQs from MongoDB
        faqs = faq_collection.find()
        
        for faq in faqs:
            q = faq.get("question", "").lower()
            category = faq.get("category", "").lower()
            
            # Simple matching logic without AI/NLP
            # Matches if the category is in the user message, or if the message overlaps with the question
            if (category and category in message_lower) or (message_lower in q and len(message_lower) > 3) or (q in message_lower):
                return faq.get("answer")

    except Exception as e:
        print(f"Database error: {e}")
        return "I'm having trouble accessing my knowledge base right now."

    return "I'm sorry, I don't have an answer for that yet."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json

    if not data or "message" not in data:
        return jsonify({"success": False, "reply": "Invalid request"}), 400

    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"success": False, "reply": "Please enter a message"})

    bot_reply = get_bot_response(user_message)

    return jsonify({"success": True, "reply": bot_reply})

@app.route("/whatsapp", methods=["POST"])
def whatsapp():

    print("WhatsApp webhook hit")

    incoming_msg = request.values.get('Body', '').strip()

    response = MessagingResponse()

    if not incoming_msg:
        response.message("Please send a valid message.")

        return Response(
            str(response),
            mimetype="application/xml"
        )

    bot_reply = get_bot_response(incoming_msg)

    response.message(bot_reply)

    return Response(
        str(response),
        mimetype="application/xml"
    )

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "message": "CampusAssist AI Backend Running"
    })

@app.route("/test-faq", methods=["GET"])
def test_faq():
    if faq_collection is None:
        return jsonify({"error": "Database not connected"}), 500
        
    try:
        faq = faq_collection.find_one({}, {"_id": 0})
        if faq:
            return jsonify({
                "question": faq.get("question"),
                "answer": faq.get("answer")
            })
        else:
            return jsonify({"error": "No FAQs found in the collection"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- ADMIN ROUTES ---

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
        
    admin = admin_collection.find_one({"email": data['email']})
    if not admin:
        return jsonify({'message': 'Invalid credentials'}), 401
        
    if bcrypt.checkpw(data['password'].encode('utf-8'), admin['password'].encode('utf-8')):
        token = jwt.encode({
            'admin_id': str(admin['_id']),
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({
            'token': token,
            'admin': {
                'name': admin.get('name'),
                'email': admin.get('email'),
                'role': admin.get('role')
            }
        })
        
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/admin/faqs', methods=['GET'])
@token_required
def get_admin_faqs(current_admin):
    faqs = list(faq_collection.find())
    for faq in faqs:
        faq['_id'] = str(faq['_id'])
    return jsonify(faqs)

@app.route('/admin/faqs', methods=['POST'])
@token_required
def create_faq(current_admin):
    data = request.json
    new_faq = {
        "question": data.get("question"),
        "answer": data.get("answer"),
        "category": data.get("category"),
        "created_at": datetime.datetime.now(datetime.timezone.utc),
        "updated_at": datetime.datetime.now(datetime.timezone.utc),
        "is_active": True
    }
    result = faq_collection.insert_one(new_faq)
    new_faq['_id'] = str(result.inserted_id)
    return jsonify(new_faq), 201

@app.route('/admin/faqs/<id>', methods=['PUT'])
@token_required
def update_faq(current_admin, id):
    data = request.json
    update_data = {
        "question": data.get("question"),
        "answer": data.get("answer"),
        "category": data.get("category"),
        "updated_at": datetime.datetime.now(datetime.timezone.utc)
    }
    
    result = faq_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    if result.modified_count > 0:
        updated_faq = faq_collection.find_one({"_id": ObjectId(id)})
        updated_faq['_id'] = str(updated_faq['_id'])
        return jsonify(updated_faq)
    return jsonify({'message': 'FAQ not found or no changes made'}), 404

@app.route('/admin/faqs/<id>', methods=['DELETE'])
@token_required
def delete_faq(current_admin, id):
    result = faq_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'FAQ deleted successfully'})
    return jsonify({'message': 'FAQ not found'}), 404

@app.route('/admin/stats', methods=['GET'])
@token_required
def get_stats(current_admin):
    total = faq_collection.count_documents({})
    admissions = faq_collection.count_documents({"category": {"$regex": "admission", "$options": "i"}})
    hostel = faq_collection.count_documents({"category": {"$regex": "hostel", "$options": "i"}})
    placement = faq_collection.count_documents({"category": {"$regex": "placement", "$options": "i"}})
    
    return jsonify({
        "total": total,
        "admissions": admissions,
        "hostel": hostel,
        "placement": placement
    })

if __name__ == "__main__":
    app.run(debug=True)