from fastapi import FastAPI
from src.question import make_blank_question

app = FastAPI() 

@app.get('/')
async def root():
    return {"message": "Hello World"}

@app.get('/blank')
async def blank():
    return make_blank_question(["hello", "world"], 5)