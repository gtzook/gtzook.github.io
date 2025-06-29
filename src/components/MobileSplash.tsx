import React, { useEffect, useState } from 'react';

const MobileSplash: React.FC = () => {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsMobilePortrait(window.innerWidth < window.innerHeight);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (!isMobilePortrait) return null;

  return (
    <section
      className="w-full h-screen flex flex-col items-center justify-center bg-black text-white text-center p-4"
      style={{

      }}
    >
      <img
        src="/optimized/name_img-800.webp"
        alt="Name"
        className="object-contain select-none mb-6"
        style={{ maxWidth: '80vw', height: 'auto' }}
        srcSet="/optimized/name_img-400.webp 400w, /optimized/name_img-800.webp 800w, /optimized/name_img-1200.webp 1200w"
        sizes="(max-width: 600px) 100vw, 50vw"
        draggable={false}
      />
      <p className="text-lg md:text-xl font-medium text-white/80">
        Web dev is hard! Please view my site on desktop, it looks much better there.
      </p>
    </section>
  );
};

export default MobileSplash;
