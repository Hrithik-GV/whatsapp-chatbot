# 🎓 CampusAssist AI

CampusAssist AI is an AI-powered college support assistant designed to help students instantly access information about admissions, academics, placements, hostels, scholarships, examinations, and campus facilities through both website chat and WhatsApp.

The project combines Semantic Search, Generative AI, Conversation Memory, and an Admin Dashboard to provide an intelligent and scalable student support system.

---

# 🚀 Features

## 🤖 AI-Powered College Assistant

CampusAssist AI can answer questions related to:

* Admissions
* Courses
* Fees
* Hostel
* Scholarships
* Placements
* Examinations
* Campus Facilities
* Academic Information

---

## 🌐 Website Chatbot

* Embedded chatbot widget for college websites
* Works without login or registration
* Anonymous session support
* Conversation memory
* Chat persistence across sessions

---

## 📱 WhatsApp Chatbot

Students can interact using WhatsApp.

Current implementation:

* Twilio WhatsApp Sandbox
* Flask Webhook Integration
* Automatic Replies

Future upgrade:

* WhatsApp Business API
* Meta WhatsApp Cloud API

---

## 🧠 Semantic Search

Traditional keyword matching has been replaced with Semantic Search.

Example:

Student asks:

> How much does hostel accommodation cost?

FAQ stored:

> What is the hostel fee?

CampusAssist AI understands that both questions have the same meaning and returns the correct answer.

### Technologies Used

* sentence-transformers
* all-MiniLM-L6-v2
* scikit-learn
* cosine similarity

---

## ✨ Gemini AI Fallback

If semantic search cannot find a suitable FAQ:

Student Question
↓
Semantic Search
↓
No Match Found
↓
Gemini AI
↓
AI Response

This allows the chatbot to answer new and previously unseen questions.

---

## 💬 Conversation Memory

The chatbot remembers previous conversations.

Example:

Student:

> What is hostel fee?

Bot:

> Hostel fee is ₹80,000 per year.

Student:

> What facilities are available?

The chatbot understands that the student is referring to hostel facilities.

---

## 🔒 JWT Authentication

Admin functionality is protected using JWT authentication.

Protected features include:

* Add FAQ
* Edit FAQ
* Delete FAQ
* Dashboard Access

---

## 📊 Admin Dashboard

Administrators can manage chatbot knowledge without modifying code.

Features:

* Add FAQ
* Update FAQ
* Delete FAQ
* Search FAQ
* View Statistics
* Manage Knowledge Base

---

## 💾 Conversation Persistence

Anonymous users receive a unique session ID.

The chatbot:

* Stores conversations in MongoDB
* Restores conversations automatically
* Maintains context between visits

No login or phone number is required.

---

## 🧹 Automatic Cleanup

Old conversations are automatically removed using MongoDB TTL indexes.

Current retention period:

* 30 days

Benefits:

* Prevents unlimited database growth
* Reduces storage costs
* Keeps the database clean

---

# 🏗️ System Architecture

## Website Chat Flow

Student
↓
React Chat Widget
↓
Session ID stored in localStorage
↓
Flask Backend API
↓
Semantic Search
↓
FAQ Match Found?
├── Yes → FAQ Response
└── No → Gemini AI Fallback
↓
MongoDB Conversation Storage
↓
Conversation Memory
↓
Response to Student

---

## WhatsApp Chat Flow

Student
↓
WhatsApp
↓
Twilio WhatsApp Sandbox
↓
Flask Backend API
↓
Semantic Search
↓
FAQ Match Found?
├── Yes → FAQ Response
└── No → Gemini AI Fallback
↓
MongoDB Storage
↓
Response to Student

---

# 📂 Project Structure

```text
campusassist/
│
├── backend/
│   │
│   ├── __pycache__/
│   ├── scripts/
│   ├── services/
│   │   ├── embedding_service.py
│   │   ├── semantic_search.py
│   │   ├── gemini_service.py
│   │   └── conversation_service.py
│   │
│   ├── venv/
│   ├── .env
│   ├── .env.example
│   │
│   ├── app.py
│   ├── config.py
│   ├── create_admin.py
│   ├── db.py
│   ├── seed_db.py
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── widget/
│   └── widget.js
│
├── .gitignore
└── render.yaml
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Tailwind CSS
* Vite

## Backend

* Flask
* Python

## Database

* MongoDB Atlas

## Artificial Intelligence

* sentence-transformers
* all-MiniLM-L6-v2
* scikit-learn
* Google Gemini API

## Authentication

* JWT Authentication

## Hosting

* Render
* Vercel

## Messaging

* Twilio WhatsApp Sandbox

---

# 🗄️ Database Collections

## faqs

Stores:

* Questions
* Answers
* Categories
* Embeddings
* Search text

---

## conversations

Stores:

* Session ID
* User Messages
* Bot Responses
* Timestamps

---

## unanswered_questions

Stores:

* Gemini answered questions
* Similarity scores
* Timestamps

Used to improve future FAQ coverage.

---

## admins

Stores:

* Admin credentials
* Roles
* Permissions

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Hrithik-GV/whatsapp-chatbot
cd campusassist
```

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create environment file:

```env
MONGO_URI=
JWT_SECRET_KEY=
GEMINI_API_KEY=
```

Start Flask server:

```bash
python app.py
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🌐 Deployment

## Backend

Hosted on Render.

Backend URL:

```text
https://campusassist-backend.onrender.com
```

---

## Frontend

Hosted on Vercel.

Frontend URL:

```text
<frontend-url>
```

---

## Widget

Embeddable widget script:

```html
<script src="<widget-url>/widget.js"></script>
```

---

## GitHub Repository

Repository URL:

```text
https://github.com/Hrithik-GV/whatsapp-chatbot
```

---

# 📈 Development Journey

## Phase 1

Hardcoded FAQs inside Flask backend.

## Phase 2

WhatsApp integration using Twilio Sandbox.

## Phase 3

Embeddable website widget.

## Phase 4

Migration to MongoDB Atlas.

## Phase 5

JWT Authentication.

## Phase 6

Admin Dashboard.

## Phase 7

Semantic Search.

## Phase 8

Gemini AI Fallback.

## Phase 9

Conversation Memory and Chat Persistence.

---

# 🔮 Future Roadmap

Planned features:

* Retrieval Augmented Generation (RAG)
* PDF Knowledge Base
* Syllabus Search
* Notice Search
* Placement Documents Search
* Multi-College SaaS Platform
* Production WhatsApp Business API
* Analytics Dashboard
* Multi-language Support

---

# 🎯 Project Vision

CampusAssist AI aims to become a complete AI-powered student support platform capable of assisting students through:

* Website Chat
* WhatsApp
* Document Intelligence
* AI Conversations
* Institutional Knowledge Management

The goal is to provide a single centralized platform for handling student queries while reducing administrative workload.

---

# 👨‍💻 Author

## Hrithik G V

Interests:

* Artificial Intelligence
* Machine Learning
* Full Stack Development
* Building AI-powered products

GitHub:

https://github.com/Hrithik-GV

LinkedIn:

https://www.linkedin.com/in/hrithik-g-v-ba2683385

---

