"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Clock, ChevronRight, Construction, ImageIcon, Camera } from "lucide-react";

import Image from 'next/image'


export default function GalleryPage() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [progress, setProgress] = useState(0);

    // Simulate construction progress
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 1;
                return newProgress >= 67 ? 67 : newProgress;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.includes('@')) {
            setIsSubscribed(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
            {/* Header */}
            <header className="pt-12 pb-6 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto"
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Gallery Experience
                    </h1>
                </motion.div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 md:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex flex-col items-center justify-center"
                >

                    <Image src={'/images/img-1.jpg'} alt="Gallery Image" width={400} height={200} className="rounded-lg shadow-lg mb-6" />

                    <h2 className="text-2xl font-semibold mb-4">Experience the Art of Photography</h2>
                    {/* Animated Elements */}
                    <div className="mt-16 relative w-full max-w-4xl h-32">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-3 w-3 rounded-full bg-blue-400"
                                initial={{
                                    x: Math.random() * 100 - 50 + "%",
                                    y: Math.random() * 100 - 50 + "%",
                                    opacity: 0.2
                                }}
                                animate={{
                                    x: [
                                        Math.random() * 100 - 50 + "%",
                                        Math.random() * 100 - 50 + "%",
                                        Math.random() * 100 - 50 + "%"
                                    ],
                                    y: [
                                        Math.random() * 100 - 50 + "%",
                                        Math.random() * 100 - 50 + "%",
                                        Math.random() * 100 - 50 + "%"
                                    ],
                                    opacity: [0.2, 0.8, 0.2]
                                }}
                                transition={{
                                    duration: 8 + i * 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="mt-12 py-8 border-t border-slate-700">
                <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
                    <p>© 2025 Gallery Experience. All rights reserved.</p>
                    <p className="mt-2">A premium visual journey coming soon.</p>
                </div>
            </footer>
        </div>
    );
}