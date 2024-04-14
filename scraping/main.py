from fastapi import FastAPI

from apiTMDB import *

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:4200",
    "http://localhost",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    get_data()