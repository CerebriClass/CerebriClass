import random
import string
from datetime import datetime

from docx import Document
from docx.oxml.ns import qn
from docx.shared import Pt
from src.types import ResultType


def generate_random_str(n: int = 10) -> str:
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=n))


def generate_docx_url():
    return '/downloads/' + datetime.today().strftime('%Y-%m-%d') + '-' + generate_random_str() + '.docx'


CHOICES_CHAR = '①②③④⑤'


def make_work_sheet(result: ResultType):
    doc = Document()

    style = doc.styles['Normal']
    # style._element.rPr.rFonts.set(qn('w:eastAsia'), 'HY신명조') # FIXME: 한글 폰트 적용 안됨
    font = style.font
    font.name = 'HY신명조'
    font.size = Pt(10)

    # dictionary
    table = doc.add_table(
        rows=len(result['dictionary']) + 1, cols=2, style=doc.styles["Table Grid"])
    for y in range(len(table.rows)):
        row = table.rows[y]
        if y == 0:
            row.cells[0].text = '단어'
            row.cells[1].text = '뜻'
            continue
        for x in range(len(row.cells)):
            cell = row.cells[x]
            if cell == 0:
                cell.text = result['dictionary'][y - 1]['word']
            else:
                cell.text = result['dictionary'][y - 1]['meaning']

    # example_sentences
    for i, elem in enumerate(result['example_sentences']):
        doc.add_paragraph(f"{i+1}. {elem['word']}")
        for sentence in elem['sentences']:
            doc.add_paragraph(f"{sentence['sentence']}")
            doc.add_paragraph(f"{sentence['meaning']}")

    no = 1
    # eng_word_quiz
    doc.add_paragraph('[뜻 선택]')
    doc.add_paragraph('다음 중 보인 단어의 뜻으로 가장 적절한 보기를 고르시오.')

    for elem in result['eng_word_quiz']:
        doc.add_paragraph(f"{no}. {elem['word']}")
        for i, choice in enumerate(elem['choices']):
            doc.add_paragraph(f"{CHOICES_CHAR[i]} {choice}")
        doc.add_paragraph(f"Answer: {elem['answer'] + 1}")
        no += 1

    # kor_word_quiz
    doc.add_paragraph('[뜻 선택]')
    doc.add_paragraph('다음 중 해당 뜻을 가진 단어로 가장 적절한 보기를 고르시오.')
    for elem in result['kor_word_quiz']:
        doc.add_paragraph(f"{no}. {elem['word']}")
        for i, choice in enumerate(elem['choices']):
            doc.add_paragraph(f"{CHOICES_CHAR[i]} {choice}")
        doc.add_paragraph(f"Answer: {elem['answer'] + 1}")
        no += 1

    # blank_quiz
    doc.add_paragraph('[단어 선택]')
    doc.add_paragraph('빈칸에 들어갈 단어 중 가장 적절한 것을 고르시오.')
    for elem in result['blank_quiz']:
        doc.add_paragraph(f"{no}. {elem['sentence']}")
        doc.add_paragraph(f"Answer: {elem['answer']}")
        doc.add_paragraph(f"Meaning: {elem['meaning']}")
        no += 1

    url = generate_docx_url()
    doc.save(url)
    return url


def make_answer_sheet(result: ResultType):
    doc = Document()
    url = generate_docx_url()
    doc.save(url)
    return url


def make_sheet(result: ResultType):
    work_sheet_url = make_work_sheet(result)
    answer_sheet_url = make_answer_sheet(result)
    return work_sheet_url, answer_sheet_url
