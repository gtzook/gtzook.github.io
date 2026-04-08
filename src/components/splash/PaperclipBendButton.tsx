import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const popupBoxStyle = {
  background: 'rgba(30,30,30,0.97)',
  borderRadius: '14px', // 1vw ~ 14px
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

const PaperclipBendButton: React.FC<{ popupSide?: 'left' | 'right' }> = ({ popupSide = 'right' }) => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{ left: number; top: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      const horizontalOffset = 14; // 1vw ~ 14px

      setPopupPos({
        left:
          popupSide === 'left'
            ? scrollLeft + rect.left - 432 - horizontalOffset // 0.3vw ~ 432px
            : scrollLeft + rect.right + horizontalOffset,
        top: scrollTop + rect.top + rect.height / 2 - 135, // 0.15vh ~ 135px
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered, popupSide]);

  return (
    <>
      <button
        ref={btnRef}
        className="focus:outline-none"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: hovered
            ? 'perspective(300px) rotateY(-12deg) scale(1.04) translateY(-4px)' // 0.4vh ~ 4px
            : 'scale(1)',
        }}
        aria-label="Paperclip Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/optimized/paperclip-400.webp"
          alt="Paperclip"
          style={{
            height: '180px', // 20vh ~ 180px
            width: 'auto',
            maxWidth: '90vw',
            borderRadius: '14px', // 1vw ~ 14px
            transition: 'box-shadow 0.3s, filter 0.3s',
            transform: 'rotate(10deg)',
            filter: hovered ? 'drop-shadow(0 7px 14px rgba(0,0,0,0.12))' : 'none', // 0.8vh,1.6vh ~ 7px,14px
            background: 'none',
            border: 'none',
            outline: 'none',
          }}
          srcSet="/optimized/paperclip-400.webp 400w, /optimized/paperclip-800.webp 800w, /optimized/paperclip-1200.webp 1200w"
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
              src="/optimized/banff-400.JPG"
              alt="Banff"
              style={{
                width: '100%',
                height: '216px', // 24vh ~ 216px
                objectFit: 'cover',
                borderRadius: '14px', // 1vw
              }}
              srcSet="/optimized/banff-400.JPG 400w, /optimized/banff-800.JPG 800w, /optimized/banff-1200.JPG 1200w"
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
              Banff National Park (2024)
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default PaperclipBendButton;
