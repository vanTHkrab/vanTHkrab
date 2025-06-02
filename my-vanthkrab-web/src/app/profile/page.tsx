"use client";
import React, {useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    MapPin,
    Calendar,
    Mail,
    Phone,
    Github,
    Linkedin,
    Twitter,
    Edit3,
    Camera,
    Star,
    Award,
    Briefcase,
    GraduationCap,
    Heart,
    MessageCircle,
    Share2,
    Settings
} from 'lucide-react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('about');
    const [isFollowing, setIsFollowing] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const skills = [
        'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS',
        'Docker', 'GraphQL', 'Next.js', 'TailwindCSS', 'MongoDB', 'Redis'
    ];

    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with real-time analytics',
            tech: ['React', 'Node.js', 'PostgreSQL'],
            status: 'Live'
        },
        {
            title: 'AI Chat Application',
            description: 'Real-time chat app with AI-powered responses',
            tech: ['Next.js', 'OpenAI', 'WebSocket'],
            status: 'Development'
        },
        {
            title: 'Data Visualization Tool',
            description: 'Interactive dashboard for business intelligence',
            tech: ['D3.js', 'Python', 'Flask'],
            status: 'Completed'
        }
    ];

    const achievements = [
        { title: 'Top Contributor 2024', icon: <Award className="w-5 h-5" />, date: 'Dec 2024' },
        { title: '50+ Projects Completed', icon: <Briefcase className="w-5 h-5" />, date: 'Nov 2024' },
        { title: 'Tech Lead Certification', icon: <GraduationCap className="w-5 h-5" />, date: 'Oct 2024' }
    ];

    useEffect(() => {
        console.log(32000 / 25);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }} />
            </div>

            <motion.div
                className="relative z-10 max-w-6xl mx-auto px-4 py-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <motion.div
                    variants={itemVariants}
                    className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-gray-700/50"
                >
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors"
                        >
                            <Settings className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </motion.button>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                        <motion.div
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold relative overflow-hidden">
                                <User className="w-16 h-16" />
                                <motion.div
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    whileHover={{ opacity: 1 }}
                                >
                                    <Camera className="w-8 h-8" />
                                </motion.div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black"></div>
                        </motion.div>

                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Alex Johnson
                                </h1>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-1 hover:bg-gray-700/50 rounded-full transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </motion.button>
                            </div>

                            <p className="text-xl text-gray-300 mb-4">Senior Full Stack Developer</p>

                            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined March 2020</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span>4.9 Rating</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                {[Github, Linkedin, Twitter, Mail, Phone].map((Icon, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsFollowing(!isFollowing)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                                        isFollowing
                                            ? 'bg-gray-700 text-white border-2 border-gray-600'
                                            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                    }`}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl font-semibold transition-colors flex items-center space-x-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Message</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl font-semibold transition-colors flex items-center space-x-2"
                                >
                                    <Heart className="w-4 h-4" />
                                    <span>1.2k</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Tabs */}
                <motion.div
                    variants={itemVariants}
                    className="flex space-x-1 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-2 mb-8 border border-gray-700/50"
                >
                    {['about', 'projects', 'skills', 'achievements'].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                                activeTab === tab
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Content Section */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50"
                    >
                        {activeTab === 'about' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-4">About Me</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    Passionate full-stack developer with 8+ years of experience building scalable web applications.
                                    I specialize in React, Node.js, and cloud technologies, with a strong focus on user experience
                                    and performance optimization. Always eager to learn new technologies and tackle challenging problems.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-purple-400">Experience</h3>
                                        <p className="text-gray-300">8+ years in software development</p>
                                        <p className="text-gray-300">Led teams of 5-10 developers</p>
                                        <p className="text-gray-300">100+ projects completed</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-blue-400">Interests</h3>
                                        <p className="text-gray-300">Machine Learning & AI</p>
                                        <p className="text-gray-300">Open Source Contribution</p>
                                        <p className="text-gray-300">Tech Mentoring</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'projects' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
                                        >
                                            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                                            <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tech.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs"
                                                    >
                            {tech}
                          </span>
                                                ))}
                                            </div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                                                project.status === 'Live' ? 'bg-green-600/20 text-green-300' :
                                                    project.status === 'Development' ? 'bg-yellow-600/20 text-yellow-300' :
                                                        'bg-blue-600/20 text-blue-300'
                                            }`}>
                        {project.status}
                      </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-4 rounded-2xl text-center border border-purple-500/20 hover:border-purple-500/50 transition-all"
                                        >
                                            <span className="font-semibold">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 text-purple-400">Frontend</h3>
                                        <div className="space-y-3">
                                            {['React/Next.js', 'TypeScript', 'TailwindCSS'].map((skill, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <motion.div
                                                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: '90%' }}
                                                            transition={{ duration: 1, delay: index * 0.2 }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-300 w-20">{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 text-blue-400">Backend</h3>
                                        <div className="space-y-3">
                                            {['Node.js', 'Python', 'PostgreSQL'].map((skill, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <motion.div
                                                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: '85%' }}
                                                            transition={{ duration: 1, delay: index * 0.2 }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-300 w-20">{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Achievements & Recognition</h2>
                                <div className="space-y-4">
                                    {achievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02, x: 10 }}
                                            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                                                {achievement.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                                <p className="text-gray-400 text-sm">{achievement.date}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-purple-500/20">
                                        <div className="text-3xl font-bold text-purple-400">150+</div>
                                        <div className="text-gray-300">Projects Completed</div>
                                    </div>
                                    <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-green-600/20 rounded-2xl border border-blue-500/20">
                                        <div className="text-3xl font-bold text-blue-400">50+</div>
                                        <div className="text-gray-300">Happy Clients</div>
                                    </div>
                                    <div className="text-center p-6 bg-gradient-to-br from-green-600/20 to-purple-600/20 rounded-2xl border border-green-500/20">
                                        <div className="text-3xl font-bold text-green-400">8+</div>
                                        <div className="text-gray-300">Years Experience</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ProfilePage;