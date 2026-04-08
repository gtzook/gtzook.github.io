import React, { useState } from 'react';
import BookGallery from './BookGallery';
import AlbumGallery from './AlbumGallery';
import QuarterSpinButton from './splash/QuarterSpinButton';
import StampPeelButton from './splash/StampPeelButton';
import PaperclipBendButton from './splash/PaperclipBendButton';
import CoffeeStainButton from './splash/CoffeeStainButton';
import CoupleShakeImage from './splash/CoupleShakeImage';
import SvgPopupButton from './splash/SvgPopupButton';
import BagCycleButton from './splash/BagCycleButton';
import GeckoPopupButton from './splash/GeckoPopupButton';

const DESIGN_WIDTH = 1800;

const DesktopSplash: React.FC = () => {
  const [titleClicks, setTitleClicks] = useState(0);
  const [shakeTitle, setShakeTitle] = useState(false);
  const [fallTitle, setFallTitle] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  const handleTitleClick = () => {
    if (fallTitle || showInput) return;
    setTitleClicks((c) => {
      const next = c + 1;
      setShakeTitle(true);
      setTimeout(() => setShakeTitle(false), 400);
      if (next >= 5) {
        setTimeout(() => {
          setFallTitle(true);
          setTimeout(() => setShowInput(true), 700);
        }, 400);
      }
      return next;
    });
  };

  return (
    <div className="w-full h-screen overflow-x-auto overflow-y-hidden">
      <section
        className="relative h-screen"
        style={{
          width: `${DESIGN_WIDTH}px`,
          minWidth: `${DESIGN_WIDTH}px`,
          margin: '0 auto',
          backgroundImage: 'url(/splash_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <style>{`
          @keyframes title-shake {
            10%, 90% { transform: translateX(-3px) rotate(-1deg); }
            20%, 80% { transform: translateX(6px) rotate(1deg); }
            30%, 50%, 70% { transform: translateX(-12px) rotate(-2deg); }
            40%, 60% { transform: translateX(12px) rotate(2deg); }
          }
          @keyframes title-fall {
            to {
              transform: translateY(120vh) rotate(20deg);
              opacity: 0;
            }
          }
          @media (max-width: 640px) {
            .splash-decorative { display: none; }
          }
        `}</style>

        {/* Coffee cup */}
        <img
          src="/optimized/coffee_cup-400.webp"
          alt="Coffee Cup"
          className="absolute pointer-events-none"
          style={{
            left: '-40px',
            top: '-30px',
            width: '300px',
            zIndex: 101,
          }}
        />

        {/* Title / Input */}
        <div
          className="absolute"
          style={{
            left: '18%',
            right: '18%',
            top: 0,
            zIndex: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {!showInput ? (
            <img
              src="/optimized/name_img-400.webp"
              alt="Name"
              draggable={false}
              onClick={handleTitleClick}
              style={{
                width: '500px',
                cursor: 'pointer',
                userSelect: 'none',
                animation: shakeTitle
                  ? 'title-shake 0.4s'
                  : fallTitle
                  ? 'title-fall 0.7s forwards'
                  : undefined,
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '60px',
              }}
            >
              <label
                style={{
                  color: 'black',
                  fontWeight: 500,
                  fontSize: '28px',
                  marginBottom: '0.5em',
                  textAlign: 'center',
                }}
              >
                What is my other name?
              </label>
              <input
                type="password"
                value={inputValue}
                autoFocus
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (showError) setShowError(false);
                }}
                placeholder="Enter your answer..."
                style={{
                  textAlign: 'center',
                  outline: 'none',
                  background: '#111',
                  color: '#39FF14',
                  letterSpacing: '0.1em',
                  fontSize: '22px',
                  padding: '0.5em 1em',
                  borderRadius: '12px',
                  border: '2px solid #888',
                  width: '300px',
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
                  style={{
                    color: '#ff4444',
                    marginTop: '0.4em',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                  }}
                >
                  Incorrect password. Please try again.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute splash-decorative" style={{ right: '5%', top: '1%' }}>
          <CoupleShakeImage />
        </div>

        <div className="absolute splash-decorative" style={{ left: 0, top: '37%' }}>
          <GeckoPopupButton
            headSrc="/gecko.png"
            popupImgSrc="/my_gecko.jpg"
            alt="Gecko Head"
            size={80}
          />
        </div>

        <div className="absolute splash-decorative" style={{ left: '5%', top: '5%' }}>
          <CoffeeStainButton />
        </div>

        <div className="absolute splash-decorative" style={{ left: '8%', top: '25%' }}>
          <PaperclipBendButton popupSide="right" />
        </div>

        <div className="absolute splash-decorative" style={{ left: '20%', top: '5%' }}>
          <StampPeelButton popupSide="right" />
        </div>

        <div className="absolute splash-decorative" style={{ left: '22%', top: '40%' }}>
          <QuarterSpinButton />
        </div>

        <div className="absolute splash-decorative" style={{ right: '22%', top: '42%' }}>
          <SvgPopupButton
            src="/rice_ring.svg"
            alt="Rice Ring"
            popupText={`<b>Attended Rice University</b> (2020-2024)`}
            size={120}
            popupOffset={{ x: -192, y: 96 }}
          />
        </div>

        <div className="absolute splash-decorative" style={{ right: '5%', top: '40%' }}>
          <SvgPopupButton
            src="/ucsb_flag.svg"
            alt="UCSB Flag"
            popupText={`<b>Attending UCSB</b> (2024-)`}
            size={140}
            popupOffset={{ x: -384, y: 96 }}
          />
        </div>

        <div className="absolute splash-decorative" style={{ left: '35%', top: '60%' }}>
          <BagCycleButton
            itemSize={120}
            bagSize={160}
          />
        </div>

        {/* Galleries (fixed size now) */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '400px' }}>
          <BookGallery />
        </div>

        <div style={{ position: 'absolute', right: 0, bottom: 0, width: '400px' }}>
          <AlbumGallery />
        </div>
      </section>
    </div>
  );
};

export default DesktopSplash;
