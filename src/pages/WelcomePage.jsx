import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Globe,
  MapPin,
  Calendar,
  Hotel,
  DollarSign,
  Map,
  Menu,
  X,
  ArrowBigRightDash,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineTravelExplore } from 'react-icons/md';

const DemoChat = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  const messages = [
    { type: 'user', text: "I'd like to visit Rajasthan for 7 days." },
    {
      type: 'bot',
      text: "Wonderful choice! Rajasthan is incredible. What's your main interest - forts & palaces, desert experience, or local culture?",
    },
    { type: 'user', text: 'I love heritage and desert safaris!' },
    {
      type: 'bot',
      text: "Perfect! I'll create an itinerary covering Jaipur's Amber Fort, Jodhpur's Mehrangarh Fort, Udaipur's City Palace, and a camel safari in Jaisalmer's Thar Desert.",
    },
    {
      type: 'user',
      text: 'Sounds amazing! What about local food experiences?',
    },
    {
      type: 'bot',
      text: "I'll include authentic Rajasthani thali experiences, street food tours in old cities, and a traditional cooking class with local spices!",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messageIndex < messages.length) {
        setDisplayedMessages((prev) => [...prev, messages[messageIndex]]);
        setMessageIndex((prev) => prev + 1);
      } else {
        // Reset after showing all messages
        setTimeout(() => {
          setDisplayedMessages([]);
          setMessageIndex(0);
        }, 2000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [messageIndex, messages.length]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden min-h-[500px]">
      <div className="space-y-6">
        <AnimatePresence>
          {displayedMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              } items-start gap-3`}
            >
              {message.type === 'bot' && (
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <MdOutlineTravelExplore className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`${
                  message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                } rounded-lg p-4 max-w-[70%]`}
              >
                <p className="text-gray-800">{message.text}</p>
              </div>
              {message.type === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-semibold text-sm">U</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <MdOutlineTravelExplore className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">
                  TripTalk
                </span>
              </motion.div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink onClick={() => scrollToSection('demo')}>Demo</NavLink>
              <NavLink onClick={() => scrollToSection('how-it-works')}>
                How It Works
              </NavLink>
              <NavLink onClick={() => scrollToSection('features')}>
                Features
              </NavLink>
              <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection('demo');
                }}
              >
                Demo
              </MobileNavLink>
              <MobileNavLink
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection('how-it-works');
                }}
              >
                How It Works
              </MobileNavLink>
              <MobileNavLink
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection('features');
                }}
              >
                Features
              </MobileNavLink>
              <MobileNavLink
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection('about');
                }}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/chat');
                }}
              >
                Start Planning
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24"
      >
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold text-gray-800 mb-6"
            >
              Plan Your Dream Trip with us 🌎
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 leading-relaxed"
            >
              Let our AI travel assistant help you create the perfect itinerary
              based on your preferences, budget, and schedule. Get personalized
              recommendations for destinations, activities, and accommodations.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/chat')}
              className="bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              <ArrowBigRightDash className="w-6 h-6 mr-3" />
              Start Your Journey
            </motion.button>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              See TripTalk in Action
            </h2>
            <p className="text-xl text-gray-600">
              Watch how easy it is to plan your next adventure
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <DemoChat />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to plan your perfect trip
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              icon={<Globe className="w-8 h-8 text-blue-600" />}
              step="1"
              title="Choose Location"
              description="Tell us where you want to go or get destination suggestions"
            />
            <StepCard
              icon={<Calendar className="w-8 h-8 text-blue-600" />}
              step="2"
              title="Set Duration"
              description="Specify your travel dates and length of stay"
            />
            <StepCard
              icon={<DollarSign className="w-8 h-8 text-blue-600" />}
              step="3"
              title="Define Budget"
              description="Set your budget range for better recommendations"
            />
            <StepCard
              icon={<Map className="w-8 h-8 text-blue-600" />}
              step="4"
              title="Get Itinerary"
              description="Receive a detailed day-by-day plan with activities"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/50 rounded-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              AI-Powered Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for the perfect trip
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Hotel className="w-8 h-8 text-blue-600" />}
              title="Hotel Recommendations"
              description="Get personalized accommodation suggestions within your budget"
            />
            <FeatureCard
              icon={<Compass className="w-8 h-8 text-blue-600" />}
              title="Daily Activities"
              description="Day-wise itinerary with curated activities and attractions"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8 text-blue-600" />}
              title="Local Insights"
              description="Discover hidden gems, local cuisine, and cultural experiences"
            />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              About TripTalk AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your intelligent travel companion that understands your
              preferences and creates personalized travel experiences tailored
              just for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🎯 Personalized Planning
                </h3>
                <p className="text-gray-600">
                  We take into account your interests, budget, and timeline to
                  create the perfect itinerary.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🤖 AI-Powered Recommendations
                </h3>
                <p className="text-gray-600">
                  Our AI analyzes thousands of data points to suggest the best
                  experiences for you.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  💡 Smart Suggestions
                </h3>
                <p className="text-gray-600">
                  Get real-time suggestions for activities, restaurants, and
                  attractions based on your location and preferences.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] bg-white rounded-2xl shadow-lg p-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-purple-50/50" />
              <div className="space-y-4 relative">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex justify-end items-start gap-3"
                >
                  <div className="bg-blue-100 rounded-lg p-4 max-w-[75%]">
                    <p className="text-gray-800">
                      I want to explore Kerala for 5 days
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-sm">
                      U
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-start items-start gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <MdOutlineTravelExplore className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[75%]">
                    <p className="text-gray-800">
                      Excellent choice! Kerala is beautiful. What's your budget
                      range?
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="flex justify-end items-start gap-3"
                >
                  <div className="bg-blue-100 rounded-lg p-4 max-w-[75%]">
                    <p className="text-gray-800">Around ₹50,000-60,000</p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-sm">
                      U
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="flex justify-start items-start gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <MdOutlineTravelExplore className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[75%]">
                    <p className="text-gray-800">
                      Perfect! I'll plan backwater houseboats, Munnar tea
                      gardens, Alleppey beaches, and traditional Kathakali
                      shows!
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const ChatBubble = ({ type, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`${
      type === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white shadow-md mr-auto'
    } rounded-lg p-4 max-w-[80%] relative`}
  >
    <p className="text-gray-800">{children}</p>
  </motion.div>
);

const NavLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-gray-600 hover:text-gray-900 px-3 py-2 font-medium transition-colors"
  >
    {children}
  </button>
);

const MobileNavLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 font-medium transition-colors"
  >
    {children}
  </button>
);

const StepCard = ({ icon, step, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-xl shadow-md relative"
  >
    <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
      {step}
    </div>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-xl shadow-md"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default WelcomePage;
