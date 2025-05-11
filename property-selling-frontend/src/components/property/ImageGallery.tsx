import React, { useState, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaPlay,
  FaPause,
  FaVideo,
} from "react-icons/fa";

interface ImageGalleryProps {
  images: string[];
  videoUrl?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, videoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Combined array of media (video + images)
  const allMedia = videoUrl ? ["video", ...images] : images;
  const isVideoSelected = videoUrl && currentIndex === 0;

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const previousItem = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const thumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="relative">
      {/* Main Display (Image or Video) */}
      <div className="relative h-[500px] overflow-hidden rounded-lg">
        {isVideoSelected ? (
          // Show video when selected
          <div className="w-full h-full">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              autoPlay={isVideoPlaying}
              loop
              muted
              playsInline
            />
            <button
              onClick={toggleVideoPlayback}
              className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-10"
            >
              {isVideoPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        ) : (
          // Show image when selected
          <img
            src={images[videoUrl ? currentIndex - 1 : currentIndex]}
            alt={`Property view ${currentIndex}`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation Arrows */}
        <button
          onClick={previousItem}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextItem}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
        >
          <FaChevronRight />
        </button>

        {/* Fullscreen Control */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          >
            <FaExpand />
          </button>
        </div>

        {/* Item Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {allMedia.length}
        </div>
      </div>

      {/* Thumbnails (Including Video) */}
      <div className="mt-4 grid grid-cols-6 gap-2">
        {allMedia.map((item, index) => (
          <button
            key={index}
            onClick={() => thumbnailClick(index)}
            className={`relative h-20 rounded-lg overflow-hidden ${
              currentIndex === index
                ? "ring-2 ring-blue-600"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            {index === 0 && item === "video" && videoUrl ? (
              // Video thumbnail
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <FaVideo className="text-white text-2xl" />
                <div className="absolute inset-0">
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover opacity-60"
                    muted
                    playsInline
                  />
                </div>
              </div>
            ) : (
              // Image thumbnail
              <img
                src={videoUrl ? images[index - 1] : images[index]}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
