import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Resume, ResumeSection, Theme } from './types/resume';
import { ResumeSection as ResumeSectionComponent } from './components/ResumeSection';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { ResumePreviewer } from './components/ResumePreviewer';
import { PrintButton } from './components/PrintButton';
import './styles/print.css';

const defaultTheme: Theme = {
  primary: '#2563eb',
  secondary: '#4b5563',
  background: '#ffffff',
  text: '#1f2937',
};

function App() {
  const [resume, setResume] = useState<Resume>({
    sections: [],
    theme: defaultTheme,
  });

  const addSection = () => {
    const newSection: ResumeSection = {
      id: crypto.randomUUID(),
      type: 'custom',
      title: 'New Section',
      content: [''],
    };
    setResume((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const deleteSection = (id: string) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }));
  };

  const updateSection = (id: string, updates: Partial<ResumeSection>) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <PrintButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block">
          <div className="space-y-6 print:hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Sections</h2>
              <button
                onClick={addSection}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Plus size={20} />
                Add Section
              </button>
            </div>

            {resume.sections.map((section) => (
              <ResumeSectionComponent
                key={section.id}
                section={section}
                onDelete={deleteSection}
                onUpdate={updateSection}
              />
            ))}

            <ThemeCustomizer
              theme={resume.theme}
              onThemeChange={(theme) => setResume((prev) => ({ ...prev, theme }))}
            />
          </div>

          <div className="sticky top-8 print:static print:top-0">
            <h2 className="text-xl font-semibold mb-4 print:hidden">Preview</h2>
            <ResumePreviewer resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;