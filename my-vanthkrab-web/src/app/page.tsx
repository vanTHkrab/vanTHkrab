"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from 'next/image'
import Footer from "@/components/footer";


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

                    {/*<Image src={'/images/img-2.jpg'} alt="Gallery Image" width={400} height={200} className="rounded-lg shadow-lg mb-6" />*/}
                    <Image src={'/images/img-3.jpg'} alt="Gallery Image" width={400} height={200} className="rounded-lg shadow-lg mb-6" />
                    {/*<Image src={'/images/img-4.jpg'} alt="Gallery Image" width={400} height={200} className="rounded-lg shadow-lg mb-6" />*/}
                    <Image src={'/images/img-5.jpg'} alt="Gallery Image" width={400} height={200} className="rounded-lg shadow-lg mb-6" />

                    {/*<h2 className="text-2xl font-semibold mb-4">Experience the Art of Photography</h2>*/}
                     {/*Animated Elements */}

                    <motion.div
                        className="w-full max-w-2xl bg-slate-900 rounded-lg shadow-lg p-6 mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Page Under Construction</h2>
                        <p className="text-gray-400 mb-4">
                            This page is currently under construction. Stay tuned for updates!
                        </p>

                    </motion.div>

                </motion.div>
            </main>

            <Footer/>
        </div>
    );
}