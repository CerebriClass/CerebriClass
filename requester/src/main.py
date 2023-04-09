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
    words = [word.strip() for word in data.words]
#    dictionary = get_dictionary(words)
#    example_sentences = get_example_sentences(words)

    # just for test. because papago api is not free
    dictionary = [{'word': 'sustainable', 'meaning': '지속 가능한'}, {
        'word': 'typical', 'meaning': '전형적인'}, {'word': 'attribute', 'meaning': '기여하다'}, {'word': 'consumption', 'meaning': '소비'}, {'word': 'integration', 'meaning': '통합'}, {'word': 'constitutional', 'meaning': '입헌의'}, {'word': 'neural', 'meaning': '신경의'}, {'word': 'diverse', 'meaning': '다양한'}, {'word': 'proverb', 'meaning': '속담'}, {'word': 'misguided', 'meaning': '그릇된'}, {'word': 'absolute', 'meaning': '절대의'}, {'word': 'expert', 'meaning': '전문가'}]
    example_sentences = [{'word': 'sustainable', 'sentences': [{'sentence': 'A sustainable development is one that meets the needs of the present without compromising the ability of future generations to meet their own needs.', 'meaning': '지속 가능한 발전은 미래 세대가 자신의 필요를 충족시킬 수 있는 능력을 손상시키지 않고 현재의 필요를 충족시키는 것이다.'}, {'sentence': 'The definition of sustainable is able to be maintained at a certain rate or level; not exceeding the ability to replenish.', 'meaning': '지속가능성의 정의는 일정한 비율이나 수준으로 유지될 수 있으며, 보충할 수 있는 능력을 초과하지 않는다.'}]}, {'word': 'typical', 'sentences': [{'sentence': 'In typical fashion, she arrived late to the party.', 'meaning': '전형적인 방식으로, 그녀는 파티에 늦게 도착했다.'}, {'sentence': 'The typical American diet is high in fat and low in fiber.', 'meaning': '전형적인 미국인의 식단은 지방이 많고 섬유질이 적다.'}]}, {'word': 'attribute', 'sentences': [{'sentence': 'The definition of the word "attribute" is a quality or characteristic belonging to someone or something.', 'meaning': '"속성"이라는 단어의 정의는 누군가 또는 무언가에 속하는 품질 또는 특성이다.'}, {'sentence': 'She had long blonde hair, blue eyes, and a fair complexion, attributes that made her very beautiful.', 'meaning': '그녀는 긴 금발 머리, 파란 눈, 그리고 아름다운 안색을 가졌고, 그것이 그녀를 매우 아름답게 만들었다.'}]}, {'word': 'consumption', 'sentences': [{'sentence': 'The human body is composed of 60% water, and it is recommended that people consume at least 8 cups of water a day to maintain proper bodily functions.', 'meaning': '인체는 60%가 수분으로 구성돼 있으며, 적절한 신체 기능을 유지하기 위해 하루 최소 8컵의 물을 섭취하는 것이 좋다.'}, {'sentence': 'The consumption of alcohol is often blamed for causing liver damage.', 'meaning': '알코올 섭취는 종종 간 손상의 원인으로 지목된다.'}]}, {'word': 'integration', 'sentences': [{'sentence': "The integration of the company's various departments has been a slow and difficult process.", 'meaning': '회사의 다양한 부서들의 통합은 느리고 어려운 과정이었다.'}, {'sentence': 'The integration of the two companies was a long and difficult process.', 'meaning': '두 회사의 통합은 길고 힘든 과정이었다.'}]}, {'word': 'constitutional', 'sentences': [{'sentence': 'The United States Constitution is the supreme law of the land in the United States of America.',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            'meaning': '미국 헌법()은 미국의 헌법이다.'}, {'sentence': 'The United States Constitution is the supreme law of the United States of America.', 'meaning': '미국 헌법은 미국의 최고 법이다.'}]}, {'word': 'neural', 'sentences': [{'sentence': "I'm not sure what you're asking for.", 'meaning': '당신이 무엇을 요구하는지 잘 모르겠어요.'}, {'sentence': 'Neural networks are a type of machine learning algorithm that are used to model complex patterns in data.', 'meaning': '신경망은 데이터의 복잡한 패턴을 모델링하는 데 사용되는 기계 학습 알고리즘의 한 유형이다.'}]}, {'word': 'diverse', 'sentences': [{'sentence': 'The diverse group of people worked together to fix the problem.', 'meaning': '다양한 그룹의 사람들이 그 문제를 해결하기 위해 함께 일했다.'}, {'sentence': 'I am diverse, you are diverse, he/she is diverse, we are diverse, they are diverse, diversity is everywhere.', 'meaning': '나는 다양하고, 너는 다양하고, 그/그녀는 다양하고, 우리는 다양하고, 그들은 다양하고, 다양성은 어디에나 있다.'}]}, {'word': 'proverb', 'sentences': [{'sentence': 'A proverb is a short, pithy saying that expresses a traditionally held truth or piece of advice, based on common sense or experience.', 'meaning': '속담은 상식이나 경험에 근거하여 전통적으로 받아들여진 진실이나 충고를 표현하는 짧고 간결한 말이다.'}, {'sentence': 'A proverb is a short, pithy saying that expresses a traditionally held truth or piece of advice, based on common sense or experience.', 'meaning': '속담은 상식이나 경험에 근거하여 전통적으로 받아들여진 진실이나 충고를 표현하는 짧고 간결한 말이다.'}]}, {'word': 'misguided', 'sentences': [{'sentence': 'I was misguided when I thought that I could get away with stealing from the convenience store.', 'meaning': '편의점에서 도둑질을 해도 무사할 수 있을 거라고 생각했을 때 나는 오해를 했다.'}, {'sentence': 'I was misguided when I thought that I could trust you with my heart.', 'meaning': '나는 당신을 마음으로 믿을 수 있다고 생각했을 때 잘못 생각했어요.'}]}, {'word': 'absolute', 'sentences': [{'sentence': 'I absolutely cannot wait to go on vacation.', 'meaning': '나는 휴가를 가는 것이 몹시 기다려진다.'}, {'sentence': 'I absolutely love spending time with my family and friends.', 'meaning': '저는 가족과 친구들과 시간을 보내는 것을 정말 좋아합니다.'}]}, {'word': 'expert', 'sentences': [{'sentence': 'After becoming an expert in her field, she decided to write a book about her experiences.', 'meaning': '자신의 분야의 전문가가 된 후, 그녀는 자신의 경험에 대한 책을 쓰기로 결심했습니다.'}, {'sentence': "I'm not an expert, but I'm pretty sure that you need to be careful when you're handling a snake.", 'meaning': '저는 전문가는 아니지만, 뱀을 다룰 때는 조심해야 할 필요가 있다고 꽤 확신합니다.'}]}]
    result: ResultType = {
        'dictionary': dictionary,
        'example_sentences': example_sentences,
        'eng_word_quiz': get_eng_word_quiz(dictionary),
        'kor_word_quiz': get_kor_word_quiz(dictionary),
        'blank_quiz': get_blank_quiz(example_sentences)
    }
    work_sheet_url, answer_sheet_url = make_sheet(result)
    json = {"workSheetUrl": work_sheet_url, "answerSheetUrl": answer_sheet_url}
    return json


@app.get('/downloads/{path}', response_class=FileResponse)
async def download(path: str):
    return f'/downloads/{path}'
