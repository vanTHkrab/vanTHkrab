"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw, Zap, Heart, Star } from 'lucide-react';

const SpinnerVariant = ({ size = 'md', color = 'blue' }) => {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-16 w-16',
        lg: 'h-24 w-24'
    };

    const colorClasses = {
        blue: 'border-blue-500',
        purple: 'border-purple-500',
        green: 'border-green-500',
        red: 'border-red-500',
        orange: 'border-orange-500'
    };

    return (
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-2 border-gray-200 ${colorClasses[color]}`}
             style={{ borderTopColor: 'transparent' }}>
        </div>
    );
};

const PulseDots = ({ color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
        orange: 'bg-orange-500'
    };

    return (
        <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className={`w-4 h-4 rounded-full ${colorClasses[color]}`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
};

// Bouncing Bars
const BouncingBars = ({ color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
        orange: 'bg-orange-500'
    };

    return (
        <div className="flex items-end space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    className={`w-2 ${colorClasses[color]} rounded-t`}
                    animate={{
                        height: [20, 40, 20],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    );
};

const FloatingHearts = () => {
    return (
        <div className="relative">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                        y: [-20, -40, -20],
                        x: [0, 10, -10, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                    style={{ left: i * 30 }}
                >
                    <Heart className={`w-6 h-6 ${i === 0 ? 'text-red-500' : i === 1 ? 'text-pink-500' : 'text-purple-500'}`} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

type RippleColor = 'blue' | 'purple' | 'green' | 'red' | 'orange';
const RippleLoader = ({ color = 'blue' }: { color: RippleColor }) => {
    const colorClasses: Record<RippleColor, string> = {
        blue: 'border-blue-500',
        purple: 'border-purple-500',
        green: 'border-green-500',
        red: 'border-red-500',
        orange: 'border-orange-500',
    };

    return (
        <div className="relative">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full border-2 ${colorClasses[color]}`}
                    animate={{
                        width: [0, 80],
                        height: [0, 80],
                        opacity: [1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.6,
                    }}
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}
            <div className={`w-4 h-4 rounded-full ${colorClasses[color].replace('border-', 'bg-')} relative z-10`} />
        </div>
    );
};

// Main Loading Component
const Loading = ({
                     variant = 'spinner',
                     size = 'md',
                     color = 'blue',
                     text = 'Loading...',
                     fullscreen = false,
                     className = '',
                     showText = true,
                     customIcon = null
                 }) => {
    const containerClasses = fullscreen
        ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
        : 'flex items-center justify-center p-8';

    const renderLoader = () => {
        switch (variant) {
            case 'spinner':
                return <SpinnerVariant size={size} color={color} />;
            case 'dots':
                return <PulseDots color={color} />;
            case 'bars':
                return <BouncingBars color={color} />;
            case 'hearts':
                return <FloatingHearts />;
            case 'ripple':
                return <RippleLoader color={color} />;
            case 'icon':
                return customIcon ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        {customIcon}
                    </motion.div>
                ) : (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader2 className="w-8 h-8 text-blue-500" />
                    </motion.div>
                );
            default:
                return <SpinnerVariant size={size} color={color} />;
        }
    };

    return (
        <motion.div
            className={`${containerClasses} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex flex-col items-center space-y-4">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderLoader()}
                </motion.div>

                {showText && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <p className="text-lg font-medium text-gray-700">{text}</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Loading;