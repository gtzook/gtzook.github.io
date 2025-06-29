import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const popupBoxStyle = {
  background: 'rgba(30,30,30,0.97)',
  borderRadius: '1vw',
  boxShadow: '0 0.5vw 3vw rgba(0,0,0,0.35)',
  padding: '1vw',
  zIndex: 99999,
  textAlign: 'center' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  gap: '0.8vw',
  pointerEvents: 'auto' as const,
};

const StampPeelButton: React.FC<{ popupSide?: 'left' | 'right' }> = ({ popupSide = 'right' }) => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{ left: number; top: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      const offset = window.innerWidth * 0.01;
      const popupWidth = window.innerWidth * 0.3;

      setPopupPos({
        left:
          popupSide === 'left'
            ? scrollLeft + rect.left - popupWidth - offset
            : scrollLeft + rect.right + offset,
        top: scrollTop + rect.top + rect.height / 2 - window.innerHeight * 0.2,
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered, popupSide]);

  return (
    <>
      <button
        ref={btnRef}
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          padding: 0,
          cursor: 'pointer',
          width: 'auto',
          height: 'auto',
          display: 'block',
        }}
        aria-label="Stamp Button"
      >
        <img
          src="/optimized/stamp-400.webp"
          alt="Stamp"
          style={{
            boxShadow: 'none',
            borderRadius: '1vw',
            transition: 'box-shadow 0.3s, filter 0.3s, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            filter: hovered ? 'drop-shadow(0 0.8vh 1.6vh rgba(0,0,0,0.18))' : 'none',
            border: 'none',
            outline: 'none',
            background: 'none',
            height: '15vh',
            width: 'auto',
            maxWidth: '90vw',
            transform: hovered
              ? 'rotate(-8deg) scale(1.28) skewY(-8deg) translateY(-0.8vh)'
              : 'scale(1.2)',
            display: 'block',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          srcSet="/optimized/stamp-400.webp 400w, /optimized/stamp-800.webp 800w, /optimized/stamp-1200.webp 1200w"
          sizes="(max-width: 600px) 100vw, 40vw"
        />
      </button>

      {hovered && popupPos &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              left: popupPos.left,
              top: popupPos.top,
              minWidth: '24vw',
              maxWidth: '80vw',
              ...popupBoxStyle,
            }}
          >
            <img
              src="/optimized/pose-400.jpg"
              alt="Pose"
              style={{
                width: '100%',
                height: '28vh',
                objectFit: 'cover',
                borderRadius: '1vw',
              }}
              srcSet="/optimized/pose-400.jpg 400w, /optimized/pose-800.jpg 800w, /optimized/pose-1200.jpg 1200w"
              sizes="(max-width: 600px) 100vw, 40vw"
            />
            <div
              style={{
                color: '#fff',
                fontSize: '2vw',
                fontFamily: 'inherit',
                maxWidth: '80vw',
              }}
            >
              Glacier National Park (2025)
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default StampPeelButton;
