'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import GoogleLoginButton from './GoogleLoginButton'

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setMessage('');

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setMessage('이메일 또는 비밀번호가 올바르지 않아요.');
            setSubmitting(false);
        } else {
            router.push('/');
            router.refresh(); // 서버 컴포넌트들이 최신 로그인 상태를 반영하도록
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    required
                    className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                    className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    {submitting ? '로그인 중...' : '로그인'}
                </button>
            </form>

            {message && <p className="text-sm text-center text-red-500 dark:text-red-400">{message}</p>}

            <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                또는
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            <GoogleLoginButton />

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                계정이 없으신가요?{' '}
                <a href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                    회원가입
                </a>
            </p>
        </div>
    )
}