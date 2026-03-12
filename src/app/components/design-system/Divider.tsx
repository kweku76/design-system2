import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className = '' }: DividerProps) {
  return (
    <div 
      className={`${
        orientation === 'horizontal' 
          ? 'w-full h-px' 
          : 'h-full w-px'
      } bg-gray-200 ${className}`}
    />
  );
}