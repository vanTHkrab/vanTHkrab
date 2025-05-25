import React from 'react';
import {motion} from "framer-motion";
import {FooterProps, SocialLink} from "@/types";
import {redirect} from 'next/navigation'

interface FooterSocialLinkProps extends FooterProps {
    socialLinks?: SocialLink[];
}

const FooterSocialLink: React.FC<FooterSocialLinkProps> = ({
                                                               delay = 0,
                                                               socialLinks = []
                                                           }: FooterSocialLinkProps): React.ReactElement => {

    if (socialLinks.length === 0) return <></>;

    socialLinks = socialLinks.map(link => ({
        ...link,
        href: link.href || "#"
    }));

    const handleLinkClick = (href: string | undefined) => {
        if (!href || href === "#") return;
        if (href.startsWith("http")) {
            window.open(href, "_blank", "noopener,noreferrer");
        } else {
            redirect(href);
        }
    }

    return (
        <motion.div
            className="flex justify-center gap-6"
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: delay + 0.6, duration: 0.6}}
        >
            {socialLinks.map((link: SocialLink, index: number) => (
                <motion.button
                    key={link.label}
                    className={`p-2 rounded-full bg-white/5 hover:bg-white/10 ${link.color} hover:scale-110 transition-all duration-200 backdrop-blur-sm border border-white/10`}
                    whileHover={{
                        y: -3,
                        boxShadow: "0 10px 25px -10px rgba(255,255,255,0.1)"
                    }}
                    whileTap={{scale: 0.95}}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: delay + 0.8 + index * 0.1}}
                    onClick={() => handleLinkClick(link.href)}
                >
                    <link.icon className="w-4 h-4"/>
                </motion.button>
            ))}
        </motion.div>
    );
}

export default FooterSocialLink;
