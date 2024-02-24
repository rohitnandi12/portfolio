import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide indicator when near bottom (within 100px)
      setIsVisible(scrollPosition + windowHeight < documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
      <p style={{ marginBottom: "2px" }}>Scroll</p>
      <div className="bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-full p-2 shadow-lg shadow-indigo-500/20">
        <ChevronDown className="h-6 w-6 text-indigo-400" />
      </div>
    </div>
  );
}