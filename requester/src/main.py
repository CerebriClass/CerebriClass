from time import sleep  # for development
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from src.docx import make_docx
from src.question import make_blank_question

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

class CreateWorkbookData(BaseModel):
    words: List[str]

@app.post('/create-workbook')
async def create_workbook(data: CreateWorkbookData):
    print(data.words)
    sleep(1)
    download_url = make_docx()
    json = { "downloadUrl": download_url }
    return json

@app.get('/downloads/{path}', response_class=FileResponse)
async def download(path: str):
    return f'/downloads/{path}'