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

const StampPeelButton: React.FC<{ popupSide?: 'left' | 'right' }> = ({ popupSide = 'right' }) => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{ left: number, top: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({
        left: popupSide === 'left' ? rect.left - 240 : rect.right + 24,
        top: rect.top + rect.height / 2 - 100,
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
          src="/stamp.webp"
          alt="Stamp"
          style={{
            boxShadow: 'none',
            borderRadius: 12,
            transition: 'box-shadow 0.3s, filter 0.3s, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            filter: hovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.18))' : 'none',
            border: 'none',
            outline: 'none',
            background: 'none',
            transform: hovered ? 'rotate(-8deg) scale(1.28) skewY(-8deg) translateY(-8px)' : 'scale(1.2)',
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </button>
      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupSide === 'left' ? popupPos.left - 100 : popupPos.left,
            top: popupPos.top,
            minWidth: 220,
            ...popupBoxStyle,
          }}
        >
          <img
            src="/pose.jpg"
            alt="Pose"
            style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }}
          />
          <div style={{ color: '#fff', fontSize: 22, fontFamily: 'inherit', maxWidth: 200 }}>
            Glacier National Park (2025)
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default StampPeelButton;
