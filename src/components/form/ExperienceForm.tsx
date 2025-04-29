import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Experience } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { generateId } from '../../lib/utils';

const ExperienceForm: React.FC = () => {
  const initialFormState: Omit<Experience, 'id'> = {
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  };

  const { profile, addExperience, updateExperience, removeExperience } = usePortfolioStore();
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({ ...initialFormState });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.current && !formData.endDate) {
      newErrors.endDate = 'End date is required for past positions';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      
      // If current is checked, clear end date
      if (name === 'current' && checked) {
        setFormData((prev) => ({ ...prev, endDate: '' }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editingId) {
      updateExperience(editingId, formData);
      setEditingId(null);
    } else {
      addExperience(formData);
    }
    
    // Reset form
    setFormData({ ...initialFormState });
    setErrors({});
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      location: experience.location || '',
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      current: experience.current,
      description: experience.description,
    });
    setEditingId(experience.id);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({ ...initialFormState });
    setEditingId(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {editingId ? 'Edit Experience' : 'Add Work Experience'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add your professional experience and work history
        </p>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                id="company"
                name="company"
                label="Company"
                value={formData.company}
                onChange={handleInputChange}
                error={errors.company}
                placeholder="e.g. Acme Inc."
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="position"
                name="position"
                label="Position"
                value={formData.position}
                onChange={handleInputChange}
                error={errors.position}
                placeholder="e.g. Senior Developer"
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="location"
                name="location"
                label="Location (optional)"
                value={formData.location}
                onChange={handleInputChange}
                error={errors.location}
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            
            <div className="sm:col-span-3">
              <div className="flex items-center mt-7">
                <input
                  id="current"
                  name="current"
                  type="checkbox"
                  checked={formData.current}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="current"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  I currently work here
                </label>
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="startDate"
                name="startDate"
                type="month"
                label="Start Date"
                value={formData.startDate}
                onChange={handleInputChange}
                error={errors.startDate}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="endDate"
                name="endDate"
                type="month"
                label="End Date"
                value={formData.endDate}
                onChange={handleInputChange}
                error={errors.endDate}
                disabled={formData.current}
              />
            </div>
            
            <div className="sm:col-span-6">
              <Textarea
                id="description"
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Describe your responsibilities, achievements, and the technologies you worked with..."
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            {editingId ? (
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save changes
                </Button>
              </div>
            ) : (
              <Button type="submit" className="flex items-center">
                <Plus className="mr-1 h-4 w-4" />
                Add experience
              </Button>
            )}
          </div>
        </form>
      </div>
      
      {profile.experiences.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Your work experience</h2>
          <div className="mt-6 space-y-6">
            {profile.experiences.map((experience) => (
              <div
                key={experience.id}
                className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{experience.position}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <span>{experience.company}</span>
                      {experience.location && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{experience.location}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} – 
                      {experience.current
                        ? ' Present'
                        : experience.endDate
                          ? ` ${new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`
                          : ''}
                    </p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{experience.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(experience)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExperience(experience.id)}
                      className="text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;