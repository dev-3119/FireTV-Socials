
# FireTV Socials

## Overview

FireTV Socials is a next-generation social companion platform for shared entertainment experiences. Built with a modern stack comprising React (TypeScript) on the frontend and FastAPI on the backend, it integrates intelligent movie recommendations using the Ollama3 large language model.

The platform allows users to host or join virtual rooms, interact with friends in real time, and discover personalized content based on mood or interest—all within a cohesive, social-first interface.

---

## Features

- **Private Watch Rooms** – Users can create and manage personal rooms to watch movies or shows with selected friends.
- **Public Clubs** – Interest-based communities for discussing and planning watch parties or themed content.
- **Chat and Messaging** – Real-time messaging, friend invites, and threaded conversations with media context.
- **LLM-based Movie Recommender** – Integrates Ollama3 (via Groq API) to recommend movies based on mood or query.
- **Mood Detection via Text** – Users can enter emotional tones and receive AI-based recommendations.
- **Event Scheduling** – Schedule watch parties, set reminders, and join upcoming events.
- **Smart Invite System** – Seamless invite and join flow for both rooms and clubs.
- **Privacy Controls** – Users can configure visibility, mood detection, and invite preferences.

---

## Project Status

The application is in a **working prototype** stage. Core modules such as frontend UI, backend APIs, and AI-based movie recommendations are fully implemented. Real-time video sync, authentication, and persistent profiles are planned for future phases.

---

## Installation

### Backend Setup (FastAPI + Ollama3)

1. Clone the repository and navigate to the backend folder:

   ```bash
   git clone https://github.com/dev-3119/firetv-socials.git
   cd backend
   ```

2. Create a virtual environment and install dependencies:

   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Create a `.env` file and add your Groq API key:

   ```env
   GROQ_API_KEY=your_groq_api_key
   ```

4. Run the FastAPI server:

   ```bash
   uvicorn main:app --reload --port 8000
   ```

---

### Frontend Setup (React + TypeScript)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   npm i
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Frontend will run on: `http://localhost:8080`  
Backend will be available at: `http://localhost:8000`

---

## Description

FireTV Socials addresses the growing need for meaningful interaction in digital entertainment. By combining collaborative watch spaces with intelligent AI-based recommendations, the platform transforms passive content consumption into a shared and dynamic experience.

It supports both private and public participation. Users can host movie nights with friends or join community-driven clubs. With built-in chat, scheduling, and mood-based content discovery, FireTV Socials builds a connected and intelligent viewing ecosystem.

---

## Sample UI Screens

Sample user interface modules include:

- **My Rooms** – Private watch spaces and pending invites
- **Messages** – Threads and media-based conversations
- **Contacts** – Online/offline users with messaging options
- **Scheduler** – View upcoming events and plan watch parties
- **Settings** – Configure mood preferences, invites, and visibility

Screenshots available in `/assets/screenshots/`.

---

## Technologies Used

### Frontend
- React (TypeScript)
- TailwindCSS
- Axios
- Lucide-react icons

### Backend
- FastAPI (Python)
- LangChain
- Python-dotenv

### AI Integration
- Ollama3 model via Groq API
- Prompt-based movie recommender
- JSON-based output parsing logic

---

## Contributors

- Nethra N
- Gurucharan K.G
- Dev S
- Asmitha Priyaa P

