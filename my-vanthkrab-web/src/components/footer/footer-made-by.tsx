import React from 'react';
import {motion} from "framer-motion";
import type {FooterProps} from "@/types";

const FooterMadeBy: React.FC<FooterProps> = ({delay = 0}: FooterProps): React.ReactElement => {
    return (
        <motion.div
            className="flex items-center justify-center gap-2 text-gray-300"
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: delay + 0.2, duration: 0.6}}
        >
            <span className="text-sm font-medium">Crafted by</span>
            <motion.span
                className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                whileHover={{scale: 1.05}}
            >
                vanTHkrab
            </motion.span>
        </motion.div>
    );
}

export default FooterMadeBy;