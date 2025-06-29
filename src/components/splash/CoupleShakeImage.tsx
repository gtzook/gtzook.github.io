import React from 'react';

const CoupleShakeImage: React.FC = () => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <>
      <img
        src="/optimized/couple-400.webp"
        alt="Couple"
        className="transition-transform duration-100 pointer-events-auto select-none"
        style={{
          height: '26vh',
          width: 'auto',
          maxWidth: '90vw',
          transform: hovered ? 'rotate(-14deg) scale(1.04)' : 'none',
          animation: hovered ? 'shake-couple 0.4s infinite alternate' : 'none',
          transition: 'transform 0.3s ease-in-out',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        draggable={false}
        srcSet="/optimized/couple-400.webp 400w, /optimized/couple-800.webp 800w, /optimized/couple-1200.webp 1200w"
        sizes="(max-width: 600px) 100vw, 40vw"
      />

      <style>{`
        @keyframes shake-couple {
          0%, 100% { transform: rotate(-14deg) scale(1.04) translateX(0); }
          25% { transform: rotate(-9deg) scale(1.04) translateX(-2vw); }
          75% { transform: rotate(-19deg) scale(1.04) translateX(2vw); }
        }
      `}</style>
    </>
  );
};

export default CoupleShakeImage;
