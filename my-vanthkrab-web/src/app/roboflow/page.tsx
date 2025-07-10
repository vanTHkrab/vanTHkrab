"use client";
import React, { useState, useCallback } from 'react';
import { Upload, Camera, FileImage, Loader2, CheckCircle, XCircle, Download, Eye } from 'lucide-react';

type SelectFileType = File | null;
type ErrorType = string | null;
type ResultsType = {
    detections: Array<{
        class: string;
        confidence: number;
        bbox: [number, number, number, number];
    }>;
    inference_time: number;
    image_size: [number, number];
}

const Page = () => {
    const [selectedFile, setSelectedFile] = useState<SelectFileType>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [results, setResults] = useState<ResultsType | null>(null);
    const [error, setError] = useState<ErrorType>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setError(null);
            } else {
                setError('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
            }
        }
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setError(null);
        } else {
            setError('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        }
    };

    const simulateUpload = async () => {
        setIsUploading(true);
        setError(null);
        setResults(null);

        const response = await fetch('https://serverless.roboflow.com/infer/workflows/vanthkrab/custom-workflow-2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: 'spPDIjZ9OvXwdu7T6zNy',
                inputs: {
                    image: selectedFile ? URL.createObjectURL(selectedFile) : null
                }
            })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            // Simulate upload progres
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress += 10;
                    setUploadProgress(progress);
                } else {
                    clearInterval(interval);
                    setResults({
                        detections: result.detections,
                        inference_time: result.inference_time,
                        image_size: result.image_size
                    });
                }
            }, 300);
        } else {
            setError(result.error || 'เกิดข้อผิดพลาดในการอัพโหลด');
        }
        setIsUploading(false);
        setUploadProgress(0);
    };

    const resetUpload = () => {
        setSelectedFile(null);
        setResults(null);
        setError(null);
        setUploadProgress(0);
        setIsUploading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Roboflow Workflow
                    </h1>
                    <p className="text-gray-600">
                        อัพโหลดรูปภาพเพื่อวิเคราะห์ด้วย AI และรอรับผลลัพธ์
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {!selectedFile ? (
                        /* Upload Area */
                        <div
                            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                                dragActive
                                    ? 'border-blue-400 bg-blue-50'
                                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-6 bg-blue-100 rounded-full">
                                    <Upload className="w-12 h-12 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        ลากและวางรูปภาพที่นี่
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        หรือคลิกเพื่อเลือกไฟล์
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                                    >
                                        <FileImage className="w-5 h-5 mr-2" />
                                        เลือกรูปภาพ
                                    </label>
                                </div>
                                <p className="text-sm text-gray-400">
                                    รองรับไฟล์: JPG, PNG, GIF (ขนาดไม่เกิน 10MB)
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Upload Preview & Processing */
                        <div className="space-y-6">
                            {/* Image Preview */}
                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        className="w-48 h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {selectedFile.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        ขนาด: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>

                                    {!isUploading && !results && (
                                        <div className="space-x-4">
                                            <button
                                                onClick={simulateUpload}
                                                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                <Camera className="w-5 h-5 mr-2" />
                                                เริ่มวิเคราะห์
                                            </button>
                                            <button
                                                onClick={resetUpload}
                                                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                            >
                                                เลือกใหม่
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upload Progress */}
                            {isUploading && (
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                กำลังประมวลผล...
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                กรุณารอสักครู่ ระบบ AI กำลังวิเคราะห์รูปภาพ
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-right text-sm text-gray-600 mt-2">
                                        {uploadProgress}%
                                    </p>
                                </div>
                            )}

                            {/* Results */}
                            {results && (
                                <div className="bg-green-50 rounded-lg p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                        <h4 className="font-semibold text-gray-800">
                                            วิเคราะห์เสร็จสิ้น!
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="bg-white rounded-lg p-4">
                                            <h5 className="font-medium text-gray-700 mb-2">
                                                ข้อมูลการประมวลผล
                                            </h5>
                                            <p className="text-sm text-gray-600">
                                                เวลาประมวลผล: {results.inference_time}ms
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                ขนาดรูปภาพ: {results.image_size[0]}x{results.image_size[1]}
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-lg p-4">
                                            <h5 className="font-medium text-gray-700 mb-2">
                                                จำนวนวัตถุที่ตรวจพบ
                                            </h5>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {results.detections.length} วัตถุ
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-4">
                                        <h5 className="font-medium text-gray-700 mb-3">
                                            รายละเอียดการตรวจจับ
                                        </h5>
                                        <div className="space-y-2">
                                            {results.detections.map((detection, index) => (
                                                <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                        <span className="font-medium text-gray-800">
                                                            {detection.class}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        {(detection.confidence * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 mt-6">
                                        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            <Download className="w-4 h-4 mr-2" />
                                            ดาวน์โหลดผลลัพธ์
                                        </button>
                                        <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                            <Eye className="w-4 h-4 mr-2" />
                                            ดูรายละเอียด
                                        </button>
                                        <button
                                            onClick={resetUpload}
                                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            วิเคราะห์รูปใหม่
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Error Display */}
                            {error && (
                                <div className="bg-red-50 rounded-lg p-6">
                                    <div className="flex items-center space-x-3">
                                        <XCircle className="w-6 h-6 text-red-600" />
                                        <div>
                                            <h4 className="font-semibold text-red-800">
                                                เกิดข้อผิดพลาด
                                            </h4>
                                            <p className="text-red-700 text-sm">
                                                {error}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        วิธีการใช้งาน
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-semibold">1</span>
                            </div>
                            <div>
                                <p className="font-medium">อัพโหลดรูปภาพ</p>
                                <p>ลากและวางหรือคลิกเพื่อเลือกไฟล์รูปภาพ</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-semibold">2</span>
                            </div>
                            <div>
                                <p className="font-medium">เริ่มวิเคราะห์</p>
                                <p>คลิกปุ่มเริ่มวิเคราะห์และรอผลลัพธ์</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-semibold">3</span>
                            </div>
                            <div>
                                <p className="font-medium">ดูผลลัพธ์</p>
                                <p>ตรวจสอบวัตถุที่ตรวจพบและดาวน์โหลดผลลัพธ์</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;