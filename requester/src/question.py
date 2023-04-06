import re
from typing import List

import openai
from dotenv import find_dotenv, load_dotenv
from src.gpt.create import create
from src.types import (BlankQuizType, DictionaryType, ExampleSentencesType,
                       WordQuizType)


def make_blank_question(word: str, count: int) -> List[str]:
    word = word.strip()
    prompt = f"Make a long sentence with the word {word}"

    results = create(prompt, n=count, max_tokens=60)

    pattern = re.compile(r"\b" + re.escape(word.strip()) +
                         r"(\w*)\b", re.IGNORECASE)
    blank_line = "_" * (len(word) + 3)

    return [pattern.sub(blank_line, result) for result in results]


def get_dictionary(words: List[str]) -> List[DictionaryType]:
    return []


def get_example_sentences(words: List[str]) -> List[ExampleSentencesType]:
    return []


def get_eng_word_quiz(dictionary: List[DictionaryType]) -> List[WordQuizType]:
    return []


def get_kor_word_quiz(dictionary: List[DictionaryType]) -> List[WordQuizType]:
    return []


def get_blank_quiz(words: List[str]) -> List[BlankQuizType]:
    return []
