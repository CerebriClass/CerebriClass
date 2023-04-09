import json
import os
import sys
import urllib.request

from dotenv import find_dotenv, load_dotenv


def translate(text: str, source: str = 'en', target: str = 'ko') -> str:
    dotenv_file = find_dotenv()
    load_dotenv(dotenv_file)
    CLIENT_ID = os.environ['PAPAGO_CLIENT_ID']
    CLIENT_SECRET = os.environ['PAPAGO_CLIENT_SECRET']

    encText = urllib.parse.quote(text)
    data = f"source={source}&target={target}&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", CLIENT_ID)
    request.add_header("X-Naver-Client-Secret", CLIENT_SECRET)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if (rescode == 200):
        response_body = response.read()
    else:
        raise Exception("Error Code:" + rescode)
    ret = response_body.decode('utf-8')
    ret = json.loads(ret)
    return ret['message']['result']['translatedText']


def translate_word(text: str) -> str:
    # papago api라서 단어를 번역하더라도 뒤에 ., 가 붙을 수 있음
    return translate(text).strip('., ')
