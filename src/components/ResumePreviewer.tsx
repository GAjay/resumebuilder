import React from 'react';
import { Resume } from '../types/resume';

interface Props {
  resume: Resume;
}

export function ResumePreviewer({ resume }: Props) {
  const { theme, sections } = resume;

  return (
    <div
      className="min-h-[800px] w-full p-8 rounded-lg shadow-lg"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {sections.map((section) => (
        <div
          key={section.id}
          className="mb-6"
          style={{ borderBottom: `2px solid ${theme.primary}` }}
        >
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: theme.primary }}
          >
            {section.title}
          </h2>
          <div className="space-y-2">
            {section.content.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}