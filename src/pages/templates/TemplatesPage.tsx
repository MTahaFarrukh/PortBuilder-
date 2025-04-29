import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import templates from '../../components/templates/data/templates';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Check, Eye, ArrowLeft } from 'lucide-react';
import TemplateRenderer from '../../components/templates/TemplateRenderer';

const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, isAuthenticated } = usePortfolioStore();
  const [previewTemplate, setPreviewTemplate] = React.useState<string | null>(null);
  const selectedTemplate = profile.templateId;

  const handleSelectTemplate = (templateId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    updateProfile({ templateId });
    navigate('/editor?section=template');
  };

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  if (previewTemplate) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Templates
              </button>
              <span className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                {templates.find(t => t.id === previewTemplate)?.name}
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setPreviewTemplate(null)}
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSelectTemplate(previewTemplate)}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                {isAuthenticated ? 'Use This Template' : 'Sign In to Use Template'}
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-20">
          <div className="max-w-[1600px] mx-auto">
            <TemplateRenderer profile={{...profile, templateId: previewTemplate}} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 mb-4">
            Beautiful Portfolio Templates
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Choose a template that best showcases your skills and projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                    <p className="text-gray-200 text-sm">{template.description}</p>
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
                    <Check className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    onClick={() => handleSelectTemplate(template.id)}
                    className="w-full sm:w-auto"
                  >
                    {selectedTemplate === template.id ? 'Selected' : (isAuthenticated ? 'Use Template' : 'Sign In to Use')}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handlePreview(template.id)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to build your portfolio?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Select a template and start creating your professional portfolio today
            </p>
            {isAuthenticated ? (
              <Link to="/editor">
                <Button size="lg" className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-shadow">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="lg" className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-shadow">
                  Sign In to Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;