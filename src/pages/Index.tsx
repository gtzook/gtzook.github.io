
import React from 'react';
import Navigation from '@/components/Navigation';
import SplashScreen from '@/components/SplashScreen';
import PlaceholderSection from '@/components/PlaceholderSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Splash Screen */}
      <section id="splash">
        <SplashScreen />
      </section>

      {/* About Section */}
      <PlaceholderSection
        id="about"
        title="About Me"
        description="This section will contain your personal story, background, and what drives your passion for your field."
        bgColor="bg-gray-900"
      />

      {/* Experience Section */}
      <PlaceholderSection
        id="experience"
        title="Experience"
        description="Showcase your professional journey, key roles, and achievements that define your career."
        bgColor="bg-black"
      />

      {/* Projects Section */}
      <PlaceholderSection
        id="projects"
        title="Projects"
        description="Highlight your most impactful work, creative solutions, and technical accomplishments."
        bgColor="bg-gray-900"
      />

      {/* Contact Section */}
      <PlaceholderSection
        id="contact"
        title="Get In Touch"
        description="Ready to connect? This section will contain your contact information and ways to reach out."
        bgColor="bg-black"
      />
    </div>
  );
};

export default Index;
