'use client'

import {motion} from 'framer-motion'
import {useState, useEffect} from 'react'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Separator} from '@/components/ui/separator'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {
    HeartIcon,
    SparklesIcon,
    CalendarIcon,
    StarIcon,
    LockClosedIcon,
    ShieldCheckIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/solid'
import Galaxy from "@/components/Galaxy";

// Floating particles component
const FloatingParticles = () => {
    const particles = Array.from({length: 20}, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-70"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, -10, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

// Floating hearts component
const FloatingHearts = () => {
    const hearts = Array.from({length: 8}, (_, i) => ({
        id: i,
        delay: i * 0.5,
        x: Math.random() * 100,
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute"
                    style={{left: `${heart.x}%`}}
                    initial={{y: '100vh', opacity: 0}}
                    animate={{y: '-10vh', opacity: [0, 1, 0]}}
                    transition={{
                        duration: 4,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                >
                    <HeartIcon className="w-6 h-6 text-pink-500"/>
                </motion.div>
            ))}
        </div>
    )
}

// Bank-style Security Interface Component
const SecurityInterface = ({onAccessGranted}: { onAccessGranted: () => void }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({email: '', password: ''})
    const [attempts, setAttempts] = useState(0)

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({email: '', password: ''})

        // Validation
        const newErrors = {email: '', password: ''}
        if (!email || !validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address'
        }
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors)
            setIsLoading(false)
            return
        }

        // Simulate secure authentication
        await new Promise(resolve => setTimeout(resolve, 2000))

        // For demo purposes, accept specific credentials or any valid format
        if ((email === 'st1@anniversar.com' && password === 'ST1Month2025') ||
            (validateEmail(email) && password.length >= 6)) {
            onAccessGranted()
        } else {
            setAttempts(prev => prev + 1)
            setErrors({email: '', password: 'Invalid credentials. Please try again.'})
        }

        setIsLoading(false)
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center px-4">
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="w-full max-w-md"
            >
                {/* Security Header */}
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.3, duration: 0.6}}
                    className="text-center mb-8"
                >
                    <div
                        className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                        <ShieldCheckIcon className="w-10 h-10 text-white"/>
                    </div>
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Secure Access Required
                    </h1>
                    <p className="text-gray-400">
                        ST1 Anniversary Celebration Access Portal
                    </p>
                </motion.div>

                {/* Security Card */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 0.6}}
                >
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <CardContent className="p-8">
                            {/* Security Badge */}
                            <div className="flex items-center justify-center mb-6">
                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2">
                                    <LockClosedIcon className="w-4 h-4 mr-2"/>
                                    Bank-Level Security
                                </Badge>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Email Address
                                    </label>
                                    <motion.div
                                        whileFocus={{scale: 1.02}}
                                        className="relative"
                                    >
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/50 pr-12"
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
                                        </div>
                                    </motion.div>
                                    {errors.email && (
                                        <motion.p
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            className="text-red-400 text-sm"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Access Code
                                    </label>
                                    <motion.div
                                        whileFocus={{scale: 1.02}}
                                        className="relative"
                                    >
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your access code"
                                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/50 pr-20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="w-5 h-5"/>
                                            ) : (
                                                <EyeIcon className="w-5 h-5"/>
                                            )}
                                        </button>
                                    </motion.div>
                                    {errors.password && (
                                        <motion.p
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            className="text-red-400 text-sm"
                                        >
                                            {errors.password}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Security Features */}
                                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-green-400">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"/>
                                            <span>256-bit Encryption</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"/>
                                            <span>Secure Protocol</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <motion.div
                                            animate={{rotate: 360}}
                                            transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <>
                                            <ShieldCheckIcon className="w-5 h-5 mr-2"/>
                                            Authenticate & Access
                                        </>
                                    )}
                                </Button>

                                {/* Attempts Counter */}
                                {attempts > 0 && (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        className="text-center text-sm text-yellow-400"
                                    >
                                        Authentication attempts: {attempts}
                                    </motion.div>
                                )}

                                {/* Demo Credentials */}
                                <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
                                    <p className="text-xs text-gray-300">Email: st1@anniversary.com</p>
                                    <p className="text-xs text-gray-300">Password: ST1Month2025</p>
                                    <p className="text-xs text-gray-500 mt-2">Or use any valid email + 6+ char
                                        password</p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Security Footer */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1, duration: 0.6}}
                    className="text-center mt-8 text-sm text-gray-400"
                >
                    <p>Protected by ST1 Security Protocol</p>
                    <p className="text-xs mt-1">Your credentials are encrypted and secure</p>
                </motion.div>
            </motion.div>
        </div>
    )
}

const ST1MonthAnniversary = () => {
    const [showCelebration, setShowCelebration] = useState(false)
    const [hasAccess, setHasAccess] = useState(false)

    useEffect(() => {
        if (hasAccess) {
            const timer = setTimeout(() => setShowCelebration(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [hasAccess])

    // Show security interface first
    if (!hasAccess) {
        return <SecurityInterface onAccessGranted={() => setHasAccess(true)}/>
    }

    const milestones = [
        {date: "Aug 12, 2025", event: "ST1 Journey Begins", icon: SparklesIcon},
        {date: "Aug 20, 2025", event: "First Major Update", icon: StarIcon},
        {date: "Sep 1, 2025", event: "Community Milestone", icon: HeartIcon},
        {date: "Sep 12, 2025", event: "1 Month Anniversary!", icon: CalendarIcon},
    ]

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
            {/* Background Effects */}
            {/*<FloatingParticles/>*/}
            {/*<FloatingHearts/>*/}


            <Galaxy
                mouseRepulsion={false}
                mouseInteraction={true}
                density={1.5}
                glowIntensity={0.5}
                saturation={0.8}
                hueShift={240}
            />

            {/* Gradient Orbs */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"/>
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full blur-3xl"/>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
                {/* Main Title */}
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, ease: "easeOut"}}
                    className="text-center mb-12"
                >
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        ST1
                    </motion.h1>

                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.5, duration: 0.8}}
                        className="flex items-center justify-center gap-4 mb-8"
                    >
                        <Separator className="w-16 bg-gradient-to-r from-transparent to-purple-500"/>
                        <Badge variant="outline" className="text-lg px-6 py-2 border-purple-500 text-purple-300">
                            1 Month Anniversary
                        </Badge>
                        <Separator className="w-16 bg-gradient-to-l from-transparent to-purple-500"/>
                    </motion.div>

                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 1, duration: 0.8}}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Celebrating one incredible month of innovation, growth, and community
                    </motion.p>
                </motion.div>

                {/* Celebration Animation */}
                {showCelebration && (
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: [0, 1.2, 1]}}
                        transition={{duration: 0.8, ease: "easeOut"}}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 text-4xl">
                            <motion.div
                                animate={{rotate: 360}}
                                transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                            >
                                🎉
                            </motion.div>
                            <SparklesIcon className="w-12 h-12 text-yellow-400"/>
                            <motion.div
                                animate={{rotate: -360}}
                                transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                            >
                                🎊
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Stats Cards */}
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.5, duration: 0.8}}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl w-full"
                >
                    {[
                        {label: "Days", value: "30", icon: CalendarIcon, color: "from-blue-500 to-cyan-500"},
                        {label: "Milestones", value: "4", icon: StarIcon, color: "from-purple-500 to-pink-500"},
                        {label: "Growth", value: "∞", icon: SparklesIcon, color: "from-orange-500 to-red-500"},
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 1.8 + index * 0.2, duration: 0.6}}
                            whileHover={{scale: 1.05, y: -5}}
                            className="group"
                        >
                            <Card
                                className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                                <CardContent className="p-6 text-center">
                                    <div
                                        className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white"/>
                                    </div>
                                    <motion.div
                                        className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                                        initial={{scale: 1}}
                                        whileHover={{scale: 1.1}}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 2.5, duration: 0.8}}
                    className="max-w-2xl w-full"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Journey Timeline
                    </h2>

                    <div className="space-y-6">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.date}
                                initial={{opacity: 0, x: index % 2 === 0 ? -50 : 50}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 3 + index * 0.3, duration: 0.6}}
                                className="flex items-center gap-4 group"
                            >
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                        <milestone.icon className="w-6 h-6 text-white"/>
                                    </div>
                                </div>
                                <Card
                                    className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/50 transition-all duration-300">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">{milestone.event}</h3>
                                                <p className="text-sm text-gray-400">{milestone.date}</p>
                                            </div>
                                            {index === milestones.length - 1 && (
                                                <Badge
                                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                                    Today!
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Thank You Message */}
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 4.5, duration: 0.8}}
                    className="text-center mt-16 max-w-3xl"
                >
                    <Card
                        className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-purple-500/30">
                        <CardContent className="p-8">
                            <HeartIcon className="w-16 h-16 mx-auto mb-6 text-pink-400"/>
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Thank You for an Amazing Month!
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Here's to many more months of innovation, growth, and success.
                                The journey has just begun, and the best is yet to come!
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default ST1MonthAnniversary
