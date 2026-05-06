from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)
CORS(app)

FAQS = {
    "admission": "Admissions are open for 2026. Visit our portal to apply.",
    "courses": "We offer B.Tech, M.Tech, and MBA programs.",
    "hostel": "Hostel facilities are available for both boys and girls.",
    "fee structure": "Fees vary by course. B.Tech is ₹1,20,000 per year.",
    "hostel fee": "Hostel fee is ₹80,000 per year.",
    "scholarship": "We offer merit-based and need-based scholarships.",
    "placement": "Our college has strong placement support.",
    "library": "The library is open 24/7 for students.",
    "aiml syllabus": "Python, Mathematics, AI Basics, Data Structures."
}

def get_bot_response(message):
    message_lower = message.lower()

    print(f"Incoming message: {message}")

    for keyword, answer in FAQS.items():
        if keyword in message_lower:
            return answer

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
    incoming_msg = request.values.get('Body', '').strip()

    resp = MessagingResponse()

    if not incoming_msg:
        resp.message("Please send a valid message.")
        return str(resp)

    bot_reply = get_bot_response(incoming_msg)

    resp.message(bot_reply)

    return str(resp)

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)