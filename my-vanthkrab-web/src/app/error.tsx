'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error boundary caught an error:', error)

        // You can also send to external error tracking services
        // Example: Sentry, LogRocket, etc.
        // reportError(error)
    }, [error])

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2
            }
        }
    }

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <Card className="border-destructive/20 shadow-lg">
                    <CardHeader className="text-center space-y-4">
                        <motion.div
                            variants={iconVariants}
                            initial="hidden"
                            animate="visible"
                            className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center"
                        >
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </motion.div>

                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold text-destructive">
                                Oops! Something went wrong
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                We encountered an unexpected error. Don't worry, we're on it!
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {process.env.NODE_ENV === 'development' && (
                            <Alert variant="destructive" className="text-left">
                                <Bug className="h-4 w-4" />
                                <AlertDescription className="font-mono text-xs break-all">
                                    <strong>Debug Info:</strong><br />
                                    {error.message}
                                    {error.digest && (
                                        <>
                                            <br />
                                            <strong>Digest:</strong> {error.digest}
                                        </>
                                    )}  
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="text-center text-sm text-muted-foreground">
                            <p>
                                This error has been automatically logged.
                                If the problem persists, please contact support.
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full"
                        >
                            <Button
                                onClick={reset}
                                className="w-full"
                                size="lg"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full"
                        >
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/'}
                                className="w-full"
                                size="lg"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Go Home
                            </Button>
                        </motion.div>
                    </CardFooter>
                </Card>

                {/* Floating animation background elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-destructive/10 rounded-full"
                            animate={{
                                x: [0, 100, -100, 0],
                                y: [0, -100, 100, 0],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                            style={{
                                left: `${20 + i * 30}%`,
                                top: `${30 + i * 20}%`,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}