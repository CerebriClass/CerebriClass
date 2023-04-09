import random
import re
from typing import List

import openai
from dotenv import find_dotenv, load_dotenv
from PyDictionary import PyDictionary
from src.openai import create
from src.papago import translate, translate_word
from src.types import (BlankQuizType, DictionaryType, ExampleSentencesType,
                       WordQuizType)


def get_dictionary(words: List[str]) -> List[DictionaryType]:
    ret = []
    for word in words:
        ret.append({'word': word, 'meaning': translate_word(word)})
    return ret


def get_example_sentences(words: List[str]) -> List[ExampleSentencesType]:
    ret = []
    for word in words:
        prompt = f"Make a long sentence with the word {word}"
        sentences = create(prompt, n=2)
        sentences = {
            'word': word,
            'sentences': [{'sentence': sentence, 'meaning': translate(sentence)} for sentence in sentences]
        }
        ret.append(sentences)
    return ret


def get_eng_word_quiz(dictionary: List[DictionaryType]) -> List[WordQuizType]:
    l1 = [i for i in range(len(dictionary))]
    random.shuffle(l1)
    ret = []
    for i in l1:
        elem = dictionary[i]
        word = elem['word']
        l2 = [i for i in range(len(dictionary))]
        l2.remove(i)
        random.shuffle(l2)
        choices = []
        choice_idxs = []
        for choice_idx in l2[:4]:
            choice = dictionary[choice_idx]['meaning']
            choices.append(choice)
            choice_idxs.append(choice_idx)
        answer = random.choice(range(5))
        choices.insert(answer, elem['meaning'])
        choice_idxs.insert(answer, i)
        ret.append({
            'word': word,
            'choices': choices,
            'choice_idxs': choice_idxs,
            'answer': answer
        })

    return ret


def get_kor_word_quiz(dictionary: List[DictionaryType]) -> List[WordQuizType]:
    l1 = [i for i in range(len(dictionary))]
    random.shuffle(l1)
    ret = []
    for i in l1:
        elem = dictionary[i]
        word = elem['meaning']
        l2 = [i for i in range(len(dictionary))]
        l2.remove(i)
        random.shuffle(l2)
        choices = []
        choice_idxs = []
        for choice_idx in l2[:4]:
            choice = dictionary[choice_idx]['word']
            choices.append(choice)
            choice_idxs.append(choice_idx)
        answer = random.choice(range(5))
        choices.insert(answer, elem['word'])
        choice_idxs.insert(answer, i)
        ret.append({
            'word': word,
            'choices': choices,
            'choice_idxs': choice_idxs,
            'answer': answer
        })

    return ret


def get_blank_quiz(example_sentences: List[ExampleSentencesType]) -> List[BlankQuizType]:
    l1 = [i for i in range(len(example_sentences))]
    random.shuffle(l1)
    ret = []
    for i in l1:
        elem = example_sentences[i]
        word = elem['word']
        sentence = random.choice(elem['sentences'])

        pattern = re.compile(word, re.IGNORECASE)
        blank_line = "_" * (len(word) + 3)

        blank_quiz = {
            'sentence': pattern.sub(blank_line, sentence['sentence']),
            'answer': word,
            'meaning': sentence['meaning']
        }
        ret.append(blank_quiz)
    return ret
