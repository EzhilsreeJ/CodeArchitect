# CodeArchitect -- AI-Powered Website Generation & Deployment Platform

## 📝 Problem Statement

Modern web development often requires multiple tools, repeated setup,
and complex deployment workflows. Beginners and even experienced
developers face challenges such as:

-   **Integration gaps** -- no smooth link between local project files,
    GitHub, and Vercel.\
-   **Customization limits** -- difficulty changing themes, design, and
    features.\
-   **Setup problems** -- repeating the same configuration and
    encountering different build errors on different systems.\
-   **User challenges** -- unclear deployment steps and confusing error
    messages.

**CodeArchitect** solves these by providing one integrated platform that
generates code, organizes projects, manages repositories, and deploys
websites automatically --- all from natural‑language prompts.

------------------------------------------------------------------------

## 📌 Project Overview

CodeArchitect is an AI-powered web application that automates website
creation and deployment. Users describe the website they want, and the
system generates code, structures files, pushes to GitHub, and deploys
to Vercel --- reducing time and effort while maintaining
software‑engineering standards.

------------------------------------------------------------------------

## 🎯 Objectives

-   Generate websites from natural‑language prompts\
-   Reduce manual setup and deployment steps\
-   Provide clear workflows for beginners\
-   Support real DevOps practices with GitHub + Vercel

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React.js\
-   HTML, CSS, JavaScript\
-   Custom animated UI (Cute Lamp Login)

### Backend

-   Node.js\
-   Express.js\
-   REST APIs

### Database

-   MongoDB (authentication + project data)

### AI

-   LLM‑powered code generation

### DevOps / Deployment

-   GitHub (version control)\
-   Vercel (hosting)

------------------------------------------------------------------------

## 📋 Prerequisites (Before You Start)

Install the following on your system:

-   **Node.js 18+** --- https://nodejs.org\
-   **npm** (installed with Node)\
-   **Git** --- https://git-scm.com/downloads\
-   **MongoDB Atlas account** --- https://www.mongodb.com/atlas\
-   **GitHub account** --- https://github.com\
-   **Vercel account** --- https://vercel.com

Recommended: - VS Code --- https://code.visualstudio.com

------------------------------------------------------------------------

## 🗂️ Project Folder Structure (Recommended)

    CodeArchitect/
     ├── backend/
     ├── frontend/
     ├── README.md

------------------------------------------------------------------------

## 🔐 Environment Variables (Required)

Create a `.env` file inside **backend**:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    GEMINI_API_KEY=your_ai_key
    GITHUB_TOKEN=your_github_token
    VERCEL_TOKEN=your_vercel_token

Never commit `.env` to GitHub.

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

``` bash
cd frontend
npm install react react-dom react-router-dom react-markdown remark-gfm react-syntax-highlighter @vscode/codicons jszip file-saver clsx
```

### 🔹 Backend --- Single Command

``` bash
cd ../backend
npm install express cors dotenv @google/generative-ai simple-git node-fetch buffer @vercel/client
```

(Optional for development)

``` bash
npm install --save-dev nodemon
```

------------------------------------------------------------------------

## ▶️ 3️⃣ Run the Project

### Start Backend

``` bash
node index.js
```

or

``` bash
npx nodemon index.js
```

### Start Frontend

``` bash
cd frontend
npm start
```

------------------------------------------------------------------------

## 🚀 Implementation Workflow

1.  Login / Signup\
2.  Enter website prompt\
3.  AI generates website code\
4.  User reviews and edits\
5.  Push to GitHub\
6.  Deploy to Vercel\
7.  Receive live deployed link

------------------------------------------------------------------------

## 🧪 Testing

-   Manual testing\
-   API testing in Postman\
-   UI validation\
-   Error‑handling checks

------------------------------------------------------------------------

## 📈 Benefits

-   Faster development\
-   Minimal setup\
-   Beginner‑friendly\
-   Real DevOps pipeline

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Live preview editor\
-   Multi‑theme generation\
-   Collaboration features

------------------------------------------------------------------------

## 👩‍💻 Developed By

Project Team -- CodeArchitect\
Department of Artificial Intelligence & Data Science\
Saveetha Engineering College

------------------------------------------------------------------------

## 📚 References

-   React --- https://react.dev\
-   Node.js --- https://nodejs.org\
-   Express --- https://expressjs.com\
-   MongoDB --- https://www.mongodb.com/docs\
-   Google Generative AI --- https://ai.google.dev\
-   GitHub --- https://docs.github.com\
-   Vercel --- https://vercel.com/docs
