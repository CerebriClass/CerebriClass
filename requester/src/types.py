from dataclasses import dataclass
from typing import List


@dataclass
class DictionaryType:
    word: str
#    part_of_speech: str  # enum
    meaning: str


class ExampleSentenceType:
    sentence: str
    meaning: str


class ExampleSentencesType:
    word: str
    sentences: List[ExampleSentenceType]


class WordQuizType:
    word: str
    choices: List[str]
    choice_idxs: List[int]
    answer: int


class BlankQuizType:
    sentence: str
    answer: str
    meaning: str


class ResultType:
    dictionary: List[DictionaryType]
    examples: List[ExampleSentencesType]
    eng_word_quiz: List[WordQuizType]
    kor_word_quiz: List[WordQuizType]
    blank_quiz: List[BlankQuizType]
