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
        className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 border-2 border-white/30 ${getAnimationClass()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-center space-x-6 md:space-x-8 lg:space-x-12">
          {/* All Images in a single row */}
          {allImages.map((image, index) => {
            const position = index < 3 ? 'left' : 'right';
            
            // Insert the center name image at index 3
            if (index === 3) {
              return (
                <React.Fragment key="center">
                  <HoverImage
                    src={image.src}
                    alt={image.alt}
                    title={image.title}
                    description={image.description}
                    popupImage={image.popupImage}
                    position={position}
                    index={index}
                  />
                  
                  {/* Center Name Image */}
                  <div className="flex-shrink-0 mx-4">
                    <div className="relative group">
                      <div className="w-48 h-24 md:w-64 md:h-32 lg:w-80 lg:h-40 bg-white rounded-xl shadow-2xl flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:[transform:rotateY(5deg)_rotateX(5deg)] hover:shadow-3xl">
                        <div className="text-center">
                          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-wide">
                            Your Name
                          </h1>
                          <p className="text-gray-600 text-xs md:text-sm mt-1 font-light">
                            Professional Title
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            }
            
            // Skip index 3 since we handled it above
            if (index === 3) return null;
            
            return (
              <HoverImage
                key={index}
                src={image.src}
                alt={image.alt}
                title={image.title}
                description={image.description}
                popupImage={image.popupImage}
                position={position}
                index={index}
              />
            );
          })}
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
