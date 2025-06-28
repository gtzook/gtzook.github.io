
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderSectionProps {
  id: string;
  title: string;
  description: string;
  bgColor?: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({
  id,
  title,
  description,
  bgColor = "bg-black"
}) => {
  return (
    <section id={id} className={`min-h-screen flex items-center justify-center py-20 ${bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
            <div className="mt-8 p-6 bg-white/10 rounded-lg">
              <p className="text-gray-400 italic">
                This section is ready for your content. You can customize it with your personal information, 
                work experience, projects, or any other details you'd like to showcase.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>);

};

export default PlaceholderSection;