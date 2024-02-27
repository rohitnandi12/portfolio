import { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { Project } from '../types';
import projectsData from '../data/projects.json';

const allTechnologies = Array.from(
  new Set(projectsData.projects.flatMap(project => project.technologies))
).sort();

const techColors = Object.fromEntries(
  allTechnologies.map(tech => [tech, Math.floor(Math.random() * 360)])
);

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const techCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projectsData.projects.forEach(project => {
      project.technologies.forEach(tech => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
    });
    return counts;
  }, []);

  const filteredProjects = selectedTech.length > 0
    ? projectsData.projects.filter(project =>
        selectedTech.some(tech => project.technologies.includes(tech))
      )
    : projectsData.projects;

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        
        {/* Technology Filters */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
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
                      : 'bg-gray-200 dark:bg-gray-800/50 hover:bg-gray-300 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'}`}
                  style={isSelected ? {
                    backgroundImage: `linear-gradient(135deg, 
                      hsl(${hue}, 70%, 35%) 0%, 
                      hsl(${(hue + 30) % 360}, 70%, 45%) 50%, 
                      hsl(${(hue + 60) % 360}, 70%, 35%) 100%)`,
                    boxShadow: `0 0 20px -3px hsla(${hue}, 70%, 45%, 0.5)`,
                    color: 'white'
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