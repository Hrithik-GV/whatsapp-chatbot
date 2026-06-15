import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from services.embedding_service import generate_embedding
from config import SIMILARITY_THRESHOLD

def find_best_faq_match(user_question, faq_collection):
    """
    Compare the user question against all FAQ embeddings in the database.
    Return the best matching FAQ's answer if it exceeds the similarity threshold.
    """
    try:
        faqs = list(faq_collection.find({"embedding": {"$exists": True, "$ne": []}}))
        
        if not faqs:
            print("No FAQs with embeddings found in collection.")
            return None

        user_embedding = generate_embedding(user_question)
        
        if not user_embedding:
            return None
            
        faq_embeddings = [faq.get("embedding") for faq in faqs]
        
        # Calculate cosine similarity
        similarities = cosine_similarity([user_embedding], faq_embeddings)[0]
        
        best_index = np.argmax(similarities)
        best_score = similarities[best_index]
        
        print(f"Best match score: {best_score} for question: '{faqs[best_index].get('question')}'")
        
        if best_score >= SIMILARITY_THRESHOLD:
            return faqs[best_index], best_score
            
        return None, best_score
    except Exception as e:
        print(f"Error during semantic search: {str(e)}")
        return None, 0.0
