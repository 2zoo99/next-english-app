# /crawler/main.py
# python으로 데이터 수집해서 postgresql에 저장하는 ETL 코드

import os           # 운영체제 기능 사용을 가능케 해주는 모듈
import re           # 정규표현식 사용을 가능케 해주는 모듈
import psycopg2     # python에서 PostgreSQL 데이터베이스 사용을 가능케 해주는 모듈 
                    # (python-psycopg2-postgresql)
from dotenv import load_dotenv  # 환경변수(.env) 파일을 읽어오는 모듈, 메서드
from tatoebatools import ParallelCorpus     # 데이터를 수집하는 모듈 (=extract)

# .env 파일 읽어오기
load_dotenv()   # 환경변수(.env) 파일 읽어오는 메서드. 안하면 os.getenv 가 none 반환
DATABASE_URL = os.getenv("DATABASE_URL")        # getenv는 환경변수에서 값을 가져오는 함수. 코드안에 존재하는 비밀번호 노출을 방지하기 위해 주로 사용함.

def clean_typography(text:str) -> str:
    replacements = {
        '\u2018': "'", '\u2019': "'",   # 곡선 작은따옴표 -> 일반 따옴표
        '\u201c': '"', '\u201d': '"',   # 곡선 큰따옴표 -> 일반 따옴표
        '\u2013': '-', '\u2014': '-',   # en/em dash -> 하이픈
        '\u2026': '...',                 # 말줄임표(한 글자) -> 마침표 세 개
        '\u00a0': ' ',                   # 줄바꿈 없는 공백 -> 일반 공백
    }
    for original, replacement in replacements.items():
        text = text.replace(original, replacement)
    return text

def normalize(word:str) -> str:
    word = re.sub(r"[^a-zA-Z0-9가-힣]", "", word) 
    return word.lower()  # 소문자로 변환

def extract_words(sentence:str):
    return [normalize(w) for w in sentence.split(" ") if normalize(w)]  

def get_or_create_word_id(cur, word_text):
    cur.execute(
        'INSERT INTO "WORD" (word, "createdAt") '
        'VALUES (%s, NOW()) '
        'ON CONFLICT (word) DO UPDATE SET word = EXCLUDED.word '
        'RETURNING id',
        (word_text,)
    )
    return cur.fetchone()[0]

def import_sentences(limit=10): # limit 기본값 10 (=매개변수 미지정 시 자동 10)
    conn = psycopg2.connect(DATABASE_URL)  # PostgreSQL 데이터베이스에 접속(=로그인)
    cur = conn.cursor()                 # 커서 생성 (=SQL 문을 실행할 수 있는 객체)

    inserted = 0
    skipped = 0
    checked = 0

    for sentence, translation in ParallelCorpus("eng", "kor"):
        if inserted >= limit:
            break
        checked +=1

         # 저장 전에 특수 문자부터 정제
        cleaned_content = clean_typography(sentence.text)
        cleaned_translate = clean_typography(translation.text)
    
        cur.execute(        # SQL 문 실행
            'INSERT INTO "SENTENCE" (content, translate, "createdAt") '
            'VALUES (%s, %s, NOW()) '        # %s는 나중에 값을 바인딩할 자리 표시자
                                            # sql 인젝션 보안 공격 방지를 위해 사용
            'ON CONFLICT (content) DO NOTHING '
            'RETURNING id',
            (cleaned_content, cleaned_translate)
        )
        result = cur.fetchone()  # SQL 실행 결과 가져오기

        if result is None:  # 새로 저장된 경우
            skipped += 1
            continue
        sentence_id = result[0]  # 새로 저장된 문장의 id 가져오기
        inserted += 1

         # API와 동일한 규칙으로 단어 추출 + order는 0부터 시작
        words = extract_words(sentence.text)
        for order, word_text in enumerate(words):
            word_id = get_or_create_word_id(cur, word_text)
            cur.execute(
                'INSERT INTO "SentenceWord" ("order", "sentenceId", "wordId") '
                'VALUES (%s, %s, %s)',
                (order+1, sentence_id, word_id)
            )
        print(f"[{inserted}] 저장: {sentence.text}  ({len(words)}개 단어 연결)")

    conn.commit()  # 변경사항 DB에 완전히 저장
    cur.close()    # 커서 닫기
    conn.close()   # 연결 닫기
    print(f"\n 총 {checked}개 확인함. {inserted}개 저장, {skipped}개 건너뜀.")

if __name__ == "__main__":  # 이 파일이 직접 실행될 때만* 아래 코드 실행
    import_sentences(limit=10)  # limit 값을 조정하여 저장할 문장 수를 변경 가능