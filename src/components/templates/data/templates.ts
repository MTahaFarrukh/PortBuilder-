import { Template } from '../../../types';

const templates: Template[] = [
  {
    id: 'template1',
    name: 'Modern Minimal',
    thumbnail: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A clean, minimalist design with a focus on content and readability. Perfect for professionals who want to showcase their work elegantly.',
    features: ['Responsive layout', 'Clean typography', 'Minimalist design', 'Focus on content'],
  },
  {
    id: 'template2',
    name: 'Creative Portfolio',
    thumbnail: 'https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'An artistic layout perfect for designers and creative professionals. Features dynamic animations and bold visual elements.',
    features: ['Dynamic animations', 'Bold typography', 'Visual focus', 'Creative layout'],
  },
  {
    id: 'template3',
    name: 'Developer Focus',
    thumbnail: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Tailored for developers with code snippets and technical project showcase. Includes GitHub integration and tech stack highlights.',
    features: ['Code highlighting', 'Tech stack focus', 'Project showcase', 'Dark mode optimized'],
  },
];

export default templates;