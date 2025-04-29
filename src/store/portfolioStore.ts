import { create } from 'zustand';
import { UserProfile, Skill, Project, Education, Experience } from '../types';
import { generateId } from '../lib/utils';

interface PortfolioState {
  profile: UserProfile;
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
}

interface PortfolioActions {
  updateProfile: (updates: Partial<UserProfile>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  saveProfile: () => Promise<void>;
  loadProfile: (userId: string) => Promise<void>;
  resetProfile: () => void;
}

const defaultProfile: UserProfile = {
  name: '',
  title: '',
  email: '',
  location: '',
  bio: '',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  },
  skills: [],
  projects: [],
  education: [],
  experiences: [],
  templateId: 'template1',
};

// Load profile from localStorage
const loadStoredProfile = (userId: string): UserProfile | null => {
  const stored = localStorage.getItem(`portfolio_${userId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored profile:', e);
      return null;
    }
  }
  return null;
};

// Save profile to localStorage
const saveStoredProfile = (userId: string, profile: UserProfile) => {
  try {
    localStorage.setItem(`portfolio_${userId}`, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile:', e);
  }
};

export const usePortfolioStore = create<PortfolioState & PortfolioActions>((set, get) => ({
  profile: { ...defaultProfile },
  isLoading: false,
  error: null,
  isSaving: false,

  updateProfile: (updates) => {
    const currentProfile = get().profile;
    const newProfile = { ...currentProfile, ...updates };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  addSkill: (skill) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      skills: [{ id: generateId(), ...skill }],
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  updateSkill: (id, updates) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      skills: currentProfile.skills.map((skill) =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  removeSkill: (id) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      skills: currentProfile.skills.filter((skill) => skill.id !== id),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  addProject: (project) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      projects: [{ id: generateId(), ...project }],
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  updateProject: (id, updates) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      projects: currentProfile.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  removeProject: (id) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      projects: currentProfile.projects.filter((project) => project.id !== id),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  addEducation: (education) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      education: [{ id: generateId(), ...education }],
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  updateEducation: (id, updates) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      education: currentProfile.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  removeEducation: (id) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      education: currentProfile.education.filter((edu) => edu.id !== id),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  addExperience: (experience) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      experiences: [{ id: generateId(), ...experience }],
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  updateExperience: (id, updates) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      experiences: currentProfile.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  removeExperience: (id) => {
    const currentProfile = get().profile;
    const newProfile = {
      ...currentProfile,
      experiences: currentProfile.experiences.filter((exp) => exp.id !== id),
    };
    set({ profile: newProfile });
    if (currentProfile.id) {
      saveStoredProfile(currentProfile.id, newProfile);
    }
  },

  saveProfile: async () => {
    const currentProfile = get().profile;
    set({ isSaving: true, error: null });
    
    try {
      if (!currentProfile.id) {
        throw new Error('No user ID found. Please log in again.');
      }
      
      // Save to localStorage
      saveStoredProfile(currentProfile.id, currentProfile);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ isSaving: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to save profile',
        isSaving: false,
      });
    }
  },

  loadProfile: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const storedProfile = loadStoredProfile(userId);
      
      if (storedProfile) {
        set({ profile: { ...storedProfile, id: userId }, isLoading: false });
        return;
      }

      // Create a new empty profile
      const newProfile: UserProfile = {
        ...defaultProfile,
        id: userId,
      };
      
      set({ profile: newProfile, isLoading: false });
      saveStoredProfile(userId, newProfile);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load profile',
        isLoading: false,
      });
    }
  },

  resetProfile: () => {
    set({ profile: { ...defaultProfile } });
  },
}));