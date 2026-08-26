// app/(with-nav)/dashboard/page.tsx

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/utils/auth/getCurrentUser'
import StudyGrass from '@/utils/components/StudyGrass'

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        redirect('/login');
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    oneYearAgo.setHours(0, 0, 0, 0);

    const logs = await prisma.studyLog.findMany({
        where: { userId: currentUser.id, date: { gte: oneYearAgo } },
        orderBy: { date: 'asc' },
        select: { date: true, count: true }
    });

    const totalCount = logs.reduce((sum, l) => sum + l.count, 0);
    const studyDays = logs.length;

    return (
        <div className="py-8">
            <h1 className="text-2xl font-bold mb-6 dark:text-gray-200">내 대시보드</h1>

            <div className="flex gap-4 mb-6">
                <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">총 학습 횟수</p>
                    <p className="text-2xl font-bold dark:text-gray-200">{totalCount}회</p>
                </div>
                <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">학습한 날</p>
                    <p className="text-2xl font-bold dark:text-gray-200">{studyDays}일</p>
                </div>
            </div>

            <StudyGrass
                logs={logs.map(l => ({ date: l.date.toISOString().slice(0, 10), count: l.count }))}
            />
        </div>
    )

}