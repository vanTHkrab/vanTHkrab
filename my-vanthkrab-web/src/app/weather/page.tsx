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
            const data: PostWeatherData = {
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
            }}
        >
            <div className="container mx-auto max-w-4xl px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                            <Cloud className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Weather Prediction
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Advanced AI-powered weather prediction system for accurate rainfall forecasting
                    </p>
                </div>

                {/* API Health Status */}
                <div className="mb-8">
                    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {apiHealthy === null ? (
                                        <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
                                    ) : apiHealthy ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span className="text-sm font-medium text-gray-300">
                                        API Status:
                                    </span>
                                </div>
                                <Badge
                                    variant={apiHealthy === null ? "secondary" : apiHealthy ? "default" : "destructive"}
                                    className={apiHealthy === null ? "bg-gray-700" : apiHealthy ? "bg-green-600" : "bg-red-600"}
                                >
                                    {apiHealthy === null ? "Checking..." : apiHealthy ? "Online" : "Offline"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Input Controls */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <MapPin className="h-5 w-5 text-blue-400" />
                                เลือกจังหวัด
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Select the province for weather prediction
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProvinceSelector
                                value={selectedProvince}
                                onValueChangeAction={setSelectedProvince}
                            />
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Cloud className="h-5 w-5 text-purple-400" />
                                เลือกเดือน
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Select the month for prediction
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MonthSelector
                                value={selectedMonth}
                                onValueChangeAction={setSelectedMonth}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Predict Button */}
                <div className="text-center mb-8">
                    <Button
                        onClick={handlePredict}
                        disabled={loading || !selectedProvince || !selectedMonth || !apiHealthy}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <RefreshCw className="h-5 w-5 animate-spin" />
                                Predicting...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Predict Weather
                            </div>
                        )}
                    </Button>
                </div>

                {/* Progress Bar */}
                {loading && (
                    <div className="mb-8">
                        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-gray-400">
                                        <span>Processing prediction...</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <Alert className="mb-8 bg-red-900/20 border-red-800 text-red-400">
                        <XCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Prediction Results */}
                {prediction && !loading && (
                    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Info className="h-5 w-5 text-green-400" />
                                Prediction Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Main Prediction */}
                            <div className={`text-center p-8 rounded-2xl bg-gradient-to-r ${getPredictionColor(prediction.prediction)} text-white`}>
                                <div className="flex justify-center mb-4">
                                    {React.createElement(getPredictionIcon(prediction.prediction), {
                                        className: "h-16 w-16"
                                    })}
                                </div>
                                <h3 className="text-3xl font-bold mb-2">
                                    {getPredictionText(prediction.prediction)}
                                </h3>
                                <p className="text-lg opacity-90">
                                    {provinceName} - {monthName}
                                </p>
                                {prediction.probability && (
                                    <p className="text-sm opacity-75 mt-2">
                                        Confidence: {(prediction.probability * 100).toFixed(1)}%
                                    </p>
                                )}
                            </div>

                            {/* Details Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-white">Location Details</h4>
                                    <div className="space-y-2 text-sm text-gray-300">
                                        <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                                            <span>Province:</span>
                                            <span className="font-medium">{prediction.province.name}</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                                            <span>Month:</span>
                                            <span className="font-medium">{prediction.month.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-white">Model Features</h4>
                                    <div className="space-y-2 text-sm text-gray-300">
                                        <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                                            <span>Province ID:</span>
                                            <span className="font-medium">{prediction.features_used.province_id}</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                                            <span>Month Sin:</span>
                                            <span className="font-medium">{prediction.features_used.month_sin.toFixed(4)}</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                                            <span>Month Cos:</span>
                                            <span className="font-medium">{prediction.features_used.month_cos.toFixed(4)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Footer Info */}
                <Card className="bg-gray-900/30 border-gray-800 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Powered by advanced machine learning algorithms for accurate weather prediction
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ModernWeatherPage;
