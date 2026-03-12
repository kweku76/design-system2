import React, { useState } from 'react';

export interface SwitchProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({ 
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '' 
}: SwitchProps) {
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
      <div className="relative" onClick={handleClick}>
        <svg width="44" height="24" viewBox="0 0 44 24">
          <rect
            x="0"
            y="0"
            width="44"
            height="24"
            rx="12"
            fill={checked ? '#3b82f6' : '#d1d5db'}
          />
          <circle
            cx={checked ? 32 : 12}
            cy="12"
            r="10"
            fill="#ffffff"
          >
            <animate
              attributeName="cx"
              from={checked ? 12 : 32}
              to={checked ? 32 : 12}
              dur="0.2s"
              fill="freeze"
            />
          </circle>
        </svg>
      </div>
      {label && (
        <span className="ml-3 text-sm text-gray-700">{label}</span>
      )}
    </label>
  );
}