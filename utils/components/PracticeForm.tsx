//utils/components/PracticeForm.tsx
'use client';

import { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useRefresh } from '@/utils/context/RefreshContext';
import { AutoResizeTextarea } from './AutoResizeTextarea';
import { expandWord } from '@/utils/contractions';

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
type ExpressionInfo = {
    id: number;
    content: string;
    meaning: string;
}
type ExpressionLink = {
    id: number;
    startIndex: number;
    endIndex: number;
    expression: ExpressionInfo;
}
type Sentence = {
    id: number;
    content: string;
    translate: string;
    hint: string | null;
    sentenceWords: SentenceWord[];
    sentenceTags: SentenceTag[];
    expressionSentences: ExpressionLink[];   // 추가
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
        .normalize('NFD')                  // 억양 부호를 분리 가능한 형태로 변환
        .replace(/[\u0300-\u036f]/g, '')   // 분리된 억양 부호만 제거 (é → e)
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

const getOriginalWord = (sentence: Sentence, index: number): string => {
    const words = sentence.content.split(/\s+/).filter(w => w.length > 0);
    return words[index] ?? '';
}

export default function PracticeForm() {
    const [current, setCurrent] = useState<Sentence | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [remainingCount, setRemainingCount] = useState(0);
    const [loadingNext, setLoadingNext] = useState(true);
    const [input, setInput] = useState('');
    const [results, setResults] = useState<WordResult[]>([]);
    const [showWrongHint, setShowWrongHint] = useState(false);
    const [showAllHint, setShowAllHint] = useState(false);
    const [showSentenceHint, setShowSentenceHint] = useState(false);
    const [message, setMessage] = useState('');
    const [done, setDone] = useState(false);
    const [shuffled, setShuffled] = useState<ShuffledWord[]>([]);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { refreshKey } = useRefresh();
    const ctrlComboRef = useRef(false);
    const [allTags, setAllTags] = useState<TagInfo[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());
    const [roundComplete, setRoundComplete] = useState(false);
    const router = useRouter();
    const [canAdvance, setCanAdvance] = useState(false);
    const [wrongAnswerIndex, setWrongAnswerIndex] = useState<number | null>(null);
    const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [progressChecked, setProgressChecked] = useState(false);
    const [showResumePrompt, setShowResumePrompt] = useState(false);
    const [savedSolvedIds, setSavedSolvedIds] = useState<number[]>([]);
    const initializedRef = useRef(false);
    const [showExpressionHint, setShowExpressionHint] = useState(false);

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

    // 서버에서 랜덤 문제 하나 가져오기
    const fetchNext = useCallback(async (excludeIds: Set<number>) => {
        if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
        setCanAdvance(false);
        setLoadingNext(true);

        try {
            const params = new URLSearchParams();
            if (selectedTagIds.length > 0) params.set('tagIds', selectedTagIds.join(','));
            if (excludeIds.size > 0) params.set('excludeIds', Array.from(excludeIds).join(','));

            const res = await fetch(`/api/practice/next?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setTotalCount(data.totalCount);
                setRemainingCount(data.remainingCount);

                if (!data.sentence) {
                    setCurrent(null);
                    setRoundComplete(true);
                    fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });
                } else {
                    setCurrent(data.sentence);
                    setInput('');
                    setResults([]);
                    setMessage('');
                    setDone(false);
                    setRoundComplete(false);
                    setShowWrongHint(false);
                    setShowAllHint(false);
                    setShowSentenceHint(false);
                    setShowExpressionHint(false);
                    setShuffled([]);
                    setWrongAnswerIndex(null);
                }
            }
        } catch (error) {
            console.error('다음 문제를 불러오지 못했어요:', error);
        } finally {
            setLoadingNext(false);
        }
    }, [selectedTagIds]);

    // 최초 시작 (이어하기 프롬프트가 없을 때만, 딱 한 번)
    useEffect(() => {
        if (!progressChecked) return;
        if (showResumePrompt) return;
        if (initializedRef.current) return;

        initializedRef.current = true;
        fetchNext(solvedIds);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressChecked, showResumePrompt]);

    // 태그 필터가 실제로 바뀌었을 때만 라운드 리셋
    const isFirstTagEffect = useRef(true);
    useEffect(() => {
        if (isFirstTagEffect.current) {
            isFirstTagEffect.current = false;
            return;
        }
        if (!initializedRef.current) return;

        setSolvedIds(new Set());
        setRoundComplete(false);
        fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });
        fetchNext(new Set());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTagIds]);

    function handleResume() {
        initializedRef.current = true;
        const resumedSet = new Set(savedSolvedIds);
        setSolvedIds(resumedSet);
        setShowResumePrompt(false);
        fetchNext(resumedSet);
    }

    function handleStartOver() {
        initializedRef.current = true;
        setSolvedIds(new Set());
        setShowResumePrompt(false);
        fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });
        fetchNext(new Set());
    }

    const typedWordCounts = useMemo(() => {
        const map = new Map<string, number>();
        const inputWords = input.trim().split(/\s+/).filter(w => w !== '');
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
            if (e.key !== ' ') return;
            if (e.repeat) return;
            if (done) return;
            if (document.activeElement === inputRef.current) return;

            e.preventDefault();
            inputRef.current?.focus();

            const len = inputRef.current?.value.length ?? 0;
            inputRef.current?.setSelectionRange(len, len);
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [done]);

    //정답 맞힌 뒤 Enter로 다음 문제
    useEffect(() => {
        const handleEnterForNext = (e: KeyboardEvent) => {
            if (!done || !canAdvance) return;
            if (e.key !== 'Enter') return;
            if (e.repeat) return;
            if (e.ctrlKey) return;

            e.preventDefault();
            const next = new Set(solvedIds);
            fetchNext(next);
        }
        window.addEventListener('keydown', handleEnterForNext);
        return () => window.removeEventListener('keydown', handleEnterForNext);
    }, [done, canAdvance, solvedIds, fetchNext]);

    //정답 확인 로직
    const handleSubmit = () => {
        if (!current || done) return;

        const inputWords = input.trim().split(/\s+/).filter(w => w !== '');
        const answerWords = current.sentenceWords.map(sw => sw.word.word);
        const wordResults: WordResult[] = [];

        let ii = 0; // 입력 쪽 위치
        let ai = 0; // 정답 쪽 위치
        let mismatchAtInput = -1;
        let mismatchAtAnswer = -1;
        let fullyCorrect = false;

        while (ai < answerWords.length) {
            const inWord = inputWords[ii];
            const ansWord = answerWords[ai];

            if (inWord === undefined) {
                wordResults.push({ word: '', status: 'wrong' });
                mismatchAtInput = ii;
                mismatchAtAnswer = ai;
                break;
            }

            // 1) 직접 비교 (기존 방식, 대부분 여기서 바로 끝남)
            if (normalize(inWord) === normalize(ansWord)) {
                wordResults.push({ word: inWord, status: 'correct' });
                ii += 1; ai += 1;
                continue;
            }

            // 2) 사용자가 축약형으로 씀 (예: I'd) -> 정답이 원형 두 단어(I would)인지 확인
            const inputExpansion = expandWord(inWord);
            if (
                inputExpansion.length === 2 &&
                ai + 1 < answerWords.length &&
                normalize(inputExpansion[0]) === normalize(answerWords[ai]) &&
                normalize(inputExpansion[1]) === normalize(answerWords[ai + 1])
            ) {
                wordResults.push({ word: inWord, status: 'correct' });
                ii += 1; ai += 2;
                continue;
            }

            // 3) 정답이 축약형으로 저장됨 (예: don't) -> 사용자가 원형 두 단어(do not)로 풀어썼는지 확인
            const answerExpansion = expandWord(ansWord);
            if (
                answerExpansion.length === 2 &&
                ii + 1 < inputWords.length &&
                normalize(answerExpansion[0]) === normalize(inputWords[ii]) &&
                normalize(answerExpansion[1]) === normalize(inputWords[ii + 1])
            ) {
                wordResults.push({ word: `${inputWords[ii]} ${inputWords[ii + 1]}`, status: 'correct' });
                ii += 2; ai += 1;
                continue;
            }

            // 4) 진짜 틀림
            wordResults.push({ word: inWord, status: 'wrong' });
            mismatchAtInput = ii;
            mismatchAtAnswer = ai;
            break;
        }

        if (mismatchAtAnswer === -1 && ai === answerWords.length) {
            fullyCorrect = true;
        }

        setResults(wordResults);

        if (fullyCorrect) {
            setMessage('☺️ Good Job !');
            setDone(true);
            setWrongAnswerIndex(null);
            setCanAdvance(false);
            if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
            advanceTimerRef.current = setTimeout(() => {
                setCanAdvance(true);
            }, 800);

            setSolvedIds(prev => {
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
            setMessage('😞 틀린 단어가 있어요.');
            setWrongAnswerIndex(mismatchAtAnswer);
            const correctWords = inputWords.slice(0, mismatchAtInput);
            setInput(correctWords.length > 0 ? correctWords.join(' ') + ' ' : '');
        }
    }

    const hintWord = wrongAnswerIndex !== null && current ? getOriginalWord(current, wrongAnswerIndex) : null;

    const handleWrongHint = () => {
        setShowWrongHint(prev => !prev);
    }

    const handleAllHint = () => {
        if (!showAllHint && shuffled.length === 0 && current) {
            const allWords: ShuffledWord[] = current.sentenceWords
                .map((sw, index) => ({
                    word: getOriginalWord(current, index),
                    meaning: sw.word.meaning,
                    order: index,
                }));
            setShuffled(shuffleWords(allWords));
        }
        setShowAllHint(prev => !prev);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold mb-8 dark:text-gray-300">영어 문장 연습</h2>
            <div className="flex flex-wrap gap-2 mb-4">
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
            ) : totalCount === 0 && !loadingNext ? (
                <p className="text-gray-400 dark:text-gray-500">선택한 태그에 맞는 문장이 없어요.</p>
            ) : roundComplete ? (
                <div className="w-full bg-background border rounded-xl shadow-sm border-gray-200 dark:border-gray-800 px-4 py-8 text-center">
                    <p className="text-lg font-semibold mb-2 dark:text-gray-200">🎉 모든 문장을 연습했어요!</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        총 {totalCount}개의 문장을 다 풀었어요.
                    </p>
                    <div className="flex gap-2 justify-center">
                        <button
                            type="button"
                            onClick={() => {
                                setSolvedIds(new Set());
                                fetch('/api/practice-progress', { method: 'DELETE' }).catch(() => { });
                                fetchNext(new Set());
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
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
                        {solvedIds.size} / {totalCount} 완료
                    </p>


                    {results.length > 0 && (
                        // 정답 확인 버튼을 눌러야 렌더링되도록 되어 있음.
                        <div>
                            {message && <p className='py-2 text-sm text-red-600 dark:text-red-400'>{message}</p>}
                            <p className="break-words">
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
                            {wrongAnswerIndex !== -1 && (
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <button
                                        type="button"
                                        onClick={handleWrongHint}
                                        title="Ctrl"
                                        className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded text-sm whitespace-nowrap">
                                        {showWrongHint ? '틀린 단어 힌트 숨기기' : '틀린 단어 힌트 보기'}
                                    </button>

                                    {showWrongHint && hintWord && wrongAnswerIndex !== null && (
                                        <p className="text-sm">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold">{hintWord}</span>
                                            {current.sentenceWords[wrongAnswerIndex]?.word.meaning && ` (${current.sentenceWords[wrongAnswerIndex].word.meaning})`}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
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
                                            fetchNext(solvedIds);
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
                            className="w-full p-2 pr-9 bg-background border border-gray-200 dark:border-gray-700 rounded my-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-700"
                        />
                        {input && !done && (
                            <button
                                type="button"
                                onClick={() => {
                                    setInput('');
                                    inputRef.current?.focus();
                                }}
                                aria-label="입력 초기화"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    {showSentenceHint && current.hint && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 break-words">
                            💡 {current.hint}
                        </p>
                    )}
                    {showExpressionHint && current.expressionSentences.length > 0 && (
                        <div className="flex flex-col gap-1 mb-1">
                            {current.expressionSentences.map(link => (
                                <p key={link.id} className="text-sm text-yellow-700 dark:text-yellow-400 break-words">
                                    🔑 <span className="font-medium">{link.expression.content}</span>
                                    <span className="text-yellow-600 dark:text-yellow-500"> - {link.expression.meaning}</span>
                                </p>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 sm:gap-4">
                        <button
                            type="button"
                            onClick={handleAllHint}
                            title="Alt"
                            className="text-sm hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 px-2 py-2 rounded whitespace-nowrap"
                        >
                            {showAllHint ? '모든 단어 힌트 숨기기' : '모든 단어 힌트 보기'}
                        </button>
                        {current.hint && (
                            <button
                                type="button"
                                onClick={() => setShowSentenceHint(prev => !prev)}
                                className="text-sm hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 px-2 py-2 rounded whitespace-nowrap"
                            >
                                {showSentenceHint ? '해석 힌트 숨기기' : '해석 힌트 보기'}
                            </button>
                        )}
                        {current.expressionSentences.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setShowExpressionHint(prev => !prev)}
                                className="text-sm hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 px-2 py-2 rounded whitespace-nowrap"
                            >
                                {showExpressionHint ? '표현 힌트 숨기기' : '표현 힌트 보기'}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={done ? () => fetchNext(solvedIds) : handleSubmit}
                            disabled={done && !canAdvance}
                            title="Enter"
                            className={`px-3 py-2 rounded text-sm transition-colors whitespace-nowrap ${done
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
                        <div className="border rounded bg-yellow-50 dark:bg-black border-gray-200 dark:border-gray-700 shadow-sm px-2 pb-2 pt-2 mt-2">
                            <ul className="list-none p-0 flex flex-wrap gap-1.5 sm:gap-2">

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
                                                className={`px-2 py-1 text-sm border rounded-xl transition-colors ${isTyped
                                                    ? 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-600 line-through'
                                                    : 'border-gray-300 dark:border-gray-700 dark:text-yellow-600'
                                                    }`}>
                                                {sw.word}
                                                {sw.meaning && (<span className={`text-xs ml-1 ${isTyped ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    ({sw.meaning})
                                                </span>)}
                                            </li>
                                        );
                                    });
                                })()}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div >
    )
}