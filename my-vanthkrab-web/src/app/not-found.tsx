"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// This is the 404 page component with a black theme
export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    // Auto-redirect countdown effect
    useEffect(() => {
        if (countdown <= 0) {
            router.push('/');
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 10, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 2
                    }}
                    className="mx-auto mb-6 text-red-500"
                >
                    <AlertCircle size={80} />
                </motion.div>

                <motion.h1
                    className="text-6xl font-extrabold mb-4 text-white"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    404
                </motion.h1>

                <h2 className="text-2xl font-bold mb-2 text-zinc-100">Page Not Found</h2>

                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Button
                        onClick={() => router.push('/')}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none"
                        variant="default"
                    >
                        Return Home
                    </Button>

                    <Button
                        onClick={() => router.back()}
                        className="w-full bg-transparent border border-zinc-700 hover:bg-zinc-900 text-zinc-300"
                        variant="outline"
                    >
                        Go Back
                    </Button>

                    <p className="text-sm text-zinc-500 mt-4">
                        Redirecting to homepage in {countdown} seconds...
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-0 w-full h-1 bg-purple-600"
                initial={{ width: "100%" }}
                animate={{ width: `${countdown * 10}%` }}
                transition={{ duration: 1 }}
            />
        </div>
    );
}