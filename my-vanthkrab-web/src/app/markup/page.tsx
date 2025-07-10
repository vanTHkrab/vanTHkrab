"use client";
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, RotateCcw, Download, FolderOpen, Palette } from 'lucide-react';

interface Rectangle {
    id: string;
    x: number;
    y: number;
    size: number;
    color: string;
    bgColor: string;
}

interface ImageData {
    id: string;
    file: File;
    url: string;
    rectangles: Rectangle[];
}

const ImageRectangleDrawer = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedRect, setDraggedRect] = useState<string | null>(null);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);
    const [selectedColor, setSelectedColor] = useState('#ff0000');
    const [selectedBgColor, setSelectedBgColor] = useState('#ffffff');
    const [customColor, setCustomColor] = useState('#ff0000');
    const [customBgColor, setCustomBgColor] = useState('#ffffff');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'];
    const bgColors = ['#ffffff', '#000000', '#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0', '#b0b0b0', '#a0a0a0'];

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file);
                const newImage: ImageData = {
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    file,
                    url,
                    rectangles: []
                };

                setImages(prev => [...prev, newImage]);
                if (!selectedImageId) {
                    setSelectedImageId(newImage.id);
                }
            }
        });
    }, [selectedImageId]);

    const handleFolderUpload = useCallback(() => {
        if (folderInputRef.current) {
            folderInputRef.current.click();
        }
    }, []);

    const removeImage = useCallback((imageId: string) => {
        setImages(prev => prev.filter(img => img.id !== imageId));
        if (selectedImageId === imageId) {
            setSelectedImageId(null);
        }
    }, [selectedImageId]);

    const clearRectangles = useCallback(() => {
        if (!selectedImageId) return;

        setImages(prev => prev.map(img =>
            img.id === selectedImageId
                ? { ...img, rectangles: [] }
                : img
        ));
    }, [selectedImageId]);

    const getCanvasCoordinates = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const scaleX = image.naturalWidth / canvas.width;
        const scaleY = image.naturalHeight / canvas.height;

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        };
    }, []);

    const getScreenCoordinates = useCallback((x: number, y: number) => {
        const image = imageRef.current;
        if (!image) return { x: 0, y: 0 };

        const scaleX = (image.clientWidth || 0) / (image.naturalWidth || 1);
        const scaleY = (image.clientHeight || 0) / (image.naturalHeight || 1);

        return {
            x: x * scaleX,
            y: y * scaleY
        };
    }, []);

    const isPointInRectangle = useCallback((x: number, y: number, rect: Rectangle) => {
        const screenCoords = getScreenCoordinates(rect.x, rect.y);
        const image = imageRef.current;
        if (!image) return false;

        const scaleX = (image.clientWidth || 0) / (image.naturalWidth || 1);
        const scaleY = (image.clientHeight || 0) / (image.naturalHeight || 1);
        const scaledSize = rect.size * Math.min(scaleX, scaleY);

        return x >= screenCoords.x &&
            x <= screenCoords.x + scaledSize &&
            y >= screenCoords.y &&
            y <= screenCoords.y + scaledSize;
    }, [getScreenCoordinates]);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!selectedImageId) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check if clicking on existing rectangle
        const selectedImage = images.find(img => img.id === selectedImageId);
        if (selectedImage) {
            const clickedRect = selectedImage.rectangles.find(r =>
                isPointInRectangle(mouseX, mouseY, r)
            );

            if (clickedRect) {
                setIsDragging(true);
                setDraggedRect(clickedRect.id);
                const screenCoords = getScreenCoordinates(clickedRect.x, clickedRect.y);
                setDragOffset({
                    x: mouseX - screenCoords.x,
                    y: mouseY - screenCoords.y
                });
                return;
            }
        }

        // Start drawing new rectangle
        const coords = getCanvasCoordinates(event);
        setIsDrawing(true);
        setStartPoint(coords);

        const newRect: Rectangle = {
            id: Date.now().toString(),
            x: coords.x,
            y: coords.y,
            size: 0,
            color: selectedColor,
            bgColor: selectedBgColor
        };

        setCurrentRect(newRect);
    }, [selectedImageId, getCanvasCoordinates, selectedColor, selectedBgColor, images, isPointInRectangle, getScreenCoordinates]);

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (isDragging && draggedRect && selectedImageId) {
            // Move existing rectangle
            const coords = getCanvasCoordinates(event);
            const adjustedX = coords.x - (dragOffset.x * (imageRef.current?.naturalWidth || 1) / (imageRef.current?.clientWidth || 1));
            const adjustedY = coords.y - (dragOffset.y * (imageRef.current?.naturalHeight || 1) / (imageRef.current?.clientHeight || 1));

            setImages(prev => prev.map(img =>
                img.id === selectedImageId
                    ? {
                        ...img,
                        rectangles: img.rectangles.map(r =>
                            r.id === draggedRect
                                ? { ...r, x: adjustedX, y: adjustedY }
                                : r
                        )
                    }
                    : img
            ));
        } else if (isDrawing && currentRect) {
            // Draw new rectangle - follow cursor
            const coords = getCanvasCoordinates(event);
            const deltaX = coords.x - startPoint.x;
            const deltaY = coords.y - startPoint.y;
            const size = Math.min(Math.abs(deltaX), Math.abs(deltaY));

            // Calculate position based on cursor direction
            let newX = startPoint.x;
            let newY = startPoint.y;

            if (deltaX < 0) {
                newX = startPoint.x - size;
            }
            if (deltaY < 0) {
                newY = startPoint.y - size;
            }

            setCurrentRect(prev => prev ? {
                ...prev,
                x: newX,
                y: newY,
                size
            } : null);
        } else {
            // Change cursor for hovering over rectangles
            const selectedImage = images.find(img => img.id === selectedImageId);
            if (selectedImage) {
                const hoveredRect = selectedImage.rectangles.find(r =>
                    isPointInRectangle(mouseX, mouseY, r)
                );
                canvas.style.cursor = hoveredRect ? 'move' : 'crosshair';
            }
        }
    }, [isDragging, draggedRect, isDrawing, currentRect, getCanvasCoordinates, startPoint, selectedImageId, dragOffset, images, isPointInRectangle]);

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            setDraggedRect(null);
        } else if (isDrawing && currentRect && selectedImageId) {
            if (currentRect.size > 10) {
                // Calculate final position based on drawing direction
                let finalX = currentRect.x;
                let finalY = currentRect.y;

                const finalRect: Rectangle = {
                    ...currentRect,
                    x: finalX,
                    y: finalY,
                    size: currentRect.size
                };

                setImages(prev => prev.map(img =>
                    img.id === selectedImageId
                        ? { ...img, rectangles: [...img.rectangles, finalRect] }
                        : img
                ));
            }

            setIsDrawing(false);
            setCurrentRect(null);
        }
    }, [isDragging, isDrawing, currentRect, selectedImageId]);

    const downloadImage = useCallback(() => {
        const selectedImage = images.find(img => img.id === selectedImageId);
        if (!selectedImage || !imageRef.current) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imageRef.current;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        // Draw rectangles
        selectedImage.rectangles.forEach(rect => {
            // Draw background
            ctx.fillStyle = rect.bgColor;
            ctx.fillRect(rect.x, rect.y, rect.size, rect.size);

            // Draw border
            ctx.strokeStyle = rect.color;
            ctx.lineWidth = 3;
            ctx.strokeRect(rect.x, rect.y, rect.size, rect.size);
        });

        // Download
        const link = document.createElement('a');
        link.download = `annotated-${selectedImage.file.name}`;
        link.href = canvas.toDataURL();
        link.click();
    }, [images, selectedImageId]);

    const selectedImage = images.find(img => img.id === selectedImageId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 mb-6"
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Image Square Drawer
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="lg:w-80 space-y-6">
                            {/* Upload Section */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Upload Images</h2>
                                <div className="space-y-2">
                                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                            <p className="text-sm text-gray-500">Upload Files</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </label>

                                    <button
                                        onClick={handleFolderUpload}
                                        className="flex items-center justify-center w-full h-24 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                            <FolderOpen className="w-6 h-6 text-blue-500 mb-1" />
                                            <p className="text-sm text-blue-600">Upload Folder</p>
                                        </div>
                                    </button>

                                    <input
                                        ref={folderInputRef}
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        {...({ webkitdirectory: "true" } as any)}
                                    />
                                </div>
                            </div>

                            {/* Image List */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Images ({images.length})</h2>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    <AnimatePresence>
                                        {images.map((image) => (
                                            <motion.div
                                                key={image.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                                    selectedImageId === image.id
                                                        ? 'bg-blue-100 border-2 border-blue-300'
                                                        : 'bg-white hover:bg-gray-100'
                                                }`}
                                                onClick={() => setSelectedImageId(image.id)}
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={image.file.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-700 truncate">
                                                        {image.file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {image.rectangles.length} squares
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage(image.id);
                                                    }}
                                                    className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Color Palette */}
                            {selectedImage && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Border Color</h2>
                                    <div className="grid grid-cols-4 gap-2 mb-4">
                                        {colors.map((color) => (
                                            <motion.button
                                                key={color}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                                                    selectedColor === color
                                                        ? 'border-gray-800 shadow-lg'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <Palette className="w-4 h-4 text-gray-500" />
                                        <input
                                            type="color"
                                            value={customColor}
                                            onChange={(e) => setCustomColor(e.target.value)}
                                            className="w-8 h-8 rounded border-none cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={customColor}
                                            onChange={(e) => setCustomColor(e.target.value)}
                                            className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="#000000"
                                        />
                                        <button
                                            onClick={() => setSelectedColor(customColor)}
                                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Use
                                        </button>
                                    </div>

                                    <h3 className="text-md font-medium text-gray-700 mb-2">Background Color</h3>
                                    <div className="grid grid-cols-4 gap-2 mb-4">
                                        {bgColors.map((color) => (
                                            <motion.button
                                                key={color}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setSelectedBgColor(color)}
                                                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                                                    selectedBgColor === color
                                                        ? 'border-gray-800 shadow-lg'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Palette className="w-4 h-4 text-gray-500" />
                                        <input
                                            type="color"
                                            value={customBgColor}
                                            onChange={(e) => setCustomBgColor(e.target.value)}
                                            className="w-8 h-8 rounded border-none cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={customBgColor}
                                            onChange={(e) => setCustomBgColor(e.target.value)}
                                            className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="#ffffff"
                                        />
                                        <button
                                            onClick={() => setSelectedBgColor(customBgColor)}
                                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Use
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Controls */}
                            {selectedImage && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Controls</h2>
                                    <div className="space-y-2">
                                        <button
                                            onClick={clearRectangles}
                                            className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Clear All
                                        </button>
                                        <button
                                            onClick={downloadImage}
                                            className="w-full flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Canvas Area */}
                        <div className="flex-1">
                            {selectedImage ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white rounded-xl shadow-lg p-4 relative"
                                >
                                    <div className="relative inline-block">
                                        <img
                                            ref={imageRef}
                                            src={selectedImage.url}
                                            alt={selectedImage.file.name}
                                            className="max-w-full max-h-[600px] object-contain rounded-lg"
                                            crossOrigin="anonymous"
                                        />
                                        <canvas
                                            ref={canvasRef}
                                            width={imageRef.current?.clientWidth || 0}
                                            height={imageRef.current?.clientHeight || 0}
                                            className="absolute top-0 left-0"
                                            onMouseDown={handleMouseDown}
                                            onMouseMove={handleMouseMove}
                                            onMouseUp={handleMouseUp}
                                            onMouseLeave={handleMouseUp}
                                            style={{
                                                width: imageRef.current?.clientWidth || 0,
                                                height: imageRef.current?.clientHeight || 0,
                                                cursor: 'crosshair'
                                            }}
                                        />
                                        <svg
                                            className="absolute top-0 left-0 pointer-events-none"
                                            width={imageRef.current?.clientWidth || 0}
                                            height={imageRef.current?.clientHeight || 0}
                                            style={{
                                                width: imageRef.current?.clientWidth || 0,
                                                height: imageRef.current?.clientHeight || 0,
                                            }}
                                        >
                                            {selectedImage.rectangles.map((rect) => {
                                                const scaleX = (imageRef.current?.clientWidth || 0) / (imageRef.current?.naturalWidth || 1);
                                                const scaleY = (imageRef.current?.clientHeight || 0) / (imageRef.current?.naturalHeight || 1);
                                                const scale = Math.min(scaleX, scaleY);

                                                return (
                                                    <g key={rect.id}>
                                                        <motion.rect
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            x={rect.x * scaleX}
                                                            y={rect.y * scaleY}
                                                            width={rect.size * scale}
                                                            height={rect.size * scale}
                                                            fill={rect.bgColor}
                                                            stroke={rect.color}
                                                            strokeWidth="2"
                                                            className="drop-shadow-sm"
                                                        />
                                                    </g>
                                                );
                                            })}
                                            {currentRect && (
                                                <rect
                                                    x={currentRect.x * ((imageRef.current?.clientWidth || 0) / (imageRef.current?.naturalWidth || 1))}
                                                    y={currentRect.y * ((imageRef.current?.clientHeight || 0) / (imageRef.current?.naturalHeight || 1))}
                                                    width={currentRect.size * Math.min((imageRef.current?.clientWidth || 0) / (imageRef.current?.naturalWidth || 1), (imageRef.current?.clientHeight || 0) / (imageRef.current?.naturalHeight || 1))}
                                                    height={currentRect.size * Math.min((imageRef.current?.clientWidth || 0) / (imageRef.current?.naturalWidth || 1), (imageRef.current?.clientHeight || 0) / (imageRef.current?.naturalHeight || 1))}
                                                    fill={currentRect.bgColor}
                                                    stroke={currentRect.color}
                                                    strokeWidth="2"
                                                    strokeDasharray="5,5"
                                                    className="opacity-80"
                                                />
                                            )}
                                        </svg>
                                    </div>

                                    <div className="mt-4 text-sm text-gray-600">
                                        <p>Click and drag to draw squares • Click existing squares to move them</p>
                                        <p>Squares: {selectedImage.rectangles.length}</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex items-center justify-center h-96 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                                    <div className="text-center">
                                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <p className="text-xl text-gray-500">Upload images to get started</p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            Select an image from the sidebar to begin drawing squares
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ImageRectangleDrawer;