import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      title: "Graduate Student Researcher",
      company: "Dendrite iSLAB (UC Santa Barbara)",
      location: "Goleta, CA",
      period: "2024 – present",
      details: [
        "Repaired four broken mouse operant conditioning chambers",
        "Designed and ran multi-week experiments to investigate non-informational aural enhancement of visual acuity",
        "Built NEURON simulation demonstrating possible mechanism underlying dendritic hotspot data",
        "Trained, managed, and mentored four undergraduate research assistants"
      ]
    },
    {
      title: "Math and Science Educator",
      company: "Big Brains Education",
      location: "Bellevue, WA",
      period: "2019 – present",
      details: [
        "Wrote AP Calculus and Physics curriculum",
        "Cumulatively taught over twenty students computer science, math, physics and related topics"
      ]
    },
    {
      title: "Intern Software Developer",
      company: "Rugged Robotics",
      location: "Houston, TX",
      period: "2023",
      details: [
        "Created novel attitude inference system utilizing laser-gimbal orientations",
        "Integrated monitoring system to notify operators of erratic IMU behavior",
        "Evaluated inertial navigation system for site topography mapping"
      ]
    },
    {
      title: "Undergraduate Researcher",
      company: "MAHI Lab (Rice University)",
      location: "Houston, TX",
      period: "2020 – 2024",
      details: [
        "Authored section of publication documenting PCB design",
        "Managed MOE exoskeleton during rehabilitative robotics sessions with stroke and spinal cord injury patients",
        "Extracted performance metrics from experimental data to prove efficacy of dual-intervention regime"
      ]
    }
  ];


  const education = [
    {
      title: "Electrical Engineering (MS/PhD)",
      company: "UC Santa Barbara",
      location: "Goleta, CA",
      period: "2024 – present",
      details: ["MS Expected 2026"]
    },
    {
      title: "Electrical Engineering (BS) & Philosophy (BA)",
      company: "Rice University",
      location: "Houston, TX",
      period: "2020 – 2024",
      details: ["BS (magna cum laude)", "BA (cum laude)"]
    }
  ];

  const distinctions = [
    "Chevron Scholarship Awardee (2022-2023)",
    "IEEE-Eta Kappa Nu Inductee (2024)",
    "NSF GRFP Honorable Mention (2024)"
  ];

  const volunteering = [
    {
      title: "Plugin Developer",
      company: "OHSU Neurosurgery Collins Lab",
      location: "Remote, Portland, OR",
      period: "present",
      details: [
        "Developing a plugin for 3D brain scan and electrode placement visualization tool VERA to increase clarity and aid in the creation of publishable figures"
      ]
    },
    {
      title: "Tutor",
      company: "School on Wheels",
      location: "Goleta, CA",
      period: "present",
      details: [
        "Teach twice-weekly individual sessions with previously unhoused student developing math and language arts skills"
      ]
    },
    {
      title: "Coach",
      company: "W.A.S.A.B.I Robotics",
      location: "Bellevue, WA",
      period: "2018 – 2023",
      details: [
        "Coached competitive VEX Robotics teams for high-school and middle-school students, leading to numerous victories at the state level, including three state championships and two world finals appearances"
      ]
    }
  ];


  return (
    <>
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
                {experiences.map((exp, index) =>
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
                      {exp.details.map((detail, detailIndex) =>
                    <li key={detailIndex} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {detail}
                        </li>
                    )}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                        <p className="text-lg text-blue-300">{edu.company}</p>
                        <p className="text-gray-400">{edu.location}</p>
                      </div>
                      <span className="text-gray-300 bg-white/10 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                        {edu.period}
                      </span>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      {edu.details.map((detail, detailIndex) => (
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

      {/* Distinctions Section */}
      <section id="distinctions" className="min-h-screen flex items-center justify-center py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                Distinctions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/10 rounded-lg p-6">
                <ul className="space-y-3 text-gray-300">
                  {distinctions.map((distinction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span className="text-lg">{distinction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Volunteering Section */}
      <section id="volunteering" className="min-h-screen flex items-center justify-center py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                Volunteering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {volunteering.map((role, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{role.title}</h3>
                        <p className="text-lg text-blue-300">{role.company}</p>
                        <p className="text-gray-400">{role.location}</p>
                      </div>
                      <span className="text-gray-300 bg-white/10 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                        {role.period}
                      </span>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      {role.details.map((detail, detailIndex) => (
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
    </>);

};

export default ExperienceSection;