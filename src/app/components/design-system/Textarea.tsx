import React, { useState } from 'react';

export interface TextareaProps {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export function Textarea({ 
  label, 
  error, 
  helperText,
  placeholder = '',
  value: controlledValue,
  defaultValue = '',
  onChange,
  rows = 4,
  disabled = false,
  className = '',
}: TextareaProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const height = rows * 24 + 24;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  
  const lines = value ? value.split('\n') : [placeholder];
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          rows={rows}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10 resize-none"
        />
        
        <svg width="100%" height={height} className="block">
          <rect
            x="0"
            y="0"
            width="100%"
            height={height}
            rx="8"
            fill={disabled ? '#f9fafb' : '#ffffff'}
            stroke={error ? '#ef4444' : isFocused ? '#3b82f6' : '#d1d5db'}
            strokeWidth={isFocused ? '2' : '1'}
          />
          {lines.slice(0, rows).map((line, index) => (
            <text
              key={index}
              x="12"
              y={20 + (index * 24)}
              fill={value ? '#111827' : '#9ca3af'}
              fontSize="14"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {line || '\u00A0'}
            </text>
          ))}
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