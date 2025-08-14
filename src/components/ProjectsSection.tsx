
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "Solar Strategizer",
      year: "2025",
      description: "Led team of six electrical engineering graduate students in optimizing strategy for simulated solar power generation scenario, considering equipment purchases, grid buy/sell arbitrage, and carbon emissions tradeoff over a long horizon, and synthesized this data for presentation to Lineage representatives."
    },
    {
      title: "CYANO Photobioreactor",
      year: "2024",
      description: "Designed all electronics and led software development in team of six electrical- and bioengineers, including custom optical density sensor and interactive touchscreen GUI for bag-based photobioreactor."
    },
    {
      title: "LIF Neuron Epilepsy Simulation",
      year: "2024",
      description: "Built a LIF neuron model based simulation of a small network to display the effect of kindling (seizure-inducing) and anti-kindling (seizure-countervailing) stimulation."
    }
  ];


  const skills = {
    research: [
      "Paper writing", "Problem solving", "Interdisciplinary communication", 
      "Data analysis/presentation", "Human subject experience"
    ],
    electronics: [
      "(Micro)soldering", "PCB Design", "Microcontroller interfacing", "Component testing", 
      "Simulation", "Pick-and-place machine", "Sensor calibration"
    ],
    animalHusbandry: [
      "Husbandry", "Food monitoring", "Burr hole/viral injection", "Post-op care", 
      "Chemogenetic injections", "Humane euthanasia"
    ],
    softwarePlatforms: [
      "Linux", "Unity", "EAGLE", "SolidWorks", "ROS", "Git", "LTSpice", "iVerilog", 
      "Docker", "Freesurfer", "SPM12", "NEURON", "GIMP", "LaTeX", "OpenCV", "libGDX"
    ],
    programming: [
      "Python", "MATLAB", "C/C++", "Java", "Ruby", "LabVIEW"
    ]
  };

  const publications = [
    {
      title: "Ndnf interneurons in layer 1 facilitate audiovisual performance enhancement in visual discrimination tasks",
      authors: "G. Zook, I. Smith",
      venue: "Neuroscience 2025 (SfN), San Diego, CA, US, 2025. Poster presentation."
    },
    {
      title: "Integrated Kinematic Assessment Using Onboard Sensing in an Upper Limb Robotic Exoskeleton for Dual Intervention with Neuromodulation Takeaways",
      authors: "Zook, Gabriel T., et al.",
      venue: "TEROS, 2023. Poster presentation."
    },
    {
      title: "Snaptics: Low-Cost Open Source Hardware for Wearable Multi-Sensory Haptics",
      authors: "Z. A. Zook, O. O. Ozor-Ilo, G. T. Zook and M. K. O'Malley",
      venue: "2021 IEEE World Haptics Conference (WHC), Montreal, QC, Canada, 2021, pp. 925-930. doi: 10.1109/WHC49131.2021.9517172."
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="shadow-lg border-white/20 bg-black/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Projects & Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Featured Projects</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project, index) =>
                <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                      <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Research</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.research.map((skill, index) => (
                      <span key={index} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Electronics</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.electronics.map((skill, index) => (
                      <span key={index} className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Animal Husbandry</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.animalHusbandry.map((skill, index) => (
                      <span key={index} className="bg-red-600/20 text-red-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Software Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.softwarePlatforms.map((skill, index) => (
                      <span key={index} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 md:col-span-2 lg:col-span-1">
                  <h4 className="text-lg font-semibold text-white mb-3">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.programming.map((skill, index) => (
                      <span key={index} className="bg-orange-600/20 text-orange-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Papers & Presentations</h3>
              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <div key={index} className="text-gray-300">
                    <p className="font-semibold text-white mb-1">{pub.title}</p>
                    <p className="text-sm text-blue-300 mb-1">{pub.authors}</p>
                    <p className="text-sm italic">{pub.venue}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>);

};

export default ProjectsSection;