from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_groq import ChatGroq
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
import os
from dotenv import load_dotenv
import re
import json

# Load .env file
load_dotenv()

# FastAPI instance
app = FastAPI(
    title="FireBuddy AI",
    description="Mood-based Movie Recommender with LLaMA3 (Groq)",
    version="1.0"
)

# Enable CORS for local dev / frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class MoodRequest(BaseModel):
    mood: str

# Initialize LLM
llm = ChatGroq(
    model="llama3-8b-8192",
    groq_api_key=os.getenv("GROQ_API_KEY")
)

memory = ConversationBufferMemory()
chain = ConversationChain(llm=llm, memory=memory, verbose=True)

# JSON extractor
def extract_json(text: str):
    try:
        match = re.search(r'\{.*?\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception as e:
        print("Error extracting JSON:", e)
    return None

# Recommendation endpoint
@app.post("/api/recommend")
async def recommend_mood(data: MoodRequest):
    try:
        user_input = data.mood.strip()

        prompt = f"""
You are FireBuddy, a friendly AI movie recommender.

The user said: "{user_input}"

1. Understand the user's emotional tone or interest.
2. Recommend a **real** movie that matches that mood.
3. Return your answer in the following JSON format only:

{{
  "title": "...",
  "poster": "URL or short filename like /posters/...jpg",
  "description": "...",
  "rating": "...",
  "year": "...",
  "message": "Friendly comment encouraging the user to watch"
}}
"""

        # Run LLM chain
        raw_response = chain.run(prompt)
        parsed = extract_json(raw_response)

        if not parsed:
            raise ValueError("Could not extract valid JSON from response.")

        # Remove `poster` for frontend
        parsed.pop("poster", None)

        return {
            "movie_suggestion": parsed,
            "firebuddy_response": parsed.get("message", "")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Error: {str(e)}")
