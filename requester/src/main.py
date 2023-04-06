from dataclasses import dataclass
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from src.docx import make_sheet
from src.question import (get_blank_quiz, get_dictionary, get_eng_word_quiz,
                          get_example_sentences, get_kor_word_quiz)
from src.types import ResultType


@dataclass
class CreateWorkSheetData:
    words: List[str]


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


@app.post('/create-work-sheet')
async def create_work_sheet(data: CreateWorkSheetData):
    words = data.words
    dictionary = get_dictionary(words)
    result: ResultType = {
        'dictionary': dictionary,
        'example_sentences': get_example_sentences(words),
        'eng_word_quiz': get_eng_word_quiz(dictionary),
        'kor_word_quiz': get_kor_word_quiz(dictionary),
        'blank_quiz': get_blank_quiz(words)
    }
    work_sheet_url, answer_sheet_url = make_sheet(result)
    json = {"workSheetUrl": work_sheet_url, "answerSheetUrl": answer_sheet_url}
    return json


@app.get('/downloads/{path}', response_class=FileResponse)
async def download(path: str):
    return f'/downloads/{path}'
