"use client";
import React, {useState} from 'react';
import {WeatherAction} from "@/actions/weatherAction";
import {provinces, months, getCircularMonth, getProvinceName} from "@/utils/provinces";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Badge} from "@/components/ui/badge";

interface PredictionResult {
    pred: number;
    prob: string;
}

const WeatherPage = () => {
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePredict = async () => {
        if (!selectedProvince || !selectedMonth) {
            setError('กรุณาเลือกจังหวัดและเดือน');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const circularMonth = getCircularMonth(selectedMonth);
            const data = {
                PROV_ID: selectedProvince,
                month_sin: circularMonth.month_sin,
                month_cos: circularMonth.month_cos,
            };

            const response = await WeatherAction.postWeatherData(data);
            console.log('Prediction response:', response);
            setPrediction(response);
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการทำนาย กรุณาลองใหม่อีกครั้ง');
            console.error('Prediction error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getPredictionText = (pred: number) => {
        return pred === 1 ? 'ฝนตก' : 'ไม่มีฝน';
    };

    const getPredictionColor = (pred: number) => {
        return pred === 1 ? 'bg-blue-500' : 'bg-orange-500';
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    ระบบทำนายฝน
                </h1>
                <p className="text-lg text-gray-600">
                    เลือกจังหวัดและเดือนเพื่อทำนายว่าจะมีฝนตกหรือไม่
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>เลือกข้อมูลการทำนาย</CardTitle>
                        <CardDescription>
                            กรุณาเลือกจังหวัดและเดือนที่ต้องการทำนาย
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Province Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                จังหวัด
                            </label>
                            <Select
                                value={selectedProvince?.toString()}
                                onValueChange={(value) => setSelectedProvince(parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกจังหวัด"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces.map((province) => (
                                        <SelectItem key={province.id} value={province.id.toString()}>
                                            {province.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Month Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                เดือน
                            </label>
                            <Select
                                value={selectedMonth?.toString()}
                                onValueChange={(value) => setSelectedMonth(parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกเดือน"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month) => (
                                        <SelectItem key={month.value} value={month.value.toString()}>
                                            {month.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Selected Values Display */}
                        {(selectedProvince || selectedMonth) && (
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">ข้อมูลที่เลือก:</h4>
                                {selectedProvince && (
                                    <p className="text-sm text-gray-600">
                                        จังหวัด: <span
                                        className="font-medium">{getProvinceName(selectedProvince)}</span>
                                    </p>
                                )}
                                {selectedMonth && (
                                    <p className="text-sm text-gray-600">
                                        เดือน: <span
                                        className="font-medium">{months.find(m => m.value === selectedMonth)?.name}</span>
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <Alert className="border-red-200 bg-red-50">
                                <AlertDescription className="text-red-700">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Predict Button */}
                        <Button
                            onClick={handlePredict}
                            disabled={loading || !selectedProvince || !selectedMonth}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div
                                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    กำลังทำนาย...
                                </div>
                            ) : (
                                'ทำนายฝน'
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Result Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>ผลการทำนาย</CardTitle>
                        <CardDescription>
                            ผลลัพธ์จากการทำนายฝน
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {prediction ? (
                            <div className="space-y-4">
                                {/* Main Result */}
                                <div
                                    className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
                                    <div className="mb-4">
                                        <Badge
                                            className={`${getPredictionColor(prediction.pred)} text-white text-lg px-4 py-2`}>
                                            {getPredictionText(prediction.pred)}
                                        </Badge>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {prediction.prob ? `ความน่าจะเป็น: ${(parseFloat(prediction.prob) * 100).toFixed(1)}%` : ''}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {prediction.pred === 1 ? '🌧️ คาดการณ์ว่าจะมีฝนตก' : '☀️ คาดการณ์ว่าจะไม่มีฝน'}
                                    </p>

                                    {/* Probability Bar */}
                                    {prediction.prob && (
                                        <div className="mt-4">
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>ความน่าจะเป็นของฝน</span>
                                                <span>{(parseFloat(prediction.prob) * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    className={`h-3 rounded-full transition-all duration-500 ${
                                                        prediction.pred === 1 ? 'bg-blue-500' : 'bg-orange-500'
                                                    }`}
                                                    style={{width: `${(parseFloat(prediction.prob) * 100).toFixed(1)}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Technical Details */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-700 mb-2">รายละเอียดทางเทคนิค:</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                        <div>ค่าทำนาย: {prediction.pred}</div>
                                        <div>จังหวัด: {selectedProvince ? getProvinceName(selectedProvince) : '-'}</div>
                                        {prediction.prob && (
                                            <div>ความน่าจะเป็น: {(parseFloat(prediction.prob) * 100).toFixed(1)}%</div>
                                        )}
                                        {selectedMonth && (
                                            <>
                                                <div>Month
                                                    Sin: {getCircularMonth(selectedMonth).month_sin.toFixed(4)}</div>
                                                <div>Month
                                                    Cos: {getCircularMonth(selectedMonth).month_cos.toFixed(4)}</div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Reset Button */}
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setPrediction(null);
                                        setSelectedProvince(null);
                                        setSelectedMonth(null);
                                        setError(null);
                                    }}
                                    className="w-full"
                                >
                                    ทำนายใหม่
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                                    </svg>
                                </div>
                                <p className="text-gray-500">
                                    เลือกจังหวัดและเดือนเพื่อเริ่มทำนาย
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Information Section */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>เกี่ยวกับระบบทำนายฝน</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">วิธีการทำงาน</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• ใช้ข้อมูลจาก {provinces.length} จังหวัดทั่วประเทศไทย</li>
                                <li>• แปลงเดือนเป็นค่า Sin และ Cos เพื่อจำลองรูปแบบวงกลม</li>
                                <li>• ทำนายผลลัพธ์เป็น 0 (ไม่มีฝน) หรือ 1 (ฝนตก)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">ข้อมูลที่ใช้</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• รหัสจังหวัด (PROV_ID)</li>
                                <li>• ค่า Sine ของเดือน (month_sin)</li>
                                <li>• ค่า Cosine ของเดือน (month_cos)</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WeatherPage;