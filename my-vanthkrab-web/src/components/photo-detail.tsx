// import {useState} from "react";
// import {Button} from "@/components/ui/button";
// import {ChevronLeft, ChevronRight, Download, Heart, Share2, X} from "lucide-react";
// import {DialogClose} from "@/components/ui/dialog";
// import type {Photo} from "@/types";
//
// interface Props {
//     photo: Photo;
//     onClose: () => void;
//     onNext: () => void;
//     onPrev: () => void;
// }
//
// const PhotoDetail = ({ photo, onClose, onNext, onPrev }: Props) => {
//     const [liked, setLiked] = useState(false);
//
//     return (
//         <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
//             <div className="relative flex-1">
//                 <img
//                     src={photo.src}
//                     alt={photo.alt}
//                     className="w-full object-contain rounded-lg max-h-[70vh]"
//                 />
//                 <Button
//                     variant="outline"
//                     size="icon"
//                     className="absolute top-2 left-2 bg-black/50 text-white hover:bg-black/70 border-none"
//                     onClick={onPrev}
//                 >
//                     <ChevronLeft className="h-5 w-5" />
//                 </Button>
//                 <Button
//                     variant="outline"
//                     size="icon"
//                     className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 border-none"
//                     onClick={onNext}
//                 >
//                     <ChevronRight className="h-5 w-5" />
//                 </Button>
//             </div>
//
//             <div className="flex flex-col w-full md:w-1/3 p-2">
//                 <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold">{photo.title}</h2>
//                     <DialogClose asChild>
//                         <Button variant="ghost" size="icon" onClick={onClose}>
//                             <X className="h-5 w-5" />
//                         </Button>
//                     </DialogClose>
//                 </div>
//
//                 <div className="space-y-4">
//                     <div>
//                         <p className="text-gray-500 mb-1">Category</p>
//                         <div className="flex">
//               <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded capitalize">
//                 {photo.category}
//               </span>
//                         </div>
//                     </div>
//
//                     <div className="flex space-x-2">
//                         <Button
//                             variant={liked ? "default" : "outline"}
//                             size="sm"
//                             className={liked ? "bg-red-500 hover:bg-red-600 text-white border-none" : ""}
//                             onClick={() => setLiked(!liked)}
//                         >
//                             <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-white" : ""}`} />
//                             {liked ? "Liked" : "Like"}
//                         </Button>
//                         <Button variant="outline" size="sm">
//                             <Share2 className="h-4 w-4 mr-1" />
//                             Share
//                         </Button>
//                         <Button variant="outline" size="sm">
//                             <Download className="h-4 w-4 mr-1" />
//                             Download
//                         </Button>
//                     </div>
//
//                     <div>
//                         <p className="text-gray-500 mb-1">Description</p>
//                         <p className="text-sm">
//                             This beautiful {photo.category} photograph captures the essence of
//                             {photo.category === "nature" ? " the natural world" :
//                                 photo.category === "city" ? " urban life" :
//                                     " architectural design"} with stunning detail and composition.
//                         </p>
//                     </div>
//
//                     <div>
//                         <p className="text-gray-500 mb-1">Details</p>
//                         <div className="grid grid-cols-2 gap-2 text-sm">
//                             <div>
//                                 <p className="font-medium">Resolution</p>
//                                 <p className="text-gray-500">3840 x 2160</p>
//                             </div>
//                             <div>
//                                 <p className="font-medium">Size</p>
//                                 <p className="text-gray-500">4.2 MB</p>
//                             </div>
//                             <div>
//                                 <p className="font-medium">Format</p>
//                                 <p className="text-gray-500">JPEG</p>
//                             </div>
//                             <div>
//                                 <p className="font-medium">Uploaded</p>
//                                 <p className="text-gray-500">May 12, 2025</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default PhotoDetail;