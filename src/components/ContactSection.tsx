
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Interested in robotics, research collaboration, or just want to chat about technology? 
              I'd love to hear from you!
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-300">gabyzook@gmail.com</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <p className="text-gray-300">(425) 524-1542</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-300">Goleta, CA</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Current Focus</h3>
              <div className="text-gray-300 space-y-2">
                <p><strong>UC Santa Barbara</strong> - MS in Electrical Engineering (Expected May 2026)</p>
                <p><strong>Research:</strong> Ikuko Smith Lab - Audiovisual processing in mouse models</p>
                <p><strong>Objective:</strong> Passionate about advancing robotics and rehabilitation technology</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => window.open('mailto:gabyzook@gmail.com', '_blank')}
                className="bg-white text-black hover:bg-gray-200 px-8 py-3"
              >
                Send Email
              </Button>
              <Button 
                onClick={() => window.open('tel:+14255241542', '_blank')}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3"
              >
                Call Me
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
