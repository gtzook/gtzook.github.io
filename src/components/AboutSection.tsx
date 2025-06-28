import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Instagram } from 'lucide-react';

const About = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Blurb */}
      <p className="text-lg leading-relaxed">
        I'm an ECE MS/PhD student at UC Santa Barbara, working at the Ikuko Smith lab where I study visual processing in mice <i>in vivo</i>.
      </p>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Photo */}
        <Card className="aspect-square flex items-center justify-center">
          <CardContent className="text-center text-gray-500">
            <img
              src="/optimized/office_photo-400.jpg"
              alt="Computer photo"
              className="w-full h-auto mt-4"
              style={{ borderRadius: '5vw' }} srcSet="/optimized/office_photo-400.jpg 400w, /optimized/office_photo-800.jpg 800w, /optimized/office_photo-1200.jpg 1200w" sizes="(max-width: 600px) 100vw, 50vw" />

          </CardContent>
        </Card>

        {/* Right: Stacked Cards + Social */}
        <div className="flex flex-col gap-6">
          {/* Bio */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Bio</h2>
              <p className="text-white-700">
              I grew up in Bellevue, WA, and was entranced by engineering at four years old, when I would steal out past bedtime to program my brother's FLL robot. 
              I believe the best innovations are found where broad expertise intersects. Accordingly, I am currently entrenched in the world of neuroscience ad the Ikuko Smith lab at UCSB,
              where I hope to gain core competence in neural processing to better apply my engineering background.
              </p>
            </CardContent>
          </Card>
          {/* Awards */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Recognition</h2>
              <ul className="list-disc pl-4 space-y-1">
                <li>2024 NSF GRFP Honorable Mention</li>
                <li>IEEE-Eta Kappa Nu Inductee</li>
                <li>Chevron Scholarship Recipient (2022)</li>
              </ul>
            </CardContent>
          </Card>
          {/* Newsworthy */}
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">News</h2>
                <ul className="list-disc pl-4 space-y-1">
                  <li><a href='https://mech.rice.edu/news/zook-brothers-bring-hardware-and-software-together' className='underline'>The Brothers Zook</a> (bad hair day)</li>
                  <li><a href='https://snip.ly/9uy3xv' className='underline'>Test Score</a></li>
                </ul>
              </CardContent>
            </Card>
          {/* Social Links */}
          <div className="flex gap-6 justify-center pt-2">
            <a
              href="https://github.com/gtzook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 transition"
              aria-label="GitHub">

              <Github size={32} />
            </a>
            <a
              href="https://www.instagram.com/gabetakesphotos111/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition"
              aria-label="Instagram">

              <Instagram size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>);

};

export default About;