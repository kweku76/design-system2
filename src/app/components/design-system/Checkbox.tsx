import React, { useState } from 'react';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ 
  label, 
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '' 
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  
  const handleClick = () => {
    if (disabled) return;
    const newValue = !checked;
    if (controlledChecked === undefined) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };
  
  return (
    <label className={`inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <div className="relative w-5 h-5" onClick={handleClick}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect
            x="0"
            y="0"
            width="20"
            height="20"
            rx="4"
            fill={checked ? '#3b82f6' : '#ffffff'}
            stroke={checked ? '#3b82f6' : '#d1d5db'}
            strokeWidth="2"
          />
          {checked && (
            <path
              d="M5 10 L8.5 13.5 L15 7"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </svg>
      </div>
      {label && (
        <span className="ml-2 text-sm text-gray-700">{label}</span>
      )}
    </label>
  );
}