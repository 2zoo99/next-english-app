// app/(auth)/signup/page.tsx

import SignupForm from '@/utils/components/SignupForm'

export default function SignupPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200">회원가입</h1>
                <SignupForm />
            </div>
        </div>
    )
}