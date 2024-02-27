import { createElement } from 'react';
import * as Icons from 'lucide-react';

interface SkillCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function SkillCard({ icon, title, description, color }: SkillCardProps) {
  const Icon = (Icons as any)[icon];

  return (
    <div className={`bg-white dark:bg-gradient-to-br ${color} backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:scale-105 transition-transform duration-300`}>
      <div className="mb-4">
        {createElement(Icon, { className: "h-8 w-8 text-indigo-600 dark:text-cyan-400" })}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}