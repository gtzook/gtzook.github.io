import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface SvgPopupButtonProps {
  src: string;
  alt: string;
  popupText: string;
  // position is now optional and treated as relative offsets inside wrapper
  position?: React.CSSProperties;
  size?: number; // vw units
  scale?: number;
  popupOffset?: { x: number; y: number }; // in vw/vh
}

const SvgPopupButton: React.FC<SvgPopupButtonProps> = ({
  src,
  alt,
  popupText,
  position = { left: 0, top: 0 },
  size = 12,
  scale = 1,
  popupOffset = { x: 0, y: 0 },
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [popupPos, setPopupPos] = React.useState<{ left: string; top: string } | null>(null);
  const btnRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Convert button right/top pixel positions to vw/vh
      const leftVW = ((rect.right + vw * 0.01 + popupOffset.x) / vw) * 100;
      const topVH = ((rect.top + popupOffset.y) / vh) * 100;

      setPopupPos({
        left: `${leftVW}vw`,
        top: `${topVH}vh`,
      });
    } else {
      setPopupPos(null);
    }
  }, [hovered, popupOffset]);

  return (
    <div
      ref={btnRef}
      style={{
        position: 'relative', // relative inside absolute wrapper div
        cursor: 'pointer',
        width: `${size}vw`,
        height: `${size}vw`,
        transform: `scale(${scale})`,
        ...position, // small offset if needed
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          filter: hovered ? 'brightness(0.7)' : 'none',
          transition: 'filter 0.2s ease',
          display: 'block',
        }}
      />

      {hovered && popupPos &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              left: popupPos.left,
              top: popupPos.top,
              maxWidth: '70vw',
              background: 'rgba(30,30,30,0.97)',
              borderRadius: '1vw',
              boxShadow: '0 0.5vw 3vw rgba(0,0,0,0.25)',
              color: '#fff',
              fontSize: '1.4vw',
              padding: '1vw',
              zIndex: 1000,
              whiteSpace: 'pre-line',
            }}
            dangerouslySetInnerHTML={{ __html: popupText }}
          />,
          document.body
        )}
    </div>
  );
};

export default SvgPopupButton;
