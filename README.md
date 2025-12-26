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
websites automatically --- all from natural-language prompts.

------------------------------------------------------------------------

## 📌 Project Overview

CodeArchitect is an AI-powered web application that automates website
creation and deployment. Users describe the website they want, and the
system generates code, structures files, pushes to GitHub, and deploys
to Vercel --- reducing time and effort while maintaining
software-engineering standards.

------------------------------------------------------------------------

## 🎯 Objectives

-   Generate websites from natural-language prompts\
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

-   LLM-powered code generation

### DevOps / Deployment

-   GitHub (version control)\
-   Vercel (hosting)

------------------------------------------------------------------------

## 📋 Prerequisites

Install before starting:

-   Node.js 18+\
-   Git\
-   MongoDB Atlas account\
-   GitHub account\
-   Vercel account

Recommended: VS Code

------------------------------------------------------------------------

## 🗂️ Folder Structure

    CodeArchitect/
     ├── backend/
     ├── frontend/
     ├── README.md

------------------------------------------------------------------------

## 🔐 Environment Variables

Create `.env` inside **backend**:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    GEMINI_API_KEY=your_ai_key
    GITHUB_TOKEN=your_github_token
    VERCEL_TOKEN=your_vercel_token

> Do not commit `.env` to GitHub.

------------------------------------------------------------------------

## 🔑 Generate JWT Secret Key (Recommended Command)

Run this in terminal:

``` bash
openssl rand -base64 32
```

Copy the generated value and paste it as:

    JWT_SECRET=generated_key_here

(Alternative if OpenSSL is unavailable)

``` bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

------------------------------------------------------------------------

## 🧰 Installation Guide

### Clone

``` bash
git clone <your-repository-url>
cd CodeArchitect
```

------------------------------------------------------------------------

## ⚙️ Install Dependencies

### Frontend --- Single Command

``` bash
cd frontend
npm install react react-dom react-router-dom react-markdown remark-gfm react-syntax-highlighter @vscode/codicons jszip file-saver clsx
```

### ➕ Install Axios (Frontend)

Used for API requests:

``` bash
npm install axios
```

------------------------------------------------------------------------

### Backend --- Single Command

``` bash
cd ../backend
npm install express cors dotenv @google/generative-ai simple-git node-fetch buffer @vercel/client
```

### ➕ Install Axios (Backend -- if API calls are needed)

``` bash
npm install axios
```

(Optional dev tool)

``` bash
npm install --save-dev nodemon
```

------------------------------------------------------------------------

## ▶️ Run the Project

### Backend

``` bash
node index.js
```

or

``` bash
npx nodemon index.js
```

### Frontend

``` bash
cd frontend
npm start
```

------------------------------------------------------------------------

## 🚀 Workflow

1.  Login
2.  Enter prompt
3.  AI generates code
4.  Review
5.  Push to GitHub
6.  Deploy via Vercel
7.  Get live link

------------------------------------------------------------------------

## 👩‍💻 Developed By

Project Team -- CodeArchitect

------------------------------------------------------------------------

## 📚 References

-   React --- https://react.dev
-   Node.js --- https://nodejs.org
-   Express --- https://expressjs.com
-   MongoDB --- https://www.mongodb.com/docs
-   Google Generative AI --- https://ai.google.dev
-   GitHub --- https://docs.github.com
-   Vercel --- https://vercel.com/docs
