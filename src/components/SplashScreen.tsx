
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
}

const HoverImage: React.FC<HoverImageProps> = ({ 
  src, 
  alt, 
  title, 
  description, 
  popupImage, 
  position,
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      <div
        className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Popup */}
      {isHovered && (
        <div 
          className={`absolute z-50 ${
            position === 'left' ? 'left-full ml-4' : 'right-full mr-4'
          } top-1/2 transform -translate-y-1/2 animate-fade-in`}
        >
          <Card className="w-80 shadow-2xl border-0 bg-white/95 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={popupImage}
                  alt={title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const SplashScreen: React.FC = () => {
  const leftImages = [
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
    }
  ];

  const rightImages = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          {/* Left Images */}
          <div className="hidden md:flex flex-col space-y-8 mr-12 lg:mr-20">
            {leftImages.map((image, index) => (
              <HoverImage
                key={`left-${index}`}
                src={image.src}
                alt={image.alt}
                title={image.title}
                description={image.description}
                popupImage={image.popupImage}
                position="left"
                index={index}
              />
            ))}
          </div>

          {/* Center Name Image */}
          <div className="flex-shrink-0 mx-8">
            <div className="relative group">
              <div className="w-64 h-32 md:w-80 md:h-40 lg:w-96 lg:h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-2xl flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide">
                    Your Name
                  </h1>
                  <p className="text-blue-100 text-sm md:text-base mt-2 font-light">
                    Professional Title
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="hidden md:flex flex-col space-y-8 ml-12 lg:ml-20">
            {rightImages.map((image, index) => (
              <HoverImage
                key={`right-${index}`}
                src={image.src}
                alt={image.alt}
                title={image.title}
                description={image.description}
                popupImage={image.popupImage}
                position="right"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile Images Row */}
        <div className="md:hidden mt-12 grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {[...leftImages, ...rightImages].map((image, index) => (
            <HoverImage
              key={`mobile-${index}`}
              src={image.src}
              alt={image.alt}
              title={image.title}
              description={image.description}
              popupImage={image.popupImage}
              position={index < 3 ? 'left' : 'right'}
              index={index}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
