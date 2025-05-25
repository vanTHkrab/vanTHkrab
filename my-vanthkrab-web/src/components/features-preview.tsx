import React from 'react';
import {motion} from "framer-motion";
import {Card, CardContent} from "@/components/ui/card";
import type {Feature} from "@/types";

interface Props {
    features?: Feature[];
}

const FeaturesPreview: React.FC<Props> = ({ features = [] }: Props): React.ReactElement => {

    if (features.length === 0) {
        return (
            <></>
        );
    }

    return (
        <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            {features.map((feature: Feature, index: number) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                >
                    <Card className="bg-white/5 backdrop-blur-lg border-white/10 h-full hover:bg-white/10 transition-all duration-300 group">
                        <CardContent className="p-6 text-center">
                            <motion.div
                                className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                            >
                                <feature.icon className="w-8 h-8 text-white" />
                            </motion.div>
                            <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default FeaturesPreview;