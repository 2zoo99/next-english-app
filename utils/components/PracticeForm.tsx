//utils/components/PracticeForm.tsx
'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import { useRefresh } from '@/utils/context/RefreshContext';

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
type WordResult = {
    word: string;
    status: 'correct' | 'wrong' | 'hidden';
}
type ShuffledWord = {
    word: string;
    meaning: string | null;
}

//특수문자 전처리, 소문자화 (컴포넌트 바깥으로 이동: 리렌더링과 무관한 순수 함수라서)
const normalize = (word: string) => {
    return word.replace(/[^a-zA-Z0-9가-힣']/g, '').toLowerCase();
}

//셔플 알고리즘 로직 (마찬가지로 컴포넌트 바깥으로 이동)
const shuffleWords = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function PracticeForm() {
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [current, setCurrent] = useState<Sentence | null>(null);
    const [input, setInput] = useState('');
    const [results, setResults] = useState<WordResult[]>([]);
    const [showWrongHint, setShowWrongHint] = useState(false);
    const [showAllHint, setShowAllHint] = useState(false);
    const [message, setMessage] = useState('');
    const [done, setDone] = useState(false);
    const [shuffled, setShuffled] = useState<ShuffledWord[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);    //입력 참조용
    const { refreshKey } = useRefresh(); // 새로고침 키를 가져옴

    //전체 문장 조회 후 랜덤 문장 선택
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

    useEffect(() => {
        fetchSentences(true);

        const interval = setInterval(() => {
            fetchSentences(false);
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchSentences, refreshKey]); // refreshKey가 변경될 때마다 fetchSentences를 호출하여 문장 목록을 새로고침

    //전역 스페이스바 감지
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key !== ' ') return;  // 스페이스바는 무시
            if (done) return;
            if (document.activeElement === inputRef.current) return;

            e.preventDefault(); // preventDefault()를 호출하여 기본 브라우저 동작(=스크롤)을 막음
            inputRef.current?.focus();

            const len = inputRef.current?.value.length ?? 0;    //커서 위치를 맨 뒤로 이동
            inputRef.current?.setSelectionRange(len, len);
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        }
    }, [done]);

    //정답을 맞혔을때 enter를 누르면 다음 문제로 넘어가도록
    useEffect(() => {
        const handleEnterForNext = (e: KeyboardEvent) => {
            if (e.key !== 'Enter') return;
            if (!done) return;

            e.preventDefault();
            pickRandom(sentences);
        }
        window.addEventListener('keydown', handleEnterForNext);
        return () => window.removeEventListener('keydown', handleEnterForNext);
    }, [done, sentences]);

    //힌트 관련 상태를 한 번에 초기화 (기존에 3곳에서 반복되던 로직을 묶음)
    const resetHints = () => {
        setShowWrongHint(false);
        setShowAllHint(false);
        setShuffled([]);
    }


    //문장 목록에서 랜덤으로 하나를 선택하는 함수
    const pickRandom = (data: Sentence[]) => {
        if (data.length === 0) return;
        const random = data[Math.floor(Math.random() * data.length)];
        setCurrent(random);
        setInput('');
        setResults([]);
        setMessage('');
        setDone(false);
        resetHints();
    }

    //컴포넌트 처음 마운트때 전체 문장 조회
    useEffect(() => {
        fetchSentences(true);

        const interval = setInterval(() => {
            fetchSentences(false);
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchSentences]);

    //정답 확인 로직
    const handleSubmit = () => {
        if (!current || done) return;

        //공백 기준으로 입력값을 단어 단위로 분리
        const inputWords = input.trim().split(' ').filter(w => w !== '');
        const answerWords = current.sentenceWords.map(sw => sw.word.word);
        const wordResults: WordResult[] = [];
        let firstWrong = -1;

        for (let i = 0; i < answerWords.length; i++) {
            const inputWord = normalize(inputWords[i] || '');
            const answerWord = normalize(answerWords[i]);

            if (inputWord === answerWord) {
                wordResults.push({ word: inputWords[i], status: 'correct' });
            } else {
                wordResults.push({ word: inputWords[i] || '', status: 'wrong' });
                firstWrong = i;
                break;
            }
        }

        setResults(wordResults);
        resetHints();

        if (firstWrong === -1) {
            setMessage('정답입니다!');
            setDone(true);
        } else {
            setMessage('틀린 단어가 있어요.');
            const correctWords = inputWords.slice(0, firstWrong);
            setInput(correctWords.length > 0 ? correctWords.join(' ') + ' ' : '');
        }
    }

    const wrongIndex = results.findIndex(r => r.status === 'wrong');
    const hintWord = wrongIndex !== -1 ? current?.sentenceWords[wrongIndex]?.word.word : null;

    const handleWrongHint = () => {
        setShowWrongHint(prev => !prev);
    }

    const handleAllHint = () => {
        if (!showAllHint && shuffled.length === 0 && current) {
            const otherWords: ShuffledWord[] = current.sentenceWords
                .filter((_, idx) => idx >= wrongIndex)
                .map(sw => ({
                    word: sw.word.word,
                    meaning: sw.word.meaning,
                }));
            setShuffled(shuffleWords(otherWords));
        }
        setShowAllHint(prev => !prev);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        //resetHints();
    }

    if (!current) return <p>문장을 불러오는 중입니다...</p>

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold mb-8">영어 문장 연습</h2>
            <div className="w-full border rounded-xl shadow-sm border-gray-200 px-2 py-4">
                <p className="text-lg mb-2 mt-2">{current?.translate}</p>

                <input
                    ref={inputRef}  // 입력 참조 연결: inputRef.current를 통해 DOM 요소에 접근 가능
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit();
                        if (e.key === 'Control') handleWrongHint();
                        if (e.key === 'Alt') handleAllHint();
                    }}
                    placeholder="한국어를 읽고 영문으로 영작해 보세요."
                    disabled={done}
                    className="w-full p-2 border border-gray-200 rounded my-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="button" onClick={handleSubmit} disabled={done} className="hover:bg-gray-200 p-2 rounded">정답확인</button>
                <button type="button" onClick={() => pickRandom(sentences)} className="hover:bg-gray-200 p-2 rounded">다음 문제</button>

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
                        {wrongIndex !== -1 && (
                            <div>
                                <button
                                    type="button"
                                    onClick={handleWrongHint}
                                    title="Ctrl"
                                    className="hover:bg-gray-200 p-2 rounded">
                                    {showWrongHint ? '틀린 단어 힌트 숨기기' : '틀린 단어 힌트 보기'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAllHint}
                                    title="Alt"
                                    className="hover:bg-gray-200 p-2 rounded">
                                    {showAllHint ? '모든 단어 힌트 숨기기' : '모든 단어 힌트 보기'}
                                </button>

                                {showWrongHint && hintWord && (
                                    <p>
                                        틀린 단어 정답: <span style={{ color: 'blue' }}>{hintWord}</span>
                                        {current.sentenceWords[wrongIndex]?.word.meaning && `(${current.sentenceWords[wrongIndex].word.meaning})`}
                                    </p>
                                )}
                                {showAllHint && (
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {shuffled.map((sw, idx) => (
                                            <li key={idx} style={{ padding: '4px 10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                                {sw.word}
                                                {sw.meaning && <span style={{ color: '#888', fontSize: '0.85em' }}>({sw.meaning})</span>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}