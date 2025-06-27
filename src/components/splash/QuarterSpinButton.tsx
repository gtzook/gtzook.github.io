
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const QuarterSpinButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(0);
  const [popupPos, setPopupPos] = useState<{ left: number, top: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const requestRef = useRef<number | null>(null);
  const minSpeed = 0;
  const maxSpeed = 8;
  const accel = 0.25;
  const decel = 0.12;

  useEffect(() => {
    function animate() {
      setSpeed(prev => {
        if (hovered && prev < maxSpeed) return Math.min(maxSpeed, prev + accel);
        if (!hovered && prev > minSpeed) return Math.max(minSpeed, prev - decel);
        return prev;
      });
      setAngle(prev => (prev + speed) % 360);
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hovered, speed]);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({
        left: rect.right + 24,
        top: rect.top + rect.height / 2 - 220,
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
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        aria-label="Quarter Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/quarter.webp"
          alt="Quarter Button"
          className="w-32 h-32 md:w-40 md:h-40"
          style={{
            height: '15vh',
            width: 'auto',
            transform: `rotate(${angle}deg)`,
            transition: speed === 0 ? 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
          }}
        />
      </button>
      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupPos.left,
            top: popupPos.top,
            background: 'rgba(30,30,30,0.97)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            padding: 16,
            minWidth: 320,
            zIndex: 99999,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            pointerEvents: 'auto',
          }}
        >
          <img
            src="/mountains.jpg"
            alt="Mountains"
            style={{ height: 300, objectFit: 'cover', borderRadius: 14, flexShrink: 0, marginBottom: 0 }}
          />
          <div style={{ color: '#fff', fontSize: 22, fontFamily: 'inherit', maxWidth: 400 }}>
            Mt. Olympus! (2023)
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default QuarterSpinButton;
