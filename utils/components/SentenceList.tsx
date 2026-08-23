//utils/components/SentenceList.tsx
'use client'

import { Tag } from '@/app/generated/prisma/client';
import TagEditor from './TagEditor';
import { useCallback, useEffect, useState, useMemo } from 'react'

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
type SentenceTag = {
    tag: Tag;
}
type Sentence = {
    id: number;
    content: string;
    translate: string;
    sentenceWords: SentenceWord[];
    sentenceTags: SentenceTag[];
}

function SentenceSkeleton() {
    // skeleton UI를 보여주기 위한 컴포넌트
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

    // 검색 로직 
    const filteredSentences = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return sentences;

        return sentences.filter(s =>
            s.content.toLowerCase().includes(q) ||
            s.translate.toLowerCase().includes(q)
        );
    }, [sentences, searchQuery])

    // 삭제 기능
    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/sentences/${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setMessage('삭제 성공!');
            fetchSentences();
            //삭제 후에 목록 새로고침 위함.

        } else {
            setMessage('삭제 실패!');
        }
    }

    //수정 기능
    const handleEditStart = (sentence: Sentence) => {
        setEditingId(sentence.id);
        setEditedContent(sentence.content);
        setEditedTranslate(sentence.translate);
        setMessage('');
    }

    //수정 취소 기능
    const handleEditCancle = () => {
        setEditingId(null);
        setEditedContent('');
        setEditedTranslate('');
    }

    //수정 저장 기능
    const handleEditSave = async (id: number) => {
        const res = await fetch(`/api/sentences/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: editedContent,
                translate: editedTranslate,
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
            {message && <p>{message}</p>}
            {filteredSentences.length === 0 && searchQuery.trim() && (
                <p className="text-gray-400 dark:text-gray-500 py-4">
                    &quot;{searchQuery}&quot;에 대한 검색 결과가 없어요.
                </p>
            )}
            <ul>
                {filteredSentences.map(sentence => (
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
                                    <input
                                        type="text"
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className="w-full p-1 border border-gray-200 rounded text-base" />
                                    <input
                                        type="text"
                                        value={editedTranslate}
                                        onChange={(e) => setEditedTranslate(e.target.value)}
                                        className="w-full p-1 border border-gray-200 rounded text-base" />
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
                                        <p className="dark:text-gray-300">{sentence.content}</p>
                                        <p className="dark:text-gray-300">{sentence.translate}</p>
                                        <div className="w-fit align-items flex gap-2 rounded-md py-1 pt-2">
                                            <button className="bg-gray-200 dark:bg-gray-400 text-black text-sm py-1 px-2 rounded-full hover:bg-gray-300" type="button" onClick={() => handleEditStart(sentence)}>수정</button>
                                            <button className="bg-red-200 dark:bg-red-300 text-black text-sm py-1 px-2 rounded-full hover:bg-red-300 dark:hover:bg-red-400" type="button" onClick={() => handleDelete(sentence.id)}>삭제</button>
                                        </div>
                                    </div>



                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}