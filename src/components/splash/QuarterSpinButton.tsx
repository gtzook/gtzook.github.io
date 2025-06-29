import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const QuarterSpinButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(0);
  const [popupPos, setPopupPos] = useState<{ left: number; top: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const requestRef = useRef<number | null>(null);

  const minSpeed = 0;
  const maxSpeed = 8;
  const accel = 0.25;
  const decel = 0.12;

  useEffect(() => {
    function animate() {
      setSpeed((prev) => {
        if (hovered && prev < maxSpeed) return Math.min(maxSpeed, prev + accel);
        if (!hovered && prev > minSpeed) return Math.max(minSpeed, prev - decel);
        return prev;
      });
      setAngle((prev) => (prev + speed) % 360);
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
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setPopupPos({
        left: scrollLeft + rect.right + window.innerWidth * 0.01,
        top: scrollTop + rect.top + rect.height / 2 - window.innerHeight * 0.2,
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered]);

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
        }}
        aria-label="Quarter Button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/optimized/quarter-400.webp"
          alt="Quarter Button"
          className="transition-transform duration-200"
          style={{
            height: '15vh',
            width: 'auto',
            transform: `rotate(${angle}deg)`,
            transition: speed === 0 ? 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
          }}
          srcSet="/optimized/quarter-400.webp 400w, /optimized/quarter-800.webp 800w, /optimized/quarter-1200.webp 1200w"
          sizes="(max-width: 600px) 50vw, 15vh"
        />
      </button>

      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'absolute',
            left: popupPos.left,
            top: popupPos.top,
            background: 'rgba(30,30,30,0.97)',
            borderRadius: '1vw',
            boxShadow: '0 0.5vw 3vw rgba(0,0,0,0.35)',
            padding: '1vw',
            minWidth: '30vw',
            maxWidth: '90vw',
            zIndex: 99999,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.8vw',
            pointerEvents: 'auto',
          }}
        >
          <img
            src="/optimized/mountains-400.jpg"
            alt="Mountains"
            style={{
              height: '30vh',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'cover',
              borderRadius: '1vw',
              flexShrink: 0,
            }}
            srcSet="/optimized/mountains-400.jpg 400w, /optimized/mountains-800.jpg 800w, /optimized/mountains-1200.jpg 1200w"
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
            Mt. Olympus! (2023)
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default QuarterSpinButton;
