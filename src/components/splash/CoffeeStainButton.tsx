import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const popupBoxStyle = {
  background: 'rgba(30,30,30,0.97)',
  borderRadius: '14px', // ~1vw
  boxShadow: '0 7px 43px rgba(0,0,0,0.35)', // 0 0.5vw 3vw
  padding: '14px', // 1vw
  zIndex: 99999,
  textAlign: 'center' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  gap: '11px', // 0.8vw
  pointerEvents: 'auto' as const,
};

const CoffeeStainButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{ left: number; top: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setPopupPos({
        left: scrollLeft + rect.right + 14, // 1vw ~ 14px
        top: scrollTop + rect.top + rect.height / 2 - 162, // window.innerHeight * 0.18 ~ 162px
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
          src="/optimized/coffee_stain-400.webp"
          alt="Coffee Stain"
          style={{
            height: '198px', // 22vh ~ 198px for 900px height
            width: 'auto',
            borderRadius: '57px', // 4vw ~ 57px for 1440px width
            transition: 'box-shadow 0.3s, filter 0.3s',
            transform: 'rotate(30deg)',
            border: 'none',
            outline: 'none',
            background: 'none',
          }}
          srcSet="/optimized/coffee_stain-400.webp 400w, /optimized/coffee_stain-800.webp 800w, /optimized/coffee_stain-1200.webp 1200w"
          sizes="(max-width: 600px) 100vw, 576px"
        />
      </button>

      {hovered && popupPos &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              left: popupPos.left,
              top: popupPos.top,
              minWidth: '345px', // 24vw ~ 345px
              maxWidth: '1152px', // 80vw ~ 1152px
              ...popupBoxStyle,
            }}
          >
            <img
              src="/optimized/white_sands-400.JPG"
              alt="White Sands"
              style={{
                height: '252px', // 28vh ~ 252px
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'cover',
                borderRadius: '14px', // 1vw
              }}
              srcSet="/optimized/white_sands-400.JPG 400w, /optimized/white_sands-800.JPG 800w, /optimized/white_sands-1200.JPG 1200w"
              sizes="(max-width: 600px) 100vw, 576px"
            />
            <div
              style={{
                color: '#fff',
                fontSize: '29px', // 2vw ~ 28.8px
                fontFamily: 'inherit',
                maxWidth: '1152px', // 80vw
              }}
            >
              White Sands National Park
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default CoffeeStainButton;
