//utils/components/PracticeForm.tsx
'use client';

import { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useRefresh } from '@/utils/context/RefreshContext';
import { AutoResizeTextarea } from './AutoResizeTextarea';

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
    createdAt: string;
    sentenceWords: SentenceWord[];
    sentenceTags: SentenceTag[];
}
type WordResult = {
    word: string;
    status: 'correct' | 'wrong' | 'hidden';
}
type ShuffledWord = {
    word: string;
    meaning: string | null;
    order: number;
}
type TagInfo = {
    id: number;
    name: string;
}
type SentenceTag = {
    tag: TagInfo;
}

//특수문자 전처리, 소문자화 (컴포넌트 바깥으로 이동: 리렌더링과 무관한 순수 함수라서)
const normalize = (word: string) => {
    return word
        .replace(/[^a-zA-Z0-9가-힣]/g, '')
        .toLowerCase();
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
    const inputRef = useRef<HTMLTextAreaElement>(null);    //입력 참조용
    const { refreshKey } = useRefresh(); // 새로고침 키를 가져옴
    const ctrlComboRef = useRef(false);
    const [allTags, setAllTags] = useState<TagInfo[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());
    const [roundComplete, setRoundComplete] = useState(false);
    const router = useRouter();
    const [canAdvance, setCanAdvance] = useState(false);
    const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [progressChecked, setProgressChecked] = useState(false);
    const [showResumePrompt, setShowResumePrompt] = useState(false);
    const [savedSolvedIds, setSavedSolvedIds] = useState<number[]>([]);
    const initializedRef = useRef(false);

    //전체 문장 조회 후 랜덤 문장 선택
    const fetchSentences = useCallback(async () => {
        try {
            const res = await fetch('/api/sentences');
            if (res.ok) {
                const data = await res.json();
                setSentences(data);
            }
        } catch (error) {
            console.error('문장 목록을 불러오지 못했어요:', error);
            // 조용히 넘어감 — 다음 주기(30초 뒤)에 다시 시도되니까 화면을 막을 필요 없음
        }
    }, []);

    const filteredSentences = useMemo(() => {
        let result = sentences;

        if (selectedTagIds.length > 0) {
            result = result.filter(s =>
                s.sentenceTags.some(st => selectedTagIds.includes(st.tag.id))
            );
        }

        return [...result].sort((a, b) => {
            const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            return sortOrder === 'asc' ? diff : -diff;
        })
    }, [sentences, selectedTagIds, sortOrder]);

    //컴포넌트 처음 마운트때 전체 문장 조회
    useEffect(() => {
        fetchSentences();

        const interval = setInterval(() => {
            fetchSentences();
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchSentences, refreshKey]); // refreshKey가 변경될 때마다 fetchSentences를 호출하여 문장 목록을 새로고침

    // ① 최초 시작 (이어서하기/처음부터하기 프롬프트가 없을 때만, 딱 한 번)
    useEffect(() => {
        if (!progressChecked) return;
        if (showResumePrompt) return;
        if (initializedRef.current) return;
        if (sentences.length === 0) return; // 문장 목록이 아직 로딩 중이면 대기

        initializedRef.current = true;

        if (filteredSentences.length === 0) {
            setCurrent(null);
            return;
        }
        pickRandom(filteredSentences, solvedIds);
    }, [progressChecked, showResumePrompt, sentences.length, filteredSentences]);

    // ② 사용자가 실제로 태그/정렬을 바꿨을 때만 라운드 리셋 (최초 시작 이후에만 동작)
    useEffect(() => {
        if (!initializedRef.current) return;

        setSolvedIds(new Set());
        setRoundComplete(false);
        fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });

        if (filteredSentences.length === 0) {
            setCurrent(null);
            return;
        }
        pickRandom(filteredSentences, new Set());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTagIds, sortOrder]);

    // 전체 태그 목록 불러오기
    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(setAllTags)
            .catch(() => { })
    }, []);

    //마운트 시 저장된 진행 상황 한 번만 조회
    useEffect(() => {
        fetch('/api/practice-progress')
            .then(res => res.ok ? res.json() : { solvedIds: [] })
            .then(data => {
                const ids: number[] = data.solvedIds ?? [];
                if (ids.length > 0) {
                    setSavedSolvedIds(ids);
                    setShowResumePrompt(true);
                }
                setProgressChecked(true);
            })
            .catch(() => setProgressChecked(true));
    }, []);

    // 입력창 내용을 정답과 앞에서부터 비교해서, 몇 번째 단어까지 맞았는지 계산
    // const correctPrefixCount = useMemo(() => {
    //     if (!current) return 0;
    //     const inputWords = input.trim().split(' ').filter(w => w !== '');
    //     const answerWords = current.sentenceWords.map(sw => sw.word.word);

    //     let count = 0;
    //     for (let i = 0; i < answerWords.length && i < inputWords.length; i++) {
    //         if (normalize(inputWords[i]) === normalize(answerWords[i])) {
    //             count++;
    //         } else {
    //             break;
    //         }
    //     }
    //     return count;
    // }, [input, current]);

    // 입력창에 있는 단어들을 정규화해서 "단어별 몇 번 등장했는지" 세어둠
    const typedWordCounts = useMemo(() => {
        const map = new Map<string, number>();
        const inputWords = input.trim().split(' ').filter(w => w !== '');
        inputWords.forEach(w => {
            const key = normalize(w);
            if (!key) return;
            map.set(key, (map.get(key) ?? 0) + 1);
        });
        return map;
    }, [input]);

    //전역 스페이스바 감지
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key !== ' ') return;  // 스페이스바가 아니면 무시
            if (e.repeat) return;       // 키가 반복이면 무시
            if (done) return;           // 정답을 맞춘후면 무시
            if (document.activeElement === inputRef.current) return;
            // 이미 input에 포커스되어 있으면 무시

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
            if (!done || !canAdvance) return;
            if (e.key !== 'Enter') return;
            if (e.repeat) return;
            if (e.ctrlKey) return;  // ctrl이 아직 눌려있으면 다음문제로 넘기지 않음

            e.preventDefault();
            pickRandom(filteredSentences);
        }
        window.addEventListener('keydown', handleEnterForNext);
        return () => window.removeEventListener('keydown', handleEnterForNext);
    }, [done, canAdvance, filteredSentences]);

    //힌트 관련 상태를 한 번에 초기화 (기존에 3곳에서 반복되던 로직을 묶음)
    const resetHints = () => {
        setShowWrongHint(false);
        setShowAllHint(false);
        setShuffled([]);
    }


    //문장 목록에서 랜덤으로 하나를 선택하는 함수
    const pickRandom = (data: Sentence[], excludeIds: Set<number> = solvedIds) => {
        if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);   // 추가
        setCanAdvance(false);   // 추가
        const remaining = data.filter(s => !excludeIds.has(s.id));

        if (remaining.length === 0) {
            setCurrent(null);
            setRoundComplete(true);
            fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });
            return;
        }
        const random = remaining[Math.floor(Math.random() * remaining.length)];
        setCurrent(random);
        setInput('');
        setResults([]);
        setMessage('');
        setDone(false);
        setRoundComplete(false);
        resetHints();   // 다음문제로 넘어갈때만 초기화
    }


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
        //resetHints();

        if (firstWrong === -1) {
            setMessage('Good Job !');
            setDone(true);
            setCanAdvance(false);
            if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
            advanceTimerRef.current = setTimeout(() => {
                setCanAdvance(true);   // 0.8초 뒤에야 다음 문제로 넘어갈 수 있게
            }, 800);

            setSolvedIds(prev => { // 추가
                // 공부 기록 남기기 (실패해도 사용자 경험에 영향 없도록 조용히 처리)
                const next = new Set(prev).add(current.id);
                fetch('/api/practice-progress', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ solvedIds: Array.from(next) }),
                }).catch(() => { });
                return next;
            });
            fetch('/api/study-logs', { method: 'POST' }).catch(() => { });
            fetch(`/api/sentences/${current.id}/practiced`, { method: 'POST' }).catch(() => { });
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

    // 모든 힌트 출력 
    const handleAllHint = () => {
        if (!showAllHint && shuffled.length === 0 && current) {
            const allWords: ShuffledWord[] = current.sentenceWords
                .map((sw, index) => ({
                    word: sw.word.word,
                    meaning: sw.word.meaning,
                    order: index,   // 추가: 원래 순서 기억
                }));
            setShuffled(shuffleWords(allWords));
        }
        setShowAllHint(prev => !prev);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        //resetHints();
    }

    //이어서 하기 / 처음부터 하기 핸들러
    function handleResume() {
        initializedRef.current = true;
        const resumedSet = new Set(savedSolvedIds);
        setSolvedIds(resumedSet);
        setShowResumePrompt(false);
        pickRandom(filteredSentences, resumedSet);
    }

    function handleStartOver() {
        initializedRef.current = true;
        setSolvedIds(new Set());
        setShowResumePrompt(false);
        fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });
        pickRandom(filteredSentences, new Set());
    }

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold mb-8 dark:text-gray-300">영어 문장 연습</h2>
            <div className="flex flex-wrap gap-2 mb-2">
                {allTags.map(tag => {
                    const selected = selectedTagIds.includes(tag.id);
                    return (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() =>
                                setSelectedTagIds(prev =>
                                    selected ? prev.filter(id => id !== tag.id) : [...prev, tag.id]
                                )
                            }
                            className={
                                `px-2 py-1 text-xs rounded-full border transition-colors ${selected
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-transparent'
                                }`
                            }>
                            # {tag.name}
                        </button>
                    )
                })}
                {selectedTagIds.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setSelectedTagIds([])}
                        className="px-2 py-1 text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                        필터 초기화
                    </button>
                )}
            </div>
            <div className="mb-4">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="text-sm px-2 py-1 bg-background border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="desc">최신순</option>
                    <option value="asc">오래된순</option>
                </select>
            </div>
            {showResumePrompt ? (
                <div className="w-full bg-background border rounded-xl shadow-sm border-gray-200 dark:border-gray-800 px-4 py-8 text-center">
                    <p className="text-lg font-semibold mb-2 dark:text-gray-200">📝 이어서 할 연습이 있어요</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        지난번에 {savedSolvedIds.length}개를 풀었어요. 이어서 할까요?
                    </p>
                    <div className="flex gap-2 justify-center">
                        <button
                            type="button"
                            onClick={handleResume}
                            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            이어서 하기
                        </button>
                        <button
                            type="button"
                            onClick={handleStartOver}
                            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
                        >
                            처음부터 하기
                        </button>
                    </div>
                </div>
            ) :
                sentences.length > 0 && filteredSentences.length === 0 ? (
                    <p className="text-gray-400 dark:text-gray-500">선택한 태그에 맞는 문장이 없어요.</p>
                ) : roundComplete ? (
                    <div className="w-full bg-background border rounded-xl shadow-sm border-gray-200 dark:border-gray-800 px-4 py-8 text-center">
                        <p className="text-lg font-semibold mb-2 dark:text-gray-200">🎉 모든 문장을 연습했어요!</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            총 {filteredSentences.length}개의 문장을 다 풀었어요.
                        </p>
                        <div className="flex gap-2 justify-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setSolvedIds(new Set());
                                    fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });
                                    pickRandom(filteredSentences, new Set());
                                }}
                                className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                다시 연습하기
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
                            >
                                종료하기
                            </button>
                        </div>
                    </div>
                ) : !current ? (
                    <p>문장을 불러오는 중입니다...</p>
                ) : (
                    <div className="w-full bg-background border rounded-xl shadow-sm border-gray-200 dark:border-gray-800 px-2 py-4">
                        {/* 기존 연습 카드 내용 그대로 */}

                        <p className="text-lg mb-2 mt-2 dark:text-gray-300">{current?.translate}</p>

                        {!roundComplete && filteredSentences.length > 0 && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
                                {solvedIds.size} / {filteredSentences.length} 완료
                            </p>
                        )}

                        <div className="relative">
                            <AutoResizeTextarea
                                ref={inputRef}
                                value={input}
                                onChange={handleInputChange}
                                enterKeyHint="done"
                                onKeyDown={(e) => {
                                    if (e.repeat) return;

                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        if (done) {
                                            if (canAdvance) {
                                                pickRandom(filteredSentences);
                                            }
                                        } else {
                                            if (e.ctrlKey) ctrlComboRef.current = true;
                                            handleSubmit();
                                        }
                                        return;
                                    }

                                    if (e.key === 'Alt') {
                                        e.preventDefault();
                                        handleAllHint();
                                    }
                                }}
                                onKeyUp={(e) => {
                                    if (e.key === 'Control') {
                                        e.preventDefault();
                                        if (!ctrlComboRef.current) {
                                            handleWrongHint();
                                        }
                                        ctrlComboRef.current = false;
                                    }
                                }}
                                placeholder="한국어를 읽고 영문으로 영작해 보세요."
                                disabled={done}
                                className="w-full p-2 pr-8 bg-background border border-gray-200 dark:border-gray-700 rounded my-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-700"
                            />
                            {input && !done && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInput('');
                                        inputRef.current?.focus();
                                    }}
                                    aria-label="입력 초기화"
                                    className="absolute right-2 top-1/2 -translate-y-2/3 w-5 h-5 flex items-center justify-start text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleAllHint}
                                title="Alt"
                                className="hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 p-2 rounded"
                            >
                                {showAllHint ? '모든 단어 힌트 숨기기' : '모든 단어 힌트 보기'}
                            </button>
                            <button
                                type="button"
                                onClick={done ? () => pickRandom(filteredSentences) : handleSubmit}
                                disabled={done && !canAdvance}
                                title="Enter"
                                className={`px-3 py-1 rounded transition-colors ${done
                                    ? canAdvance
                                        ? 'text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                                        : 'text-gray-400 bg-gray-200 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                    : 'text-white bg-green-500 hover:bg-green-600 dark:bg-green-900 dark:hover:bg-green-800'
                                    }`}
                            >
                                {done ? '다음 문제' : '정답 확인'}
                            </button>

                        </div>
                        {showAllHint && (
                            // showAllHint 가 True일때 shuffled 배열의 모든 요소 보이기
                            // 조건부 렌더링 방식 : {조건 && 보여줄것}
                            <div className="border rounded bg-yellow-50 dark:bg-black border-gray-200 dark:border-gray-700 shadow-sm  flex px-2 pb-2 mt-2">
                                <ul className="list-none p-0 flex flex-wrap gap-2 mt-2">
                                    {(() => {
                                        // 렌더링할 때마다 "남은 개수" 맵을 복사해서, 위에서부터 하나씩 소진시키며 체크
                                        const remaining = new Map(typedWordCounts);

                                        return shuffled.map((sw, idx) => {
                                            const key = normalize(sw.word);
                                            const available = remaining.get(key) ?? 0;
                                            const isTyped = available > 0;
                                            if (isTyped) remaining.set(key, available - 1);

                                            return (
                                                <li
                                                    key={idx}
                                                    className={`px-2.5 py-1 border rounded-xl transition-colors ${isTyped
                                                        ? 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-600 line-through'
                                                        : 'border-gray-300 dark:border-gray-700 dark:text-yellow-600'
                                                        }`}>
                                                    {sw.word}
                                                    {sw.meaning && (<span className={`text-sm ml-1 ${isTyped ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'}`}>
                                                        ({sw.meaning})
                                                    </span>)}
                                                </li>
                                            );
                                        });
                                    })()}
                                </ul>
                            </div>
                        )}
                        {message && <p className='py-2'>{message}</p>}

                        {results.length > 0 && (
                            // 정답 확인 버튼을 눌러야 렌더링되도록 되어 있음.
                            <div>
                                <p>
                                    {results.map((r, idx) => (
                                        <span
                                            key={idx}
                                            className={
                                                r.status === 'correct'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }>
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
                                            className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded">
                                            {showWrongHint ? '틀린 단어 힌트 숨기기' : '틀린 단어 힌트 보기'}
                                        </button>


                                        {showWrongHint && hintWord && (
                                            <p>
                                                틀린 단어 정답: <span className="text-blue-600 dark:text-blue-400">{hintWord}</span>
                                                {current.sentenceWords[wrongIndex]?.word.meaning && `(${current.sentenceWords[wrongIndex].word.meaning})`}
                                            </p>
                                        )}

                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
        </div >
    )
}