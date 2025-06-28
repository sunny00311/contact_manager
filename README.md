# 📇 Contact Manager API

This is a RESTful API for a **Contact Manager** app. It allows users to **sign up**, **log in**, and **manage their contacts** (create, update, delete). The backend is built with **Express**, uses **JWT** for authentication, and stores data in a **MySQL** database.

---

## 🚀 Features

✅ User Signup  
✅ User Login (JWT Authentication)  
✅ Create Contact  
✅ Update Contact  
✅ Delete Contact  

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **JWT (jsonwebtoken)**
- **MySQL**
- **bcryptjs**
- **dotenv**

---

## 📦 Dependencies

```json
"dependencies": {
  "async": "^3.2.6",
  "bcryptjs": "^3.0.2",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "express-async-handler": "^1.2.0",
  "handler": "^0.1.3",
  "mysql2": "^3.14.1",
  "nodemon": "^3.1.10"
}


⚙️ Setup and Installation
1️⃣ Clone the repository:


git clone https://github.com/yourusername/contact-manager-api.git
cd contact-manager-api
2️⃣ Install dependencies:


npm install
3️⃣ Create a .env file in the root with your configuration:

PORT=5000
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=your_database_name
ACCESS_TOKEN_SECRET=your_jwt_secret
4️⃣ Start the server:

npm run dev
Server will run on: 3000


📑 API Endpoints
🔐 Auth
Method	Endpoint	Description
POST	/api/users/signup	Register a new user
POST	/api/users/login	Login user, get JWT

📇 Contacts (Protected Routes)
✅ All routes below require the JWT in Authorization header as:

Bearer <your_token>
Method	Endpoint	Description
POST	/api/contacts	Create new contact
PUT	/api/contacts/:id	Update contact
DELETE	/api/contacts/:id	Delete contact

🗄️ Database Schema
users table
Field	Type	Notes
id	INT (PK, AI)	User ID
name	VARCHAR	User's name
email	VARCHAR	Unique, user's email
password	VARCHAR	Hashed password

contacts table
Field	Type	Notes
id	INT (PK, AI)	Contact ID
user_id	INT (FK)	ID of the user (owner)
name	VARCHAR	Contact's name
email	VARCHAR	Contact's email
phone	VARCHAR	Contact's phone number

✅ Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

