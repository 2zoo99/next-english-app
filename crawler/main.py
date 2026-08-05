# /crawler/main.py
# python으로 데이터 수집해서 postgresql에 저장하는 ETL 코드

import os           # 운영체제 기능 사용을 가능케 해주는 모듈
import psycopg2     # python에서 PostgreSQL 데이터베이스 사용을 가능케 해주는 모듈 
                    # (python-psycopg2-postgresql)
from dotenv import load_dotenv  # 환경변수(.env) 파일을 읽어오는 모듈, 메서드
from tatoebatools import ParallelCorpus     # 데이터를 수집하는 모듈 (=extract)

# .env 파일 읽어오기
load_dotenv()   # 환경변수(.env) 파일 읽어오는 메서드. 안하면 os.getenv 가 none 반환
DATABASE_URL = os.getenv("DATABASE_URL")        # getenv는 환경변수에서 값을 가져오는 함수. 코드안에 존재하는 비밀번호 노출을 방지하기 위해 주로 사용함.

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
    
        cur.execute(        # SQL 문 실행
            'INSERT INTO "SENTENCE" (content, translate, "createdAt")'
            'VALUES (%s, %s, NOW())'        # %s는 나중에 값을 바인딩할 자리 표시자
                                            # sql 인젝션 보안 공격 방지를 위해 사용
            'ON CONFLICT (content) DO NOTHING',
            (sentence.text, translation.text)
        )

        if cur.rowcount == 0:
            skipped += 1
        else:
            inserted += 1
            print(f"[{inserted}] 저장 : {sentence.text}")

    conn.commit()  # 변경사항 DB에 완전히 저장
    cur.close()    # 커서 닫기
    conn.close()   # 연결 닫기
    print(f"\n 총 {checked}개 확인함. {inserted}개 저장, {skipped}개 건너뜀.")

if __name__ == "__main__":  # 이 파일이 직접 실행될 때만* 아래 코드 실행
    import_sentences(limit=10)  # limit 값을 조정하여 저장할 문장 수를 변경 가능