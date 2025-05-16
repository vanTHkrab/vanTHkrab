import {motion, useInView} from "motion/react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";
import type { Photo } from "@/types";

interface Props {
    photo: Photo;
    index: number;
    onClick: (photo: Photo) => void;
}

const PhotoCard = ({ photo, index, onClick }: Props) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="overflow-hidden"
        >
            <Card
                className="overflow-hidden cursor-pointer group h-full"
                onClick={() => onClick(photo)}
            >
                <CardContent className="p-0 relative h-full">
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold text-lg">{photo.title}</h3>
                        <div className="flex items-center mt-2">
                            <Button variant="ghost" size="sm" className="text-white p-0 h-8 w-8">
                                <Heart className="h-5 w-5" />
                            </Button>
                            <span className="text-white text-sm ml-1">{photo.likes}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default PhotoCard;