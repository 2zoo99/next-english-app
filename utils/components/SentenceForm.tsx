//utils/components/SentenceForm.tsx

'use client'

import { useState } from 'react'

type Word = {
    id: number;
    word: string;
    order: number;
}

type Sentence = {
    id: number;
    content: string;
    words: Word[];
}

export default function SentenceForm() {
    const [content, setContent] = useState('');
    const [translate, setTranslate] = useState('');
    const [result, setResult] = useState<Sentence | null>(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch('./api/sentences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, translate }),
        });

        if (res.ok) {
            const data = await res.json();
            setResult(data);
            setContent('');
            setTranslate('');
            setMessage('문장 저장 성공!');
        }
        else {
            setMessage('문장 저장 실패!');
        }
    }

    const handleReset = () => {
        setContent('');
        setTranslate('');
        setResult(null);
        setMessage('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>문장 입력
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="문장을 입력하세요"
                        required
                    />
                </label>

                {/* <div className="content-input">
                    
                </div> */}
                <label>번역 입력
                    <input
                        type="text"
                        value={translate}
                        onChange={(e) => setTranslate(e.target.value)}
                        placeholder="번역을 입력하세요 (선택)"
                    />
                </label>

                {/* <div className='translate-input'>
                    
                </div> */}
                <button type="submit">저장</button>
                <button type="button" onClick={handleReset}>초기화</button>
            </form>
            {message && <p>{message}</p>}

            {result && (
                <div>
                    <p>저장된 문장: {result.content}</p>
                    <p>vocabulary: </p>
                    <ul>
                        {result.words.map(word => (
                            <li key={word.id}>
                                {word.order}. {word.word}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}