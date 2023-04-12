import os
from dataclasses import dataclass
from typing import List

from dotenv import find_dotenv, load_dotenv
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
    types: List[str]


app = FastAPI()

dotenv_file = find_dotenv()
load_dotenv(dotenv_file)
FRONTEND_URL = os.environ['FRONTEND_URL']


origins = [
    FRONTEND_URL
]

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


@app.post('/create-sheet')
async def post_create_sheet(data: CreateWorkSheetData):
    global n, answer

    words = [word.strip() for word in data.words]
    dictionary = get_dictionary(words)
    example_sentences = get_example_sentences(words)
    print(dictionary)
    print(example_sentences)

    # just for dev. because papago api is not free
    # dictionary = [{'word': 'sustainable', 'meaning': '지속 가능한'}, {'word': 'typical', 'meaning': '전형적인'}, {
    #     'word': 'attribute', 'meaning': '기여하다'}, {'word': 'consumption', 'meaning': '소비'}, {'word': 'integration', 'meaning': '통합'}]
    # example_sentences = [{'word': 'sustainable', 'sentences': [{'sentence': 'The sustainable way to live is to be conscious of the environment and the resources used.', 'meaning': '지속 가능한 삶의 방식은 환경과 사용되는 자원을 의식하는 것이다.'}, {'sentence': 'The sustainable practices that we have put in place have resulted in a decrease in our carbon footprint.', 'meaning': '우리가 시행한 지속 가능한 관행은 우리의 탄소 발자국을 감소시키는 결과를 가져왔다.'}]}, {'word': 'typical', 'sentences': [{'sentence': 'It is typical for people to say that they are not typical.', 'meaning': '사람들이 그들이 전형적이지 않다고 말하는 것은 전형적이다.'}, {'sentence': 'A typical day for me starts with me waking up at 7am, then I take a shower, get dressed, eat breakfast and head to school.', 'meaning': '나에게 전형적인 하루는 아침 7시에 일어나는 것으로 시작해서 샤워를 하고 옷을 입고 아침을 먹고 학교로 향한다.'}]}, {'word': 'attribute', 'sentences': [
    #     {'sentence': 'He attributes his success to his hard work and dedication.', 'meaning': '그는 자신의 성공을 그의 노력과 헌신 덕분이라고 생각한다.'}, {'sentence': 'I attribute my success to my hard work and dedication.', 'meaning': '나는 나의 성공을 나의 노력과 헌신 덕분이라고 생각한다.'}]}, {'word': 'consumption', 'sentences': [{'sentence': 'The consumption of alcohol is not permitted on this premises.', 'meaning': '이 구내에서는 알코올 섭취가 허용되지 않는다.'}, {'sentence': 'The consumption of alcohol is often linked with poor decision making.', 'meaning': '술의 소비는 종종 잘못된 의사 결정과 관련이 있다.'}]}, {'word': 'integration', 'sentences': [{'sentence': 'The integration of the two companies was a long and difficult process.', 'meaning': '두 회사의 통합은 길고 힘든 과정이었다.'}, {'sentence': 'The integration of the company was a success.', 'meaning': '그 회사의 통합은 성공적이었다.'}]}]

    eng_word_quiz = get_eng_word_quiz(
        dictionary) if 'eng_word_quiz' in data.types else []
    kor_word_quiz = get_kor_word_quiz(
        dictionary) if 'kor_word_quiz' in data.types else []
    blank_quiz = get_blank_quiz(
        example_sentences) if 'blank_quiz' in data.types else []

    result: ResultType = {
        'dictionary': dictionary,
        'example_sentences': example_sentences,
        'eng_word_quiz': eng_word_quiz,
        'kor_word_quiz': kor_word_quiz,
        'blank_quiz': blank_quiz
    }
    sheet_url = make_sheet(result)
    json = {"sheetUrl": sheet_url}
    return json


@ app.get('/downloads/{path}', response_class=FileResponse)
async def get_download(path: str):
    return f'/downloads/{path}'
