import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface HoverImageProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  popupImage: string;
  position: 'left' | 'right';
  index: number;
  sizeClass?: string; // Optional size class prop
}

const HoverImage: React.FC<HoverImageProps> = ({ 
  src, 
  alt, 
  title, 
  description, 
  popupImage, 
  position,
  index,
  sizeClass = 'h-16 w-16' // Default size
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Different animation styles based on index
  const getAnimationClass = () => {
    const animations = [
      'hover:animate-spin',
      'hover:animate-bounce',
      'hover:animate-pulse',
      'hover:[transform:rotateY(180deg)]',
      'hover:animate-ping',
      'hover:[transform:rotateX(180deg)]'
    ];
    return animations[index % animations.length];
  };

  return (
    <div className="relative group">
      <div
        className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-500 border-2 border-white/30 ${getAnimationClass()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`object-cover grayscale hover:grayscale-0 transition-all duration-300 ${sizeClass}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Popup */}
      {isHovered && (
        <div 
          className={`absolute z-50 ${
            position === 'left' ? 'left-full ml-4' : 'right-full mr-4'
          } top-1/2 transform -translate-y-1/2 animate-fade-in`}
        >
          <Card className="w-80 shadow-2xl border-white/30 bg-black">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={popupImage}
                  alt={title}
                  className="w-16 h-16 rounded-lg object-cover grayscale"
                />
                <div>
                  <h3 className="font-semibold text-lg text-white">{title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const SIDE_ICON_SIZE = 'h-8 w-8 md:h-10 md:w-10 lg:h-14 lg:w-14'; // smaller and consistent
const CENTER_IMAGE_HEIGHT = 'h-40 md:h-56 lg:h-72'; // smaller center image

const HexagonInteractive: React.FC = () => (
  <div className="relative group flex items-end justify-center" style={{height: '100%'}}>
    <div
      className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:scale-110 relative ${SIDE_ICON_SIZE}`}
      style={{ minWidth: '2rem', minHeight: '2rem', border: 'none', transform: 'translateY(-100%)' }}
    >
      <img
        src="/hexagon.png"
        alt="Hexagon"
        className="object-cover grayscale group-hover:hidden w-full h-full transition-all duration-300"
        draggable="false"
      />
      <video
        src="/morph.webm"
        className="object-cover hidden group-hover:block absolute top-0 left-0 w-full h-full"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  </div>
);

const SplashScreen: React.FC = () => {
  const allImages = [
    {
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
      alt: "Technology",
      title: "Tech Skills",
      description: "Full-stack development with modern technologies",
      popupImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop"
    },
    {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
      alt: "Innovation",
      title: "Innovation",
      description: "Creative problem solving and cutting-edge solutions",
      popupImage: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop"
    },
    {
      src: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
      alt: "Productivity",
      title: "Productivity",
      description: "Efficient workflows and time management",
      popupImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop"
    },
    {
      src: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=400&fit=crop",
      alt: "Projects",
      title: "Projects",
      description: "Innovative solutions and creative implementations",
      popupImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop"
    },
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
      alt: "Analytics",
      title: "Analytics",
      description: "Data-driven insights and performance optimization",
      popupImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop"
    },
    {
      src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop",
      alt: "Leadership",
      title: "Leadership",
      description: "Team collaboration and project management",
      popupImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop"
    }
  ];

  const leftImages = allImages.slice(0, 3);
  const rightImages = allImages.slice(3, 6);

  return (
    <div className="min-h-screen bg-black flex items-start justify-center pt-8 pb-2 px-2">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-end justify-center space-x-2 md:space-x-4 lg:space-x-8" style={{height: '100%'}}>
          {/* 3 left hexagons */}
          <HexagonInteractive />
          <HexagonInteractive />
          <HexagonInteractive />

          {/* Center Name Image, bottom-aligned with side icons */}
          <div className="flex-shrink-0 mx-2 flex items-end" style={{height: '100%'}}>
            <div className="relative group flex items-end">
              <div className="flex items-end justify-center transform transition-all duration-500 hover:scale-105 hover:[transform:rotateY(5deg)_rotateX(5deg)]">
                <img
                  src="/name_img.png"
                  alt="Name"
                  className={`mx-auto ${CENTER_IMAGE_HEIGHT} object-contain align-bottom`}
                  style={{display: 'block'}}
                />
              </div>
            </div>
          </div>

          {/* 3 right hexagons */}
          <HexagonInteractive />
          <HexagonInteractive />
          <HexagonInteractive />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
