import datetime
from db import conversations_collection

def store_message(session_id, role, message):
    """
    Stores a single message in the MongoDB conversations collection.
    """
    if conversations_collection is None:
        return
        
    try:
        conversations_collection.insert_one({
            "session_id": session_id,
            "source": "website",
            "role": role,
            "message": message,
            "timestamp": datetime.datetime.now(datetime.timezone.utc)
        })
    except Exception as e:
        print(f"Failed to store conversation message: {e}")

def get_chat_history(session_id):
    """
    Retrieves the full chat history for a given session ID,
    sorted chronologically (oldest to newest).
    """
    if conversations_collection is None:
        return []
        
    try:
        # Retrieve and sort ascending to restore UI correctly
        history = list(conversations_collection.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1))
        return history
    except Exception as e:
        print(f"Failed to retrieve chat history: {e}")
        return []

def get_context_for_gemini(session_id, limit=30):
    """
    Retrieves recent chat history for Gemini context,
    sorted chronologically.
    """
    if conversations_collection is None:
        return []
        
    try:
        # Sort descending to get the most recent 'limit' messages,
        # then reverse the python list so it's chronological for the prompt.
        cursor = conversations_collection.find(
            {"session_id": session_id},
            {"_id": 0, "role": 1, "message": 1}
        ).sort("timestamp", -1).limit(limit)
        
        recent_history = list(cursor)
        recent_history.reverse()
        return recent_history
    except Exception as e:
        print(f"Failed to retrieve context for Gemini: {e}")
        return []
