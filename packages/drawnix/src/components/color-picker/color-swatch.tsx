import React from 'react';
import { isDarkColor, hexToCssRgba } from '../../utils/color';

export interface ColorSwatchProps {
  /** Hex color value to display */
  color: string;
  /** Whether this swatch is currently selected */
  selected?: boolean;
  /** Size of the swatch in pixels */
  size?: number;
  /** Called when the swatch is clicked */
  onClick?: (color: string) => void;
  /** Accessible label */
  label?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  selected = false,
  size = 24,
  onClick,
  label,
}) => {
  const dark = isDarkColor(color);
  const checkColor = dark ? '#ffffff' : '#000000';

  const handleClick = () => {
    onClick?.(color);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(color);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label ?? `Select color ${color}`}
      aria-pressed={selected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: hexToCssRgba(color),
        border: selected ? `2px solid ${checkColor}` : '2px solid transparent',
        boxShadow: selected ? `0 0 0 2px ${color}` : '0 1px 3px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
      }}
    >
      {selected && (
        <svg
          width={size * 0.45}
          height={size * 0.45}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <polyline
            points="1.5,6 5,9.5 10.5,2.5"
            stroke={checkColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default ColorSwatch;
