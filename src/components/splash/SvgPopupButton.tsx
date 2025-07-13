
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface SvgPopupButtonProps {
  src: string;
  alt: string;
  popupText: string;
  position?: React.CSSProperties;
  size?: number; // now in pixels instead of vw
  scale?: number;
  popupOffset?: { x: number; y: number }; // now in pixels
}

const SvgPopupButton: React.FC<SvgPopupButtonProps> = ({
  src,
  alt,
  popupText,
  position = { left: 0, top: 0 },
  size = 230, // default size in pixels
  scale = 1,
  popupOffset = { x: 0, y: 0 },
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [popupPos, setPopupPos] = React.useState<{ left: string; top: string } | null>(null);
  const btnRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();

      // Calculate popup position in screen pixels
      const leftPx = rect.right + popupOffset.x;
      const topPx = rect.top + popupOffset.y;

      setPopupPos({
        left: `${leftPx}px`,
        top: `${topPx}px`,
      });
    } else {
      setPopupPos(null);
    }
  }, [hovered, popupOffset]);

  return (
    <div
      ref={btnRef}
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: `${size}px`,
        height: `${size}px`,
        transform: `scale(${scale})`,
        ...position,
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
              position: 'fixed',
              left: popupPos.left,
              top: popupPos.top,
              maxWidth: '500px',
              background: 'rgba(30,30,30,0.97)',
              borderRadius: '20px',
              boxShadow: '0 10px 60px rgba(0,0,0,0.25)',
              color: '#fff',
              fontSize: '28px',
              padding: '20px',
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
