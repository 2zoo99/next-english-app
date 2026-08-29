// utils/components/FreeWritingList.tsx

'use client'

import { LineNumberedText } from './LineNumberedText';


type FreeWriting = {
    id: number;
    korean: string;
    english: string;
    createdAt: string;
}

interface Props {
    writings: FreeWriting[];
    onDelete: (id: number) => void;
}

export default function FreeWritingList({ writings, onDelete }: Props) {
    async function handleDelete(id: number) {
        const res = await fetch(`/api/free-writings/${id}`, { method: 'DELETE' });
        if (res.ok) {
            onDelete(id);
        }
    }

    if (writings.length === 0) {
        return (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
                아직 작성한 기록이 없어요.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {writings.map(w => (
                <div key={w.id} className="p-4 bg-background border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-2 flex-1">
                            <LineNumberedText text={w.korean} />
                            <LineNumberedText text={w.english} />
                        </div>
                        <button
                            onClick={() => handleDelete(w.id)}
                            className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 px-2 py-1 shrink-0"
                        >
                            삭제
                        </button>
                    </div>
                    <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">
                        {new Date(w.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                </div>
            ))}
        </div>
    )
}