
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              About Gabriel Zook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Passionate MS/PhD student at UC Santa Barbara with a love for robotics and technology. 
                Published researcher with hands-on experience in hardware design, robotics, and machine learning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Contact</h3>
                <div className="space-y-2 text-gray-300">
                  <p>📧 gabyzook@gmail.com</p>
                  <p>📱 (425) 524-1542</p>
                  <p>📍 Goleta, CA</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Languages & Interests</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Languages:</strong> English, Japanese (spoken)</p>
                  <p><strong>Interests:</strong> Philosophy, travel, music production, photography, technology, writing</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Distinctions</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p>🏆 Chevron Scholarship Awardee 2022-2023</p>
                  <p>🎖️ IEEE-Eta Kappa Nu Inductee</p>
                </div>
                <div>
                  <p>🏅 NSF GRFP Honorable Mention (2024)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
