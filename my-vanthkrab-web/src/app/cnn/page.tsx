"use client";

import * as React from "react";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, Brain, Loader2, CheckCircle2, AlertCircle, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  checkServerHealth,
  fetchModels,
  uploadImage,
  uploadBase64Image,
  predictImage,
  type ModelInfo,
  type PredictionResponse,
} from "@/actions/cnn-action";

export default function CNNPage() {
  // State management
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "starting" | "offline">("checking");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [showCamera, setShowCamera] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check camera availability on mount
  React.useEffect(() => {
    checkCameraAvailability();
  }, []);

  // Check server health on mount
  React.useEffect(() => {
    handleCheckServerHealth();
  }, []);

  // Fetch available models after server is online
  React.useEffect(() => {
    if (serverStatus === "online") {
      handleFetchModels();
    }
  }, [serverStatus]);

  // Camera functions
  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      setHasCamera(videoDevices.length > 0);
    } catch (err) {
      console.error("Error checking camera availability:", err);
      setHasCamera(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      setError("Failed to access camera. Please check permissions.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      // Create file from blob
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      // Stop camera
      stopCamera();
      setPrediction(null);
      setError("");
    }, "image/jpeg", 0.95);
  };

  // Server action wrappers
  const handleCheckServerHealth = async () => {
    setServerStatus("checking");
    setServerMessage("Checking server status...");

    const result = await checkServerHealth();

    if (result.status === "ok") {
      setServerStatus("online");
      setServerMessage("Server is online and ready");
      setError("");
    } else if (result.message?.includes("starting")) {
      setServerStatus("starting");
      setServerMessage("Server is starting, please wait approximately 3 minutes");
      setError("");
    } else {
      setServerStatus("offline");
      setServerMessage(result.message || "Unable to connect to server");
      setError("Cannot connect to the API server. Please check if the server is running.");
    }
  };

  const handleFetchModels = async () => {
    setIsLoadingModels(true);
    setError("");

    const result = await fetchModels();

    if (result.error) {
      setError(result.error);
    } else {
      setModels(result.models);
      if (result.models.length > 0) {
        setSelectedModel(result.models[0].id);
      }
    }

    setIsLoadingModels(false);
  };

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setError("");
    setPrediction(null);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Upload and predict
  const handlePredict = async () => {
    if (!selectedFile || !selectedModel) {
      setError("Please select both an image and a model");
      return;
    }

    setIsUploading(true);
    setError("");
    setPrediction(null);

    try {
      // Upload the image
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResult = await uploadImage(formData);

      if (uploadResult.error) {
        throw new Error(uploadResult.error);
      }

      if (!uploadResult.url) {
        throw new Error("Failed to get image URL");
      }

      // Make prediction
      const predictionResult = await predictImage(uploadResult.url, selectedModel);

      if (predictionResult.error) {
        throw new Error(predictionResult.error);
      }

      if (predictionResult.prediction) {
        setPrediction(predictionResult.prediction);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setIsUploading(false);
    }
  };

  // Reset state
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setPrediction(null);
    setError("");
    if (showCamera) {
      stopCamera();
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Image Classification BP Monitor
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image of a blood pressure monitor and select a model to get instant classification results with confidence scores.
          </p>
        </motion.div>

        {/* Server Status Alert */}
        <AnimatePresence>
          {serverStatus !== "online" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Alert
                variant={serverStatus === "offline" ? "destructive" : "default"}
                className={
                  serverStatus === "checking"
                    ? "border-blue-500/50 bg-blue-500/10"
                    : serverStatus === "starting"
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : ""
                }
              >
                {serverStatus === "checking" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {serverStatus === "starting" && (
                  <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
                )}
                {serverStatus === "offline" && <AlertCircle className="h-4 w-4" />}
                <AlertDescription className="flex items-center justify-between">
                  <span>{serverMessage}</span>
                  {(serverStatus === "offline" || serverStatus === "starting") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCheckServerHealth}
                      className="ml-4"
                    >
                      Retry
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Alert */}
        <AnimatePresence>
          {error && serverStatus === "online" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Model Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upload & Configure</CardTitle>
                <CardDescription>
                  Select an image and choose a classification model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Model Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Model
                  </label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                    disabled={isLoadingModels || models.length === 0 || serverStatus !== "online"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a model..." />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isLoadingModels && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Loading models...
                    </p>
                  )}
                  {serverStatus !== "online" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Waiting for server to be ready...
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  {/*<div className="flex items-center justify-between mb-2">*/}
                  {/*  <label className="text-sm font-medium">Upload Image</label>*/}
                  {/*  {hasCamera && !showCamera && (*/}
                  {/*    <Button*/}
                  {/*      variant="ghost"*/}
                  {/*      size="sm"*/}
                  {/*      onClick={startCamera}*/}
                  {/*      disabled={serverStatus !== "online"}*/}
                  {/*      className="h-8"*/}
                  {/*    >*/}
                  {/*      <Camera className="w-4 h-4 mr-2" />*/}
                  {/*      Use Camera*/}
                  {/*    </Button>*/}
                  {/*  )}*/}
                  {/*</div>*/}

                  {/* Camera View */}
                  {showCamera && (
                    <div className="relative mb-4 rounded-xl overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                        <Button
                          size="lg"
                          onClick={capturePhoto}
                          className="bg-white text-black hover:bg-gray-200"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Capture
                        </Button>
                        <Button
                          size="lg"
                          variant="secondary"
                          onClick={stopCamera}
                        >
                          <X className="w-5 h-5 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* File Upload Area */}
                  {!showCamera && (
                    <div
                      onDrop={serverStatus === "online" ? handleDrop : undefined}
                      onDragOver={serverStatus === "online" ? handleDragOver : undefined}
                      className={`relative border-2 border-dashed border-border rounded-xl p-8 transition-colors group ${
                        serverStatus === "online"
                          ? "hover:border-primary/50 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={serverStatus !== "online"}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex flex-col items-center text-center">
                        {previewUrl ? (
                          <div className="relative w-full h-48 mb-4">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <Upload className="w-8 h-8 text-primary" />
                          </div>
                        )}
                        <p className="font-medium mb-1">
                          {selectedFile
                            ? selectedFile.name
                            : "Drop image here or click to upload"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, WEBP up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handlePredict}
                    disabled={!selectedFile || !selectedModel || isUploading || serverStatus !== "online"}
                    className="flex-1"
                    size="lg"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Classify Image
                      </>
                    )}
                  </Button>
                  {(selectedFile || prediction) && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      disabled={isUploading}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>
                  Classification probabilities and confidence scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {!prediction && !isUploading && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Upload an image to see predictions
                      </p>
                    </motion.div>
                  )}

                  {isUploading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12"
                    >
                      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                      <p className="text-muted-foreground">
                        Processing your image...
                      </p>
                    </motion.div>
                  )}

                  {prediction && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Top Prediction */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            Top Prediction
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          {prediction.predicted_class}
                        </h3>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={prediction.confidence * 100}
                            className="flex-1 h-2"
                          />
                          <Badge variant="secondary">
                            {(prediction.confidence * 100).toFixed(1)}%
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      {/* All Probabilities */}
                      <div>
                        <h4 className="text-sm font-medium mb-4">
                          All Predictions
                        </h4>
                        <div className="space-y-3">
                          {prediction.probabilities
                            .sort((a, b) => b.confidence - a.confidence)
                            .map((prob, idx) => (
                              <motion.div
                                key={prob.class_name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="space-y-2"
                              >
                                <div className="flex items-center justify-between text-sm">
                                  <span className="font-medium">
                                    {prob.class_name}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {(prob.confidence * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <Progress
                                  value={prob.confidence * 100}
                                  className="h-1.5"
                                />
                              </motion.div>
                            ))}
                        </div>
                      </div>

                      {/* Model Info */}
                      <div className="pt-4 border-t text-xs text-muted-foreground">
                        <p>Model: {prediction.model_name}</p>
                        <p className="mt-1">ID: {prediction.model_id}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/*/!* Info Cards *!/*/}
        {/*<motion.div*/}
        {/*  initial={{ opacity: 0, y: 20 }}*/}
        {/*  animate={{ opacity: 1, y: 0 }}*/}
        {/*  transition={{ duration: 0.5, delay: 0.4 }}*/}
        {/*  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"*/}
        {/*>*/}
        {/*  <Card className="border-border/50 bg-card/50">*/}
        {/*    <CardHeader className="pb-3">*/}
        {/*      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">*/}
        {/*        <Upload className="w-5 h-5 text-blue-500" />*/}
        {/*      </div>*/}
        {/*      <CardTitle className="text-base">Easy Upload</CardTitle>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent>*/}
        {/*      <p className="text-sm text-muted-foreground">*/}
        {/*        Drag and drop or click to upload. Supports PNG, JPG, and WEBP formats.*/}
        {/*      </p>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}

        {/*  <Card className="border-border/50 bg-card/50">*/}
        {/*    <CardHeader className="pb-3">*/}
        {/*      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">*/}
        {/*        <Brain className="w-5 h-5 text-green-500" />*/}
        {/*      </div>*/}
        {/*      <CardTitle className="text-base">Multiple Models</CardTitle>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent>*/}
        {/*      <p className="text-sm text-muted-foreground">*/}
        {/*        Choose from various pre-trained models for different classification tasks.*/}
        {/*      </p>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}

        {/*  <Card className="border-border/50 bg-card/50">*/}
        {/*    <CardHeader className="pb-3">*/}
        {/*      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">*/}
        {/*        <CheckCircle2 className="w-5 h-5 text-purple-500" />*/}
        {/*      </div>*/}
        {/*      <CardTitle className="text-base">Instant Results</CardTitle>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent>*/}
        {/*      <p className="text-sm text-muted-foreground">*/}
        {/*        Get predictions in seconds with detailed confidence scores for each class.*/}
        {/*      </p>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*</motion.div>*/}
      </div>
    </div>
  );
}
