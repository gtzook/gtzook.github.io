
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      title: "Intern Software Developer",
      company: "Rugged Robotics",
      location: "Houston, TX",
      period: "June 2023 – Aug. 2023",
      details: [
        "Formulated novel attitude inference system using gimbal orientations",
        "Integrated monitoring system to notify users of erratic IMU behavior",
        "Evaluated INS systems for topography mapping"
      ]
    },
    {
      title: "Undergraduate Researcher",
      company: "MAHI Lab (Rice University)",
      location: "Houston, TX",
      period: "Sep. 2020 – Present",
      details: [
        "Developed novel rehabilitation robotics technology",
        "Authored conference paper documenting PCB design",
        "Facilitated human subject experiments and therapy with stroke victims",
        "Analyzed experimental data and compiled into presentations"
      ]
    },
    {
      title: "Math and Science Educator",
      company: "Big Brains Education",
      location: "Bellevue, WA",
      period: "June 2019 – Present",
      details: [
        "Created AP Calculus and Physics curriculum from scratch",
        "Taught 12+ students per year computer science, math, physics and related topics",
        "Oversaw overhaul of student messaging platform to improve communication"
      ]
    },
    {
      title: "Intern Researcher",
      company: "BioRobotics Laboratory (University of Washington)",
      location: "Seattle, WA",
      period: "Sep. 2018 – Dec. 2018",
      details: [
        "Characterized precision sensors for use in robotically-assisted remote surgery",
        "Learned proper operation of and assembled tutorials on new lab technology"
      ]
    },
    {
      title: "Teaching Assistant",
      company: "Robinson Center (University of Washington)",
      location: "Seattle, WA",
      period: "July 2016 – Aug. 2017",
      details: [
        "Led teaching team in advanced robotics class for summer classes of 20+ gifted high schoolers",
        "Designed engaging robotics lesson plans and activities"
      ]
    }
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-lg text-blue-300">{exp.company}</p>
                      <p className="text-gray-400">{exp.location}</p>
                    </div>
                    <span className="text-gray-300 bg-white/10 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    {exp.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExperienceSection;
