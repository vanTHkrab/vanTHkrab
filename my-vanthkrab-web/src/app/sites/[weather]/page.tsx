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

const WeatherSubdomainPage = () => {
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
            setError('Please select both province and month');
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
            setError('Prediction failed. Please try again.');
            console.error('Prediction error:', err);
        } finally {
            clearInterval(interval);
            setTimeout(() => {
                setLoading(false);
                setProgress(0);
            }, 300);
        }
    };

    const getPredictionText = (prediction: number) => prediction === 1 ? 'Rain Expected' : 'No Rain';
    const getPredictionIcon = (prediction: number) => prediction === 1 ? CloudRain : Sun;
    const getPredictionColor = (prediction: number) => prediction === 1 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600';

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 relative overflow-hidden"
        >
            {/* Background pattern */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
            
            <div className="container mx-auto max-w-4xl px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                            <Cloud className="h-10 w-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Weather AI
                            </h1>
                            <p className="text-sm text-gray-300 mt-1">Subdomain Portal</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                        Advanced AI-powered weather prediction system with machine learning algorithms for accurate rainfall forecasting across Thailand
                    </p>
                </div>

                {/* API Health Status */}
                <div className="mb-8">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {apiHealthy === null ? (
                                        <RefreshCw className="h-5 w-5 text-gray-300 animate-spin" />
                                    ) : apiHealthy ? (
                                        <CheckCircle className="h-5 w-5 text-green-400" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-400" />
                                    )}
                                    <span className="font-medium text-white">
                                        Prediction API Status
                                    </span>
                                </div>
                                <Badge
                                    variant={apiHealthy === null ? "secondary" : apiHealthy ? "default" : "destructive"}
                                    className={`${
                                        apiHealthy === null 
                                            ? "bg-gray-600/50 text-gray-200" 
                                            : apiHealthy 
                                                ? "bg-green-500/20 text-green-300 border-green-400/30" 
                                                : "bg-red-500/20 text-red-300 border-red-400/30"
                                    } backdrop-blur-sm`}
                                >
                                    {apiHealthy === null ? "Connecting..." : apiHealthy ? "Online" : "Offline"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Input Controls */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-white text-xl">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <MapPin className="h-5 w-5 text-blue-400" />
                                </div>
                                Select Province
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Choose the province for weather prediction analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProvinceSelector
                                value={selectedProvince}
                                onValueChange={setSelectedProvince}
                            />
                        </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-white text-xl">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Cloud className="h-5 w-5 text-purple-400" />
                                </div>
                                Select Month
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Choose the target month for prediction
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MonthSelector
                                value={selectedMonth}
                                onValueChange={setSelectedMonth}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Predict Button */}
                <div className="text-center mb-10">
                    <Button
                        onClick={handlePredict}
                        disabled={loading || !selectedProvince || !selectedMonth || !apiHealthy}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <RefreshCw className="h-6 w-6 animate-spin" />
                                Analyzing Weather Patterns...
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Zap className="h-6 w-6" />
                                Generate Weather Prediction
                            </div>
                        )}
                    </Button>
                </div>

                {/* Progress Bar */}
                {loading && (
                    <div className="mb-10">
                        <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
                            <CardContent className="p-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-300">
                                        <span className="font-medium">Processing AI prediction...</span>
                                        <span className="font-bold">{Math.round(progress)}%</span>
                                    </div>
                                    <Progress value={progress} className="h-3 bg-gray-700/50" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <Alert className="mb-10 bg-red-500/10 border-red-400/30 text-red-300 backdrop-blur-xl">
                        <XCircle className="h-5 w-5" />
                        <AlertDescription className="text-lg">{error}</AlertDescription>
                    </Alert>
                )}

                {/* Prediction Results */}
                {prediction && !loading && (
                    <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl mb-10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-white text-2xl">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <Info className="h-6 w-6 text-green-400" />
                                </div>
                                Weather Prediction Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Main Prediction */}
                            <div className={`text-center p-10 rounded-3xl bg-gradient-to-r ${getPredictionColor(prediction.prediction)} text-white shadow-2xl`}>
                                <div className="flex justify-center mb-6">
                                    {React.createElement(getPredictionIcon(prediction.prediction), { 
                                        className: "h-20 w-20 drop-shadow-lg" 
                                    })}
                                </div>
                                <h3 className="text-4xl font-bold mb-4">
                                    {getPredictionText(prediction.prediction)}
                                </h3>
                                <p className="text-xl opacity-90 mb-2">
                                    {provinceName} • {monthName}
                                </p>
                                {prediction.probability && (
                                    <p className="text-lg opacity-75">
                                        Confidence Level: {(prediction.probability * 100).toFixed(1)}%
                                    </p>
                                )}
                            </div>

                            {/* Details Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-white text-lg">Location Information</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                            <span className="text-gray-300">Province:</span>
                                            <span className="font-bold text-white">{prediction.province.name}</span>
                                        </div>
                                        <div className="flex justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                            <span className="text-gray-300">Target Month:</span>
                                            <span className="font-bold text-white">{prediction.month.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-white text-lg">Model Parameters</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                            <span className="text-gray-300">Province ID:</span>
                                            <span className="font-mono text-blue-300">{prediction.features_used.province_id}</span>
                                        </div>
                                        <div className="flex justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                            <span className="text-gray-300">Month Sin:</span>
                                            <span className="font-mono text-purple-300">{prediction.features_used.month_sin.toFixed(4)}</span>
                                        </div>
                                        <div className="flex justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                                            <span className="text-gray-300">Month Cos:</span>
                                            <span className="font-mono text-pink-300">{prediction.features_used.month_cos.toFixed(4)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Footer */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardContent className="p-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <p className="text-gray-300 text-lg font-medium">
                            Powered by Advanced Machine Learning & AI Technology
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            weather.yourdomain.com
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WeatherSubdomainPage;
