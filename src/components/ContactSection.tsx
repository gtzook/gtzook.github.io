
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
              Talk to me!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-3xl mb-3"></div>
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-300">gabe@gabezook.com</p>
              </div>

            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => window.open('mailto:gabe@gabezook.com', '_blank')}
                className="bg-white text-black hover:bg-gray-200 px-8 py-3"
              >
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
