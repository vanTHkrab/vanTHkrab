"use client";
import React, {useState, useEffect} from 'react';
import {motion} from "framer-motion";

function BgAnimation1() {
    const [floatingElements, setFloatingElements] = useState<Array<{
        id: number;
        size: number;
        x: number;
        y: number;
        duration: number;
    }>>([]);

    useEffect(() => {
        // Generate floating elements only on client side to avoid hydration mismatch
        setFloatingElements(
            Array.from({ length: 6 }, (_, i) => ({
                id: i,
                size: Math.random() * 20 + 10,
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: Math.random() * 10 + 10
            }))
        );
    }, []);
    return (
        <div className="absolute inset-0">
            {/* Animated Background Elements */}
            {floatingElements.map((element) => (
                <motion.div
                    key={element.id}
                    className="absolute bg-white/10 rounded-full backdrop-blur-sm"
                    style={{
                        width: element.size,
                        height: element.size,
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: element.duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Large gradient orbs */}
            <motion.div
                className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl"
                animate={{
                    scale: [1.3, 1, 1.3],
                    rotate: [360, 180, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
}

export default BgAnimation1;