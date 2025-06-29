import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface SvgPopupButtonProps {
  src: string;
  alt: string;
  popupText: string;
  position: React.CSSProperties;
  size?: number; // base size in vw or fallback px
  scale?: number;
  popupOffset?: { x: number; y: number };
}

const SvgPopupButton: React.FC<SvgPopupButtonProps> = ({
  src,
  alt,
  popupText,
  position,
  size = 12, // interpreted as vw for scaling
  scale = 1,
  popupOffset = { x: 0, y: 0 },
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [popupPos, setPopupPos] = React.useState<{ left: number; top: number } | null>(null);
  const btnRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setPopupPos({
        left: scrollLeft + rect.right + window.innerWidth * 0.01 + popupOffset.x,
        top: scrollTop + rect.top + popupOffset.y,
      });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered, popupOffset]);

  return (
    <div
      ref={btnRef}
      style={{
        position: 'absolute',
        cursor: 'pointer',
        width: `${size}vw`,
        height: `${size}vw`,
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
