
import React from 'react';

const CoupleShakeImage: React.FC = () => {
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <>
      <img
        src="/couple.webp"
        alt="Couple"
        className="h-64 md:h-80 transition-transform duration-100 pointer-events-auto select-none"
        style={{
          transform: hovered ? 'rotate(-14deg) scale(1.04)' : 'none',
          animation: hovered ? 'shake-couple 0.4s infinite alternate' : 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        draggable={false}
      />
      <style>{`
        @keyframes shake-couple {
          0%, 100% { transform: rotate(-14deg) scale(1.04) translateX(0); }
          25% { transform: rotate(-14deg) scale(1.04) translateX(-2px); }
          75% { transform: rotate(-14deg) scale(1.04) translateX(2px); }
        }
      `}</style>
    </>
  );
};

export default CoupleShakeImage;
