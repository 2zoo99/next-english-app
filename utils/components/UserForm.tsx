//utils/components/UserForm.tsx
'use client'

import { useState } from 'react'

export default function UserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch('./api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (res.ok) {
            const data = await res.json();
            setMessage(`저장 완료! 이름: ${data.name}, 이메일: ${data.email}`);
            setName('');
            setEmail('');
        }
        else {

            setMessage('저장 실패!');
        }
    }
    const handleReset = () => {
        setName('');
        setEmail('');
        setMessage('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름을 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        required
                    />
                </div>
                <button type="submit">저장</button>
                <button type="button" onClick={handleReset}>초기화</button>
                {message && <p>{message}</p>}
            </form>
        </div>

    )

}