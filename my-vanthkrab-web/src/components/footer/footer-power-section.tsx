import React from 'react';
import {motion} from "framer-motion";
import {Globe, LayoutGrid, Zap} from "lucide-react";
import type {FooterProps} from "@/types";

const FooterPowerSection: React.FC<FooterProps> = ({delay = 0}: FooterProps): React.ReactElement => {
    return (
        <div className="pt-6 text-xs text-gray-500 border-t border-white/5 max-w-lg mx-auto">
        <motion.div
                className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 text-sm py-4 px-4 md:px-0"
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: delay + 0.4, duration: 0.6}}
            >
                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-medium">Powered of</span>
                    <motion.div
                        animate={{rotate: [0, 360]}}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <Globe className="w-4 h-4 text-emerald-400"/>
                    </motion.div>
                    <span className="font-semibold text-white">Next.js</span>
                </div>

                <div className="w-px h-4 bg-gray-600 hidden md:block"></div>

                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.7, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Zap className="w-4 h-4 text-purple-400"/>
                    </motion.div>
                    <span className="font-semibold text-white">Framer Motion</span>
                </div>

                <div className="w-px h-4 bg-gray-600 hidden md:block"></div>

                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.7, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <LayoutGrid className="w-4 h-4 text-blue-400"/>
                    </motion.div>
                    <span className="font-semibold text-white">Shadcn UI</span>
                </div>
            </motion.div>
        </div>
    );
};

export default FooterPowerSection;