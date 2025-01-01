<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-mvp
</h1>
<h4 align="center">Track fitness goals, progress, share with friends, and authenticate users.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React Framework">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="Frontend Technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend Technology">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="Database Technology">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-mvp?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-mvp?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-mvp?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains a Minimum Viable Product (MVP) for a fitness tracker web application. It allows users to track their fitness goals, monitor progress, and share achievements, all while providing secure user authentication. The MVP is built using React for the frontend and Node.js for the backend, with data persistence using MongoDB. The application aims to simplify fitness goal management and progress tracking for fitness enthusiasts.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architecture with separate directories for components, context, hooks, services, and pages, ensuring maintainability. |
| 📄 | **Documentation**  | The repository includes a README file providing detailed information about the MVP, its dependencies, and usage instructions. |
| 🔗 | **Dependencies**   | Uses React for the UI, react-router-dom for navigation, axios for API calls, and zod for data validation.              |
| 🧩 | **Modularity**     | The codebase is structured with reusable components and utility functions, enhancing code maintainability and scalability.        |
| 🧪 | **Testing**        | Components and services are structured to be easily testable, supporting future expansion with robust testing strategies.       |
| ⚡️  | **Performance**    | The application is optimized for fast rendering and efficient data fetching, enhancing user experience.   |
| 🔐 | **Security**       | Secure user authentication and data handling are implemented, along with protection against common web vulnerabilities.  |
| 🔀 | **Version Control**| Utilizes Git for version control, with clear commit messages and branching strategies for collaborative development. |
| 🔌 | **Integrations**   |  Backend API provides RESTful endpoints for user authentication, goal management, and profile data, using axios for client requests.     |
| 📶 | **Scalability**    | Designed with scalability in mind, laying the groundwork for future features and increased user load.         |

## 📂 Structure
```text
├── components
│   ├── common
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   ├── features
│   │   ├── auth
│   │   │   └── AuthForm.jsx
│   │   ├── goals
│   │   │   ├── GoalCard.jsx
│   │   │   └── GoalForm.jsx
│   │   └── dashboard
│   │       └── DashboardStats.jsx
│   └── layout
│       ├── Footer.jsx
│       └── Header.jsx
├── pages
│   ├── Dashboard.jsx
│   ├── Goals.jsx
│   ├── Home.jsx
│   └── Profile.jsx
├── hooks
│   ├── useAuth.js
│   └── useFetch.js
├── context
│   └── AuthContext.js
├── services
│   ├── api.js
│   └── auth.js
├── utils
│   └── helpers.js
├── styles
│   └── global.css
├── public
│   ├── favicon.ico
│   └── index.html
├── .env
├── package.json
├── README.md
└── startup.sh
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18 or higher
> - npm v8 or higher
> - MongoDB installed and running

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-tracker-mvp.git
   cd fitness-tracker-mvp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
    ```bash
    cp .env.example .env
    # Edit .env and fill in the necessary variables
    ```
    - `REACT_APP_API_BASE_URL`: Base URL for the backend API (e.g., `http://localhost:3000/api`).
    - `MONGODB_URI`: MongoDB connection URI (e.g., `mongodb://localhost:27017/fitness_tracker`).
    - `JWT_SECRET`: Secret key for JWT signing (e.g., `your-secret-key`).

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
   - Web interface: `http://localhost:5173`

> [!TIP]
> ### ⚙️ Configuration
> - `REACT_APP_API_BASE_URL` in `.env` to configure backend API URL.
> -  MongoDB connection URI in `.env` to specify database connection.
> - JWT Secret key is also configured in `.env` file to protect the application.
>

### 📚 Examples
Provide specific examples relevant to the MVP's core features. For instance:

- 📝 **User Registration**:
  ```bash
    curl -X POST http://localhost:3000/api/auth/register \
          -H "Content-Type: application/json" \
          -d '{"username": "newuser", "email": "user@example.com", "password": "securepass123"}'
  ```

- 📝 **Setting a Fitness Goal**:
  ```bash
    curl -X POST http://localhost:3000/api/goals \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer YOUR_JWT_TOKEN" \
          -d '{"name": "Run 5k", "description": "Complete 5 kilometers", "targetValue": 5}'
  ```

- 📝 **Logging Progress**:
  ```bash
   curl -X POST http://localhost:3000/api/progress \
            -H "Content-Type: application/json" \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
            -d '{"goalId": "goal_id_here", "value": 2, "date": "2023-06-15"}'
  ```

## 🌐 Hosting
### 🚀 Deployment Instructions
Provide detailed, step-by-step instructions for deploying to a suitable platform for this MVP. For example:

#### Deploying to Render
1.  Create a new web service on Render.
2.  Connect your GitHub repository.
3.  Configure the following environment variables in Render:
     -  `REACT_APP_API_BASE_URL`: Base URL for the backend API
         Example: `https://your-api-url.com/api`
     - `MONGODB_URI`: MongoDB connection URI
         Example: `mongodb+srv://user:password@cluster.mongodb.net/fitness_tracker`
     -  `JWT_SECRET`: Secret key for JWT token generation
          Example: `your-256-bit-secret`
4.  Set the build command: `npm install && npm run build`
5.  Set the start command: `npm run start`
6.  Deploy the application.

### 🔑 Environment Variables
Provide a comprehensive list of all required environment variables, their purposes, and example values:

- `REACT_APP_API_BASE_URL`:  Base URL for the backend API
   Example:  `http://localhost:3000/api` or `https://your-api-url.com/api`
- `MONGODB_URI`: MongoDB connection URI
   Example: `mongodb://localhost:27017/fitness_tracker` or `mongodb+srv://user:password@cluster.mongodb.net/fitness_tracker`
- `JWT_SECRET`: Secret key for JWT token generation
  Example: `your-256-bit-secret`

## 📜 API Documentation
### 🔍 Endpoints
Provide a comprehensive list of all API endpoints, their methods, required parameters, and expected responses. For example:

- **POST /api/auth/register**
  - Description: Register a new user
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/auth/login**
    - Description: Login an existing user
    - Body: `{ "email": string, "password": string }`
    - Response: `{ "token": string, "user": { "username": string, "email": string } }`

- **POST /api/goals**
    - Description: Create a new fitness goal
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "name": string, "description": string, "startDate": date, "endDate": date, "targetValue": number }`
    - Response: `{ "id": number, "name": string, "description": string, "startDate": date, "endDate": date, "targetValue": number }`

-  **PUT /api/goals/:id**
  - Description: Update an existing fitness goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "name": string, "description": string, "startDate": date, "endDate": date, "targetValue": number }`
  - Response: `{ "id": number, "name": string, "description": string, "startDate": date, "endDate": date, "targetValue": number }`

-   **GET /api/goals**
  - Description: Get all goals
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[{"id": number, "name": string, "description": string, "startDate": date, "endDate": date, "targetValue": number }]`

-   **GET /api/profile**
    - Description: Get user profile information.
    - Headers: `Authorization: Bearer TOKEN`
    - Response:  `{"username": string, "email": string }`
-   **GET /api/dashboard**
     -  Description: Get dashboard statistics.
      - Headers: `Authorization: Bearer TOKEN`
      - Response: `{"totalWorkouts": number, "totalCaloriesBurned": number, "averageWorkoutTime": number, "bestWorkoutTime": number }`

### 🔒 Authentication
Explain the authentication process in detail:

1. Register a new user or login to receive a JWT token
2. Include the token in the Authorization header for all protected routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. Token expiration and refresh process (if applicable)

### 📝 Examples
Provide comprehensive examples of API usage, including request and response bodies:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
# Login an existing user
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "securepass123"}'

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "username": "fitnessuser",
        "email": "user@example.com"
    }
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"name": "Run 5k", "description": "Complete 5 kilometers", "targetValue": 5}'

# Response
{
  "id": 1,
  "name": "Run 5k",
  "description": "Complete 5 kilometers",
  "startDate": null,
  "endDate": null,
  "targetValue": 5
}
```
[Add more examples covering all major API functionalities]

> [!NOTE]
> ## 📜 License & Attribution
>
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
>
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
>
> No human was directly involved in the coding process of the repository: fitness-tracker-mvp
>
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>