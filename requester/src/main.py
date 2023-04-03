from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.question import make_blank_question


class Item(BaseModel):
    word: str
    count: int

app = FastAPI() 

# cors for development
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def root():
    return {"message": "Hello World"}

@app.post('/question/blank')
async def blank(item: Item):
    result = make_blank_question(item.word, item.count)
    json = {"result": result}
    return json