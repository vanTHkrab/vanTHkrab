// import {SetStateAction, useState} from "react";
// import {motion} from "motion/react";
// import {Filter, Search} from "lucide-react";
// import {Input} from "@/components/ui/input";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import {Button} from "@/components/ui/button";
// import {Dialog, DialogContent} from "@/components/ui/dialog";
// import PhotoCard from "@/components/photo-card";
// import PhotoDetail from "@/components/photo-detail";
//
//
// const photos = [
//     {
//         id: 1,
//         src: "/api/placeholder/800/600",
//         alt: "Nature landscape",
//         title: "Mountain View",
//         category: "nature",
//         likes: 245,
//     },
//     {
//         id: 2,
//         src: "/api/placeholder/800/600",
//         alt: "City skyline",
//         title: "Urban Sunset",
//         category: "city",
//         likes: 187,
//     },
//     {
//         id: 3,
//         src: "/api/placeholder/800/600",
//         alt: "Ocean waves",
//         title: "Sea Breeze",
//         category: "nature",
//         likes: 324,
//     },
//     {
//         id: 4,
//         src: "/api/placeholder/800/600",
//         alt: "Architectural detail",
//         title: "Modern Structure",
//         category: "architecture",
//         likes: 156,
//     },
//     {
//         id: 5,
//         src: "/api/placeholder/800/600",
//         alt: "Forest pathway",
//         title: "Woodland Path",
//         category: "nature",
//         likes: 298,
//     },
//     {
//         id: 6,
//         src: "/api/placeholder/800/600",
//         alt: "Street photography",
//         title: "City Life",
//         category: "city",
//         likes: 215,
//     },
//     {
//         id: 7,
//         src: "/api/placeholder/800/600",
//         alt: "Beach sunset",
//         title: "Golden Hour",
//         category: "nature",
//         likes: 352,
//     },
//     {
//         id: 8,
//         src: "/api/placeholder/800/600",
//         alt: "Historic building",
//         title: "Ancient Architecture",
//         category: "architecture",
//         likes: 178,
//     },
//     {
//         id: 9,
//         src: "/api/placeholder/800/600",
//         alt: "Night city",
//         title: "Neon Nights",
//         category: "city",
//         likes: 267,
//     },
// ];
//
// export default function Gallery() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedPhoto, setSelectedPhoto] = useState(null);
//     const [category, setCategory] = useState("all");
//
//     const filteredPhotos = photos.filter(photo => {
//         const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesCategory = category === "all" || photo.category === category;
//         return matchesSearch && matchesCategory;
//     });
//
//     const handlePhotoClick = (photo: SetStateAction<null>) => {
//         setSelectedPhoto(photo);
//     };
//
//     const handleNextPhoto = () => {
//         const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
//         const nextIndex = (currentIndex + 1) % photos.length;
//         setSelectedPhoto(photos[nextIndex]);
//     };
//
//     const handlePrevPhoto = () => {
//         const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
//         const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
//         setSelectedPhoto(photos[prevIndex]);
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <motion.header
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white shadow-sm"
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         <div>
//                             <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
//                             <p className="text-gray-500 mt-1">Discover beautiful photography</p>
//                         </div>
//
//                         <div className="flex items-center gap-2 w-full md:w-auto">
//                             <div className="relative flex-1 md:w-64">
//                                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//                                 <Input
//                                     type="text"
//                                     placeholder="Search photos..."
//                                     className="pl-8 pr-4"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button variant="outline" size="icon">
//                                         <Filter className="h-4 w-4" />
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                     <DropdownMenuItem
//                                         className={category === "all" ? "bg-gray-100" : ""}
//                                         onClick={() => setCategory("all")}
//                                     >
//                                         All Categories
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuItem
//                                         className={category === "nature" ? "bg-gray-100" : ""}
//                                         onClick={() => setCategory("nature")}
//                                     >
//                                         Nature
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem
//                                         className={category === "city" ? "bg-gray-100" : ""}
//                                         onClick={() => setCategory("city")}
//                                     >
//                                         City
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem
//                                         className={category === "architecture" ? "bg-gray-100" : ""}
//                                         onClick={() => setCategory("architecture")}
//                                     >
//                                         Architecture
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </div>
//                     </div>
//                 </div>
//             </motion.header>
//
//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Category Pills */}
//                 <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
//                     <Button
//                         variant={category === "all" ? "default" : "outline"}
//                         size="sm"
//                         className="whitespace-nowrap"
//                         onClick={() => setCategory("all")}
//                     >
//                         All Categories
//                     </Button>
//                     <Button
//                         variant={category === "nature" ? "default" : "outline"}
//                         size="sm"
//                         className="whitespace-nowrap"
//                         onClick={() => setCategory("nature")}
//                     >
//                         Nature
//                     </Button>
//                     <Button
//                         variant={category === "city" ? "default" : "outline"}
//                         size="sm"
//                         className="whitespace-nowrap"
//                         onClick={() => setCategory("city")}
//                     >
//                         City
//                     </Button>
//                     <Button
//                         variant={category === "architecture" ? "default" : "outline"}
//                         size="sm"
//                         className="whitespace-nowrap"
//                         onClick={() => setCategory("architecture")}
//                     >
//                         Architecture
//                     </Button>
//                 </div>
//
//                 {/* Photo Grid */}
//                 {filteredPhotos.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {filteredPhotos.map((photo, index) => (
//                             <PhotoCard
//                                 key={photo.id}
//                                 photo={photo}
//                                 index={index}
//                                 onClick={handlePhotoClick}
//                             />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12">
//                         <p className="text-gray-500">No photos found matching your search.</p>
//                         <Button
//                             variant="outline"
//                             className="mt-4"
//                             onClick={() => {
//                                 setSearchTerm("");
//                                 setCategory("all");
//                             }}
//                         >
//                             Clear filters
//                         </Button>
//                     </div>
//                 )}
//             </main>
//
//             {/* Photo Detail Dialog */}
//             <Dialog
//                 open={selectedPhoto !== null}
//                 onOpenChange={(open) => !open && setSelectedPhoto(null)}
//             >
//                 <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto">
//                     {selectedPhoto && (
//                         <PhotoDetail
//                             photo={selectedPhoto}
//                             onClose={() => setSelectedPhoto(null)}
//                             onNext={handleNextPhoto}
//                             onPrev={handlePrevPhoto}
//                         />
//                     )}
//                 </DialogContent>
//             </Dialog>
//
//             {/* Footer */}
//             <footer className="bg-white border-t border-gray-200 py-8 mt-8">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//                     <p className="text-gray-500">© 2025 Photo Gallery. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// }