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

export default function SentenceList() {
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedTranslate, setEditedTranslate] = useState('');

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

    return (
        <div>
            <h2>문장 목록</h2>
            <button type="button" onClick={() => {
                fetchSentences()
                setMessage('')
            }}>새로고침</button>
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
                                <p>문장 {sentence.id} : {sentence.content}</p>
                                <p>번역: {sentence.translate}</p>
                                <button type="button" onClick={() => handleEditStart(sentence)}>수정</button>
                                <button type="button" onClick={() => handleDelete(sentence.id)}>삭제</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    )
}