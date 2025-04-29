import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Education } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { generateId } from '../../lib/utils';

const EducationForm: React.FC = () => {
  const initialFormState: Omit<Education, 'id'> = {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  const { profile, addEducation, updateEducation, removeEducation } = usePortfolioStore();
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({ ...initialFormState });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }
    
    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }
    
    if (!formData.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = 'Field of study is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editingId) {
      updateEducation(editingId, formData);
      setEditingId(null);
    } else {
      addEducation(formData);
    }
    
    // Reset form
    setFormData({ ...initialFormState });
    setErrors({});
  };

  const handleEdit = (education: Education) => {
    setFormData({
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      startDate: education.startDate,
      endDate: education.endDate || '',
      description: education.description || '',
    });
    setEditingId(education.id);
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
          {editingId ? 'Edit Education' : 'Add Education'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add your educational background and qualifications
        </p>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                id="institution"
                name="institution"
                label="Institution"
                value={formData.institution}
                onChange={handleInputChange}
                error={errors.institution}
                placeholder="e.g. University of California"
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="degree"
                name="degree"
                label="Degree"
                value={formData.degree}
                onChange={handleInputChange}
                error={errors.degree}
                placeholder="e.g. Bachelor of Science"
              />
            </div>
            
            <div className="sm:col-span-6">
              <Input
                id="fieldOfStudy"
                name="fieldOfStudy"
                label="Field of Study"
                value={formData.fieldOfStudy}
                onChange={handleInputChange}
                error={errors.fieldOfStudy}
                placeholder="e.g. Computer Science"
              />
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
                label="End Date (leave blank if current)"
                value={formData.endDate}
                onChange={handleInputChange}
                error={errors.endDate}
              />
            </div>
            
            <div className="sm:col-span-6">
              <Textarea
                id="description"
                name="description"
                label="Description (optional)"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Describe your studies, achievements, etc."
                rows={3}
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
                Add education
              </Button>
            )}
          </div>
        </form>
      </div>
      
      {profile.education.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Your education</h2>
          <div className="mt-6 space-y-6">
            {profile.education.map((education) => (
              <div
                key={education.id}
                className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {education.degree} in {education.fieldOfStudy}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{education.institution}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(education.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} – 
                      {education.endDate
                        ? new Date(education.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                        : ' Present'}
                    </p>
                    {education.description && (
                      <p className="mt-2 text-gray-700 dark:text-gray-300">{education.description}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(education)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeEducation(education.id)}
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

export default EducationForm;