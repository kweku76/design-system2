import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Alert({ 
  children, 
  variant = 'default',
  className = '' 
}: AlertProps) {
  const variants = {
    default: {
      container: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: <Info className="w-5 h-5 text-blue-600" />,
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-900',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    },
    danger: {
      container: 'bg-red-50 border-red-200 text-red-900',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
    },
  };
  
  return (
    <div className={`flex items-start gap-3 p-4 border rounded-lg ${variants[variant].container} ${className}`}>
      <div className="flex-shrink-0 mt-0.5">
        {variants[variant].icon}
      </div>
      <div className="flex-1 text-sm">
        {children}
      </div>
    </div>
  );
}