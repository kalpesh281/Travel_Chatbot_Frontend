import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Plane,
  Compass,
  Globe,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import AnimatedHero from '../components/AnimatedHero';
import FeatureCard from '../components/FeatureCard';

function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Discover Destinations',
      description: 'Get personalized recommendations for your next adventure',
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: 'Plan Your Trip',
      description:
        'Create detailed itineraries with flights, hotels, and activities',
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: 'Local Insights',
      description: 'Learn about hidden gems and local experiences',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Coverage',
      description: 'Explore destinations from around the world',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-emerald-100 flex items-center justify-center p-6"
    >
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <AnimatedHero />

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-extrabold text-gray-900 mb-4"
          >
            Travel Chatbot
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Your AI-powered travel companion for unforgettable journeys around
            the world
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/chat')}
            className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow inline-flex items-center space-x-3"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Start Your Journey</span>
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default WelcomePage;
