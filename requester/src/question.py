import random
import re
from typing import List

import openai
from dotenv import find_dotenv, load_dotenv
from src.openai import create_random, translate_with_gpt
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
        prompt = f"Make a long sentence with the word \"{word}\" consistent to the part of the sentence."
        sentences = []
        for attempt in range(3):
            left = 2 - len(sentences)
            if not left:
                break
            results = create_random(prompt, n=left)
            results = set([result.strip() for result in results])  # 중복 제거
            for result in results:
                if result.find(word) == -1:
                    continue
                for sentence in sentences:  # 중복 제거
                    if result == sentence:
                        continue
                sentences.append(result)

        sentences = {
            'word': word,
            'sentences': [{'sentence': sentence, 'meaning': translate_with_gpt(sentence)} for sentence in sentences]
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

        l2 = [i for i in range(len(example_sentences))]
        l2.remove(i)
        random.shuffle(l2)

        choices = []
        choice_idxs = []

        for choice_idx in l2[:4]:
            choice = example_sentences[choice_idx]['word']
            choices.append(choice)
            choice_idxs.append(choice_idx)
        answer = random.choice(range(5))
        choices.insert(answer, elem['word'])
        choice_idxs.insert(answer, i)

        blank_quiz = {
            'sentence': pattern.sub(blank_line, sentence['sentence']),
            'choices': choices,
            'choice_idxs': choice_idxs,
            'answer': answer,
            'meaning': sentence['meaning']
        }
        ret.append(blank_quiz)
    return ret
