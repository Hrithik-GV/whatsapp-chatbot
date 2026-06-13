from flask import Flask, request, jsonify,Response

from flask_cors import CORS
from twilio.twiml.messaging_response import MessagingResponse
from db import faq_collection

app = Flask(__name__)
CORS(app)

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

if __name__ == "__main__":
    app.run(debug=True)