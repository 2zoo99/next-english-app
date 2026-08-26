// utils/components/StudyGrass.tsx

'use client'

import { useMemo, useState } from 'react'

type LogEntry = { date: string; count: number };

interface Props {
    logs: LogEntry[];
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

function getColorClass(count: number) {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 2) return 'bg-green-200 dark:bg-green-900';
    if (count <= 5) return 'bg-green-400 dark:bg-green-700';
    if (count <= 9) return 'bg-green-500 dark:bg-green-600';
    return 'bg-green-600 dark:bg-green-500';
}

export default function StudyGrass({ logs }: Props) {
    const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null);

    const countByDate = useMemo(() => {
        const map = new Map<string, number>();
        logs.forEach(l => map.set(l.date, l.count));
        return map;
    }, [logs]);

    // 오늘부터 364일 전까지, 일요일 기준으로 주 단위 그리드 구성
    const weeks = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(today);
        start.setDate(start.getDate() - 364);
        start.setDate(start.getDate() - start.getDay()); // 그 주의 일요일로 맞춤

        const result: { date: string; count: number }[][] = [];
        let currentWeek: { date: string; count: number }[] = [];
        const cursor = new Date(start);

        while (cursor <= today) {
            const key = cursor.toISOString().slice(0, 10);
            currentWeek.push({ date: key, count: countByDate.get(key) ?? 0 });

            if (cursor.getDay() === 6) {
                result.push(currentWeek);
                currentWeek = [];
            }
            cursor.setDate(cursor.getDate() + 1);
        }
        if (currentWeek.length > 0) result.push(currentWeek);
        return result;
    }, [countByDate]);

    return (
        <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-xl p-4 overflow-x-auto">
            <div className="flex gap-1">
                <div className="flex flex-col gap-1 mr-1 text-xs text-gray-400 dark:text-gray-500">
                    {DAY_LABELS.map((label, i) => (
                        <div
                            key={i}
                            className="h-3 flex items-center"
                            style={{ visibility: i % 2 === 0 ? 'visible' : 'hidden' }}
                        >
                            {label}
                        </div>
                    ))}
                </div>
                {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                        {week.map((day) => (
                            <div
                                key={day.date}
                                onMouseEnter={() => setHovered(day)}
                                onMouseLeave={() => setHovered(null)}
                                className={`w-3 h-3 rounded-sm ${getColorClass(day.count)} cursor-pointer`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 h-4">
                {hovered
                    ? `${hovered.date} · ${hovered.count}개 학습`
                    : '칸에 마우스를 올려 날짜별 학습량을 확인하세요'}
            </div>
        </div>
    )
}