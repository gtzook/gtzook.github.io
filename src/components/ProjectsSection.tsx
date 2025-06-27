
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "Solar Battery Optimization System",
      year: "2025",
      description: "Optimal control using dynamic programming approach for realistic solar battery system, using real-world data from Lineage (for class)."
    },
    {
      title: "Dendritic Hotspot Analysis and Simulation Model",
      year: "2024",
      description: "Automated analysis and simulation-based (NEURON) model of dendritic hotspots in mice."
    },
    {
      title: "Free-moving Behavior Box Refurbishment",
      year: "2024",
      description: "Refurbishment of a 4 behavior boxes for free-moving mice, including new electronics and overhauled software."
    },
    {
      title: "Hybrid (discrete + continous) model of small network of LIF neurons",
      year: "2024",
      description: "Model of a small network off LIF neurons leveraging the unique approach of hybrid systems to model discrete jumping behavior, performed stability analysis."
    },
    {
      title: "LIF-network simualation of kindling/anti-kindling neuron stimulation",
      year: "2024",
      description: "LIF neuron based simulation of seizure inducing and inhibiting stimulation (for class)."
    },
    {
      title: "CYANO",
      year: "2023",
      description: "Bag-based bioreactor for cyanobacteria cultivation, including custom electronics and software for monitoring and control."
    },
    {
      title: "Sobriety Encouraging Remote Control Car",
      year: "2022",
      description: "Bluetooth remote controlled car that encourages sobriety by disabling the car when alcohol is detected (for class)."
    },
    {
      title: "FES Textile Sleeve Electronics",
      year: "2022",
      description: "Functional electrical stimulation textile sleeve with integrated electronics"
    },
    {
      title: "MOE Exoskeleton for Stroke Rehabilitation",
      year: "2022",
      description: "Modular exoskeleton system for stroke patient rehabilitation"
    },
    {
      title: "DIC Skin Deformation Tracking",
      year: "2021",
      description: "Advanced skin deformation tracking using digital image correlation"
    },
    {
      title: "Snaptics Haptics Platform",
      year: "2020",
      description: "Low-cost open-source hardware for wearable multi-sensory haptics"
    },
    {
      title: "Electric Car Conversion",
      year: "2019",
      description: "Complete electric vehicle conversion project"
    },
    {
      title: "Smart Grasper Surgical Robot",
      year: "2018", 
      description: "Intelligent surgical robot with advanced grasping capabilities"
    }
  ];

  const skills = {
    software: [
      "ROS", "Linux", "EAGLE", "AutoCAD", "Solidworks", "Unity", "Matlab", 
      "LTSpice", "libGDX", "Arduino", "OpenCV", "GIMP", "Git"
    ],
    hardware: [
      "PCB Design", "Microsoldering", "Pump systems", "3D Printing"
    ],
    programming: [
      "Python", "Java", "C", "C++", "iVerilog", "MATLAB", "LabVIEW", "Ruby"
    ],
    skills: [
      "Interdisciplinary communication", "Data presentation", "Experimental design",
       "Curriculum building"
    ]
  };

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
                {projects.map((project, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                      <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Software</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.software.map((skill, index) => (
                      <span key={index} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Hardware</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.hardware.map((skill, index) => (
                      <span key={index} className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Programming</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.programming.map((skill, index) => (
                      <span key={index} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Core Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.skills.map((skill, index) => (
                      <span key={index} className="bg-orange-600/20 text-orange-300 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Publications</h3>
              <div className="text-gray-300">
                <p className="italic">
                  "Snaptics: Low-Cost Open-Source Hardware for Wearable Multi-Sensory Haptics" 
                  IEEE World Haptics Conference (WHC) 2021
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProjectsSection;
