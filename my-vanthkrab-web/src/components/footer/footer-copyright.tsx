import React from 'react';
import {motion} from "framer-motion";

interface FooterCopyrightProps {
    delay?: number;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({delay = 0}: FooterCopyrightProps): React.ReactElement => {
    const currentYear: number = new Date().getFullYear();
    return (
        <>
            <motion.div
                className="pt-6 text-xs text-gray-500 border-t border-white/5"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: delay + 1, duration: 0.6}}
            >
                <p>© {currentYear} vanTHkrab. All rights reserved.</p>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
                <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{delay: delay + 1.2, duration: 1}}
                />
            </div>
        </>
    );
}

export default FooterCopyright;