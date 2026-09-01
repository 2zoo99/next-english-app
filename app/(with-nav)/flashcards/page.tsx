// app/(with-nav)/flashcards/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import Flashcard from '@/utils/components/Flashcard'
import ToggleSwitch from '@/utils/components/ToggleSwitch'

type ExampleSentence = {
    content: string;
    translate: string;
}

type Expression = {
    id: number;
    content: string;
    meaning: string;
    isFavorite: boolean;
    examples: ExampleSentence[];
}

export default function FlashcardsPage() {
    const [cards, setCards] = useState<Expression[]>([]);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [loading, setLoading] = useState(true);
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [meaningFirst, setMeaningFirst] = useState(false);   // false: 표현 먼저, true: 뜻 먼저

    const fetchCards = useCallback(async (favOnly: boolean) => {
        setLoading(true);
        const res = await fetch(`/api/flashcards?favoritesOnly=${favOnly}`);
        if (res.ok) {
            const data = await res.json();
            setCards(data);
            setIndex(0);
            setFlipped(false);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCards(favoritesOnly);
    }, [fetchCards, favoritesOnly]);

    // 모드 바뀌면 뒤집힌 상태 초기화
    useEffect(() => {
        setFlipped(false);
    }, [meaningFirst]);

    async function toggleFavorite(id: number) {
        const target = cards[index];
        const method = target.isFavorite ? 'DELETE' : 'POST';

        const res = await fetch(`/api/expressions/${id}/favorite`, { method });
        if (res.ok) {
            setCards(prev => prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
        }
    }

    const goNext = useCallback(() => {
        setFlipped(false);
        setIndex(prev => (cards.length === 0 ? 0 : (prev + 1) % cards.length));
    }, [cards.length]);

    const goPrev = useCallback(() => {
        setFlipped(false);
        setIndex(prev => (cards.length === 0 ? 0 : (prev - 1 + cards.length) % cards.length));
    }, [cards.length]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (cards.length === 0) return;

            if (e.key === ' ') {
                e.preventDefault();
                setFlipped(prev => !prev);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goPrev();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [cards.length, goNext, goPrev]);

    return (
        <div className="px-4 py-6 w-full flex flex-col gap-4 items-center">
            <h2 className="text-lg font-bold dark:text-gray-200">낱말 카드</h2>

            <div className="w-full max-w-md flex flex-wrap items-center justify-center gap-3">

                <button
                    type="button"
                    onClick={() => setFavoritesOnly(prev => !prev)}
                    className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 border rounded-full whitespace-nowrap transition-colors ${favoritesOnly
                        ? 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400'
                        : 'text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                >
                    즐겨찾기만 보기
                </button>
                <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700" />

                <ToggleSwitch
                    checked={meaningFirst}
                    onChange={setMeaningFirst}
                    leftLabel="표현 먼저"
                    rightLabel="뜻 먼저"
                />
            </div>

            {loading ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 py-8">불러오는 중...</p>
            ) : cards.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 py-8">
                    {favoritesOnly ? '즐겨찾기한 표현이 없어요.' : '등록된 표현이 없어요.'}
                </p>
            ) : (
                <div className="w-full max-w-md flex flex-col gap-4">
                    {(() => {
                        const currentCard = cards[index];
                        const frontExamples = currentCard.examples.map(ex => meaningFirst ? ex.translate : ex.content);
                        const backExamples = currentCard.examples.map(ex => meaningFirst ? ex.content : ex.translate);

                        return (
                            <Flashcard
                                frontText={meaningFirst ? currentCard.meaning : currentCard.content}
                                backText={meaningFirst ? currentCard.content : currentCard.meaning}
                                frontExamples={frontExamples}
                                backExamples={backExamples}
                                flipped={flipped}
                                isFavorite={currentCard.isFavorite}
                                onFlip={() => setFlipped(prev => !prev)}
                                onToggleFavorite={() => toggleFavorite(currentCard.id)}
                            />
                        );
                    })()}

                    <div className="flex items-center justify-between">
                        <button
                            onClick={goPrev}
                            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
                        >
                            ← 이전
                        </button>
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                            {index + 1} / {cards.length}
                        </span>
                        <button
                            onClick={goNext}
                            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            다음 →
                        </button>
                    </div>


                </div>
            )}
        </div>
    )
}