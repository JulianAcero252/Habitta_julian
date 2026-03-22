import React from 'react';
import './Logo.css';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = "80", height = "80" }) => {
  return (
    <div className={`logo-container ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 240 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        <defs>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#3AFAAF" />
          </linearGradient>
          <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3AFAAF" />
            <stop offset="100%" stopColor="#FF9D42" />
          </linearGradient>
        </defs>

        <path d="M40 90 L120 30 L200 90 V170 H40 Z" className="logo-outline" strokeWidth="8" strokeLinejoin="round" fill="white"/>
        
        <path d="M20 100 L120 25 L220 100" stroke="url(#roofGradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        
        <path d="M165 60 V35 H185 V75" stroke="url(#roofGradient)" strokeWidth="10" strokeLinejoin="round" fill="white"/>

        <path d="M90 170 V135 C90 115, 150 115, 150 135 V170" fill="url(#doorGradient)" className="logo-door-outline" strokeWidth="6"/>
        
        <line x1="30" y1="175" x2="210" y2="175" className="logo-base-line" strokeWidth="6" strokeLinecap="round"/>
      </svg>
      
      <span className="brand-name">Habitta</span>
    </div>
  );
};

export default Logo;
