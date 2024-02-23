import { createElement } from 'react';
import * as Icons from 'lucide-react';

interface TimelineItem {
  year: string;
  role?: string;
  degree?: string;
  title?: string;
  company?: string;
  institution?: string;
  organization?: string;
  description: string;
  icon: string;
  iconColor: string;
}

interface TimelineSectionProps {
  title: string;
  items: TimelineItem[];
  sectionIcon: string;
  visibleItems: number[];
  section: string;
}

export default function TimelineSection({ 
  title, 
  items, 
  sectionIcon, 
  visibleItems, 
  section 
}: TimelineSectionProps) {
  const renderIcon = (iconName: string, className: string) => {
    const Icon = (Icons as any)[iconName];
    return createElement(Icon, { className });
  };

  return (
    <div className="max-w-3xl mx-auto relative mb-16">
      <div className="flex items-center mb-8">
        {renderIcon(sectionIcon, "h-6 w-6 text-indigo-400")}
        <h2 className="text-3xl font-bold text-white ml-2">{title}</h2>
      </div>
      
      <div className="absolute left-4 top-20 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent"></div>

      <div className="space-y-12 relative">
        {items.map((item, index) => (
          <div
            key={index}
            data-index={index}
            data-section={section}
            className={`timeline-item relative pl-12 transform transition-all duration-700 ${
              visibleItems.includes(index)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="absolute left-2 top-2 w-4 h-4 bg-indigo-400 rounded-full transform -translate-x-1/2 z-10"></div>
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300">
              <div className="flex items-center mb-2">
                {renderIcon(item.icon, `h-6 w-6 ${item.iconColor}`)}
                <span className="text-sm font-semibold text-indigo-400 ml-2">
                  {item.year}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {item.role || item.degree || item.title}
              </h3>
              <p className="text-indigo-300 font-medium">
                {item.company || item.institution || item.organization}
              </p>
              <p className="text-gray-300 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}