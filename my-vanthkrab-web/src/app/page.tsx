"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function BuildingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-gray-900">Page Under Construction</h1>
            </motion.div>

            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="mt-8"
            >
                <Button variant="default" size="lg">
                    <span className="text-lg">Coming Soon!</span>
                </Button>
            </motion.div>
        </div>
    );
}