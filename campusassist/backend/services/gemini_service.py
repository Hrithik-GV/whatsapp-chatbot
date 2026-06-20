import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("WARNING: GEMINI_API_KEY is missing from environment variables.")

# Define  system prompt
SYSTEM_INSTRUCTION = """You are CampusAssist AI, a college support assistant.
You help students with:
* Admissions
* Academics
* Courses
* Hostel
* Placements
* Scholarships
* Examinations
* Campus Facilities

CRITICAL RULES FOR RESPONSES:
1. Keep your answers brief, concise, and easy to understand.
2. Provide a maximum of 2-3 short sentences. Do not generate long explanations or bulleted lists unless absolutely necessary.

If a question is completely unrelated to college support, politely inform the user that you can only assist with college-related topics."""

# Initialize the model once
try:
    if GEMINI_API_KEY:
        model = genai.GenerativeModel(
            'gemini-2.5-flash',
            system_instruction=SYSTEM_INSTRUCTION
        )
    else:
        model = None
except Exception as e:
    print(f"Failed to initialize Gemini model: {e}")
    model = None

def get_gemini_response(question, chat_history=None):
    """
    Generate a response using Gemini AI.
    Handles errors and returns a clean text response.
    Includes previous chat history for context if provided.
    """
    if not model:
        return "I'm unable to answer that question at the moment. Please contact the college administration."
        
    try:
        # Build prompt with history
        prompt = ""
        if chat_history:
            prompt += "Previous conversation:\n"
            for msg in chat_history:
                role_name = "Student" if msg.get("role") == "user" else "Assistant"
                prompt += f"{role_name}: {msg.get('message')}\n"
            prompt += "\n"
            
        prompt += f"Student's Current Question: {question}"
        
        response = model.generate_content(prompt)
        if response and response.text:
            return response.text.strip()
        else:
            return "I'm unable to answer that question at the moment. Please contact the college administration."
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        return "I'm unable to answer that question at the moment. Please contact the college administration."
