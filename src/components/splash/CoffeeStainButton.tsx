
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

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

const CoffeeStainButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{ left: number, top: number } | null>(null);
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
          className="h-32 md:h-40"
          style={{
            borderRadius: 60,
            transition: 'box-shadow 0.3s, filter 0.3s',
            transform: 'rotate(30deg)',
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

export default CoffeeStainButton;
