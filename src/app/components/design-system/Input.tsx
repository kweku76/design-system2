import React, { useState } from 'react';

export interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  className?: string;
}

export function Input({ 
  label, 
  error, 
  helperText,
  placeholder = '',
  value: controlledValue,
  defaultValue = '',
  onChange,
  type = 'text',
  disabled = false,
  className = '',
}: InputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Hidden input for actual functionality */}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
        />
        
        {/* SVG Visual Representation */}
        <svg 
          width="100%" 
          height="42" 
          className="block"
        >
          {/* Background */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="42"
            rx="8"
            fill={disabled ? '#f9fafb' : '#ffffff'}
            stroke={error ? '#ef4444' : isFocused ? '#3b82f6' : '#d1d5db'}
            strokeWidth={isFocused ? '2' : '1'}
          />
          
          {/* Text */}
          <text
            x="12"
            y="26"
            fill={value ? '#111827' : '#9ca3af'}
            fontSize="14"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {value || placeholder}
          </text>
          
          {/* Cursor */}
          {isFocused && (
            <rect
              x={12 + (value.length * 8)}
              y="14"
              width="1"
              height="16"
              fill="#3b82f6"
            >
              <animate
                attributeName="opacity"
                values="1;0;1"
                dur="1s"
                repeatCount="indefinite"
              />
            </rect>
          )}
        </svg>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}