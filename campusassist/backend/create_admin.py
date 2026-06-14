import os
import bcrypt
import datetime
from db import admin_collection

def create_initial_admin():
    if admin_collection is None:
        print("Database not connected.")
        return

    email = "admin@college.com"
    existing = admin_collection.find_one({"email": email})
    if existing:
        print("Admin user already exists.")
        return

    password = "password"
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    admin_doc = {
        "name": "Super Admin",
        "email": email,
        "password": hashed.decode('utf-8'),
        "role": "super_admin",
        "created_at": datetime.datetime.now(datetime.timezone.utc),
        "is_active": True
    }

    result = admin_collection.insert_one(admin_doc)
    print(f"Created initial admin with ID: {result.inserted_id}")
    print(f"Email: {email}")
    print(f"Password: {password}")

if __name__ == "__main__":
    create_initial_admin()
