import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Upload, X } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatar: z.string().url().optional().or(z.literal('')),
  socialLinks: z.object({
    github: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileForm: React.FC = () => {
  const { profile, updateProfile, saveProfile, isSaving } = usePortfolioStore();
  const [previewImage, setPreviewImage] = useState<string | null>(profile.avatar || null);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      title: profile.title,
      email: profile.email,
      location: profile.location,
      bio: profile.bio,
      avatar: profile.avatar || '',
      socialLinks: {
        github: profile.socialLinks.github || '',
        linkedin: profile.socialLinks.linkedin || '',
        twitter: profile.socialLinks.twitter || '',
        website: profile.socialLinks.website || '',
      },
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setValue('avatar', result, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue('avatar', '', { shouldDirty: true });
  };

  const onSubmit = async (data: ProfileFormValues) => {
    updateProfile(data);
    await saveProfile();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add your basic information to create your profile
        </p>
        
        <div className="mt-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              )}
              
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 cursor-pointer rounded-full hover:bg-black/10 transition-colors"
              >
                <span className="sr-only">Upload profile picture</span>
              </label>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Profile Picture</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Click to upload a profile picture
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                id="name"
                label="Full name"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="title"
                label="Professional title"
                error={errors.title?.message}
                placeholder="e.g. Full Stack Developer"
                {...register('title')}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="email"
                type="email"
                label="Email address"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                id="location"
                label="Location"
                error={errors.location?.message}
                placeholder="e.g. San Francisco, CA"
                {...register('location')}
              />
            </div>
            
            <div className="sm:col-span-6">
              <Textarea
                id="bio"
                label="Bio"
                error={errors.bio?.message}
                placeholder="Write a short bio about yourself..."
                rows={4}
                {...register('bio')}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Social Links</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add links to your social profiles and website
        </p>
        
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Input
              id="github"
              label="GitHub"
              error={errors.socialLinks?.github?.message}
              placeholder="https://github.com/username"
              {...register('socialLinks.github')}
            />
          </div>
          
          <div className="sm:col-span-3">
            <Input
              id="linkedin"
              label="LinkedIn"
              error={errors.socialLinks?.linkedin?.message}
              placeholder="https://linkedin.com/in/username"
              {...register('socialLinks.linkedin')}
            />
          </div>
          
          <div className="sm:col-span-3">
            <Input
              id="twitter"
              label="Twitter"
              error={errors.socialLinks?.twitter?.message}
              placeholder="https://twitter.com/username"
              {...register('socialLinks.twitter')}
            />
          </div>
          
          <div className="sm:col-span-3">
            <Input
              id="website"
              label="Personal website"
              error={errors.socialLinks?.website?.message}
              placeholder="https://yourwebsite.com"
              {...register('socialLinks.website')}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!isDirty || isSaving}
          isLoading={isSaving}
        >
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;