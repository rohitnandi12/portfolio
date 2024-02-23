import { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management and payment processing.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
    slides: [
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280",
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1280",
      "https://images.unsplash.com/photo-1557821550-a1e1f3d44b67?auto=format&fit=crop&q=80&w=1280"
    ]
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time analytics dashboard with machine learning predictions for business metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
    technologies: ["Python", "TensorFlow", "React", "AWS"],
    github: "https://github.com",
    slides: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1280"
    ]
  },
  {
    id: 3,
    title: "Cloud Infrastructure Manager",
    description: "Enterprise tool for managing and monitoring cloud resources across multiple providers.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280",
    technologies: ["TypeScript", "Docker", "Kubernetes", "Azure"],
    github: "https://github.com",
    live: "https://example.com",
    slides: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1280"
    ]
  }
];

const allTechnologies = Array.from(
  new Set(projects.flatMap(project => project.technologies))
).sort();

// Generate a random hue value for each technology
const techColors = Object.fromEntries(
  allTechnologies.map(tech => [tech, Math.floor(Math.random() * 360)])
);

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const techCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
    });
    return counts;
  }, []);

  const filteredProjects = selectedTech.length > 0
    ? projects.filter(project =>
        selectedTech.some(tech => project.technologies.includes(tech))
      )
    : projects;

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        
        {/* Technology Filters */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            Filter by Technology
          </h2>
          <div className="flex flex-wrap gap-3">
            {allTechnologies.map(tech => {
              const isSelected = selectedTech.includes(tech);
              const hue = techColors[tech];
              
              return (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium
                    ${isSelected 
                      ? `bg-gradient-to-r shadow-lg scale-105` 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300'}`}
                  style={isSelected ? {
                    backgroundImage: `linear-gradient(135deg, 
                      hsl(${hue}, 70%, 35%) 0%, 
                      hsl(${(hue + 30) % 360}, 70%, 45%) 50%, 
                      hsl(${(hue + 60) % 360}, 70%, 35%) 100%)`,
                    boxShadow: `0 0 20px -3px hsla(${hue}, 70%, 45%, 0.5)`
                  } : undefined}
                >
                  {tech} ({techCounts[tech]})
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} onClick={() => setSelectedProject(project)}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}