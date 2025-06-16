
import React from 'react';
import Navigation from '@/components/Navigation';
import SplashScreen from '@/components/SplashScreen';
import PlaceholderSection from '@/components/PlaceholderSection';

const Index = () => {
  return (
    <div className="min-h-screen">
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
        bgColor="bg-gray-50"
      />

      {/* Experience Section */}
      <PlaceholderSection
        id="experience"
        title="Experience"
        description="Showcase your professional journey, key roles, and achievements that define your career."
        bgColor="bg-white"
      />

      {/* Projects Section */}
      <PlaceholderSection
        id="projects"
        title="Projects"
        description="Highlight your most impactful work, creative solutions, and technical accomplishments."
        bgColor="bg-gradient-to-br from-blue-50 to-indigo-50"
      />

      {/* Contact Section */}
      <PlaceholderSection
        id="contact"
        title="Get In Touch"
        description="Ready to connect? This section will contain your contact information and ways to reach out."
        bgColor="bg-gray-900 text-white"
      />
    </div>
  );
};

export default Index;
