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

Frontend: React • HTML • CSS • JavaScript\
Backend: Node.js • Express\
Database: MongoDB\
AI: LLM-based code generation\
Deployment: GitHub • Vercel

------------------------------------------------------------------------

## 📋 Prerequisites

Install before starting: Node.js, Git, MongoDB, GitHub, Vercel.

------------------------------------------------------------------------

## 🗂️ Folder Structure

    CodeArchitect/
     ├── backend/
     ├── frontend/
     ├── README.md

------------------------------------------------------------------------

## 🔐 Environment Variables (Must Be Added)

Create a file named **.env** in the backend folder and paste:

    # AI
    GEMINI_API_KEY=
    GEMINI_MODEL=

    # Server
    PORT=5000

    # GitHub
    GITHUB_TOKEN=
    GITHUB_USERNAME=

    # Deployment
    VERCEL_TOKEN=

    # Database
    MONGO_URI=mongodb://localhost:27017/codearchitect

    # Security
    JWT_SECRET=

> ⚠️ Never upload `.env` to GitHub.

------------------------------------------------------------------------

## 🔑 Generate JWT Secret Key

``` bash
openssl rand -base64 32
```

or

``` bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

------------------------------------------------------------------------

## 🧰 Installation

### Clone

``` bash
git clone <your-repository-url>
cd CodeArchitect
```

### Frontend

``` bash
cd frontend
npm install react react-dom react-router-dom react-markdown remark-gfm react-syntax-highlighter @vscode/codicons jszip file-saver clsx
npm install axios
```

### Backend

``` bash
cd ../backend
npm install express cors dotenv @google/generative-ai simple-git node-fetch buffer @vercel/client
npm install axios
npm install --save-dev nodemon
```

------------------------------------------------------------------------

## ▶️ Run

Backend:

``` bash
node index.js
```

Frontend:

``` bash
cd frontend
npm start
```

------------------------------------------------------------------------

## 👩‍💻 Developed By

Project Team -- CodeArchitect

------------------------------------------------------------------------

## 📚 References

-   https://react.dev
-   https://nodejs.org
-   https://expressjs.com
-   https://www.mongodb.com/docs
-   https://ai.google.dev
-   https://docs.github.com
-   https://vercel.com/docs
