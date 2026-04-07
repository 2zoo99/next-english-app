//utils/components/PracticeForm.tsx
'use client';

import { useCallback, useState, useEffect } from 'react';

type Word = {
    id: number;
    word: string;
    meaning: string | null;
}
type SentenceWord = {
    id: number;
    order: number;
    word: Word;
}
type Sentence = {
    id: number;
    content: string;
    translate: string;
    sentenceWords: SentenceWord[];
}
//각 단어 정답 여부 상태
type WordResult = {
    word: string;
    status: 'correct' | 'wrong' | 'hidden';
}
//힌트용 셔플 단어
type ShuffledWord = {
    word: string;
    meaning: string | null;
    originalIndex: number;
}

export default function PracticeForm() {
    const [sentences, setSentences] = useState<Sentence[]>([]); //전체 문장 목록
    const [current, setCurrent] = useState<Sentence | null>(null); //현재 연습 중인 문장
    const [input, setInput] = useState(''); //사용자 입력값
    const [results, setResults] = useState<WordResult[]>([]); //단어별 정답 여부
    const [showHint, setShowHint] = useState(false); //힌트 표시 여부
    const [message, setMessage] = useState(''); //결과메시지
    const [done, setDone] = useState(false); //연습 완료 여부
    const [shuffled, setShuffled] = useState<ShuffledWord[]>([]); //셔플된 단어 목록

    //전체 문장 조회 후 랜덤 문장 선택
    //useCallback은 매 렌더링마다 새로 생성되지 않도록 메모이제이션하는데에 사용됨.
    const fetchSentences = useCallback(async () => {
        const res = await fetch('./api/sentences');

        if (res.ok) {
            const data = await res.json();
            setSentences(data);
            pickRandom(data);
        }
    }, []);

    //문장 목록에서 랜덤으로 하나를 선택하는 함수
    const pickRandom = (data: Sentence[]) => {
        if (data.length === 0) return;
        const random = data[Math.floor(Math.random() * data.length)]; // 랜덤 인덱스 선택 로직
        setCurrent(random);
        setInput('');
        setResults([]);
        setShowHint(false);
        setMessage('');
        setDone(false);
        setShuffled([]);
    }

    //컴포넌트 처음 마운트때 전체 문장 조회
    useEffect(() => {
        fetchSentences();
    }, [fetchSentences]);

    //셔플 알고리즘 로직
    const shuffleWords = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    //힌트 버튼 클릭 할때 단어 셔풀함. (처음 열때만 셔플하고 이후엔 그대로 유지함.)
    const handleToggleHint = () => {
        if (!showHint && shuffled.length === 0 && current) {
            const words: ShuffledWord[] = current.sentenceWords.map((sw, index) => ({
                word: sw.word.word,
                meaning: sw.word.meaning,
                originalIndex: index,
            }));
            setShuffled(shuffleWords(words));
        }
        setShowHint(prev => !prev);
    }

    //특수문자 전처리, 소문자화
    const normalize = (word: string) => {
        return word.replace(/[^a-zA-Z0-9가-힣']/g, '').toLowerCase();
    }

    const handleSubmit = () => {
        if (!current) return;

        const inputWords = input.trim().split(' ').filter(w => w !== '');
        //DB에 저장된 정답 단어 목록
        const answerWords = current.sentenceWords.map(sw => sw.word.word);
        const wordResults: WordResult[] = [];
        let firstWrong = -1;

        for (let i = 0; i < answerWords.length; i++) {
            const inputWord = normalize(inputWords[i] || ''); //입력값 전처리
            const answerWord = normalize(answerWords[i]); //정답값

            if (inputWord === answerWord) {
                wordResults.push({ word: answerWords[i], status: 'correct' });
            }
            else {
                wordResults.push({ word: answerWord, status: 'wrong' });
                firstWrong = i;
                break;  //첫번째 틀린 단어에서 비교 중단
            }
        }
        //틀린 단어 이후 단어들 hidden 처리
        if (firstWrong !== -1) {
            for (let i = firstWrong + 1; i < answerWords.length; i++) {
                wordResults.push({ word: answerWords[i], status: 'hidden' });
            }
            setMessage('틀린 단어가 있어요.');
        } else {
            setMessage('정답입니다!');
            setDone(true);
        }
        setResults(wordResults);
        setShuffled([]); //힌트용 셔플 초기화
        setShowHint(false); //힌트 숨김

    }
    //틀린 단어 find
    const wrongWord = results.find(r => r.status === 'wrong');
    const wrongIndex = results.findIndex(r => r.status === 'wrong');
    // const hintMeaning = wrongIndex !== -1 ? current?.sentenceWords[wrongIndex]?.word.meaning : null;

    //문장 로딩중 표시
    if (!current) return <p>문장을 불러오는 중입니다...</p>

    return (
        <div>
            <h2>영어 문장 연습</h2>
            <p>영작문제: {current?.translate}</p>

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} //엔터키로 제출 가능하게 하는 이벤트 핸들러
                placeholder="영문을 입력하세요"
                disabled={done} //연습 완료 시 입력 비활성화
            />
            <button type="button" onClick={handleSubmit} disabled={done}>정답확인</button>
            <button type="button" onClick={() => pickRandom(sentences)}>다음 문제</button>

            {message && <p>{message}</p>}

            {results.length > 0 && (
                <div>
                    <p>
                        {results.map((r, idx) => {
                            if (r.status === 'correct') {
                                //맞은 단어는 초록색
                                return <span key={idx} style={{ color: 'green' }}>{r.word} </span>
                            }
                            else if (r.status === 'wrong') {
                                //틀린 단어는 빨간색
                                return <span key={idx} style={{ color: 'red' }}>{r.word} </span>
                            }
                            else {
                                //hidden단어는 표시 안함
                                return null
                            }
                        })}
                    </p>
                    {   //틀린 단어가 있을때 (= wrongWord가 존재(true)할때) 힌트 버튼 활성화
                        wrongWord && (
                            <div>
                                <button type="button" onClick={() => setShowHint(!showHint)}>{showHint ? '힌트 숨기기' : '힌트 보기'}</button>
                                { //showHint가 true일때 힌트 표시
                                    showHint && (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {shuffled.map((sw, idx) => (
                                                <li key={idx} style={{ fontWeight: sw.originalIndex === wrongIndex ? 'bold' : 'normal', color: sw.originalIndex === wrongIndex ? 'red' : 'inherit' }}>
                                                    {sw.word}
                                                    {sw.meaning ? ` - ${sw.meaning}` : ''}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}
