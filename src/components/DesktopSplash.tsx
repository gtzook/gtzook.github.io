import React, { useState, useEffect } from 'react';
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
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{
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

      {/* ── Coffee cup — top-left corner, partially off-screen ── */}
      <img
        src="/optimized/coffee_cup-400.webp"
        alt="Coffee Cup"
        className="absolute pointer-events-none"
        style={{
          left: 'clamp(-120px, -8vw, -40px)',
          top: 'clamp(-100px, -8vh, -30px)',
          width: 'clamp(180px, 22vw, 420px)',
          zIndex: 101,
        }}
        srcSet="/optimized/coffee_cup-400.webp 400w, /optimized/coffee_cup-800.webp 800w, /optimized/coffee_cup-1200.webp 1200w"
        sizes="22vw"
      />

      {/* ── Title / Input — top center ── */}
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
              width: 'clamp(280px, 38vw, 680px)',
              height: 'auto',
              cursor: 'pointer',
              userSelect: 'none',
              animation: shakeTitle
                ? 'title-shake 0.4s'
                : fallTitle
                ? 'title-fall 0.7s forwards'
                : undefined,
            }}
            srcSet="/optimized/name_img-400.webp 400w, /optimized/name_img-800.webp 800w, /optimized/name_img-1200.webp 1200w"
            sizes="38vw"
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 'clamp(24px, 5vh, 80px)',
            }}
          >
            <label
              style={{
                color: 'black',
                fontWeight: 500,
                fontSize: 'clamp(18px, 2.2vw, 36px)',
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
                fontSize: 'clamp(16px, 2vw, 32px)',
                padding: '0.5em 1em',
                borderRadius: '12px',
                border: '2px solid #888',
                width: 'clamp(220px, 22vw, 380px)',
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
                  textAlign: 'center',
                  marginTop: '0.4em',
                  fontSize: 'clamp(12px, 1.2vw, 18px)',
                  fontFamily: 'Fira Mono, Consolas, monospace',
                }}
              >
                Incorrect password. Please try again.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Couple image — top right ── */}
      <div
        className="absolute splash-decorative"
        style={{ right: '5%', top: '1%', zIndex: 100 }}
      >
        <CoupleShakeImage />
      </div>

      {/* ── Gecko — left edge, middle ── */}
      <div
        className="absolute splash-decorative"
        style={{ left: 0, top: '37%', zIndex: 150 }}
      >
        <GeckoPopupButton
          headSrc="/gecko.png"
          popupImgSrc="/my_gecko.jpg"
          alt="Gecko Head"
          size={Math.round(window.innerWidth * 0.065)}
        />
      </div>

      {/* ── Coffee Stain button — top left ── */}
      <div
        className="absolute splash-decorative"
        style={{ left: '5%', top: '5%', zIndex: 100 }}
      >
        <CoffeeStainButton />
      </div>

      {/* ── Paperclip — left side, upper-middle ── */}
      <div
        className="absolute splash-decorative"
        style={{ left: '8%', top: '25%', zIndex: 100 }}
      >
        <PaperclipBendButton popupSide="right" />
      </div>

      {/* ── Stamp — left side below title ── */}
      <div
        className="absolute splash-decorative"
        style={{ left: '20%', top: '5%', zIndex: 999 }}
      >
        <StampPeelButton popupSide="right" />
      </div>

      {/* ── Quarter Spin — left-center ── */}
      <div
        className="absolute splash-decorative"
        style={{ left: '22%', top: '40%', zIndex: 100 }}
      >
        <QuarterSpinButton />
      </div>

      {/* ── Rice Ring — right side, middle ── */}
      <div
        className="absolute splash-decorative"
        style={{ right: '22%', top: '42%', zIndex: 100 }}
      >
        <SvgPopupButton
          src="/rice_ring.svg"
          alt="Rice Ring"
          popupText={`<b>Attended Rice University</b> (2020-2024)\n<i>BS in Electrical Engineering</i> (magna cum laude)\n<i>BA in Philosophy</i> (cum laude)\n<i> Undergraduate Researcher in MAHI Lab</i>`}
          position={{ left: 0, top: 0 }}
          size={Math.round(window.innerWidth * 0.1)}
          popupOffset={{ x: -192, y: 96 }}
        />
      </div>

      {/* ── UCSB Flag — far right, middle ── */}
      <div
        className="absolute splash-decorative"
        style={{ right: '5%', top: '40%', zIndex: 100 }}
      >
        <SvgPopupButton
          src="/ucsb_flag.svg"
          alt="UCSB Flag"
          popupText={`<b>Attending UCSB</b> (2024-)
Pursuing <i>MS/PhD in Electrical & Computer Engineering</i>
<i>Researcher in Ikuko Smith Lab</i>
Focus on audiovisual processing in mouse model`}
          position={{ left: 0, top: 0 }}
          size={Math.round(window.innerWidth * 0.12)}
          popupOffset={{ x: -384, y: 96 }}
        />
      </div>

      {/* ── Bag Cycle — center-bottom ── */}
      <div
        className="absolute splash-decorative"
        style={{ left: '35%', top: '60%', zIndex: 100 }}
      >
        <BagCycleButton
          position={{ left: '0px', top: '0px' }}
          scale={1}
          itemOffset={{ x: 400, y: -100 }}
          itemSize={Math.round(window.innerWidth * 0.1)}
          bagSize={Math.round(window.innerWidth * 0.14)}
        />
      </div>

      {/* ── Book Gallery — bottom left ── */}
      <div className="absolute" style={{ left: 0, bottom: 0, zIndex: 30 }}>
        <BookGallery />
      </div>

      {/* ── Album Gallery — bottom right ── */}
      <div className="absolute" style={{ right: 0, bottom: 0, zIndex: 30 }}>
        <AlbumGallery />
      </div>

      {/* ── Scroll indicator — bottom center ── */}
      <div
        className="absolute animate-bounce pointer-events-none"
        style={{
          bottom: '2vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            width: 'clamp(36px, 3.5vw, 56px)',
            height: 'clamp(48px, 4.5vw, 68px)',
            border: '2px solid black',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 'clamp(6px, 0.7vw, 10px)',
              height: 'clamp(12px, 1.5vw, 22px)',
              backgroundColor: 'black',
              borderRadius: '9999px',
              marginTop: '10px',
              animation: 'pulse 2s infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default DesktopSplash;
