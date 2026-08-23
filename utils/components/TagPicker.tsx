// /utils/componenets/TagPicker.tsx

'use client'

import { useState, useEffect, useRef } from "react"
import { Tag } from '@/app/generated/prisma/client'
import { WordInclude } from "@/app/generated/prisma/models";

interface Props {
    selectedTags: string[];
    onChange: (tags: string[]) => void;
}

export default function TagPicker({
    selectedTags, onChange
}: Props) {
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(setAllTags)
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

    const filtered = allTags.filter(
        t => !selectedTags.includes(t.name) && t.name.toLowerCase().includes(input.trim().toLowerCase())
    );

    const exactMatchExists = allTags.some(
        t => t.name.toLowerCase() === input.trim().toLowerCase()
    );
    // 로컬 state에만 추가 (API 호출 없음 — 문장이 아직 없으니까)
    function addTag(tagName: string) {
        const name = tagName.trim();
        if (!name || selectedTags.includes(name)) return;

        onChange([...selectedTags, name]);
        setInput('');
        setShowDropdown(false);
    }

    function removeTag(name: string) {
        onChange(selectedTags.filter(t => t !== name));
    }

    return (
        <div ref={wrapperRef} className="relative flex flex-col gap-1">
            {/* 선택된 태그 칩 */}
            {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {selectedTags.map(name => (
                        <span
                            key={name}
                            className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                            # {name}
                            <button
                                type="button"
                                onClick={() => removeTag(name)}
                                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            )}
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
                className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
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
                        <li className="px-3 py-2 text-sm text-gray-400">이미 선택된 태그예요</li>
                    )}
                </ul>
            )}
        </div>
    )
}