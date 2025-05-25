"use client";
import React from 'react';
import {motion} from 'framer-motion';
import BgAnimation1 from "@/components/bg/bg-animation1";
import LogoIcon2 from "@/components/logo/logo-icon";
import FeaturesPreview from "@/components/features-preview";
import Footer from "@/components/footer/footer";

const ComingSoonPage = () => {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
            <BgAnimation1/>
            <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
                {/* Main Content */}
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                >
                    {/* Logo/Icon */}
                    <LogoIcon2 />

                    {/* Main Heading */}
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4, duration: 0.8}}
                    >
                        Coming Soon
                    </motion.h1>

                    {/* Features Preview */}
                    <FeaturesPreview/>
                </motion.div>
                <Footer delay={0.6}/>
            </div>

        </div>
    );
};

export default ComingSoonPage;