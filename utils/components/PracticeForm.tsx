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
}

export default function PracticeForm() {
    const [sentences, setSentences] = useState<Sentence[]>([]); //전체 문장 목록
    const [current, setCurrent] = useState<Sentence | null>(null); //현재 연습 중인 문장
    const [input, setInput] = useState(''); //사용자 입력값
    const [results, setResults] = useState<WordResult[]>([]); //단어별 정답 여부
    //hint 상태 none|wrong-only|all
    // const [hintState, setHintState] = useState<'none' | 'wrong-only' | 'all'>('none');
    const [showWrongHint, setShowWrongHint] = useState(false); //틀린 단어 힌트 표시 여부
    const [showAllHint, setShowAllHint] = useState(false);
    //const [showHint, setShowHint] = useState(false); //힌트 표시 여부
    const [message, setMessage] = useState(''); //결과메시지
    const [done, setDone] = useState(false); //연습 완료 여부
    const [shuffled, setShuffled] = useState<ShuffledWord[]>([]); //셔플된 단어 목록

    //전체 문장 조회 후 랜덤 문장 선택
    //useCallback은 매 렌더링마다 새로 생성되지 않도록 메모이제이션하는데에 사용됨.
    const fetchSentences = useCallback(async (isInitial = false) => {
        const res = await fetch('/api/sentences');

        if (res.ok) {
            const data = await res.json();
            setSentences(data);
            if (isInitial) {
                pickRandom(data);
            }
        }
    }, []);

    //문장 목록에서 랜덤으로 하나를 선택하는 함수
    const pickRandom = (data: Sentence[]) => {
        if (data.length === 0) return;
        const random = data[Math.floor(Math.random() * data.length)]; // 랜덤 인덱스 선택 로직
        setCurrent(random);
        setInput('');
        setResults([]);
        // setHintState('none');
        setShowWrongHint(false);
        setShowAllHint(false);
        setMessage('');
        setDone(false);
        setShuffled([]);
    }

    //컴포넌트 처음 마운트때 전체 문장 조회
    useEffect(() => {
        fetchSentences(true); //페이지 접속 시 최초 1회 전체 조회

        const interval = setInterval(() => {
            fetchSentences(false); //이후 30초마다 전체 조회하여 새로운 문장 반영
        }, 30000);

        return () => clearInterval(interval); //컴포넌트 언마운트 시 인터벌 정리
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
    // const handleToggleHint = () => {
    //     if (!showHint && shuffled.length === 0 && current) {
    //         const words: ShuffledWord[] = current.sentenceWords.map((sw, index) => ({
    //             word: sw.word.word,
    //             meaning: sw.word.meaning,
    //             originalIndex: index,
    //         }));
    //         setShuffled(shuffleWords(words));
    //     }
    //     setShowHint(prev => !prev);
    // }

    //특수문자 전처리, 소문자화
    const normalize = (word: string) => {
        return word.replace(/[^a-zA-Z0-9가-힣']/g, '').toLowerCase();
    }

    const handleSubmit = () => {
        if (!current || done) return;

        const inputWords = input.trim().split(' ').filter(w => w !== '');
        //DB에 저장된 정답 단어 목록
        const answerWords = current.sentenceWords.map(sw => sw.word.word);
        const wordResults: WordResult[] = [];
        let firstWrong = -1;

        for (let i = 0; i < answerWords.length; i++) {
            const inputWord = normalize(inputWords[i] || ''); //입력값 전처리
            const answerWord = normalize(answerWords[i]); //정답값

            if (inputWord === answerWord) {
                wordResults.push({ word: inputWords[i], status: 'correct' });
            }
            else {
                //틀린 단어는 사용자가 입력한 단어 그대로 보여줌.
                wordResults.push({ word: inputWords[i] || '', status: 'wrong' });
                firstWrong = i;
                break;
            }
        }

        setResults(wordResults);
        setShuffled([]); //힌트용 셔플 초기화
        //setShowHint(false); //힌트 숨김
        // setHintState('none'); //힌트 상태 초기화
        setShowAllHint(false);
        setShowWrongHint(false);

        //틀린 단어 이후 단어들 hidden 처리
        if (firstWrong === -1) {
            setMessage('정답입니다!');
            setDone(true);
        } else {
            setMessage('틀린 단어가 있어요.');
            const correctWords = inputWords.slice(0, firstWrong);
            setInput(correctWords.length > 0 ? correctWords.join(' ') + ' ' : ''); //틀린 단어 이전까지만 입력창에 남김
        }

    }
    //틀린 단어 find
    // const wrongWord = results.find(r => r.status === 'wrong');
    const wrongIndex = results.findIndex(r => r.status === 'wrong');
    const hintWord = wrongIndex !== -1 ? current?.sentenceWords[wrongIndex]?.word.word : null;

    // handleWrongHint랑 handleAllHint로 분리해서 힌트 상태 관리
    // const handleHint = () => {
    //     if (!current) return;

    //     if (hintState === 'none') {
    //         //틀린 단어 정답만
    //         setHintState('wrong-only');
    //     }
    //     else if (hintState === 'wrong-only') {
    //         //틀린 단어 제외한 나머지 단어들
    //         const otherWords: ShuffledWord[] = current.sentenceWords.filter((_, idx) => idx !== wrongIndex).map(sw => ({
    //             word: sw.word.word,
    //             meaning: sw.word.meaning,
    //         }));
    //         setShuffled(shuffleWords(otherWords));
    //         setHintState('all');
    //     }
    //     else {
    //         //힌트 닫기
    //         setHintState('none');
    //         setShuffled([]);
    //     }
    // }

    const handleWrongHint = () => {
        setShowWrongHint(prev => !prev);
    }

    const handleAllHint = () => {
        if (!showAllHint && shuffled.length === 0 && current) {
            const otherWords: ShuffledWord[] = current.sentenceWords.filter((_, idx) => idx !== wrongIndex).map(sw => ({
                word: sw.word.word,
                meaning: sw.word.meaning,
            }));
            setShuffled(shuffleWords(otherWords));
        }
        setShowAllHint(prev => !prev);
    }

    //힌트 버튼 활성화 조건: 틀린 단어가 존재할 때
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setShowWrongHint(false);
        setShowAllHint(false);
        setShuffled([]);

    }

    // const hintButtonLabel = () => {
    //     if (hintState === 'none') return '힌트 보기';
    //     else if (hintState === 'wrong-only') return '나머지 단어 힌트';
    //     else return '힌트 숨기기';
    // }

    //문장 로딩중 표시
    if (!current) return <p>문장을 불러오는 중입니다...</p>

    return (
        <div>
            <h2>영어 문장 연습</h2>
            <p>영작문제: {current?.translate}</p>

            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                    if (e.key === 'Control') handleWrongHint();
                    if (e.key === 'Alt') handleAllHint();
                }} //엔터키로 제출 가능하게 하는 이벤트 핸들러
                placeholder="영문을 입력하세요"
                disabled={done} //연습 완료 시 입력 비활성화
            />
            <button type="button" onClick={handleSubmit} disabled={done}>정답확인</button>
            <button type="button" onClick={() => pickRandom(sentences)}>다음 문제</button>

            {message && <p>{message}</p>}

            {results.length > 0 && (
                <div>
                    <p>
                        {results.map((r, idx) => (
                            <span key={idx} style={{ color: r.status === 'correct' ? 'green' : 'red' }}>
                                {r.word + ' '}
                            </span>
                        ))}
                    </p>
                    {   //틀린 단어가 있을때 (= wrongWord가 존재(true)할때) 힌트 버튼 활성화
                        wrongIndex !== -1 && (
                            <div>
                                <button type="button" onClick={handleWrongHint}>
                                    {showWrongHint ? '틀린 단어 힌트 숨기기' : '틀린 단어 힌트 보기'}
                                </button>
                                <button type="button" onClick={handleAllHint}>
                                    {showAllHint ? '모든 단어 힌트 숨기기' : '모든 단어 힌트 보기'}
                                </button>

                                { //틀린단어 정답
                                    showWrongHint && hintWord && (
                                        <p>
                                            틀린 단어 정답: <span style={{ color: 'blue' }}>{hintWord}</span>
                                            {current.sentenceWords[wrongIndex]?.word.meaning && `(${current.sentenceWords[wrongIndex].word.meaning})`}
                                        </p>
                                    )}
                                {
                                    showAllHint && (
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {shuffled.map((sw, idx) => (
                                                <li key={idx} style={{ padding: '4px 10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                                    {sw.word}
                                                    {sw.meaning && <span style={{ color: '#888', fontSize: '0.85em' }}>({sw.meaning})</span>}
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }

                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}
