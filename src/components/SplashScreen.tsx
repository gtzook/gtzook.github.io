
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardContent } from '@/components/ui/card';
import BookGallery from './BookGallery';
import AlbumGallery from './AlbumGallery';
import QuarterSpinButton from './splash/QuarterSpinButton';
import StampPeelButton from './splash/StampPeelButton';
import PaperclipBendButton from './splash/PaperclipBendButton';
import CoffeeStainButton from './splash/CoffeeStainButton';
import CoupleShakeImage from './splash/CoupleShakeImage';
import SvgPopupButton from './splash/SvgPopupButton';
import BagCycleButton from './splash/BagCycleButton';

const SplashScreen: React.FC = () => {
  const [isOptimalSize, setIsOptimalSize] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Check if screen is close to 1920x1080 (with some tolerance)
      setIsOptimalSize(width >= 1800 && height >= 900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Title image interaction state
  const [titleClicks, setTitleClicks] = useState(0);
  const [shakeTitle, setShakeTitle] = useState(false);
  const [fallTitle, setFallTitle] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);

  // Handle title click
  const handleTitleClick = () => {
    if (fallTitle || showInput) return;
    setTitleClicks((c) => {
      const next = c + 1;
      setShakeTitle(true);
      setTimeout(() => setShakeTitle(false), 400);
      if (next >= 5) {
        setTimeout(() => {
          setFallTitle(true);
          setTimeout(() => {
            setShowInput(true);
          }, 700); // match fall animation duration
        }, 400); // after shake
      }
      return next;
    });
  };

  // Minimal splash screen for smaller resolutions
  if (!isOptimalSize) {
    return (
      <div
        className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(/splash_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col items-center justify-center w-full z-40">
          <div className="flex-shrink-0">
            <div className="relative group" style={{ height: '12rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!showInput && (
                <img
                  src="/name_img.webp"
                  alt="Name"
                  className="h-40 md:h-56 lg:h-72 object-contain select-none"
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.4s',
                    animation: shakeTitle ? 'title-shake 0.4s' : fallTitle ? 'title-fall 0.7s forwards' : undefined,
                    userSelect: 'none',
                  }}
                  onClick={handleTitleClick}
                  draggable={false}
                />
              )}
              {showInput && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <label style={{ fontSize: 20, marginBottom: 8, color: '#000', fontWeight: 500, textAlign: 'center' }}>My other name.</label>
                  <input
                    type="password"
                    value={inputValue}
                    onChange={e => {
                      setInputValue(e.target.value);
                      if (showError) setShowError(false);
                    }}
                    placeholder="Enter your answer..."
                    style={{
                      fontSize: 32,
                      padding: 12,
                      borderRadius: 8,
                      border: '2px solid #888',
                      outline: 'none',
                      width: 320,
                      textAlign: 'center',
                      height: '3.5rem',
                      boxSizing: 'border-box',
                      background: '#111',
                      color: '#39FF14',
                      letterSpacing: 2,
                      marginBottom: 8,
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (inputValue.trim().toLowerCase() === 'saitotomoya') {
                          setShowError(false);
                          window.open(
                            'https://drive.google.com/drive/folders/1ocll457sZSGOVpXuYkOgDL_5oLG0pBKO?usp=sharing',
                            '_blank'
                          );
                        } else {
                          setShowError(true);
                        }
                      }
                    }}
                  />
                  {showError && (
                    <div style={{ color: '#ff4444', fontSize: 15, marginTop: 2, fontFamily: 'Fira Mono, Consolas, monospace', textAlign: 'center' }}>
                      Incorrect.
                    </div>
                  )}
                </div>
              )}
              <style>{`
                @keyframes title-shake {
                  10%, 90% { transform: translateX(-2px) rotate(-2deg); }
                  20%, 80% { transform: translateX(4px) rotate(2deg); }
                  30%, 50%, 70% { transform: translateX(-8px) rotate(-4deg); }
                  40%, 60% { transform: translateX(8px) rotate(4deg); }
                }
                @keyframes title-fall {
                  to {
                    transform: translateY(120vh) rotate(20deg);
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Full splash screen for optimal size
  const containerStyle = {};

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/splash_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-7xl mx-auto relative flex items-center justify-center min-h-screen px-4" style={containerStyle}>
        {/* Book Gallery */}
        <div className="absolute" style={{ left: '30vw', bottom: '30vh', scale: '1.5', zIndex: 30 }}>
          <BookGallery />
        </div>

        {/* Album Gallery */}
        <div className="absolute" style={{ right: '9vw', bottom: '8vh', zIndex: 30 }}>
          <AlbumGallery />
        </div>

        {/* Center Name Image */}
        <div className="flex flex-col items-center justify-start w-full z-40" style={{ minHeight: '40vh', marginBottom: '40vh' }}>
          <div className="flex-shrink-0">
            <div className="relative group" style={{ height: '12rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Remove hover classes, add shake/fall animation */}
              {!showInput && (
                <img
                  src="/name_img.webp"
                  alt="Name"
                  className="h-40 md:h-56 lg:h-72 object-contain select-none"
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.4s',
                    animation: shakeTitle ? 'title-shake 0.4s' : fallTitle ? 'title-fall 0.7s forwards' : undefined,
                    userSelect: 'none',
                  }}
                  onClick={handleTitleClick}
                  draggable={false}
                />
              )}
              {showInput && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <label style={{ fontSize: 20, marginBottom: 8, color: '#000', fontWeight: 500, textAlign: 'center' }}>My other name.</label>
                  <input
                    type="password"
                    value={inputValue}
                    onChange={e => {
                      setInputValue(e.target.value);
                      if (showError) setShowError(false);
                    }}
                    placeholder="Enter your answer..."
                    style={{
                      fontSize: 32,
                      padding: 12,
                      borderRadius: 8,
                      border: '2px solid #888',
                      outline: 'none',
                      width: 320,
                      textAlign: 'center',
                      height: '3.5rem',
                      boxSizing: 'border-box',
                      background: '#111',
                      color: '#39FF14',
                      letterSpacing: 2,
                      marginBottom: 8,
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (inputValue.trim().toLowerCase() === 'saitotomoya') {
                          setShowError(false);
                          window.open(
                            'https://drive.google.com/drive/folders/1ocll457sZSGOVpXuYkOgDL_5oLG0pBKO?usp=sharing',
                            '_blank'
                          );
                        } else {
                          setShowError(true);
                        }
                      }
                    }}
                  />
                  {showError && (
                    <div style={{ color: '#ff4444', fontSize: 15, marginTop: 2, fontFamily: 'Fira Mono, Consolas, monospace', textAlign: 'center' }}>
                      Incorrect.
                    </div>
                  )}
                </div>
              )}
              <style>{`
                @keyframes title-shake {
                  10%, 90% { transform: translateX(-2px) rotate(-2deg); }
                  20%, 80% { transform: translateX(4px) rotate(2deg); }
                  30%, 50%, 70% { transform: translateX(-8px) rotate(-4deg); }
                  40%, 60% { transform: translateX(8px) rotate(4deg); }
                }
                @keyframes title-fall {
                  to {
                    transform: translateY(120vh) rotate(20deg);
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Right side elements */}
        <div className="absolute" style={{ right: '2vw', top: '0vh', scale: '0.9', zIndex: 100 }}>
          <CoupleShakeImage />
        </div>

        <div className="absolute" style={{ right: '20vw', top: '45vh', zIndex: 100 }}>
          <SvgPopupButton
            src="/rice_ring.svg"
            alt="Rice Ring"
            popupText={
              `<b>Attended Rice University</b> (2020-2024)\n` +
              `<i>BS in Electrical Engineering</i> (magna cum laude)\n` +
              `<i>BA in Philosophy</i> (cum laude)\n` +
              `<i> Undergraduate Researcher in MAHI Lab</i>`
            }
            position={{ left: 0, top: 0 }}
            scale={1.5}
            popupOffset={{ x: -700, y: 25 }}
          />
        </div>

        <div className="absolute" style={{ right: '5vw', top: '45vh', zIndex: 100 }}>
          <SvgPopupButton
            src="/ucsb_flag.svg"
            alt="UCSB Flag"
            popupText={
              `<b>Attending UCSB</b> (2024-)\n` +
              `Pursuing <i>MS/PhD in Electrical & Computer Engineering</i>\n` +
              `<i>Researcher in Ikuko Smith Lab</i>\n` +
              'Focus on audiovisual processing in mouse model'
            }
            position={{ left: 0, top: 0 }}
            scale={2}
            popupOffset={{ x: -800, y: 50 }}
          />
        </div>

        {/* Bag with cycling items */}
        <div className="absolute" style={{ bottom: '10vh', left: '65vh', scale: '1.8', zIndex: 30 }}>
          <BagCycleButton
            position={{ left: 0, top: 0 }}
            scale={1.2}
            itemOffset={{ x: 150, y: -60 }}
            itemSize={130}
            bagSize={200}
          />
        </div>

        {/* Left side interactive elements */}
        <div className="absolute" style={{ left: '15vw', top: '35vh', scale: '0.75', zIndex: 100 }}>
          <QuarterSpinButton />
        </div>

        <div className="absolute" style={{ left: '-7vw', top: '-30vh', scale: '0.2', zIndex: 999 }}>
          <StampPeelButton popupSide="right" />
        </div>

        <div className="absolute" style={{ left: '3vw', top: '30vh', scale: '1', zIndex: 100 }}>
          <PaperclipBendButton popupSide="right" />
        </div>

        <div className="absolute" style={{ left: '6vw', top: '7vh', zIndex: 100 }}>
          <CoffeeStainButton />
        </div>

        {/* Coffee Cup */}
        <img
          src="/coffee_cup.webp"
          alt="Coffee Cup"
          className="absolute pointer-events-none"
          style={{
            left: '-6vw',
            top: '-10vh',
            scale: '2',
            width: '20vw',
            height: '20vw',
            maxWidth: '300px',
            maxHeight: '300px',
            zIndex: 101
          }}
        />

        {/* Scroll Indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
