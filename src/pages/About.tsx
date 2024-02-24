import { Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import TimelineSection from '../components/TimelineSection';
import SkillCard from '../components/SkillCard';
import ScrollIndicator from '../components/ScrollIndicator';
import profileData from '../data/profile.json';

export default function About() {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [visibleExperiences, setVisibleExperiences] = useState<number[]>([]);
  const [visibleEducation, setVisibleEducation] = useState<number[]>([]);
  const [visibleAwards, setVisibleAwards] = useState<number[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    let currentPhrase = profileData.phrases[currentPhraseIndex];
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % profileData.phrases.length);
        }, 2000);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [currentPhraseIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            const section = entry.target.getAttribute('data-section');
            
            switch(section) {
              case 'experience':
                setVisibleExperiences((prev) => [...new Set([...prev, index])]);
                break;
              case 'education':
                setVisibleEducation((prev) => [...new Set([...prev, index])]);
                break;
              case 'awards':
                setVisibleAwards((prev) => [...new Set([...prev, index])]);
                break;
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.timeline-item').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Terminal-like Hero Section */}
        <div className="mb-16">
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gray-900 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-sm ml-2">~/portfolio/about</span>
            </div>
            <div className="p-6 font-mono">
              <p className="text-green-400">$ whoami</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {typedText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
              </h1>
              <p className="text-gray-300 mb-4">{profileData.bio}</p>
              <div className="flex space-x-4 mt-6">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {profileData.skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>

        {/* Timeline Sections */}
        <TimelineSection
          title="Code Journey"
          items={profileData.experiences}
          sectionIcon="GitBranch"
          visibleItems={visibleExperiences}
          section="experience"
        />

        <TimelineSection
          title="Education"
          items={profileData.education}
          sectionIcon="GraduationCap"
          visibleItems={visibleEducation}
          section="education"
        />

        <TimelineSection
          title="Awards & Recognition"
          items={profileData.awards}
          sectionIcon="Trophy"
          visibleItems={visibleAwards}
          section="awards"
        />

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </div>
    </div>
  );
}