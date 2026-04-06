//utils/components/UserList.tsx
'use client'

import { useEffect, useState } from 'react'

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [message, setMessage] = useState('');

    //전체 조회
    const fetchUsers = async () => {
        const res = await fetch('./api/users');
        if (res.ok) {
            const data = await res.json();
            setUsers(data);
        }
        else {
            setMessage('조회 실패했습니다')
        }
    }

    const handleDelete = async (id: number) => {
        const res = await fetch(`./api/users/${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            setMessage('삭제 성공!');
            fetchUsers();
            //삭제 후에 목록 새로고침 위함.
        } else {
            setMessage('삭제 실패!');
        }
    }

    //페이지 처음 진입 시 자동 조회 위함.
    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div>
            <h2>사용자 목록</h2>
            <button type="button" onClick={fetchUsers}>새로고침</button>
            {message && <p>{message}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        ID: {user.id} / {user.name} / {user.email}
                        <button type="button" onClick={() => handleDelete(user.id)}>삭제</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}