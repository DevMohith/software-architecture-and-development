# Software Architecture and Development CollabLab

This repository is created by GitHub Classroom for the Software Architecture and Development CollabLab

Recipe Management System - Cooking Assistant

This repository contains the Recipe Management System, a full-stack web application built using a Microservices Architecture. The system allows users to create, view, edit, and delete recipes, while admins can manage users and analyze application usage.

Introduction

The Recipe Management System is designed using a Microservices Architecture, allowing for scalability, flexibility, and better maintenance. It follows a role-based access control (RBAC) mechanism, where:
Users can create, view, edit, and delete their own recipes.

Admins can manage user accounts and generate analytics reports.

Key Features:

User Authentication & Authorization (JWT-based)

Recipe Management (CRUD operations)

Smart Pantry Management (ingredient search and suggestions)

Analytics Dashboard

User Management

API Gateway for centralized microservices communication

Role-Based Access Control (RBAC)

Technologies Used:

Vue.js for the frontend

Node.js & Express for the backend

MongoDB for the database

Axios for HTTP requests

Docker for containerization

JWT for authentication

CORS for secure API communication

Swagger for API documentation

- Microservices Architecture

This project follows a Microservices Architecture, meaning that different functionalities are split into independent services. Each microservice runs separately and communicates through an API Gateway.

🔹 1. User Authentication Microservice

✅ Manages user login, registration, and authentication.

✅ Generates JWT tokens for role-based access control (RBAC).

✅ Ensures secure authentication via bcrypt.js for password hashing.

Routes:
POST /register - Register a new user , 

POST /login - Authenticate user & return JWT , 

GET /user/:id - Get user details , 

🔹 2. Recipe Vault Microservice

✅ Handles CRUD operations for recipes (Create, Read, Update, Delete).

✅ Supports image uploads using Multer.

✅ Allows users to manage their own recipes securely.

Routes:
POST /recipes - Add a new recipe , 

GET /recipes - Fetch all recipes , 

GET /recipes/:id - Fetch a specific recipe , 

PUT /recipes/:id - Update a recipe , 

DELETE /recipes/:id - Delete a recipe 

🔹 3. Analytics Microservice

✅ Logs recipe views and favorites.

✅ Admins can generate reports on recipe usage trends.

✅ Uses MongoDB for storing analytics data.

Routes:
POST /log-view - Log a recipe view , 

GET /admin/report - Generate analytics report (Admins only).

🔹 4. User Management Microservice

✅ Allows admins to view and delete users.

✅ Fetches user data from Authentication Microservice.

Routes:
GET /admin/users - Get all registered users , 

DELETE /admin/user/:id - Delete a user (Admin only).

🌐 API Gateway

The API Gateway acts as a centralized entry point for all microservices. It routes requests to the appropriate microservices.

✅ Handles CORS (Cross-Origin Resource Sharing)

✅ Implements Rate Limiting to prevent DDoS attacks

✅ Manages API Routing dynamically

Routes:
/api/auth → User Authentication Microservice

/api/recipes → Recipe Vault Microservice

/api/analytics → Analytics Microservice

/api/user-management → User Management Microservice

📥 Installation & Setup

To set up the project locally, follow these steps:

1️⃣ Clone the Repository

git clone https://github.com/Study-Program-Applied-Computer-Science/software-architecture-and-development-collablab.git

cd software-architecture-and-development-collablab

2️⃣ Install Dependencies - 
npm install

🚀 Running the Application

Run the following commands in separate terminals for each microservice:

1️⃣ Start API Gateway

cd Backend/api-gateway

npm install

npm start

2️⃣ Start User Authentication Service

cd Backend/services/auth-service

npm install

npm start

3️⃣ Start Recipe Vault Service

cd Backend/services/recipe-vault

npm install

npm start

4️⃣ Start Analytics Service

cd Backend/services/analytics-service

npm install

npm start

5️⃣ Start User Management Service

cd Backend/services/user-management

npm install

npm start

6️⃣ Start Frontend

cd Frontend

npm install

npm run serve

7️⃣ Open the Application

Once all services are running, open: 
http://localhost:5006

Running the Application with Docker Compose

Clone the Repository:

git clone https://github.com/Study-Program-Applied-Computer-Science/software-architecture-and-development-collablab.git

cd software-architecture-and-development-collablab

Ensure Docker and Docker Compose are installed: Make sure Docker and Docker Compose are installed on your machine. You can download them from Docker's official website.

Navigate to Backend/services Directory: Change the directory to Backend/services where the docker-compose.yml file is located:

cd Backend/services

Build and Start the Services: Run the following command to build and start all the services defined in the docker-compose.yml file:

docker-compose up --build

Access the Application: Once all services are running, open your browser and navigate to:

http://localhost:5006

Stopping the Services: To stop the services, press Ctrl+C in the terminal where docker-compose is running, or use the following command:

docker-compose down

These steps will enable you to run the entire application stack using Docker Compose.
