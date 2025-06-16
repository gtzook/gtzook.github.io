
import React from 'react';
import SplashScreen from '@/components/SplashScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlaceholderSection from '@/components/PlaceholderSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Splash Screen - Always at the top */}
      <section id="splash">
        <SplashScreen />
      </section>

      {/* Tabs Section */}
      <div className="w-full bg-black">
        <Tabs defaultValue="about" className="w-full">
          <div className="sticky top-0 z-40 bg-black border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4">
              <TabsList className="w-full justify-center bg-black border-none h-16">
                <TabsTrigger 
                  value="about" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg"
                >
                  About
                </TabsTrigger>
                <TabsTrigger 
                  value="experience" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger 
                  value="projects" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger 
                  value="contact" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg"
                >
                  Contact
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="about" className="mt-0">
            <PlaceholderSection
              id="about"
              title="About Me"
              description="This section will contain your personal story, background, and what drives your passion for your field."
              bgColor="bg-black"
            />
          </TabsContent>

          <TabsContent value="experience" className="mt-0">
            <PlaceholderSection
              id="experience"
              title="Experience"
              description="Showcase your professional journey, key roles, and achievements that define your career."
              bgColor="bg-black"
            />
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <PlaceholderSection
              id="projects"
              title="Projects"
              description="Highlight your most impactful work, creative solutions, and technical accomplishments."
              bgColor="bg-black"
            />
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <PlaceholderSection
              id="contact"
              title="Get In Touch"
              description="Ready to connect? This section will contain your contact information and ways to reach out."
              bgColor="bg-black"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
