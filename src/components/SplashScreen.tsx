
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
      <div className="w-full max-w-7xl mx-auto relative flex items-center justify-center min-h-screen px-4">
        
        {/* Left side interactive elements - responsive positions */}
        <div className="absolute" style={{ left: '15vw', top: '35vh', scale: '0.75', zIndex: 20 }}>
          <QuarterSpinButton />
        </div>

        <div className="absolute" style={{ left: '15vw', top: '15vh', scale: '0.75', zIndex: 21 }}>
          <StampPeelButton popupSide="right" />
        </div>

        <div className="absolute" style={{ left: '3vw', top: '30vh', scale: '1', zIndex: 21 }}>
          <PaperclipBendButton popupSide="right" />
        </div>
      2
        <div className="absolute" style={{ left: '6vw', top: '7vh', zIndex: 21 }}>
          <CoffeeStainButton />
        </div>

        {/* Coffee Cup - positioned responsively */}
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
            zIndex: 22
          }}
        />

        {/* Center content area */}
        <div className="flex items-center justify-center space-x-32 relative z-10"
            style={{ left: '15vw', top: '-15vw', zIndex: 30 }}>
          {/* Book Gallery - left of center */}
          <div className="relative"
            style={{ left: '15vw', top: '25vw', zIndex: 30, scale: '1.5' }}>
            <BookGallery />
          </div>

          {/* Center Name Image */}
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="transform transition-all duration-500 hover:scale-105 hover-3d">
                <img
                  src="/name_img.webp"
                  alt="Name"
                  className="h-40 md:h-56 lg:h-72 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Album Gallery - right of center */}
          <div className="relative"
            style={{ right: '23vw', top: '28vw', zIndex: 30 }}>
            <AlbumGallery />
          </div>
        </div>

        {/* Right side elements - responsive positions */}
        <div className="absolute" style={{ right: '2vw', top: '0vh', scale: '0.9', zIndex: 30 }}>
          <CoupleShakeImage />
        </div>

        <div className="absolute" style={{ right: '20vw', top: '45vh', zIndex: 30 }}>
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

        <div className="absolute" style={{ right: '5vw', top: '45vh', zIndex: 30 }}>
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

        {/* Bag with cycling items - bottom center responsive */}
        <div className="absolute" style={{ bottom: '5vh', left: '60vh', scale: '1.8', zIndex: 30 }}>
          <BagCycleButton
            position={{ left: 0, top: 0 }}
            scale={1.2}
            itemOffset={{ x: 150, y: -80 }}
            itemSize={130}
            bagSize={200}
          />
        </div>

        {/* Scroll Indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
