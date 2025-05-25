"use client";
import React from 'react';
import {motion} from "framer-motion";
import {Globe, Star, Code} from "lucide-react";
import FooterCopyright from "@/components/footer/footer-copyright";
import FooterBg from "@/components/footer/footer-bg";
import FooterSocialLink from "@/components/footer/footer-social-link";
import FooterPowerSection from "@/components/footer/footer-power-section";
import FooterMadeBy from "@/components/footer/footer-made-by";
import type {FooterProps, SocialLink} from "@/types";

const Footer: React.FC<FooterProps> = ({delay = 0}: FooterProps): React.ReactElement => {
    const socialLinks: SocialLink[] = [
        {icon: Globe, label: "Website", color: "text-blue-400", href: "https://vanthkrab.com"},
        {icon: Code, label: "GitHub", color: "text-gray-400", href: "https://github.com/vanTHkrab"},
    ];

    return (
        <motion.footer
            className="relative pt-12 pb-8 mt-20  text-white flex flex-col items-center justify-center overflow-hidden w-full"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: delay, duration: 0.8}}
        >
            {/* Gradient border line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            {/* Main content */}
            <div className="text-center space-y-6">
                {/* Made by section */}
                <FooterMadeBy delay={delay}/>

                {/* Powered by section */}
                <FooterPowerSection delay={delay}/>

                {/* Social links */}
                <FooterSocialLink delay={delay} socialLinks={socialLinks}/>

                {/* Copyright */}
                <FooterCopyright delay={delay}/>
            </div>

            <FooterBg/>
        </motion.footer>
    );
};

export default Footer;