from sentence_transformers import SentenceTransformer

# Load model once during application startup
print("Loading all-MiniLM-L6-v2 embedding model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded successfully.")

def generate_embedding(text):
    """
    Generate an embedding for the given text.
    Returns a list of floats.
    """
    if not text:
        return []
    
    embedding = model.encode(text)
    return embedding.tolist()
