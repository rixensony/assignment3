# Employee Management Application

A full-stack web application designed for managing employee records, built with an Angular frontend and a Node.js / Express backend connected to MongoDB Atlas.

---

## 🚀 Features

- **Employee Directory**: View a real-time list of all employees with details including name, designation/position, and office location.
- **Add Employee**: User-friendly form with input validation to register new employees with their name, position, location, and salary.
- **Update Details**: Seamlessly modify existing employee records with automatic data pre-filling.
- **Delete Employee**: Instantly remove employee records from the database.
- **Single Page Application (SPA)**: Smooth client-side routing and instant updates powered by Angular.

---

## 🛠️ Technology Stack

- **Frontend**: Angular 12+, Bootstrap 5, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas via Mongoose ODM
- **Middleware**: CORS, Body-Parser (JSON & URL-encoded)

---

## 📡 REST API Reference

The backend provides the following RESTful API routes:

| HTTP Method | Endpoint | Description | Request Body Format |
|---|---|---|---|
| `GET` | `/api/employeelist` | Retrieve all employee records | _None_ |
| `GET` | `/api/employeelist/:id` | Retrieve a single employee by ID | _None_ |
| `POST` | `/api/employeelist` | Create a new employee record | `{"name": "...", "location": "...", "position": "...", "salary": 50000}` |
| `PUT` | `/api/employeelist` | Update an existing employee (Frontend format) | `{"_id": "...", "name": "...", "location": "...", "position": "...", "salary": 55000}` |
| `PUT` | `/api/employeelist/:id` | Update an existing employee by URL parameter | `{"name": "...", "location": "...", "position": "...", "salary": 55000}` |
| `DELETE` | `/api/employeelist/:id` | Delete an employee by ID | _None_ |

---

## 📂 Project Structure

```
├── app.js               # Express application server and MongoDB models/routes
├── package.json         # Project dependencies and startup scripts
├── dist/                # Pre-compiled Angular production build files
│   └── Frontend/        # Production bundle (HTML, JS, CSS, assets)
├── .gitignore           # Git ignore configuration
└── README.md            # Project documentation
```

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rixensony/assignment3.git
   cd assignment3
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
