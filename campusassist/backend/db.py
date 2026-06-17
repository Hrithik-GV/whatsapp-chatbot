import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ConfigurationError
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

def get_db_connection():
    if not MONGO_URI:
        print("ERROR: MONGO_URI is not set in environment variables.")
        return None
    
    try:
        # Create a connection with a 5-second timeout
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        # Verify connection
        client.admin.command('ping')
        print("Successfully connected to MongoDB Atlas.")
        return client
    except (ConnectionFailure, ConfigurationError) as e:
        print(f"MongoDB Connection Error: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred while connecting to MongoDB: {e}")
        return None

client = get_db_connection()
faq_collection = None
admin_collection = None
unanswered_collection = None

if client:
    db = client["campusassist"]
    faq_collection = db["faqs"]
    admin_collection = db["admins"]
    unanswered_collection = db["unanswered_questions"]
