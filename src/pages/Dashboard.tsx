import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePortfolioStore } from '../store/portfolioStore';
import { Button } from '../components/ui/Button';
import { ArrowRight, Plus, FileEdit, Eye, Share2, X, Copy, Check, ArrowLeft } from 'lucide-react';
import TemplateRenderer from '../components/templates/TemplateRenderer';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { profile, loadProfile, isLoading } = usePortfolioStore();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfile(user.id);
    }
  }, [isAuthenticated, user, loadProfile]);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/portfolio/${user?.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsPreviewMode(false)}
                className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Exit Preview</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium">
                  Preview Mode
                </div>
                <Button
                  onClick={handleShare}
                  className="shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <TemplateRenderer profile={profile} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-primary-50 dark:bg-primary-900/30 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your portfolio and view analytics
            </p>
          </div>
          
          {isAuthenticated ? (
            <div className="px-4 py-5 sm:p-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : profile.name ? (
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{profile.title}</p>
                      </div>
                      <div className="mt-3 sm:mt-0 flex space-x-3">
                        <Link to="/editor">
                          <Button
                            variant="outline"
                            className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                          >
                            <FileEdit className="h-4 w-4" />
                            <span>Edit</span>
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                          onClick={() => setIsPreviewMode(true)}
                        >
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </Button>
                        <Button 
                          variant="secondary"
                          className="flex items-center space-x-2"
                          onClick={handleShare}
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-6">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{profile.projects.length}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Skills</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{profile.skills.length}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile Views</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">0</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Projects</h3>
                      <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {profile.projects.slice(0, 3).map((project) => (
                          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
                            {project.image && (
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-40 object-cover"
                              />
                            )}
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {project.technologies.slice(0, 3).map((tech, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    +{project.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Link
                          to="/editor?section=projects"
                          className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition duration-150 ease-in-out"
                        >
                          <div className="text-center">
                            <Plus className="mx-auto h-8 w-8 text-gray-400" />
                            <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                              Add a new project
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center">
                    <Plus className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Create your portfolio</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Get started by creating your first portfolio
                  </p>
                  <div className="mt-6">
                    <Link to="/editor">
                      <Button className="flex items-center mx-auto">
                        Create portfolio
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-10 sm:p-10 text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to manage your portfolio
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Create a professional portfolio to showcase your skills and projects
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <Link to="/login">
                  <Button>Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline">Create account</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Share Portfolio</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Share your portfolio with others using this link:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/portfolio/${user?.id}`}
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="flex items-center"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;