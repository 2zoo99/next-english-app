//utils/components/Flashcard.tsx
'use client'

interface Props {
    frontText: string;
    backText: string;
    frontExamples: string[];   // 변경: 앞면과 짝지어진 예문들
    backExamples: string[];    // 변경: 뒷면과 짝지어진 예문들
    flipped: boolean;
    isFavorite: boolean;
    onFlip: () => void;
    onToggleFavorite: () => void;
}

export default function Flashcard({ frontText, backText, frontExamples, backExamples, flipped, isFavorite, onFlip, onToggleFavorite }: Props) {
    const examples = flipped ? backExamples : frontExamples;

    return (
        <div
            onClick={onFlip}
            className="relative w-full aspect-[3/2] bg-background border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm flex flex-col items-center justify-center cursor-pointer select-none px-6"
        >
            <div className="absolute top-3 right-3 flex flex-col items-center gap-0.5">
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                    className=" text-2xl transition-transform hover:scale-110"
                    aria-label="즐겨찾기"
                >
                    {isFavorite ? '🌟' : '⭐'}
                </button>
                <span className="text-xs text-gray-300">{isFavorite ? 'bookmarked' : 'boormark'}</span>
            </div>

            <p className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
                {flipped ? backText : frontText}
            </p>

            {examples.length > 0 && (
                <div className="mt-3 flex flex-col items-center gap-0.5 max-w-full px-4">
                    {examples.slice(0, 2).map((ex, i) => (
                        <p key={i} className="text-[11px] text-green-700/50 dark:text-green-500/70 text-center truncate max-w-full">
                            {ex}
                        </p>
                    ))}
                </div>
            )}
            <p className="absolute bottom-3 text-xs text-gray-300 dark:text-gray-600">
                {flipped ? '뒷면을 보려면 카드를 클릭하세요 (스페이스바)' : '카드를 클릭해서 정답 보기 (스페이스바)'}
            </p>
        </div>
    )
}