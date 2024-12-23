import React, { useState } from 'react';
import { Trash2, GripVertical, Edit2, Check } from 'lucide-react';
import { ResumeSection as ResumeSectionType } from '../types/resume';

interface Props {
  section: ResumeSectionType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ResumeSectionType>) => void;
}

export function ResumeSection({ section, onDelete, onUpdate }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(section.title);

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...section.content];
    newContent[index] = value;
    onUpdate(section.id, { content: newContent });
  };

  const handleTitleSave = () => {
    onUpdate(section.id, { title: titleDraft });
    setIsEditingTitle(false);
  };

  const addItem = () => {
    onUpdate(section.id, { content: [...section.content, ''] });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 print:shadow-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GripVertical className="text-gray-400 cursor-move print:hidden" size={20} />
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                className="px-2 py-1 border rounded"
                autoFocus
              />
              <button
                onClick={handleTitleSave}
                className="text-green-500 hover:text-green-700"
              >
                <Check size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="text-gray-500 hover:text-gray-700 print:hidden"
              >
                <Edit2 size={16} />
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => onDelete(section.id)}
          className="text-red-500 hover:text-red-700 print:hidden"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="space-y-2">
        {section.content.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={(e) => handleContentChange(index, e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-none print:p-0"
          />
        ))}
        <button
          onClick={addItem}
          className="text-blue-500 hover:text-blue-700 text-sm print:hidden"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}