# 🚀 Project Name (Full-Stack Note Sharing & Collaboration Platform)

A professional, high-performance web application built with the **MERN** stack, enhanced with **Next.js**, **Socket.io**, and **AI Integration**. This platform allows users to upload, share, and manage academic or professional notes while collaborating via real-time chat and AI assistance.

---

## 🏗️ System Architecture

The project is split into three primary modules to ensure scalability and separation of concerns:

- **`/backend`**: The engine of the app. A Node.js/Express server handling API logic, WebSockets, and Database interactions.
- **`/frontend`**: The user-facing application built with Next.js (App Router), focusing on a premium UX, AI help, and social features.
- **`/admin`**: A dedicated administrative dashboard for managing the platform's health (users, files, analytics).

---

## 📂 Folder Structure & Navigation

To understand the code, follow this hierarchy:

### 1. Backend (`/backend`)

- `server.js`: The entry point where Express and Socket.io are initialized.
- `models/`: Database schemas (Mongoose) for Users, Notes, and Messages.
- `controllers/`: The logic layer. Contains functions like `uploadNote`, `loginUser`, and `sendMessage`.
- `routes/`: Defined API endpoints that map URLs to controllers.
- `socket/`: Real-time notification and messaging logic.
- `middleware/`: Authentication guards (JWT) and file upload configurations (Multer).

### 2. Frontend (`/frontend`)

- `app/`: Using Next.js App Router. Contains all page routes and global styles.
- `components/`: Reusable UI elements (Navbar, ProfileBanner, NoteCards).
- `context/`: The "Brain" of the frontend. manages global state for Auth, Sockets, and Notes.
- `lib/`: Helper utilities and API configurations.

### 3. Admin (`/admin`)

- `app/dashboard/`: The core analytics and management views.
- `context/`: Lightweight state management for administrative actions.

---

## ⚙️ How Things Work (Deep Dive)

### 🔐 Authentication Flow

The system uses a **Hybrid Auth** model:

1.  **Local Auth**: Traditional Email/Password with Bcrypt hashing and JWT tokens.
2.  **Social Auth**: Integrated with **Supabase** for Google/GitHub login.
3.  **Authorization**: A custom `authuser` middleware on the backend verifies the JWT for protected routes (like uploading or deleting).

### 📤 File Upload Workflow

1.  User selects a PDF in the **Frontend** (`UploadNotesComponent`).
2.  **Multer** (Backend) handles the incoming multipart data.
3.  The file is securely streamed to **Cloudinary**.
4.  The Cloudinary URL and metadata are saved to **MongoDB**.
5.  Files are instantly available via the `/notes/all` endpoint.

### 💬 Real-time Messaging

- Powered by **Socket.io**.
- When a user logs in, the `SocketContext` establishes a connection.
- Messages are persisted in MongoDB but delivered instantly via socket events (`newMessage`), ensuring no page refresh is needed.

### 🤖 AI Integration

- Utilizes **Google's Gemini API** (`@google/generative-ai`).
- The `AI_Assistant.tsx` component provides users with contextual help based on their notes or queries.

---

## 🛠️ Tech Stack

| Layer            | Technologies                                                    |
| :--------------- | :-------------------------------------------------------------- |
| **Frontend**     | Next.js 15, Tailwind CSS, Framer Motion, Axios, React Hook Form |
| **Backend**      | Node.js, Express, MongoDB (Mongoose), Socket.io                 |
| **Cloud/DevOps** | Cloudinary (Storage), Supabase (Auth), JWT (Security)           |
| **State**        | React Context API                                               |

---

## 📖 How to Read & Understand the Code

1.  **Start with the Backend Controllers**: To understand a feature, look at the `controllers/` folder first. This tells you exactly what data the app expects and what it returns.
2.  **Check the Context API**: In the frontend, the `context/` folder explains how data flows through the app. If you want to see how "Admin Login" works, look at `AuthContext.tsx`.
3.  **Trace UI to Logic**: Every major UI component in `components/` uses a hook from the `context/` layer to talk to the backend.

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI
- Cloudinary credentials
- Supabase project keys

### Installation

1.  **Backend**:
    ```bash
    cd backend
    npm install
    # Setup .env (see section below)
    npm start
    ```
2.  **Frontend / Admin**:
    ```bash
    cd frontend # or cd admin
    npm install
    npm run dev
    ```

---

## 🔑 Environment Variables

Each module requires a `.env` file. Key variables include:

- `MONGODB_URI`: Connection string.
- `JWT_SECRET`: Security salt.
- `CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET`: For file management.
- `NEXT_PUBLIC_SUPABASE_URL / ANON_KEY`: For social auth.
- `ADMIN_EMAIL / ADMIN_PASSWORD`: Credentials for the Admin Panel.

---

## 📄 License

This project is developed with professional standards for academic and collaborative excellence.

## Project Link

Project link: [Your Project Link](PROJECT_URL)
