import os
import sys
import datetime

# Add the backend directory to sys.path so we can import modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db import faq_collection
from services.embedding_service import generate_embedding

def regenerate():
    print("Fetching all FAQs...")
    faqs = list(faq_collection.find())
    
    if not faqs:
        print("No FAQs found.")
        return
        
    for faq in faqs:
        question = faq.get("question", "")
        search_text = faq.get("search_text", "")
        answer = faq.get("answer", "")
        
        # New embedding logic
        embedding_text = f"{question} {search_text} {answer}".strip()
        embedding = generate_embedding(embedding_text)
        
        # Update MongoDB
        faq_collection.update_one(
            {"_id": faq["_id"]},
            {"$set": {
                "embedding": embedding,
                "search_text": search_text,
                "updated_at": datetime.datetime.now(datetime.timezone.utc)
            }}
        )
        
        print(f"Updated FAQ:\n{question}\n")
        
    print("Embeddings regenerated successfully.")

if __name__ == "__main__":
    regenerate()
