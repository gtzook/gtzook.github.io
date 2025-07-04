import React, { useState } from 'react';

type GeckoPopupButtonProps = {
  headSrc: string;
  popupImgSrc: string;
  alt?: string;
  size?: number;
  linkUrl?: string; // defaults to "/cam"
};

const GeckoPopupButton: React.FC<GeckoPopupButtonProps> = ({
  headSrc,
  popupImgSrc,
  alt = "Gecko Head",
  size = 96,
  linkUrl = "/#/cam",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute z-[100]"
      style={{ right: '2vw', bottom: '2vh' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={linkUrl}>
        <img
          src={headSrc}
          alt={alt}
          style={{
            width: `${size}px`,
            height: 'auto',
            filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.6))',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
        />
      </a>

      {hovered && (
        <div
          className="absolute"
          style={{
            left: '110%',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.85)',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          <img
            src={popupImgSrc}
            alt="My Gecko"
            style={{
              maxWidth: '240px',
              height: 'auto',
              borderRadius: '6px',
              border: '2px solid goldenrod',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GeckoPopupButton;
