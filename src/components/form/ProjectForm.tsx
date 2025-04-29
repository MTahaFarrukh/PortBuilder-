import React, { useState, useRef } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Project } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit2, Image, Link as LinkIcon, Code, Upload, X } from 'lucide-react';
import { generateId } from '../../lib/utils';

const ProjectForm: React.FC = () => {
  const { profile, addProject, updateProject, removeProject } = usePortfolioStore();
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    image: '',
    technologies: [],
    liveUrl: '',
    repoUrl: '',
  });
  const [techInput, setTechInput] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (formData.liveUrl && !/^https?:\/\/.+/.test(formData.liveUrl)) {
      newErrors.liveUrl = 'Please enter a valid URL';
    }
    
    if (formData.repoUrl && !/^https?:\/\/.+/.test(formData.repoUrl)) {
      newErrors.repoUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please upload an image file' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setFormData((prev) => ({ ...prev, image: result }));
      setErrors((prev) => ({ ...prev, image: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    
    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, techInput.trim()],
    }));
    setTechInput('');
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editingProjectId) {
      updateProject(editingProjectId, formData);
      setEditingProjectId(null);
    } else {
      addProject(formData);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      liveUrl: '',
      repoUrl: '',
    });
    setPreviewImage(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditProject = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      technologies: project.technologies,
      liveUrl: project.liveUrl || '',
      repoUrl: project.repoUrl || '',
    });
    setPreviewImage(project.image || null);
    setEditingProjectId(project.id);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      liveUrl: '',
      repoUrl: '',
    });
    setPreviewImage(null);
    setEditingProjectId(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {editingProjectId ? 'Edit Project' : 'Add New Project'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Showcase your work by adding projects to your portfolio
        </p>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Input
                id="title"
                name="title"
                label="Project title"
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
                placeholder="e.g. E-commerce Website"
              />
            </div>
            
            <div className="sm:col-span-6">
              <Textarea
                id="description"
                name="description"
                label="Project description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Describe your project, technologies used, and your role..."
                rows={4}
              />
            </div>
            
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project image
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Project preview"
                        className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-32 w-32 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="project-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="project-image"
                    className="absolute inset-0 cursor-pointer rounded-lg hover:bg-black/10 transition-colors"
                  >
                    <span className="sr-only">Upload project image</span>
                  </label>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to upload a project image
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Recommended: Square image, at least 800x800px
                  </p>
                </div>
              </div>
              {errors.image && (
                <p className="mt-2 text-sm text-error-500">{errors.image}</p>
              )}
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies used
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g. React, Node.js, MongoDB"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-r-md"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {formData.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(index)}
                        className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:bg-primary-500 focus:text-white dark:hover:bg-primary-800"
                      >
                        <span className="sr-only">Remove {tech}</span>
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="liveUrl"
                name="liveUrl"
                label="Live demo URL"
                value={formData.liveUrl}
                onChange={handleInputChange}
                error={errors.liveUrl}
                placeholder="https://yourproject.com"
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="repoUrl"
                name="repoUrl"
                label="Repository URL"
                value={formData.repoUrl}
                onChange={handleInputChange}
                error={errors.repoUrl}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            {editingProjectId ? (
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
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
                Add project
              </Button>
            )}
          </div>
        </form>
      </div>
      
      {profile.projects.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Your projects</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {profile.projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                {project.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{project.description}</p>
                  
                  {project.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                      >
                        <LinkIcon className="h-3.5 w-3.5 mr-1" />
                        Live demo
                      </a>
                    )}
                    
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                      >
                        <Code className="h-3.5 w-3.5 mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEditProject(project)}
                      className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className="text-sm text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-500 flex items-center"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
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

export default ProjectForm;