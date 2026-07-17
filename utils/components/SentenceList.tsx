//utils/components/SentenceList.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'

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
        <div>
            <div className="flex flex-col justify-between items-start gap-2 pb-2">
                <span className="text-3xl">문장목록</span>
                <button className="" type="button" onClick={() => {
                    fetchSentences()
                    setMessage('')
                }}><img className="w-6 h-6 hover:bg-gray-300 border rounded broder-none" src="/reload-ui-svgrepo-com.svg" alt="새로고침" /></button>
            </div>

            {message && <p>{message}</p>}
            <ul>
                {sentences.map(sentence => (
                    <li key={sentence.id}>
                        {editingId === sentence.id ? (
                            <div>
                                <input type="text" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                                <input type="text" value={editedTranslate} onChange={(e) => setEditedTranslate(e.target.value)} />
                                <button type="button" onClick={() => handleEditSave(sentence.id)}>수정완료</button>
                                <button type="button" onClick={handleEditCancle}>수정취소</button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex flex-col gap-1 border rounded-md p-2 mb-2">
                                    <p>	&#91;문장&#93; {sentence.content}</p>
                                    <p>&#91;번역&#93; {sentence.translate}</p>
                                    <div className="w-fit align-items flex gap-2 border rounded-md p-1">
                                        <button className="bg-gray-200 text-black font-bold py-1 px-2 rounded" type="button" onClick={() => handleEditStart(sentence)}>수정</button>
                                        <button className="bg-red-200 text-black font-bold py-1 px-2 rounded" type="button" onClick={() => handleDelete(sentence.id)}>삭제</button>
                                    </div>
                                </div>



                            </div>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    )
}