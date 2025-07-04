import React from 'react';

interface WatchflixLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'gradient';
  className?: string;
}

export const Logo: React.FC<WatchflixLogoProps> = ({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl'
  };

  const variantClasses = {
    default: 'text-red-600',
    white: 'text-white',
    gradient: 'bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent'
  };

  return (
    <div className={`z-20 font-bold tracking-tight ${sizeClasses[size]} ${className}`}>
      <span className={`${variantClasses[variant]} italic`}>
        Watch<span className="text-red-700">flix</span>
      </span>
    </div>
  );
};

// Demo component showing different variations


