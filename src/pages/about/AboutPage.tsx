import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Send, Star, Users, MessageSquare } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const AboutPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    // In a real app, this would send the feedback to your backend
    console.log('Feedback submitted:', data);
    setIsSubmitted(true);
    reset();
    setSelectedRating(0);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Us Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 mb-4">
              About PortBuilder
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Empowering professionals to showcase their work with beautiful, customizable portfolios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Heart className="h-6 w-6 text-primary-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe everyone deserves a professional online presence. Our mission is to make it easy for professionals to create stunning portfolios that showcase their work and talents.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-secondary-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Who We Are</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We're a team of passionate developers and designers who understand the importance of a strong online portfolio. We've combined our expertise to create a platform that makes portfolio creation accessible to everyone.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
              </div>
              <div className="bg-secondary-50 dark:bg-secondary-900/30 p-6 rounded-xl">
                <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Countries</div>
              </div>
              <div className="bg-accent-50 dark:bg-accent-900/30 p-6 rounded-xl">
                <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Satisfaction</div>
              </div>
              <div className="bg-success-50 dark:bg-success-900/30 p-6 rounded-xl">
                <div className="text-4xl font-bold text-success-600 dark:text-success-400 mb-2">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Form Section */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 text-primary-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Share Your Feedback</h2>
            </div>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300 rounded-lg">
                Thank you for your feedback! We appreciate your input.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Name"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register('email')}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating <= selectedRating
                            ? 'text-warning-400 fill-warning-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="mt-1 text-sm text-error-500">{errors.rating.message}</p>
                )}
              </div>

              <Textarea
                label="Your Feedback"
                rows={4}
                error={errors.feedback?.message}
                {...register('feedback')}
                placeholder="Tell us what you think about PortBuilder..."
              />

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;