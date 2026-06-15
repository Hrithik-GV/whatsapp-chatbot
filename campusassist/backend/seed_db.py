from db import faq_collection
from services.embedding_service import generate_embedding
import datetime

faqs_data = [
    {
        "question": "What are the admission details?",
        "answer": "Admissions are open for 2026. Visit our portal to apply.",
        "category": "admission"
    },
    {
        "question": "What courses do you offer?",
        "answer": "We offer B.Tech, M.Tech, and MBA programs.",
        "category": "courses"
    },
    {
        "question": "Are there hostel facilities?",
        "answer": "Hostel facilities are available for both boys and girls.",
        "category": "hostel"
    },
    {
        "question": "What is the fee structure?",
        "answer": "Fees vary by course. B.Tech is ₹1,20,000 per year.",
        "category": "fee structure"
    },
    {
        "question": "What is the hostel fee?",
        "answer": "Hostel fee is ₹80,000 per year.",
        "category": "hostel fee"
    },
    {
        "question": "Are there scholarships available?",
        "answer": "We offer merit-based and need-based scholarships.",
        "category": "scholarship"
    },
    {
        "question": "How are the placements?",
        "answer": "Our college has strong placement support.",
        "category": "placement"
    },
    {
        "question": "Is there a library?",
        "answer": "The library is open 24/7 for students.",
        "category": "library"
    },
    {
        "question": "What is the AIML syllabus?",
        "answer": "Python, Mathematics, AI Basics, Data Structures.",
        "category": "aiml syllabus"
    }
]

if __name__ == "__main__":
    if faq_collection is None:
        print("Error: Could not connect to MongoDB.")
    else:
        print("Updating existing FAQs with embeddings...")
        faqs = list(faq_collection.find())
        updated_count = 0
        for faq in faqs:
            q = faq.get("question")
            if q and not faq.get("embedding"):
                print(f"Generating embedding for: {q}")
                embedding = generate_embedding(q)
                faq_collection.update_one(
                    {"_id": faq["_id"]},
                    {"$set": {"embedding": embedding, "updated_at": datetime.datetime.now(datetime.timezone.utc)}}
                )
                updated_count += 1
                
        # Ensure base FAQs are present
        if faq_collection.count_documents({}) == 0:
            for faq in faqs_data:
                faq["embedding"] = generate_embedding(faq["question"])
                faq["created_at"] = datetime.datetime.now(datetime.timezone.utc)
                faq["updated_at"] = datetime.datetime.now(datetime.timezone.utc)
                faq["is_active"] = True
            result = faq_collection.insert_many(faqs_data)
            print(f"Success! Inserted {len(result.inserted_ids)} FAQs into your MongoDB cluster.")
        else:
            print(f"Your database already has {faq_collection.count_documents({})} FAQs in it. Updated {updated_count} missing embeddings.")
