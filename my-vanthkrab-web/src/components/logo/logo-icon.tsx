import React from 'react';
import {motion} from "framer-motion";
import {Rocket, Sparkles, Terminal} from "lucide-react";

const LogoIcon1: React.FC = (): React.ReactElement => {
    return (
        <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
            }}
        >
            <div className="relative">
                <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Rocket className="w-12 h-12 text-white" />
                </motion.div>
                <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
            </div>
        </motion.div>
    );
};


const LogoIcon2: React.FC = (): React.ReactElement => {
    return (
        <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
            }}
        >
            <div className="relative">
                <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Terminal className="w-12 h-12 text-white" />
                </motion.div>
                <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
            </div>
        </motion.div>
    );
};


export default LogoIcon2;