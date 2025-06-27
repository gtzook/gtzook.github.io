import React, { useState } from 'react';
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

  // Always render the full splash screen
  return (
    <section
      className="w-full h-screen flex items-center justify-center relative bg-black"
      style={{
        backgroundImage: 'url(/splash_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="relative mx-auto my-0 flex items-center justify-center w-[100vw] h-[100vh] min-w-0 min-h-0 max-w-none max-h-none"
        style={{}}
      >
        {/* Book Gallery - fixed left side */}
        <div className="absolute" style={{ left: '10vw', bottom: '33vh', zIndex: 30 }}>
          <BookGallery />
        </div>
        {/* Album Gallery - fixed right side */}
        <div className="absolute" style={{ right: '3vw', bottom: '35vh', zIndex: 30 }}>
          <AlbumGallery />
        </div>
        {/* Center Name Image */}
        <div className="absolute" style={{ left: '50vw', top: '15vh', transform: 'translate(-50%, 0)', zIndex: 40, width: '60vw' }}>
          <div className="flex-shrink-0">
            <div className="relative group" style={{ height: '15vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Remove hover classes, add shake/fall animation */}
              {!showInput && (
                <img
                  src="/name_img.webp"
                  alt="Name"
                  className="object-contain select-none"
                  style={{
                    height: '40vh',
                    width: 'auto',
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
                  <label style={{ fontSize: '2vw', marginBottom: '1vh', color: '#000', fontWeight: 500, textAlign: 'center' }}>What is my other name?</label>
                  <input
                    type="password"
                    value={inputValue}
                    onChange={e => {
                      setInputValue(e.target.value);
                      if (showError) setShowError(false);
                    }}
                    placeholder="Enter your answer..."
                    style={{
                      fontSize: '2vw',
                      padding: '1vw',
                      borderRadius: '1vw',
                      border: '0.2vw solid #888',
                      outline: 'none',
                      width: '20vw',
                      textAlign: 'center',
                      height: '5vh',
                      boxSizing: 'border-box',
                      background: '#111',
                      color: '#39FF14',
                      letterSpacing: 2,
                      marginBottom: '1vh',
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
                    <div style={{ color: '#ff4444', fontSize: '1vw', marginTop: '0.5vh', fontFamily: 'Fira Mono, Consolas, monospace', textAlign: 'center' }}>
                      Incorrect password. Please try again.
                    </div>
                  )}
                </div>
              )}
              <style>{`
                @keyframes title-shake {
                  10%, 90% { transform: translateX(-0.2vw) rotate(-2deg); }
                  20%, 80% { transform: translateX(0.4vw) rotate(2deg); }
                  30%, 50%, 70% { transform: translateX(-0.8vw) rotate(-4deg); }
                  40%, 60% { transform: translateX(0.8vw) rotate(4deg); }
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
        {/* Right side elements - responsive positions */}
        <div className="absolute" style={{ right: '2vw', top: '2vh', height: '15vh', zIndex: 100 }}>
          <CoupleShakeImage />
        </div>
        <div className="absolute" style={{ right: '20vw', top: '50vh', height: '12vh', zIndex: 100 }}>
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
        <div className="absolute" style={{ right: '5vw', top: '50vh', height: '12vh', zIndex: 100 }}>
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
        <div className="absolute" style={{ bottom: '15vh', left: '35vw', zIndex: 41 }}>
          <BagCycleButton
            position={{ left: 0, top: 0 }}
            scale={2.5}
            itemOffset={{ x: 150, y: -60 }}
            itemSize={130}
            bagSize={100}
          />
        </div>
        {/* Left side interactive elements */}
        <div className="absolute" style={{ left: '20vw', top: '40vh', height: '12vh', zIndex: 100 }}>
          <QuarterSpinButton />
        </div>
        <div className="absolute" style={{ left: '18vw', top: '7vh',zIndex: 999 }}>
          <StampPeelButton popupSide="right" />
        </div>
        <div className="absolute" style={{ left: '8vw', top: '25vh', height: '12vh', zIndex: 100 }}>
          <PaperclipBendButton popupSide="right" />
        </div>
        <div className="absolute" style={{ left: '6vw', top: '7vh', height: '12vh', zIndex: 100 }}>
          <CoffeeStainButton />
        </div>
        {/* Coffee Cup */}
        <img
          src="/coffee_cup.webp"
          alt="Coffee Cup"
          className="absolute pointer-events-none"
          style={{
            left: '-20vw',
            top: '-35vh',
            width: '40vw',
            zIndex: 101
          }}
        />
        {/* Scroll Indicator at the very bottom center of the splash screen */}
        <div className="absolute left-1/2 bottom-[3vh] transform -translate-x-1/2 animate-bounce z-50 pointer-events-none">
          <div className="w-[3vw] h-[6vh] border-2 border-black rounded-full flex justify-center bg-white/80">
            <div className="w-[0.5vw] h-[2vh] bg-black rounded-full mt-[1vh] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplashScreen;
