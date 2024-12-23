import React from 'react';
import { Theme } from '../types/resume';

interface Props {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeCustomizer({ theme, onThemeChange }: Props) {
  const handleColorChange = (key: keyof Theme, value: string) => {
    onThemeChange({ ...theme, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Theme Customization</h3>
      <div className="space-y-4">
        {Object.entries(theme).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-32 capitalize">{key}:</label>
            <input
              type="color"
              value={value}
              onChange={(e) => handleColorChange(key as keyof Theme, e.target.value)}
              className="w-16 h-8"
            />
          </div>
        ))}
      </div>
    </div>
  );
}