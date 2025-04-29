import React from 'react';
import { UserProfile } from '../../types';
import { Github as GitHub, Linkedin, Twitter, Globe, MapPin, Mail, Terminal, Code, ExternalLink } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface TemplateProps {
  profile: UserProfile;
}

const DeveloperTemplate: React.FC<TemplateProps> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono">
      <header className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {profile.avatar && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-secondary-500">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div>
              <div className="font-mono mb-3">
                <span className="text-secondary-500">&gt;</span> <span className="text-primary-400">const</span> <span className="text-white">developer</span> <span className="text-primary-400">=</span> {'{'}
              </div>
              
              <div className="pl-6">
                <div className="mb-1">
                  <span className="text-accent-400">name:</span> <span className="text-white">"{profile.name}"</span>,
                </div>
                <div className="mb-1">
                  <span className="text-accent-400">title:</span> <span className="text-white">"{profile.title}"</span>,
                </div>
                <div className="mb-1">
                  <span className="text-accent-400">location:</span> <span className="text-white">"{profile.location}"</span>,
                </div>
                <div className="mb-1">
                  <span className="text-accent-400">email:</span> <span className="text-white">"{profile.email}"</span>,
                </div>
                <div className="mb-1">
                  <span className="text-accent-400">available:</span> <span className="text-success-500">true</span>
                </div>
              </div>
              
              <div>{'}'}</div>
              
              <div className="mt-4 flex items-center space-x-4">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <GitHub className="h-5 w-5" />
                  </a>
                )}
                
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                
                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                
                {profile.socialLinks.website && (
                  <a
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* About */}
        <section className="mb-16">
          <div className="flex items-center mb-4">
            <Terminal className="h-5 w-5 mr-2 text-secondary-500" />
            <h2 className="text-xl font-bold">README.md</h2>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-line">{profile.bio}</p>
            </div>
          </div>
        </section>
        
        {/* Skills */}
        {profile.skills.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-4">
              <Code className="h-5 w-5 mr-2 text-secondary-500" />
              <h2 className="text-xl font-bold">Skills</h2>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill) => {
                  let bgColor = '';
                  switch (skill.level) {
                    case 5:
                      bgColor = 'bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-300 border-success-300 dark:border-success-700';
                      break;
                    case 4:
                      bgColor = 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border-primary-300 dark:border-primary-700';
                      break;
                    case 3:
                      bgColor = 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 border-secondary-300 dark:border-secondary-700';
                      break;
                    default:
                      bgColor = 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600';
                  }
                  
                  return (
                    <div
                      key={skill.id}
                      className={`px-3 py-1 rounded-md border ${bgColor} font-mono text-sm`}
                    >
                      {skill.name}
                      <span className="ml-2 text-xs opacity-70">{skill.level}/5</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        
        {/* Projects */}
        {profile.projects.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-4">
              <div className="text-secondary-500 mr-2">📁</div>
              <h2 className="text-xl font-bold">Projects</h2>
            </div>
            
            <div className="space-y-6">
              {profile.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
                >
                  <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-4 py-2 flex items-center">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-error-500"></div>
                      <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                      <div className="w-3 h-3 rounded-full bg-success-500"></div>
                    </div>
                    <span className="ml-3 font-mono text-sm">{project.title}</span>
                  </div>
                  
                  <div className="p-6">
                    {project.image && (
                      <div className="mb-4 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">// Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm bg-secondary-600 hover:bg-secondary-700 text-white py-1 px-3 rounded"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                          Live Demo
                        </a>
                      )}
                      
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-1 px-3 rounded"
                        >
                          <GitHub className="h-3.5 w-3.5 mr-1.5" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Experience */}
          {profile.experiences.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="text-secondary-500 mr-2">💼</div>
                <h2 className="text-xl font-bold">Work Experience</h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="space-y-6">
                  {profile.experiences.map((experience) => (
                    <div key={experience.id}>
                      <h3 className="text-lg font-bold flex items-center">
                        <span className="text-secondary-500 mr-2">&gt;</span>
                        {experience.position}
                      </h3>
                      <div className="font-mono text-sm text-primary-600 dark:text-primary-400 mb-1">
                        {experience.company} {experience.location && `// ${experience.location}`}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
                        {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{experience.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {/* Education */}
          {profile.education.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="text-secondary-500 mr-2">🎓</div>
                <h2 className="text-xl font-bold">Education</h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="space-y-6">
                  {profile.education.map((education) => (
                    <div key={education.id}>
                      <h3 className="text-lg font-bold flex items-center">
                        <span className="text-secondary-500 mr-2">&gt;</span>
                        {education.degree}
                      </h3>
                      <div className="font-mono text-sm text-primary-600 dark:text-primary-400 mb-1">
                        {education.institution} // {education.fieldOfStudy}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
                        {formatDate(education.startDate)} – {education.endDate ? formatDate(education.endDate) : 'Present'}
                      </div>
                      {education.description && (
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{education.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <pre className="text-xs text-gray-400 mb-2">
            {`console.log('Thanks for visiting!');`}
          </pre>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {profile.name} | Built with React &amp; Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeveloperTemplate;