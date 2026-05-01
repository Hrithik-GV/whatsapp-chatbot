import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.twiml.messaging_response import MessagingResponse
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Google Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="You are CampusAssist AI, a helpful and professional student support assistant for a college. Answer student queries about admissions, courses, hostels, and general campus life. Be concise, friendly, and helpful. If you don't know the specific details about this specific college, give general guidance or suggest they contact the admissions office at info@college.edu."
)

# Predefined FAQs (Priority matching)
FAQS = {
    "admission": "Admissions are open for 2026. Visit our portal to apply.",
    "courses": "We offer B.Tech, M.Tech, and MBA programs.",
    "hostel": "Hostel facilities are available for both boys and girls.",
    "fee structure": "Fees vary by course. B.Tech is ?1,20,000 per year.",
    "hostel fee": "Hostel fee is ?80,000 per year.",
    "scholarship": "We offer merit-based and need-based scholarships.",
    "placement": "Our college has 100% placement assistance with top recruiters.",
    "library": "The library is open 24/7 for students.",
    "aiml syllabus": "Python, Mathematics, AI Basics, Data Structures."
}

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "online",
        "message": "CampusAssist AI Backend with Gemini AI is running.",
        "endpoints": ["/chat", "/whatsapp"]
    })

def get_bot_response(message):
    message_lower = message.lower()
    
    # 1. Try keyword matching first (Fast & Accurate for specific FAQs)
    for keyword, answer in FAQS.items():
        if keyword in message_lower:
            return answer
            
    # 2. Fallback to Gemini AI (DISABLED FOR NOW)
    # try:
    #     if os.getenv("GOOGLE_API_KEY") and "your_gemini_api_key_here" not in os.getenv("GOOGLE_API_KEY"):
    #         response = model.generate_content(message)
    #         return response.text
    #     else:
    #         return "I'm not sure about that. Could you please visit the admissions office or email us at info@college.edu?"
    # except Exception as e:
    #     print(f"Gemini Error: {e}")
    #     return "I'm having trouble processing your request right now. Please try again later."
    
    return "I'm sorry, I don't have an answer for that yet. Please ask about admissions, courses, hostels, fees, or scholarships!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    bot_reply = get_bot_response(user_message)
    return jsonify({"reply": bot_reply})

@app.route("/whatsapp", methods=["POST"])
def whatsapp():
    incoming_msg = request.values.get('Body', '').lower()
    resp = MessagingResponse()
    msg = resp.message()
    
    bot_reply = get_bot_response(incoming_msg)
    msg.body(bot_reply)
    
    return str(resp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
