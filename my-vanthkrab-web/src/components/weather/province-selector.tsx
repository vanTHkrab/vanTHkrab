"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { WeatherAction } from '@/actions/weather-action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, AlertCircle } from 'lucide-react';

interface Province {
    id: number;
    name: string;
}

interface ProvinceSelectorProps {
    value?: number;
    onValueChange: (value: number) => void;
    disabled?: boolean;
}

export const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
    value,
    onValueChange,
    disabled = false
}) => {
    const {
        data: provincesResponse,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            const response = await WeatherAction.getProvinceData();
            console.log('Province API Response:', response); // Debug log
            return response;
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    // Handle different response formats
    let provinces: Province[] = [];
    if (provincesResponse) {
        if (Array.isArray(provincesResponse)) {
            provinces = provincesResponse;
        } else if (provincesResponse.data && Array.isArray(provincesResponse.data)) {
            provinces = provincesResponse.data;
        } else if (provincesResponse.provinces && Array.isArray(provincesResponse.provinces)) {
            provinces = provincesResponse.provinces;
        } else {
            console.error('Unexpected province response format:', provincesResponse);
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin className="w-4 h-4"/>
                    จังหวัด
                </label>
                <Skeleton className="h-12 w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin className="w-4 h-4"/>
                    จังหวัด
                </label>
                <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600"/>
                    <AlertDescription className="text-red-700">
                        ไม่สามารถโหลดข้อมูลจังหวัดได้: {error instanceof Error ? error.message : 'Unknown error'}
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

    if (!provinces || provinces.length === 0) {
        return (
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin className="w-4 h-4"/>
                    จังหวัด
                </label>
                <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertCircle className="h-4 w-4 text-yellow-600"/>
                    <AlertDescription className="text-yellow-700">
                        ไม่พบข้อมูลจังหวัด
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
                <MapPin className="w-4 h-4"/>
                จังหวัด
            </label>
            <Select 
                value={value?.toString()} 
                onValueChange={(val) => onValueChange(parseInt(val))}
                disabled={disabled}
            >
                <SelectTrigger className="h-12 border-slate-200 hover:border-blue-300 transition-colors">
                    <SelectValue placeholder="เลือกจังหวัด"/>
                </SelectTrigger>
                <SelectContent>
                    {provinces.map((province) => (
                        <SelectItem
                            key={province.id} 
                            value={province.id.toString()}
                            className="hover:bg-blue-50"
                        >
                            {province.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

// Custom hook to get province name by id
export const useProvinceName = (provinceId: number | null) => {
    const { data: provincesResponse } = useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            return await WeatherAction.getProvinceData();
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    if (!provinceId || !provincesResponse) return null;

    // Handle different response formats
    let provinces: Province[] = [];
    if (Array.isArray(provincesResponse)) {
        provinces = provincesResponse;
    } else if (provincesResponse.data && Array.isArray(provincesResponse.data)) {
        provinces = provincesResponse.data;
    } else if (provincesResponse.provinces && Array.isArray(provincesResponse.provinces)) {
        provinces = provincesResponse.provinces;
    }

    return provinces.find(p => p.id === provinceId)?.name || null;
};
