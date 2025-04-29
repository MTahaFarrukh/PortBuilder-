import React from 'react';
import { UserProfile } from '../../types';
import { Github as GitHub, Linkedin, Twitter, Globe, MapPin, Mail, Star } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface TemplateProps {
  profile: UserProfile;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-accent-50 dark:from-gray-900 dark:to-accent-900/20 text-gray-900 dark:text-gray-100 font-sans">
      {/* Hero Section */}
      <header className="pt-20 pb-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-accent-100 dark:bg-accent-900/20 blur-3xl opacity-70"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-70"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            {profile.avatar && (
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <h1 className="mt-8 text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              {profile.name}
            </h1>
            
            <p className="mt-4 text-2xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {profile.title}
            </p>
            
            <p className="mt-6 max-w-2xl text-center leading-relaxed text-gray-700 dark:text-gray-300">
              {profile.bio}
            </p>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {profile.location && (
                <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <MapPin className="h-4 w-4 text-accent-500 mr-2" />
                  <span>{profile.location}</span>
                </div>
              )}
              
              {profile.email && (
                <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <Mail className="h-4 w-4 text-accent-500 mr-2" />
                  <a href={`mailto:${profile.email}`} className="hover:underline">
                    {profile.email}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-5">
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                  aria-label="GitHub"
                >
                  <GitHub className="h-6 w-6" />
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
                  <Linkedin className="h-6 w-6" />
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
                  <Twitter className="h-6 w-6" />
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
                  <Globe className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        {/* Skills */}
        {profile.skills.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center justify-center mb-12">
              <h2 className="text-3xl font-bold text-center relative">
                <span className="relative z-10">Skills & Expertise</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-accent-200 dark:bg-accent-900/30 -z-10"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {profile.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold">{skill.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < skill.level
                              ? 'text-accent-500 fill-accent-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {profile.projects.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center justify-center mb-12">
              <h2 className="text-3xl font-bold text-center relative">
                <span className="relative z-10">Featured Projects</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-primary-200 dark:bg-primary-900/30 -z-10"></span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {profile.projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`relative group ${
                    index % 2 === 0
                      ? 'md:translate-y-8'
                      : ''
                  }`}
                >
                  <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                    {project.image && (
                      <div className="h-60 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                      
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors"
                          >
                            View Project
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                          >
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-accent-200 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl -z-10 translate-y-4 translate-x-4 opacity-50"></div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Experience */}
          {profile.experiences.length > 0 && (
            <section>
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold relative">
                  <span className="relative z-10">Experience</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-primary-200 dark:bg-primary-900/30 -z-10"></span>
                </h2>
              </div>
              
              <div className="space-y-8">
                {profile.experiences.map((experience) => (
                  <div 
                    key={experience.id}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-200 dark:before:bg-primary-800"
                  >
                    <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 -translate-x-1/2"></div>
                    <h3 className="text-xl font-bold">{experience.position}</h3>
                    <div className="text-gray-700 dark:text-gray-300 mt-1">{experience.company}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(experience.startDate)} – {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                    </div>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">{experience.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {profile.education.length > 0 && (
            <section>
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold relative">
                  <span className="relative z-10">Education</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-accent-200 dark:bg-accent-900/30 -z-10"></span>
                </h2>
              </div>
              
              <div className="space-y-8">
                {profile.education.map((education) => (
                  <div 
                    key={education.id}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-accent-200 dark:before:bg-accent-800"
                  >
                    <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-accent-600 dark:bg-accent-400 -translate-x-1/2"></div>
                    <h3 className="text-xl font-bold">{education.degree}</h3>
                    <div className="text-gray-700 dark:text-gray-300 mt-1">{education.institution}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(education.startDate)} – {education.endDate ? formatDate(education.endDate) : 'Present'}
                    </div>
                    {education.description && (
                      <p className="mt-3 text-gray-600 dark:text-gray-400">{education.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in working together? Feel free to reach out!
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-md hover:shadow-lg transition-all"
          >
            Contact Me
          </a>
          
          <div className="mt-8 text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreativeTemplate;