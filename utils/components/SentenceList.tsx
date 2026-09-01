// utils/components/SentenceList.tsx
'use client'

import { Tag } from '@/app/generated/prisma/client';
import TagEditor from './TagEditor';
import { useCallback, useEffect, useState, useMemo } from 'react'
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
type TagInfo = {
    id: number;
    name: string;
}
type SentenceTag = {
    tag: Tag;
}
type Sentence = {
    id: number;
    content: string;
    translate: string;
    hint: string | null;
    sentenceWords: SentenceWord[];
    sentenceTags: SentenceTag[];
    isPracticed: boolean;
    practiceCount: number;
}

function SentenceSkeleton() {
    return (
        <li className="animate-pulse p-4 border rounded-md">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="flex gap-2">
                <div className="h-7 bg-gray-200 rounded w-10" />
                <div className="h-7 bg-gray-200 rounded w-10" />
            </div>
        </li>
    )
}

export default function SentenceList() {
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedTranslate, setEditedTranslate] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedHint, setEditedHint] = useState('');
    const [allTags, setAllTags] = useState<TagInfo[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [hideContent, setHideContent] = useState(false);
    const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

    //전체 조회
    const fetchSentences = useCallback(async () => {
        const res = await fetch('/api/sentences');

        if (res.ok) {
            const data = await res.json();
            setSentences(data);
        }
        else {
            setMessage('조회 실패했습니다')
        }
        setLoading(false);
    }, []);

    // 전체 태그 목록 불러오기
    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(setAllTags)
            .catch(() => { });
    }, []);

    // 검색 + 태그 필터 로직
    const filteredSentences = useMemo(() => {
        let result = sentences;

        const q = searchQuery.trim().toLowerCase();
        if (q) {
            result = result.filter(s =>
                s.content.toLowerCase().includes(q) ||
                s.translate.toLowerCase().includes(q)
            );
        }

        if (selectedTagIds.length > 0) {
            result = result.filter(s =>
                s.sentenceTags.some(st => selectedTagIds.includes(st.tag.id))
            );
        }

        return result;
    }, [sentences, searchQuery, selectedTagIds])

    // 가리기 토글 바뀌면 개별 공개 상태 초기화
    useEffect(() => {
        setRevealedIds(new Set());
    }, [hideContent]);

    function toggleReveal(id: number) {
        setRevealedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    // 삭제 기능
    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/sentences/${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setMessage('삭제 성공!');
            fetchSentences();
        } else {
            setMessage('삭제 실패!');
        }
    }

    //수정 기능
    const handleEditStart = (sentence: Sentence) => {
        setEditingId(sentence.id);
        setEditedContent(sentence.content);
        setEditedTranslate(sentence.translate);
        setEditedHint(sentence.hint ?? '');
        setMessage('');
    }

    //수정 취소 기능
    const handleEditCancle = () => {
        setEditingId(null);
        setEditedContent('');
        setEditedTranslate('');
        setEditedHint('');
    }

    //수정 저장 기능
    const handleEditSave = async (id: number) => {
        const res = await fetch(`/api/sentences/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: editedContent,
                translate: editedTranslate,
                hint: editedHint,
            })
        })

        if (res.ok) {
            setEditingId(null);
            setMessage('수정 성공!');
            fetchSentences();
        } else {
            setMessage('수정 실패!');
        }
    }

    //페이지 처음 진입 시 자동 조회 위함.
    useEffect(() => {
        fetchSentences();
    }, [fetchSentences]);

    if (loading) return (
        <div>
            <ul className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map(i => <SentenceSkeleton key={i} />)}
            </ul>
        </div>
    )

    return (
        <div className="bg-background">
            <div className="flex flex-row justify-between items-start gap-2 pb-2">
                <span className="text-3xl dark:text-gray-300">문장목록</span>
                <button
                    className="w-12 h-12 mx-2 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded border-none text-gray-700 dark:text-gray-300"
                    title="새로고침"
                    type="button"
                    onClick={() => {
                        fetchSentences()
                        setMessage('')
                    }}
                >
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M23,12A11,11,0,1,1,12,1a10.9,10.9,0,0,1,5.882,1.7l1.411-1.411A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707L16.42,4.166A8.9,8.9,0,0,0,12,3a9,9,0,1,0,9,9,1,1,0,0,1,2,0Z" />
                    </svg>
                </button>
            </div>

            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type for searching items..."
                className="w-full p-2 mb-3 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* 태그 필터 */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
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
                            className={`px-2 py-1 text-xs rounded-full border transition-colors ${selected
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-transparent'
                                }`}
                        >
                            # {tag.name}
                        </button>
                    );
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

            {/* 영어 문장 가리기 토글 */}
            <div className="flex items-center gap-2 mb-3 text-sm">
                <span className={!hideContent ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                    문장 보기
                </span>
                <button
                    type="button"
                    role="switch"
                    aria-checked={hideContent}
                    onClick={() => setHideContent(prev => !prev)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${hideContent ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${hideContent ? 'translate-x-5' : 'translate-x-0'
                            }`}
                    />
                </button>
                <span className={hideContent ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                    문장 가리기
                </span>
            </div>

            {filteredSentences.length === 0 && (searchQuery.trim() || selectedTagIds.length > 0) && (
                <p className="text-gray-400 dark:text-gray-500 py-4">
                    조건에 맞는 문장이 없어요.
                </p>
            )}

            <ul>
                {filteredSentences.map(sentence => {
                    const isHidden = hideContent && !revealedIds.has(sentence.id);

                    return (
                        <li key={sentence.id}>
                            <div className="flex flex-col gap-1 border border-gray-200  dark:border-gray-600 rounded-xl p-4 mb-2">
                                {sentence.sentenceTags && sentence.sentenceTags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {sentence.sentenceTags.map((st) => (
                                            <span key={st.tag.id} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                                                # {st.tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {editingId === sentence.id ? (
                                    <>
                                        <AutoResizeTextarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            className="w-full p-1 border border-gray-200 rounded text-base" />
                                        <AutoResizeTextarea
                                            value={editedTranslate}
                                            onChange={(e) => setEditedTranslate(e.target.value)}
                                            className="w-full p-1 border border-gray-200 rounded text-base" />
                                        <AutoResizeTextarea
                                            value={editedHint}
                                            onChange={(e) => setEditedHint(e.target.value)}
                                            placeholder="해석 힌트 (선택)"
                                            className="w-full p-1 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-600 dark:text-gray-400" />

                                        <TagEditor
                                            sentenceId={sentence.id}
                                            currentTags={sentence.sentenceTags}
                                            onUpdate={(updatedTags) => {
                                                setSentences(prev => prev.map(s =>
                                                    s.id === sentence.id ? { ...s, sentenceTags: updatedTags } : s
                                                ));
                                            }}
                                        />
                                        <div className="w-fit align-items flex gap-2 rounded-md p-1">
                                            <button
                                                className="bg-blue-200 text-black text-sm py-1 px-2 rounded-full hover:bg-blue-300"
                                                type="button"
                                                onClick={() => handleEditSave(sentence.id)}>수정하기</button>
                                            <button
                                                className="bg-gray-200 text-black text-sm py-1 px-2 rounded-full hover:bg-gray-300"
                                                type="button"
                                                onClick={handleEditCancle}>수정취소</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-1 border-none rounded-md px-2 ">
                                            <div className="flex justify-between items-center gap-1">
                                                {isHidden ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleReveal(sentence.id)}
                                                        className="text-left w-full h-6 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                                                        aria-label="클릭해서 문장 보기"
                                                    />
                                                ) : (
                                                    <p className="dark:text-gray-300">{sentence.content}</p>
                                                )}
                                                {sentence.isPracticed && (
                                                    <span className='shrink-0 px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                                                        title={`${sentence.practiceCount}번 맞춤`}>✓ 연습함</span>
                                                )}
                                                {hideContent && !isHidden && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleReveal(sentence.id)}
                                                        className="px-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                    >
                                                        가리기
                                                    </button>
                                                )}
                                            </div>
                                            <p className="dark:text-gray-300">{sentence.translate}</p>
                                            {sentence.hint && (
                                                <p className="w-max px-1.5 py-0.5 rounded-md text-sm text-gray-500 dark:text-gray-300 bg-yellow-200/20">🗒️ {sentence.hint}</p>
                                            )}
                                            <div className="w-fit align-items flex gap-2 rounded-md py-1 pt-2">
                                                <button className="bg-gray-200 dark:bg-gray-400 text-black text-sm py-1 px-2 rounded-full hover:bg-gray-300" type="button" onClick={() => handleEditStart(sentence)}>수정</button>
                                                <button className="bg-red-200 dark:bg-red-300 text-black text-sm py-1 px-2 rounded-full hover:bg-red-300 dark:hover:bg-red-400" type="button" onClick={() => handleDelete(sentence.id)}>삭제</button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li >
                    );
                })
                }
            </ul >

        </div >
    )
}