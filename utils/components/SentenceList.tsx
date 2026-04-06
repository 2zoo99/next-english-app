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

    //전체 조회
    const fetchSentences = useCallback(async () => {
        const res = await fetch('./api/sentences');

        if (res.ok) {
            const data = await res.json();
            setSentences(data);
        }
        else {
            setMessage('조회 실패했습니다')
        }
    }, []);

    const handleDelete = async (id: number) => {
        const res = await fetch(`./api/sentences/${id}`, {
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
                        <p>문장 {sentence.id} : {sentence.content}</p>
                        <p>번역: {sentence.translate}</p>
                        <button type="button" onClick={() => handleDelete(sentence.id)}>삭제</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}