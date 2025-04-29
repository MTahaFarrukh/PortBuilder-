export type UserProfile = {
  id?: string;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  avatar?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills: Skill[];
  projects: Project[];
  education: Education[];
  experiences: Experience[];
  templateId: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number; // 1-5
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
};

export type Template = {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  features: string[];
};

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};