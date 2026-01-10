from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# This lets your React app (Port 3000) talk to this Python app (Port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/books")
def get_books():
    return [
        {"title": "The Serpent's Scroll", "author": "Ignis the Wise"},
        {"title": "Dragon Scale Armor", "author": "Garrick the Smith"},
        {"title": "The Last Phoenix", "author": "Ember Dawn"}
    ]

@app.get("/")
def read_root():
    return {"message": "The Dragon Librarian is Awake!"}