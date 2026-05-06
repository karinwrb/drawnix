import React, { useState, useCallback } from 'react';
import { ColorSwatch } from './color-swatch';
import { hexToRgba, rgbaToCss, hexToCssRgba } from '../../utils/color';

/**
 * Predefined color palette for the color picker.
 */
const DEFAULT_COLORS = [
  '#000000',
  '#434343',
  '#666666',
  '#999999',
  '#b7b7b7',
  '#cccccc',
  '#d9d9d9',
  '#ffffff',
  '#ff0000',
  '#ff4500',
  '#ff9900',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#4a86e8',
  '#0000ff',
  '#9900ff',
  '#ff00ff',
  '#e06666',
  '#f6b26b',
  '#ffd966',
  '#93c47d',
  '#76a5af',
  '#6fa8dc',
  '#8e7cc3',
  '#c27ba0',
];

export interface ColorPickerProps {
  /** Currently selected color in hex format */
  value?: string;
  /** Callback fired when a color is selected */
  onChange?: (color: string) => void;
  /** Whether to show the custom color input */
  showCustomInput?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * A color picker component that displays a palette of preset colors
 * and optionally allows custom hex color input.
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  showCustomInput = true,
  className = '',
}) => {
  const [customColor, setCustomColor] = useState(value ?? '#000000');
  const [inputError, setInputError] = useState(false);

  const handleSwatchClick = useCallback(
    (color: string) => {
      setCustomColor(color);
      setInputError(false);
      onChange?.(color);
    },
    [onChange]
  );

  const handleCustomInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setCustomColor(raw);

      // Validate hex color format (#RGB or #RRGGBB)
      const isValid = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(raw);
      if (isValid) {
        setInputError(false);
        onChange?.(raw);
      } else {
        setInputError(true);
      }
    },
    [onChange]
  );

  return (
    <div className={`drawnix-color-picker ${className}`.trim()}>
      <div className="drawnix-color-picker__palette">
        {DEFAULT_COLORS.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            isSelected={value?.toLowerCase() === color.toLowerCase()}
            onClick={handleSwatchClick}
            size={20}
          />
        ))}
      </div>

      {showCustomInput && (
        <div className="drawnix-color-picker__custom">
          {/* Preview swatch for the custom input value */}
          <div
            className="drawnix-color-picker__custom-preview"
            style={{
              backgroundColor: inputError ? 'transparent' : customColor,
              border: '1px solid #ccc',
              width: 24,
              height: 24,
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <input
            type="text"
            className={`drawnix-color-picker__custom-input${
              inputError ? ' drawnix-color-picker__custom-input--error' : ''
            }`}
            value={customColor}
            onChange={handleCustomInputChange}
            placeholder="#RRGGBB"
            maxLength={7}
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
