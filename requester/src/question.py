import os
import random
import re
from typing import List

import openai
from dotenv import find_dotenv, load_dotenv


def get_sentence_with_blank(word, blank_length):
    prompt = f"Make a long sentence with the word {word.strip()}"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=60,
        n=1,
        stop=None,
        temperature=0.7,
    )
    completion = response.choices[0].text.strip()

    pattern = re.compile(r"\b" + re.escape(word.strip()) + r"(\w*)\b", re.IGNORECASE)
    blank_line = "_" * blank_length
    sentence_with_blank = pattern.sub(blank_line, completion)
    
    return sentence_with_blank

def make_blank_question(words: List[str], blank_length: int) -> List[str]:
    # load .env file
    dotenv_file = find_dotenv()
    load_dotenv(dotenv_file)
    OPENAI_API_KEY = os.environ['OPENAI_API_KEY']
    print(OPENAI_API_KEY)
    openai.api_key = OPENAI_API_KEY
    ret = [get_sentence_with_blank(word, blank_length) for word in words]
    return ret
