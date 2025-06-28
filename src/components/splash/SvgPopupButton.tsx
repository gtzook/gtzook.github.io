
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface SvgPopupButtonProps {
  src: string;
  alt: string;
  popupText: string;
  position: React.CSSProperties;
  size?: number;
  scale?: number;
  popupOffset?: {x: number;y: number;};
}

const SvgPopupButton: React.FC<SvgPopupButtonProps> = ({
  src, alt, popupText, position, size = 100, scale = 1, popupOffset = { x: 0, y: 0 }
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [popupPos, setPopupPos] = React.useState<{left: number;top: number;} | null>(null);
  const btnRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPopupPos({ left: rect.right + 16 + popupOffset.x, top: rect.top + popupOffset.y });
    } else if (!hovered) {
      setPopupPos(null);
    }
  }, [hovered, popupOffset]);

  return (
    <div
      ref={btnRef}
      style={{ position: 'relative', cursor: 'pointer', width: size, height: size, transform: `scale(${scale})` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <img
        src={src}
        alt={alt}
        style={{
          width: size,
          height: size,
          filter: hovered ? 'brightness(0.7)' : 'none',
          transition: 'filter 0.2s',
          display: 'block'
        }} />

      {hovered && popupPos && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: popupPos.left,
            top: popupPos.top,
            minWidth: 220,
            background: 'rgba(30,30,30,0.97)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            color: '#fff',
            fontSize: 20,
            padding: 20,
            zIndex: 1000,
            whiteSpace: 'pre-line'
          }}
          dangerouslySetInnerHTML={{ __html: popupText }} />,

        document.body
      )}
    </div>);

};

export default SvgPopupButton;