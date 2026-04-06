//utils/components/UserDetail.tsx
'use client'

import { useState } from 'react'

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export default function UserDetail() {
    const [id, setId] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        const res = await fetch(`./api/users/${id}`);

        if (res.ok) {
            const data = await res.json();
            setUser(data);
            setMessage('');
        } else {
            setUser(null);
            setMessage('사용자 조회 실패!');
        }
    }

    return (
        <div>
            <h2>사용자 상세 조회</h2>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="사용자 ID를 입력하세요"
            />
            <button type="button" onClick={handleSearch}>조회</button>
            {message && <p>{message}</p>}
            {user && (
                <div>
                    <p>ID: {user.id}</p>
                    <p>이름: {user.name}</p>
                    <p>이메일: {user.email}</p>
                    <p>생성일: {user.createdAt}</p>
                </div>
            )}
        </div>
    )
}
