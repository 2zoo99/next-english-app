'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import GoogleLoginButton from './GoogleLoginButton'

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setMessage('');

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('가입 확인 메일을 보냈어요. 메일함을 확인해주세요.');
        }
        setSubmitting(false);
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
                    placeholder="비밀번호 (6자 이상)"
                    required
                    minLength={6}
                    className="px-3 py-2 bg-background border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    {submitting ? '가입 중...' : '이메일로 가입하기'}
                </button>
            </form>

            {message && <p className="text-sm text-center text-gray-600 dark:text-gray-300">{message}</p>}

            <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                또는
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            <GoogleLoginButton />

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                이미 계정이 있으신가요?{' '}
                <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                    로그인
                </a>
            </p>
        </div>
    )
}