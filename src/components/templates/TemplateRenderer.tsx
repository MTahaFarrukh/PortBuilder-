import React from 'react';
import { UserProfile } from '../../types';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import DeveloperTemplate from './DeveloperTemplate';

interface TemplateRendererProps {
  profile: UserProfile;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ profile }) => {
  // Ensure we have a default template if none is selected
  const templateId = profile.templateId || 'template1';

  switch (templateId) {
    case 'template1':
      return <MinimalTemplate profile={profile} />;
    case 'template2':
      return <CreativeTemplate profile={profile} />;
    case 'template3':
      return <DeveloperTemplate profile={profile} />;
    default:
      return <MinimalTemplate profile={profile} />;
  }
};

export default TemplateRenderer;