import random
import string
from datetime import datetime

from docx import Document


def generate_random_str(n: int = 10) -> str:
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=n))

def generate_docx_url():
  return '/downloads/' + datetime.today().strftime('%Y-%m-%d') + '-' + generate_random_str() + '.docx'

def make_docx():
  doc = Document()
  url = generate_docx_url()
  doc.save(url)
  return url
