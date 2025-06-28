
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
  pointerEvents: 'auto' as const
};

const PaperclipBendButton: React.FC<{popupSide?: 'left' | 'right';}> = ({ popupSide = 'right' }) => {
  const [hovered, setHovered] = useState(false);
  const [popupPos, setPopupPos] = useState<{left: number;top: number;} | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({
        left: popupSide === 'left' ? rect.left - 240 : rect.right + 24,
        top: rect.top + rect.height / 2 - 60
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered, popupSide]);

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
          transform: hovered ?
          'perspective(300px) rotateY(-12deg) scale(1.04) translateY(-2px)' :
          'scale(1)'
        }}
        aria-label="Paperclip Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>

        <img
          src="/optimized/paperclip-400.webp"
          alt="Paperclip"
          className="h-32 md:h-40"
          style={{
            boxShadow: 'none',
            borderRadius: 8,
            transition: 'box-shadow 0.3s, filter 0.3s',
            transform: 'rotate(10deg)',
            filter: hovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' : 'none',
            border: 'none',
            outline: 'none',
            background: 'none'
          }} srcSet="/optimized/paperclip-400.webp 400w, /optimized/paperclip-800.webp 800w, /optimized/paperclip-1200.webp 1200w" sizes="(max-width: 600px) 100vw, 50vw" />

      </button>
      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupSide === 'left' ? popupPos.left - 100 : popupPos.left,
            top: popupPos.top,
            minWidth: 220,
            ...popupBoxStyle
          }}>

          <img
            src="/optimized/banff-400.JPG"
            alt="Banff"
            style={{ width: 320, height: 160, objectFit: 'cover', borderRadius: 14, flexShrink: 0, marginBottom: 0 }} srcSet="/optimized/banff-400.JPG 400w, /optimized/banff-800.JPG 800w, /optimized/banff-1200.JPG 1200w" sizes="(max-width: 600px) 100vw, 50vw" />

          <div style={{ color: '#fff', fontSize: 22, fontFamily: 'inherit', maxWidth: 160 }}>
            Banff National Park (2024)
          </div>
        </div>,
        document.body
      )}
    </>);

};

export default PaperclipBendButton;