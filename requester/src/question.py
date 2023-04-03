import os
import random
import re
from typing import List

import openai
from dotenv import find_dotenv, load_dotenv


def get_sentences_with_blank(word: str, count: int) -> List[str]:
    word = word.strip()
    prompt = f"Make a long sentence with the word {word}"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=60,
        n=count,
        stop=None,
        temperature=0.7,
    )

    pattern = re.compile(r"\b" + re.escape(word.strip()) + r"(\w*)\b", re.IGNORECASE)
    blank_line = "_" * (len(word) + 3)
    
    ret = []
    for choice in response.choices:
        completion = choice.text.strip()
        sentence_with_blank = pattern.sub(blank_line, completion)
        ret.append(sentence_with_blank)
    
    return ret

def make_blank_question(word: str, count: int) -> List[str]:
    # load .env file
    dotenv_file = find_dotenv()
    load_dotenv(dotenv_file)
    OPENAI_API_KEY = os.environ['OPENAI_API_KEY']
    print(OPENAI_API_KEY)
    openai.api_key = OPENAI_API_KEY
    ret = get_sentences_with_blank(word, count)
    return ret
