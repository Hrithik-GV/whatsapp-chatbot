from db import faq_collection

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
        # Check if the collection is already populated to avoid duplicates
        if faq_collection.count_documents({}) == 0:
            result = faq_collection.insert_many(faqs_data)
            print(f"Success! Inserted {len(result.inserted_ids)} FAQs into your MongoDB cluster.")
        else:
            print(f"Your database already has {faq_collection.count_documents({})} FAQs in it!")
