# CodeArchitect -- AI-Powered Website Generation & Deployment Platform

## 📝 Problem Statement

Modern web development involves many disconnected tools and repeated
setup steps, which creates friction --- especially for beginners.

Common difficulties include:

-   **Integration gaps** --- no smooth link between local project files,
    GitHub, and Vercel, leading to manual steps and mistakes.\
-   **Customization limits** --- changing layouts, themes, or features
    often requires manual rewriting of large parts of code.\
-   **Setup problems** --- the same project has to be configured
    multiple times, and builds fail differently across systems.\
-   **User challenges** --- beginners struggle with deployment workflows
    and unclear error messages.

CodeArchitect addresses these challenges by providing a unified
AI‑driven platform that can:

-   generate complete website code from natural language prompts\
-   automatically structure projects\
-   connect seamlessly to GitHub and Vercel\
-   guide users through deployment with minimal effort

This reduces time, errors, and complexity while supporting professional
development standards.

------------------------------------------------------------------------

## 📌 Project Overview

CodeArchitect is an AI-powered web application designed to automate the
complete website development lifecycle. It enables users to generate
fully functional websites using natural language prompts, manage the
generated code, push it directly to GitHub, and deploy the application
instantly. The system focuses on reducing development effort while
maintaining modern development standards.

------------------------------------------------------------------------

## 🎯 Objectives

-   Simplify website development using AI-driven prompt-based
    generation\
-   Automate code structuring and version control\
-   Enable one-click deployment workflows\
-   Provide an interactive and user-friendly interface for developers
    and beginners

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React.js\
-   HTML5, CSS3, JavaScript\
-   Custom animated UI components (Cute Lamp Login UI)

### Backend

-   Node.js\
-   Express.js\
-   RESTful APIs

### Database

-   MongoDB (User authentication & project data)

### AI Integration

-   Large Language Model (LLM) for website code generation

### DevOps & Deployment

-   GitHub (Version Control)\
-   Vercel (Deployment)

------------------------------------------------------------------------

## 🔐 Authentication Module

-   Secure user login with database-backed authentication\
-   Password hashing using bcrypt\
-   Token-based authentication using JWT\
-   Interactive animated login UI with visual feedback states

------------------------------------------------------------------------

## ⚙️ Core Features

-   AI-based website generation from user prompts\
-   Automatic folder and file structure creation\
-   Code preview and editing interface\
-   GitHub repository integration\
-   Automatic redeployment on code updates\
-   Responsive and interactive UI\
-   Admin and user role separation

------------------------------------------------------------------------

## 📊 System Design

-   UML Use Case Diagram\
-   Class Diagram\
-   Sequence Diagrams (User--System & Admin--System interaction)\
-   Modular MVC-based architecture

------------------------------------------------------------------------

## 🚀 Implementation Workflow

1.  User logs into the system\
2.  User provides a natural language prompt\
3.  AI generates complete website code\
4.  Code is displayed and reviewed\
5.  Project is pushed to GitHub\
6.  Website is deployed via Vercel\
7.  Live URL is generated instantly

------------------------------------------------------------------------

## 🧪 Testing

-   Manual functional testing\
-   API testing using Postman\
-   UI behavior testing for authentication states\
-   Error and edge-case handling

------------------------------------------------------------------------

## 📈 Advantages

-   Reduces development time significantly\
-   Beginner-friendly interface\
-   Eliminates manual deployment steps\
-   Scalable and modular architecture\
-   Real-world DevOps workflow integration

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Multi-page website generation\
-   Custom theme selection\
-   Live code editor with preview\
-   Collaboration features\
-   Cloud-based project storage\
-   AI-assisted debugging

------------------------------------------------------------------------

## 🧰 Installation Guide

### 📂 1️⃣ Clone the Repository

``` bash
git clone <your-repository-url>
cd CodeArchitect
```

------------------------------------------------------------------------

## ⚙️ 2️⃣ Install Dependencies

### 🔹 Frontend --- Single Command

Move into the frontend folder and run:

``` bash
npm install react react-dom react-router-dom react-markdown remark-gfm react-syntax-highlighter @vscode/codicons jszip file-saver clsx
```

### 🔹 Backend --- Single Command

Move into the backend folder and run:

``` bash
npm install express cors dotenv @google/generative-ai simple-git node-fetch buffer @vercel/client
```

(Optional --- developer tool)

``` bash
npm install --save-dev nodemon
```

------------------------------------------------------------------------

## ▶️ 3️⃣ How to Run the Project

### 🖥️ Start Backend

Inside the backend folder:

``` bash
node index.js
```

(or if using nodemon)

``` bash
npx nodemon index.js
```

### 🌐 Start Frontend

Inside the frontend folder:

``` bash
npm start
```

Frontend default:

    http://localhost:3000

Backend default:

    http://localhost:5000

------------------------------------------------------------------------

## 📚 Conclusion

CodeArchitect demonstrates the effective integration of AI with modern
web development and deployment practices. It provides a practical
solution for rapid website creation while following professional
software engineering standards.

------------------------------------------------------------------------

## 👩‍💻 Developed By

**Project Team -- CodeArchitect**\
Department of Artificial Intelligence & Data Science\
Saveetha Engineering College

------------------------------------------------------------------------

## ✅ References

-   React --- https://react.dev\
-   Node.js --- https://nodejs.org\
-   Express --- https://expressjs.com\
-   MongoDB --- https://www.mongodb.com/docs\
-   Google Generative AI --- https://ai.google.dev\
-   GitHub --- https://docs.github.com\
-   Vercel --- https://vercel.com/docs
