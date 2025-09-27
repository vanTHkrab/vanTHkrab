"use client";
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getMonthData} from '@/actions/weather-action';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Skeleton} from '@/components/ui/skeleton';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Calendar, AlertCircle} from 'lucide-react';

interface Month {
    value: number;
    name: string;
}

interface MonthSelectorProps {
    value?: number;
    onValueChangeAction: (value: number) => void;
    disabled?: boolean;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
                                                                value,
                                                                onValueChangeAction,
                                                                disabled = false
                                                            }) => {
    const {
        data: monthsResponse,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['months'],
        queryFn: async () => {
            const response = await getMonthData();
            console.log('Month API Response:', response); // Debug log
            return response;
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    // Handle different response formats
    let months: Month[] = [];
    if (monthsResponse) {
        if (Array.isArray(monthsResponse)) {
            months = monthsResponse;
        } else if (monthsResponse.data && Array.isArray(monthsResponse.data)) {
            months = monthsResponse.data;
        } else if (monthsResponse.months && Array.isArray(monthsResponse.months)) {
            months = monthsResponse.months;
        } else {
            console.error('Unexpected month response format:', monthsResponse);
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Calendar className="w-4 h-4"/>
                    เดือน
                </label>
                <Skeleton className="h-12 w-full"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Calendar className="w-4 h-4"/>
                    เดือน
                </label>
                <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600"/>
                    <AlertDescription className="text-red-700">
                        ไม่สามารถโหลดข้อมูลเดือนได้: {error.message}
                        <button
                            onClick={() => refetch()}
                            className="ml-2 underline hover:no-underline"
                        >
                            ลองใหม่
                        </button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!months || months.length === 0) {
        return (
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Calendar className="w-4 h-4"/>
                    เดือน
                </label>
                <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertCircle className="h-4 w-4 text-yellow-600"/>
                    <AlertDescription className="text-yellow-700">
                        ไม่พบข้อมูลเดือน
                        <button
                            onClick={() => refetch()}
                            className="ml-2 underline hover:no-underline"
                        >
                            ลองใหม่
                        </button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar className="w-4 h-4"/>
                เดือน
            </label>
            <Select
                value={value?.toString()}
                onValueChange={(val) => onValueChangeAction(parseInt(val))}
                disabled={disabled}
            >
                <SelectTrigger className="h-12 border-slate-200 hover:border-blue-300 transition-colors">
                    <SelectValue placeholder="เลือกเดือน"/>
                </SelectTrigger>
                <SelectContent>
                    {months.map((month) => (
                        <SelectItem
                            key={month.value}
                            value={month.value.toString()}
                            className="hover:bg-blue-50"
                        >
                            {month.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

// Custom hook to get month name by value
export const useMonthName = (monthValue: number | null) => {
    const {data: monthsResponse} = useQuery({
        queryKey: ['months'],
        queryFn: async () => {
            return await getMonthData();
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    if (!monthValue || !monthsResponse) return null;

    // Handle different response formats
    let months: Month[] = [];
    if (Array.isArray(monthsResponse)) {
        months = monthsResponse;
    } else if (monthsResponse.data && Array.isArray(monthsResponse.data)) {
        months = monthsResponse.data;
    } else if (monthsResponse.months && Array.isArray(monthsResponse.months)) {
        months = monthsResponse.months;
    }

    return months.find(m => m.value === monthValue)?.name || null;
};
