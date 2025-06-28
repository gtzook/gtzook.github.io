
import React from 'react';
import SplashScreen from '@/components/SplashScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

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
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg">

                  About
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg">

                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg">

                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-black px-8 py-3 text-lg">

                  Contact
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="about" className="mt-0">
            <AboutSection />
          </TabsContent>

          <TabsContent value="experience" className="mt-0">
            <ExperienceSection />
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <ProjectsSection />
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <ContactSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>);

};

export default Index;