import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from '../../components/ui/Tabs';
import ProfileForm from '../../components/form/ProfileForm';
import SkillForm from '../../components/form/SkillForm';
import ProjectForm from '../../components/form/ProjectForm';
import EducationForm from '../../components/form/EducationForm';
import ExperienceForm from '../../components/form/ExperienceForm';
import TemplateSelector from '../../components/templates/TemplateSelector';
import TemplateRenderer from '../../components/templates/TemplateRenderer';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Button } from '../../components/ui/Button';
import { Save, Eye, ArrowLeft } from 'lucide-react';

const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, saveProfile, isSaving } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSave = async () => {
    await saveProfile();
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const tabs = [
    { label: 'Profile', content: <ProfileForm /> },
    { label: 'Skills', content: <SkillForm /> },
    { label: 'Projects', content: <ProjectForm /> },
    { label: 'Education', content: <EducationForm /> },
    { label: 'Experience', content: <ExperienceForm /> },
    { label: 'Template', content: <TemplateSelector /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to dashboard
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-gray-200 dark:border-gray-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? 'Edit mode' : 'Preview'}
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center"
                isLoading={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isPreviewMode ? (
        <div className="py-8">
          <div className="max-w-[1600px] mx-auto">
            <TemplateRenderer profile={profile} />
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <Tabs activeTab={activeTab} onChange={setActiveTab}>
              <TabList className="border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    index={index}
                    className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                      activeTab === index
                        ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </Tab>
                ))}
              </TabList>

              <div className="p-6">
                {tabs.map((tab, index) => (
                  <TabPanel key={index} index={index}>
                    {tab.content}
                  </TabPanel>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPage;