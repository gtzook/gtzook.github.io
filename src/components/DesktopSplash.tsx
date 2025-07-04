import React, { useState, useEffect } from 'react';
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
import GeckoPopupButton from './splash/GeckoPopupButton'; // adjust path if needed

const getScale = () => {
  const baseWidth = 1920;
  const baseHeight = 1080;
  const scaleW = window.innerWidth / baseWidth;
  const scaleH = window.innerHeight / baseHeight;
  return Math.min(scaleW, scaleH);
};

const DesktopSplash: React.FC = () => {
  const [scale, setScale] = useState(getScale());
  const [titleClicks, setTitleClicks] = useState(0);
  const [shakeTitle, setShakeTitle] = useState(false);
  const [fallTitle, setFallTitle] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const handleResize = () => setScale(getScale());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          }, 700);
        }, 400);
      }
      return next;
    });
  };

  return (
    <section
      className="w-full h-screen flex items-center justify-center bg-black overflow-hidden"
      style={{
        backgroundImage: 'url(/splash_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Scaled splash container */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: '1920px',
          height: '1080px',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="absolute z-[30]" style={{ left: '0px', bottom: '54px' }}>
          <BookGallery />
        </div>

        <div className="absolute z-[30]" style={{ right: '57.6px', bottom: '0px' }}>
          <AlbumGallery />
        </div>

        <div className="absolute z-[40] w-[1152px]" style={{ left: '50%', top: '0vh', transform: 'translateX(-50%)' }}>
          <div className="relative flex items-center justify-center w-full">
            {!showInput ? (
              <img
                src="/optimized/name_img-400.webp"
                alt="Name"
                className="object-contain select-none"
                style={{
                  height: '40vh',
                  width: 'auto',
                  cursor: 'pointer',
                  transition: 'transform 0.4s',
                  animation: shakeTitle
                    ? 'title-shake 0.4s'
                    : fallTitle
                    ? 'title-fall 0.7s forwards'
                    : undefined,
                  userSelect: 'none',
                  zIndex: 1,
                }}
                onClick={handleTitleClick}
                draggable={false}
                srcSet="/optimized/name_img-400.webp 400w, /optimized/name_img-800.webp 800w, /optimized/name_img-1200.webp 1200w"
                sizes="(max-width: 600px) 100vw, 50vw"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <label
                  className="text-black text-center font-medium"
                  style={{ fontSize: '38.4px', marginBottom: '10.8px' }}
                >
                  What is my other name?
                </label>
                <input
                  type="password"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (showError) setShowError(false);
                  }}
                  placeholder="Enter your answer..."
                  className="text-center outline-none bg-[#111] text-[#39FF14] tracking-wider"
                  style={{
                    fontSize: '38.4px',
                    padding: '19.2px',
                    borderRadius: '19.2px',
                    border: '3.84px solid #888',
                    width: '384px',
                    height: '54px',
                    marginBottom: '10.8px',
                  }}
                  onKeyDown={(e) => {
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
                  <div
                    className="text-[#ff4444] text-center"
                    style={{ fontSize: '19.2px', marginTop: '5.4px', fontFamily: 'Fira Mono, Consolas, monospace' }}
                  >
                    Incorrect password. Please try again.
                  </div>
                )}
              </div>
            )}
            <style>{`
              @keyframes title-shake {
                10%, 90% { transform: translateX(-3.84px) rotate(-2deg); }
                20%, 80% { transform: translateX(7.68px) rotate(2deg); }
                30%, 50%, 70% { transform: translateX(-15.36px) rotate(-4deg); }
                40%, 60% { transform: translateX(15.36px) rotate(4deg); }
              }
              @keyframes title-fall {
                to {
                  transform: translateY(1296px) rotate(20deg);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        </div>

        <div className="absolute z-[100]" style={{ right: '5vw', top: '1vh' }}>
          <CoupleShakeImage />
        </div>


        {/* Other buttons inside scaled container */}
        <div className="absolute z-[100]" style={{ left: '5vw', top: '40vh'}}>
          <GeckoPopupButton
            headSrc="/gecko_head.webp"
            popupImgSrc="/my_gecko.webp"
            alt="Gecko Head"
          />
        </div>

        <div className="absolute z-[100]" style={{ left: '22vw', top: '40vh'}}>
          <QuarterSpinButton />
        </div>

        <div className="absolute z-[999]" style={{ left: '20vw', top: '5vh' }}>
          <StampPeelButton popupSide="right" />
        </div>

        <div className="absolute z-[100]" style={{ left: '8vw', top: '25vh'}}>
          <PaperclipBendButton popupSide="right" />
        </div>

        <div className="absolute z-[100]" style={{ left: '5vw', top: '5vh'}}>
          <CoffeeStainButton />
        </div>

        <img
          src="/optimized/coffee_cup-400.webp"
          alt="Coffee Cup"
          className="absolute pointer-events-none"
          style={{ left: '-384px', top: '-378px', width: '768px', zIndex: 101 }}
          srcSet="/optimized/coffee_cup-400.webp 400w, /optimized/coffee_cup-800.webp 800w, /optimized/coffee_cup-1200.webp 1200w"
          sizes="(max-width: 600px) 100vw, 50vw"
        />

        <div className="absolute animate-bounce z-[50] pointer-events-none" style={{ left: '50%', bottom: '32.4px', transform: 'translateX(-50%)' }}>
          <div style={{ width: '57.6px', height: '64.8px', border: '2px solid black', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '9.6px', height: '21.6px', backgroundColor: 'black', borderRadius: '9999px', marginTop: '10.8px', animation: 'pulse 2s infinite' }} />
          </div>
        </div>
      </div>

      {/* Ring button fixed to viewport */}
      <div className="absolute z-[100]" style={{ left: '70vw', top: '42vh' }}>
        <SvgPopupButton
          src="/rice_ring.svg"
          alt="Rice Ring"
          popupText={`<b>Attended Rice University</b> (2020-2024)\n<i>BS in Electrical Engineering</i> (magna cum laude)\n<i>BA in Philosophy</i> (cum laude)\n<i> Undergraduate Researcher in MAHI Lab</i>`}
          position={{ left: 0, top: 0 }}
          size={10}
          popupOffset={{ x: -10, y: 5 }}
        />
      </div>

      {/* UCSB Flag button fixed to viewport */}
      <div className="absolute z-[100]" style={{ right: '5vw', top: '40vh' }}>
        <SvgPopupButton
          src="/ucsb_flag.svg"
          alt="UCSB Flag"
          popupText={`<b>Attending UCSB</b> (2024-)\nPursuing <i>MS/PhD in Electrical & Computer Engineering</i>\n<i>Researcher in Ikuko Smith Lab</i>\nFocus on audiovisual processing in mouse model`}
          position={{ left: 0, top: 0 }}
          size={12}
          popupOffset={{ x: -10, y: 50 }}
        />
      </div>

      {/* BagCycleButton fixed to viewport */}
      <div className="absolute z-[100]" style={{ left: '35vw', top: '60vh' }}>
        <BagCycleButton
          position={{ left: '0', top: '0' }}
          scale={1}
          itemOffset={{ x: 20, y: -5 }}
          itemSize={10}
          bagSize={15}
        />
      </div>
    </section>
  );
};

export default DesktopSplash;
