"use client";
import React, {useState, useEffect} from 'react';
import {
    type PostWeatherDataResponse as PredictionResult,
    type PostWeatherData,
    getHealthData,
    postWeatherData
} from "@/actions/weather-action";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Badge} from '@/components/ui/badge';
import {Skeleton} from '@/components/ui/skeleton';
import {Progress} from '@/components/ui/progress';
import {Cloud, Sun, CloudRain, MapPin, Zap, Info, RefreshCw, CheckCircle, XCircle} from 'lucide-react';
import {ProvinceSelector, useProvinceName} from '@/components/weather/province-selector';
import {MonthSelector, useMonthName} from '@/components/weather/month-selector';

const ModernWeatherPage = () => {
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [apiHealthy, setApiHealthy] = useState<boolean | null>(null);
    const [progress, setProgress] = useState(0);

    const provinceName = useProvinceName(selectedProvince);
    const monthName = useMonthName(selectedMonth);

    useEffect(() => {
        const checkApiHealth = async () => {
            try {
                const response = await getHealthData();
                setApiHealthy(true);
                console.log('API Health Check:', response);
            } catch (err) {
                setApiHealthy(false);
                console.error('API Health Check Error:', err);
            }
        };
        checkApiHealth();
    }, []);

    const handlePredict = async () => {
        if (!selectedProvince || !selectedMonth) {
            setError('กรุณาเลือกจังหวัดและเดือน');
            return;
        }

        setLoading(true);
        setError(null);
        setProgress(0);

        let interval: NodeJS.Timeout;
        interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 90) {
                    clearInterval(interval);
                    return oldProgress;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 90);
            });
        }, 300);

        try {
            const data:PostWeatherData = {
                PROV_ID: selectedProvince,
                month_id: selectedMonth,
            };

            const response = await postWeatherData(data);

            setProgress(100);
            setPrediction(response);
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการทำนาย กรุณาลองใหม่อีกครั้ง');
            console.error('Prediction error:', err);
        } finally {
            clearInterval(interval);
            setTimeout(() => {
                setLoading(false);
                setProgress(0);
            }, 300);
        }
    };

    const getPredictionText = (prediction: number) => prediction === 1 ? 'ฝนตก' : 'ไม่มีฝน';
    const getPredictionIcon = (prediction: number) => prediction === 1 ? CloudRain : Sun;
    const getPredictionColor = (prediction: number) => prediction === 1 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600';

    return (
        <div
            className="min-h-screen bg-black py-12 relative"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '25px 25px',
                backgroundAttachment: 'fixed',
            }}>
            {/* Container */}
            <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-200 rounded-2xl mb-6 shadow-xl border border-white">
                        <Cloud className="w-10 h-10 text-black"/>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
                        ระบบทำนายฝน AI
                    </h1>
                    <p className="text-xl text-white max-w-2xl mx-auto">
                        ใช้เทคนิคปัญญาประดิษฐ์ในการทำนายสภาพอากาศ เลือกจังหวัดและเดือนเพื่อได้รับการคาดการณ์ที่แม่นยำ
                    </p>
                </div>

                {/* API Status Alert */}
                {apiHealthy === null ? (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <Skeleton className="h-12 w-full bg-white">
                            <div className="text-center text-black font-medium">
                                กำลังตรวจสอบสถานะ API...
                            </div>
                        </Skeleton>
                    </div>
                ) : (
                    <div className="mb-8 max-w-2xl mx-auto transition-opacity duration-500 opacity-100">
                        {apiHealthy ? (
                            <Alert className="border-white bg-white shadow-lg">
                                <CheckCircle className="h-5 w-5 text-green-600"/>
                                <AlertDescription className="text-black font-medium">
                                    เชื่อมต่อกับ API ทำนายฝนเรียบร้อยแล้ว
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <Alert className="border-white bg-white shadow-lg">
                                <XCircle className="h-5 w-5 text-red-600"/>
                                <AlertDescription className="text-black font-medium">
                                    ไม่สามารถเชื่อมต่อกับ API ทำนายฝนได้ กรุณาลองใหม่อีกครั้งในภายหลัง
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Input Form */}
                    <div className="xl:col-span-1">
                        <Card className="shadow-xl bg-white border border-gray-200 h-fit">
                            <CardHeader className="pb-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-white"/>
                                    </div>
                                    <div>
                                        <CardTitle className="text-slate-900">ข้อมูลการทำนาย</CardTitle>
                                        <CardDescription className="text-slate-600">
                                            เลือกตำแหน่งและเวลาที่ต้องการทำนาย
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-8">

                                {/* Province Selection */}
                                <ProvinceSelector
                                    value={selectedProvince || undefined}
                                    onValueChange={setSelectedProvince}
                                    disabled={loading}
                                />

                                {/* Month Selection */}
                                <MonthSelector
                                    value={selectedMonth || undefined}
                                    onValueChange={setSelectedMonth}
                                    disabled={loading}
                                />

                                {/* Selected Values Display */}
                                {(selectedProvince || selectedMonth) && (
                                    <div
                                        className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                            <Info className="w-4 h-4"/>
                                            ข้อมูลที่เลือก
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedProvince && provinceName && (
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                                        {provinceName}
                                                    </Badge>
                                                </div>
                                            )}
                                            {selectedMonth && monthName && (
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary"
                                                           className="bg-indigo-100 text-indigo-800">
                                                        {monthName}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Error Display */}
                                {error && (
                                    <Alert className="border-red-200 bg-red-50">
                                        <XCircle className="h-4 w-4 text-red-600"/>
                                        <AlertDescription className="text-red-700">{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Progress Bar */}
                                {loading && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm text-slate-600">
                                            <span>กำลังประมวลผล...</span>
                                            <span>{Math.round(progress)}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2"/>
                                    </div>
                                )}

                                {/* Predict Button */}
                                <Button
                                    onClick={handlePredict}
                                    disabled={loading || !selectedProvince || !selectedMonth}
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                    size="lg"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <RefreshCw className="w-4 h-4 animate-spin"/>
                                            กำลังทำนาย...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-4 h-4"/>
                                            ทำนายฝน
                                        </div>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Result Section */}
                    <div className="xl:col-span-2">
                        <Card className="shadow-xl bg-white border border-gray-200 h-fit">
                            <CardHeader className="pb-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                                        <Cloud className="w-5 h-5 text-white"/>
                                    </div>
                                    <div>
                                        <CardTitle className="text-slate-900">ผลการทำนาย</CardTitle>
                                        <CardDescription className="text-slate-600">
                                            ผลลัพธ์จากการวิเคราะห์ด้วย AI
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {prediction ? (
                                    <div className="space-y-6">

                                        {/* Main Result Card */}
                                        <div
                                            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getPredictionColor(prediction.prediction)} p-8 text-white shadow-2xl`}>
                                            <div className="relative z-10">
                                                <div className="flex items-center justify-center mb-6">
                                                    {React.createElement(getPredictionIcon(prediction.prediction), {
                                                        className: "w-16 h-16 text-white drop-shadow-lg"
                                                    })}
                                                </div>
                                                <h3 className="text-4xl font-bold text-center mb-4">
                                                    {getPredictionText(prediction.prediction)}
                                                </h3>
                                                <p className="text-xl text-center text-white/90 mb-6">
                                                    {prediction.prediction === 1 ? 'คาดการณ์ว่าจะมีฝนตก' : 'คาดการณ์ว่าจะไม่มีฝน'}
                                                </p>

                                                {/* Confidence Level */}
                                                {prediction.probability !== null && (
                                                    <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-white/90">ความเชื่อมั่น</span>
                                                            <span
                                                                className="text-2xl font-bold">{(prediction.probability * 100).toFixed(1)}%</span>
                                                        </div>
                                                        <div className="w-full bg-white/20 rounded-full h-3">
                                                            <div
                                                                className="h-3 bg-white rounded-full transition-all duration-1000 ease-out"
                                                                style={{width: `${prediction.probability * 100}%`}}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                            </div>

                                            {/* Background Pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div
                                                    className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16"/>
                                                <div
                                                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-12 translate-y-12"/>
                                            </div>
                                        </div>

                                        {/* Technical Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Card className="bg-slate-50 border-slate-200">
                                                <CardContent className="p-4">
                                                    <h4 className="font-semibold text-slate-700 mb-3">ข้อมูลการทำนาย</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">จังหวัด:</span>
                                                            <span
                                                                className="font-medium text-slate-900">{provinceName}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">เดือน:</span>
                                                            <span
                                                                className="font-medium text-slate-900">{monthName}</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card className="bg-slate-50 border-slate-200">
                                                <CardContent className="p-4">
                                                    <h4 className="font-semibold text-slate-700 mb-3">ค่าทางเทคนิค</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Province ID:</span>
                                                            <span
                                                                className="font-mono text-slate-900">{selectedProvince}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Month ID:</span>
                                                            <span
                                                                className="font-mono text-slate-900">{selectedMonth}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Month Sin:</span>
                                                            <span
                                                                className="font-mono text-slate-900">{prediction.features_used.month_sin.toFixed(4)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Month Cos:</span>
                                                            <span
                                                                className="font-mono text-slate-900">{prediction.features_used.month_cos.toFixed(4)}</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
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
                                            className="w-full h-12 border-slate-300 hover:bg-slate-50 transition-all duration-300"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2"/>
                                            ทำนายใหม่
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div
                                            className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Cloud className="w-12 h-12 text-slate-400"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-700 mb-2">พร้อมทำนายสภาพอากาศ</h3>
                                        <p className="text-slate-500 max-w-md mx-auto">
                                            เลือกจังหวัดและเดือนจากแบบฟอร์มด้านซ้าย เพื่อเริ่มการทำนายด้วย AI
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Information Section */}
                <div className="mt-12">
                    <Card className="shadow-xl bg-white border border-gray-200">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                    <Info className="w-5 h-5 text-white"/>
                                </div>
                                <div>
                                    <CardTitle className="text-slate-900">เกี่ยวกับระบบทำนายฝน AI</CardTitle>
                                    <CardDescription className="text-slate-600">
                                        เทคโนลยีและวิธีการทำงานของระบบ
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-blue-600"/>
                                    </div>
                                    <h4 className="font-semibold text-slate-900">ข้อมูลครอบคลุม</h4>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>• ใช้ข้อมูลจากจังหวัดทั่วประเทศไทย</li>
                                        <li>• ข้อมูลสภาพอากาศหลายปีย้อนหลัง</li>
                                        <li>• อัพเดทข้อมูลอย่างต่อเนื่อง</li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-green-600"/>
                                    </div>
                                    <h4 className="font-semibold text-slate-900">เทคโนลยี AI</h4>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>• วิเคราะห์รูปแบบข้อมูลทางสถิติ</li>
                                        <li>• จำลองรูปแบบเชิงฤดูกาล</li>
                                        <li>• โมเดลการเรียนรู้ขั้นสูง</li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <div
                                        className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Cloud className="w-6 h-6 text-purple-600"/>
                                    </div>
                                    <h4 className="font-semibold text-slate-900">ผลลัพธ์</h4>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>• ทำนายผลลัพธ์เป็น 0 (ไม่มีฝน) หรือ 1 (ฝนตก)</li>
                                        <li>• ระดับความเชื่อมั่นในการทำนาย</li>
                                        <li>• ข้อมูลทางเทคนิคประกอบ</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ModernWeatherPage;
