import React, { useState } from 'react';

export interface SelectProps {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({ 
  label, 
  error, 
  options,
  value: controlledValue,
  defaultValue = '',
  onChange,
  disabled = false,
  className = '',
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = options.find(opt => opt.value === value) || options[0];
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <svg width="100%" height="42" className="block">
          <rect
            x="0"
            y="0"
            width="100%"
            height="42"
            rx="8"
            fill={disabled ? '#f9fafb' : '#ffffff'}
            stroke={error ? '#ef4444' : '#d1d5db'}
            strokeWidth="1"
          />
          <text
            x="12"
            y="26"
            fill={selectedOption ? '#111827' : '#9ca3af'}
            fontSize="14"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {selectedOption?.label || 'Select...'}
          </text>
          <path
            d="M 0 0 L 5 6 L 10 0"
            transform="translate(calc(100% - 20), 18)"
            stroke="#6b7280"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}