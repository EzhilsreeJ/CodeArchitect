# CodeArchitect -- AI‑Powered Website Generation & Deployment Platform

------------------------------------------------------------------------

## 📝 Problem Statement

Modern web development often requires multiple tools, repeated
configurations, and complex deployment processes. This creates
challenges such as:

-   **Integration gaps** --- no smooth connection between local files,
    GitHub, and Vercel\
-   **Customization limits** --- changing UI themes and features
    requires heavy manual edits\
-   **Setup repetition** --- projects fail on different systems due to
    inconsistent builds\
-   **User difficulty** --- beginners struggle with unclear deployment
    steps and error messages

**CodeArchitect** provides a unified AI‑powered platform that:

✔️ Generates complete website code from natural‑language prompts\
✔️ Organizes the project automatically\
✔️ Pushes repositories to GitHub\
✔️ Deploys applications instantly using Vercel

This significantly reduces development time, effort, and technical
complexity --- while still maintaining professional engineering
standards.

------------------------------------------------------------------------

## 🎯 Project Overview

CodeArchitect automates the entire website development lifecycle ---
from idea to deployment.\
It integrates AI, version control, and deployment tools into one
seamless workflow designed for both beginners and developers.

------------------------------------------------------------------------

## 🎯 Objectives

-   Enable AI‑driven website creation\
-   Reduce manual setup and deployment steps\
-   Support real DevOps workflows (GitHub + Vercel)\
-   Provide a structured, beginner‑friendly platform

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React.js\
-   HTML5, CSS3, JavaScript

### Backend

-   Node.js\
-   Express.js\
-   REST APIs

### Database

-   MongoDB

### AI Integration

-   Google Gemini (LLM)

### Deployment

-   GitHub\
-   Vercel

------------------------------------------------------------------------

## 📋 System Requirements

### Software

-   Node.js 18+\
-   npm\
-   Git\
-   MongoDB (local or Atlas)

### Optional (Recommended)

-   Visual Studio Code

------------------------------------------------------------------------

## 🗂️ Project Structure

    CodeArchitect/
     ├── backend/
     ├── frontend/
     └── README.md

------------------------------------------------------------------------

## 🔐 Environment Configuration (.env)

Create a `.env` file inside the **backend** directory and add:

    GEMINI_API_KEY=
    PORT=5000

    # GitHub
    GITHUB_TOKEN=
    GITHUB_USERNAME=
    GEMINI_MODEL=

    VERCEL_TOKEN=

    MONGO_URI=mongodb://localhost:27017/codearchitect
    JWT_SECRET=

> Keep this file private. Never upload `.env` to GitHub.

------------------------------------------------------------------------

## 🔑 Generate a Secure JWT Key

Recommended:

``` bash
openssl rand -base64 32
```

Alternative:

``` bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the key into:

    JWT_SECRET=your_generated_key

------------------------------------------------------------------------

## 🧰 Installation & Setup

### 1️⃣ Clone Repository

``` bash
git clone <your-repository-url>
cd CodeArchitect
```

------------------------------------------------------------------------

## ⚙️ Install Dependencies

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

## ▶️ Running the Application

### Start Backend

``` bash
node index.js
```

OR

``` bash
npx nodemon index.js
```

### Start Frontend

``` bash
cd frontend
npm start
```

Backend default:

    http://localhost:5000

Frontend default:

    http://localhost:3000

------------------------------------------------------------------------

## 🚀 Workflow Summary

1️⃣ Login / Authenticate\
2️⃣ Enter prompt\
3️⃣ AI generates code\
4️⃣ Review website files\
5️⃣ Push to GitHub\
6️⃣ Deploy via Vercel\
7️⃣ Access live URL

------------------------------------------------------------------------

## 📈 Benefits

-   Reduced development effort\
-   Automated deployment pipeline\
-   Beginner‑friendly\
-   Professional DevOps integration

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Multi‑page generation\
-   Theme customization options\
-   Live preview editor

------------------------------------------------------------------------

## 👩‍💻 Developed By

**Project Team -- CodeArchitect**\
Department of Artificial Intelligence & Data Science\
Saveetha Engineering College

------------------------------------------------------------------------

## 📚 References

-   React --- https://react.dev\
-   Node.js --- https://nodejs.org\
-   Express --- https://expressjs.com\
-   MongoDB --- https://www.mongodb.com/docs\
-   Google Generative AI --- https://ai.google.dev\
-   GitHub Docs --- https://docs.github.com\
-   Vercel Docs --- https://vercel.com/docs
