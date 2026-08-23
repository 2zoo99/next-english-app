// /utils/components/TagEditor.tsx

'use client'

import { useState, useEffect, useRef } from "react"
import { Tag } from "@/app/generated/prisma/client"

type SentenceTag = {
    tag: Tag;
}

interface Props {
    sentenceId: number;
    currentTags: SentenceTag[];
    onUpdate: (sentenceTags: SentenceTag[]) => void;
}

export default function TagEditor({ sentenceId, currentTags, onUpdate }: Props) {
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    // 전체 태그 목록은 한 번만 가져옴 (자동완성 후보용)
    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(data => setAllTags(data))
            .catch(() => { });
    }, []);

    // 바깥 클릭하면 드롭다운 닫기
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const attachedNames = new Set(currentTags.map(st => st.tag.name));

    const filtered = allTags.filter(
        t => !attachedNames.has(t.name) && t.name.toLowerCase().includes(input.trim().toLowerCase())
    );

    const exactMatchExists = allTags.some(
        t => t.name.toLowerCase() === input.trim().toLowerCase()
    );

    async function addTag(tagName: string) {
        const name = tagName.trim();
        if (!name) return;

        const res = await fetch(`/api/sentences/${sentenceId}/tags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tagName: name }),
        });

        if (res.ok) {
            const updated = await res.json();
            onUpdate(updated.sentenceTags);
            setInput('');
            setShowDropdown(false);
            setError('');
            // 새로 만든 태그면 자동완성 후보에도 즉시 반영
            setAllTags(prev =>
                prev.some(t => t.name === name) ? prev : [...prev, { id: Date.now(), name } as Tag]
            );
        } else {
            const data = await res.json();
            setError(data.error || '태그 추가에 실패했어요.');
        }
    }

    async function removeTag(tagId: number) {
        const res = await fetch(`/api/sentences/${sentenceId}/tags`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tagId }),
        });

        if (res.ok) {
            onUpdate(currentTags.filter(st => st.tag.id !== tagId));
        } else {
            setError('태그 제거에 실패했어요.');
        }
    }

    return (
        <div ref={wrapperRef} className="relative flex flex-col gap-1">
            {/* 현재 붙은 태그들 (칩 형태, 클릭해서 제거) */}
            <div className="flex flex-wrap gap-1">
                {currentTags.map(st => (
                    <span
                        key={st.tag.id}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                        # {st.tag.name}
                        <button
                            type="button"
                            onClick={() => removeTag(st.tag.id)}
                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>

            {/* 태그 입력창 */}
            <input
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(input);
                    }
                }}
                placeholder="태그를 검색하거나 입력하세요"
                className="w-full p-1 border border-gray-200 dark:border-gray-700 rounded text-sm bg-background"
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            {/* 자동완성 드롭다운 */}
            {showDropdown && input.trim() && (
                <ul className="absolute top-full mt-1 w-full bg-background border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-10 max-h-48 overflow-y-auto">
                    {filtered.map(tag => (
                        <li key={tag.id}>
                            <button
                                type="button"
                                onClick={() => addTag(tag.name)}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                # {tag.name}
                            </button>
                        </li>
                    ))}
                    {!exactMatchExists && (
                        <li>
                            <button
                                type="button"
                                onClick={() => addTag(input)}
                                className="w-full text-left px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                + &quot;{input.trim()}&quot; 새로 만들기
                            </button>
                        </li>
                    )}
                    {filtered.length === 0 && exactMatchExists && (
                        <li className="px-3 py-2 text-sm text-gray-400">이미 붙어있는 태그예요</li>
                    )}
                </ul>
            )}
        </div>
    )
}