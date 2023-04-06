import random
import string
from datetime import datetime

from docx import Document
from src.types import ResultType


def generate_random_str(n: int = 10) -> str:
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=n))


def generate_docx_url():
    return '/downloads/' + datetime.today().strftime('%Y-%m-%d') + '-' + generate_random_str() + '.docx'


def make_sheet(result: ResultType):
    work_sheet_url = make_work_sheet(result)
    answer_sheet_url = make_answer_sheet(result)
    return work_sheet_url, answer_sheet_url


def make_work_sheet(result: ResultType):
    doc = Document()
    url = generate_docx_url()
    doc.save(url)
    return url


def make_answer_sheet(result: ResultType):
    doc = Document()
    url = generate_docx_url()
    doc.save(url)
    return url
