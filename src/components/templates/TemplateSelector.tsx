import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioStore } from '../../store/portfolioStore';
import templates from './data/templates';
import { Button } from '../ui/Button';
import { Check, Eye, ArrowLeft, CheckCircle2 } from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';

const TemplateSelector: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = usePortfolioStore();
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const selectedTemplate = profile.templateId || 'template1';

  const handleSelectTemplate = (templateId: string) => {
    updateProfile({ templateId });
    navigate('/editor?section=profile');
  };

  if (previewTemplate) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-auto">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Selection
            </button>
            <Button
              onClick={() => {
                handleSelectTemplate(previewTemplate);
              }}
              className="flex items-center text-white dark:text-white"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Use This Template
            </Button>
          </div>
        </div>
        <div className="pt-4">
          <TemplateRenderer profile={{...profile, templateId: previewTemplate}} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Choose your template</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Select a template that best showcases your work and personality.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary-500 dark:ring-primary-400'
                : 'hover:shadow-xl border border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-200">{template.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-primary-500 text-white rounded-full p-2 shadow-lg">
                  <Check className="h-5 w-5" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className={`w-full sm:flex-1 ${
                    selectedTemplate === template.id 
                      ? 'text-white dark:text-white' 
                      : 'text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {selectedTemplate === template.id ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      Selected
                    </span>
                  ) : (
                    'Use Template'
                  )}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setPreviewTemplate(template.id)}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;