import re
from typing import List

import openai
from dotenv import find_dotenv, load_dotenv
from src.gpt.create import create


def make_blank_question(word: str, count: int) -> List[str]:
    word = word.strip()
    prompt = f"Make a long sentence with the word {word}"

    results = create(prompt, n=count, max_tokens=60)

    pattern = re.compile(r"\b" + re.escape(word.strip()) + r"(\w*)\b", re.IGNORECASE)
    blank_line = "_" * (len(word) + 3)
    
    return [pattern.sub(blank_line, result) for result in results]
