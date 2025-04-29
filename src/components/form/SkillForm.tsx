import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Skill } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const SkillForm: React.FC = () => {
  const { profile, addSkill, updateSkill, removeSkill } = usePortfolioStore();
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(3);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleAddSkill = () => {
    if (!skillName.trim()) {
      setError('Skill name is required');
      return;
    }

    if (editingSkillId) {
      updateSkill(editingSkillId, { name: skillName, level: skillLevel });
      setEditingSkillId(null);
    } else {
      addSkill({ name: skillName, level: skillLevel });
    }

    setSkillName('');
    setSkillLevel(3);
    setError('');
  };

  const handleEditSkill = (skill: Skill) => {
    setSkillName(skill.name);
    setSkillLevel(skill.level);
    setEditingSkillId(skill.id);
    setError('');
  };

  const handleCancelEdit = () => {
    setSkillName('');
    setSkillLevel(3);
    setEditingSkillId(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Skills</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add your technical and professional skills
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <Input
                id="skill-name"
                label="Skill name"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                error={error}
                placeholder="e.g. JavaScript, React, Project Management"
              />
            </div>
            
            <div className="sm:col-span-1">
              <label htmlFor="skill-level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Skill level (1-5)
              </label>
              <input
                id="skill-level"
                type="range"
                min="1"
                max="5"
                value={skillLevel}
                onChange={(e) => setSkillLevel(Number(e.target.value))}
                className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
            
            <div className="sm:col-span-1 flex items-end">
              {editingSkillId ? (
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddSkill}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  className="flex items-center"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add skill
                </Button>
              )}
            </div>
          </div>
          
          {profile.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Your skills</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profile.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="relative flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                      <div className="mt-1 w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-primary-600 h-1.5 rounded-full"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditSkill(skill)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        className="text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillForm;