import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardContent } from '@/components/ui/card';
import BookGallery from './BookGallery';
import AlbumGallery from './AlbumGallery';

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

const SplashScreen: React.FC = () => {

  return (
    <div
      className="min-h-screen bg-black flex items-start justify-center pt-8 pb-2 px-2"
      style={{
        backgroundImage: 'url(/splash_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-5xl mx-auto relative">
        {/* Absolutely position the quarter button at its original spot */}
        <div style={{ position: 'absolute', left: 200, top: 300, transform: 'translate(-250px, -100px)', zIndex: 20 }}>
          <QuarterSpinButton />
        </div>
        {/* Absolutely position the stamp button in the top left, farther right and higher */}
        <div style={{ position: 'absolute', left: 210, top: 100, zIndex: 21 }}>
          <StampPeelButton popupSide="right" />
        </div>
        {/* Absolutely position the paperclip button straight down from the stamp, slightly lower than the quarter */}
        <div style={{ position: 'absolute', left: 150, top: 270, zIndex: 21 }}>
          <PaperclipBendButton popupSide="right" />
        </div>
        {/* Center Name Image */}
        <div className="flex items-end justify-center" style={{height: '100%'}}>
          <div className="flex-shrink-0 flex items-end">
            <div className="relative group flex items-end">
              <div className="flex items-end justify-center transform transition-all duration-500 hover:scale-105 hover:[transform:rotateY(5deg)_rotateX(5deg)]">
                <img
                  src="/name_img.webp"
                  alt="Name"
                  className={`mx-auto ${CENTER_IMAGE_HEIGHT} object-contain align-bottom`}
                  style={{display: 'block'}} />
              </div>
            </div>
          </div>
        </div>

        {/* BookGallery absolutely positioned over background */}
        <div
          style={{
            position: 'absolute',
            left: '25vw', // adjust as needed for your background
            top: '40vh', // adjust as needed for your background
            width: 0, // fixed width for gallery
            zIndex: 10,
          }}
        >
          <BookGallery />
        </div>
        {/* AlbumGallery fixed at the bottom center */}
        <div
          style={{
            position: 'absolute',
            left: 1000,
            bottom: -495, // 2rem from bottom
            zIndex: 30,
          }}
        >
          <AlbumGallery />
        </div>

        {/* Coffee Cup: static, position manually */}
        <img
          src="/coffee_cup.webp"
          alt="Coffee Cup"
          style={{
            position: 'absolute',
            left: -300, // <-- set this as you like
            top: -300,  // <-- set this as you like
            width: 520,
            height: 520,
            zIndex: 22,
            pointerEvents: 'none',
          }}
        />
        {/* Coffee Stain Button */}
        <div style={{ position: 'absolute', left: 40, top: 0, zIndex: 21}}>
          <CoffeeStainButton />
        </div>

        {/* Couple Image: shakes on hover, position manually */}
        <CoupleShakeImage />
      </div>
      {/* Scroll Indicator at the bottom center of the splash screen */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const QuarterSpinButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [speed, setSpeed] = useState(0); // degrees per frame
  const [angle, setAngle] = useState(0); // current rotation angle
  const [popupPos, setPopupPos] = useState<{left: number, top: number} | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const requestRef = useRef<number | null>(null);
  const minSpeed = 0; // stopped
  const maxSpeed = 8; // max degrees per frame (tune as needed)
  const accel = 0.25; // acceleration per frame
  const decel = 0.12; // deceleration per frame

  useEffect(() => {
    function animate() {
      setSpeed(prev => {
        if (hovered && prev < maxSpeed) return Math.min(maxSpeed, prev + accel);
        if (!hovered && prev > minSpeed) return Math.max(minSpeed, prev - decel);
        return prev;
      });
      setAngle(prev => (prev + speed) % 360);
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, speed]);

  // Calculate popup position on hover
  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({
        left: rect.right + 24, // 24px gap to the right
        top: rect.top + rect.height / 2 - 220, // center vertically for 440px popup height
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered]);

  return (
    <>
      <button
        ref={btnRef}
        className="flex items-center justify-center focus:outline-none"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        aria-label="Quarter Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/quarter.webp"
          alt="Quarter Button"
          style={{
            display: 'block',
            width: 160,
            height: 160,
            transform: `rotate(${angle}deg)`,
            transition: speed === 0 ? 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
          }}
        />
      </button>
      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupPos.left,
            top: popupPos.top,
            background: 'rgba(30,30,30,0.97)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            padding: 16,
            minWidth: 320,
            zIndex: 99999,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            pointerEvents: 'auto',
          }}
        >
          <img
            src="/mountains.jpg"
            alt="Mountains"
            style={{height: 300, objectFit: 'cover', borderRadius: 14, flexShrink: 0, marginBottom: 0 }}
          />
          <div style={{ color: '#fff', fontSize: 22, fontFamily: 'inherit', maxWidth: 400 }}>
            Mt. Olympus! (2023)
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Helper for consistent popup style (based on Quarter)
const popupBoxStyle = {
  background: 'rgba(30,30,30,0.97)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
  padding: 16,
  zIndex: 99999,
  textAlign: 'center' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  gap: 8,
  pointerEvents: 'auto' as const,
};

// Update StampPeelButton to accept popupSide prop and position popup accordingly
const StampPeelButton: React.FC<{ popupSide?: 'left' | 'right' }> = ({ popupSide = 'right' }) => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{left: number, top: number} | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({
        left: popupSide === 'left' ? rect.left - 240 : rect.right + 24,
        top: rect.top + rect.height / 2 - 100,
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered, popupSide]);

  return (
    <>
      <button
        ref={btnRef}
        className="flex items-center justify-center focus:outline-none"
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          padding: 0,
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: hovered ? 'rotate(-8deg) scale(1.28) skewY(-8deg) translateY(-8px)' : 'scale(1.2)', // 20% bigger
        }}
        aria-label="Stamp Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/stamp.webp"
          alt="Stamp"
          style={{
            display: 'block',
            width: 144,
            height: 144,
            boxShadow: 'none',
            borderRadius: 12,
            transition: 'box-shadow 0.3s, filter 0.3s',
            filter: hovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.18))' : 'none',
            border: 'none',
            outline: 'none',
            background: 'none',
          }}
        />
      </button>
      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupSide === 'left' ? popupPos.left - 100 : popupPos.left,
            top: popupPos.top,
            minWidth: 220,
            ...popupBoxStyle,
          }}
        >
          <img
            src="/pose.jpg"
            alt="Pose"
            style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }}
          />
          <div style={{ color: '#fff', fontSize: 22, fontFamily: 'inherit', maxWidth: 200 }}>
            Glacier National Park (2025)
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Add this new component before export
const PaperclipBendButton: React.FC<{ popupSide?: 'left' | 'right' }> = ({ popupSide = 'right' }) => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{left: number, top: number} | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({
        left: popupSide === 'left' ? rect.left - 240 : rect.right + 24,
        top: rect.top + rect.height / 2 - 60,
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered, popupSide]);

  return (
    <>
      <button
        ref={btnRef}
        className="flex items-center justify-center focus:outline-none"
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          padding: 0,
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: hovered
            ? 'perspective(300px) rotateY(-12deg) scale(1.04) translateY(-2px)'
            : 'scale(1)', // very minor 3D rotation
        }}
        aria-label="Paperclip Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/paperclip.webp"
          alt="Paperclip"
          style={{
            display: 'block',
            height: 200,
            boxShadow: 'none',
            borderRadius: 8,
            transition: 'box-shadow 0.3s, filter 0.3s',
            transform: 'rotate(10deg)', // slight rotation for effect
            filter: hovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' : 'none',
            border: 'none',
            outline: 'none',
            background: 'none',
          }}
        />
      </button>
      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupPos.left - 80,
            top: popupPos.top,
            minHeight: 200,
            minWidth: 220,
            ...popupBoxStyle,
          }}
        >
          <img
            src="/banff.JPG"
            alt="Banff"
            style={{ width: 320, height: 160, objectFit: 'cover', borderRadius: 14, flexShrink: 0, marginBottom: 0 }}
          />
          <div style={{ color: '#fff', fontSize: 22, fontFamily: 'inherit', maxWidth: 160 }}>
            Banff National Park (2024)
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Add this new component before export
const CoffeeStainButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{left: number, top: number} | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({
        left: rect.right + 24,
        top: rect.top + rect.height / 2 - 100,
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered]);

  return (
    <>
      <button
        ref={btnRef}
        className="flex items-center justify-center focus:outline-none"
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          padding: 0,
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          filter: hovered ? 'brightness(0.5)' : 'none',
        }}
        aria-label="Coffee Stain Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/coffee_stain.webp"
          alt="Coffee Stain"
          style={{
            display: 'block',
            //width: 120,
            height: 200,
            borderRadius: 60,
            transition: 'box-shadow 0.3s, filter 0.3s',
            transform: 'rotate(30deg)', // slight rotation for effect
            filter: hovered ? 'brightness(0.5)' : 'none',
            border: 'none',
            outline: 'none',
            background: 'none',
          }}
        />
      </button>
      {/* Example popup, you can customize as needed */}
      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupPos.left,
            top: popupPos.top,
            minWidth: 220,
            ...popupBoxStyle,
          }}
        >
          <img
            src="/white_sands.JPG"
            alt="White Sands"
            style={{ height: 200, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }}
          />
          <div style={{ color: '#fff', fontSize: 22, fontFamily: 'inherit', maxWidth: 200 }}>
            White Sands National Park
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Add this new component before export
const CoupleShakeImage: React.FC = () => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <img
      src="/couple.webp"
      alt="Couple"
      style={{
        position: 'absolute',
        left: 1200, // Adjust as needed
        top: 0,  // Adjust as needed
        height: 360,
        transition: 'transform 0.1s',
        transform: hovered ? 'rotate(-14deg) scale(1.04)' : 'none',
        animation: hovered ? 'shake-coule 0.4s infinite alternate' : 'none',
        zIndex: 100,
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      draggable={false}
    />
  );
};

export default SplashScreen;
