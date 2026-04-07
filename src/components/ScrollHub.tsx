import React from 'react';

interface ScrollHubProps {
  activeSection: number;
}

export const ScrollHub = ({ activeSection }: ScrollHubProps) => {
  const sections = ['Hero', 'Showcase', 'Experience', 'Catalog'];
  
  const scrollToSection = (idx: number) => {
    const el = document.getElementById(`section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8 items-center">
      {sections.map((label, idx) => (
        <div 
          key={label} 
          onClick={() => scrollToSection(idx)}
          className="group flex items-center gap-4 cursor-pointer"
        >
          <span className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-500 opacity-0 group-hover:opacity-100 ${activeSection === idx ? 'opacity-100 translate-x-0' : 'translate-x-4'}`}>
            {label}
          </span>
          <div className={`w-1 h-12 rounded-full transition-all duration-500 ${activeSection === idx ? 'bg-black h-16' : 'bg-gray-300'}`} />
        </div>
      ))}
    </div>
  );
};
