import os
import random
from typing import List

import openai
from dotenv import find_dotenv, load_dotenv


def create(prompt: str, n: int = 1, max_tokens: int = 60) -> List[str]:
    dotenv_file = find_dotenv()
    load_dotenv(dotenv_file)
    openai.api_key = os.environ['OPENAI_API_KEY']

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        n=n,
        max_tokens=max_tokens,
        stop=None,
        temperature=0.5,
    )
    return [choice.text.strip() for choice in response.choices]


def create_random(prompt: str, n: int = 1, max_tokens: int = 60) -> List[str]:
    return create(prompt, n, max_tokens=random.randint(max(max_tokens - 20, 1), max_tokens + 20))
