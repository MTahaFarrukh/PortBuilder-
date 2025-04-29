import React from 'react';
import { UserProfile } from '../../types';
import { Github as GitHub, Linkedin, Twitter, Globe, MapPin, Mail } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface TemplateProps {
  profile: UserProfile;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      {/* Header */}
      <header className="bg-primary-50 dark:bg-primary-900/30 py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {profile.avatar && (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">{profile.title}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                {profile.location && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                )}
                
                {profile.email && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4 mr-1" />
                    <a href={`mailto:${profile.email}`} className="hover:underline">
                      {profile.email}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
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
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
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
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
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
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
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
      
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {/* About */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {profile.bio}
          </p>
        </section>
        
        {/* Skills */}
        {profile.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-primary-600 dark:bg-primary-400 h-1.5 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Experience */}
        {profile.experiences.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Experience</h2>
            <div className="space-y-8">
              {profile.experiences.map((experience) => (
                <div key={experience.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-200 dark:before:bg-gray-700">
                  <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 -translate-x-1/2"></div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{experience.position}</h3>
                  <div className="flex items-center text-gray-700 dark:text-gray-300 mt-1">
                    <span className="font-medium">{experience.company}</span>
                    {experience.location && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{experience.location}</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                  </div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {profile.education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Education</h2>
            <div className="space-y-8">
              {profile.education.map((education) => (
                <div key={education.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-200 dark:before:bg-gray-700">
                  <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 -translate-x-1/2"></div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{education.degree} in {education.fieldOfStudy}</h3>
                  <div className="font-medium text-gray-700 dark:text-gray-300 mt-1">{education.institution}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {formatDate(education.startDate)} – {education.endDate ? formatDate(education.endDate) : 'Present'}
                  </div>
                  {education.description && (
                    <p className="mt-3 text-gray-700 dark:text-gray-300">{education.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {profile.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.projects.map((project) => (
                <div key={project.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{project.description}</p>
                    
                    {project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 flex space-x-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-gray-50 dark:bg-gray-800 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MinimalTemplate;