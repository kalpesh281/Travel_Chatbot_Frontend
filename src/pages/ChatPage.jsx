import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Loader2,
  Menu,
  MapPin,
  Calendar,
  DollarSign,
  Sparkles,
  User2Icon,
  Hotel,
  Activity,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
} from 'lucide-react';
import { RiChatAiLine } from 'react-icons/ri';
import { TiArrowBackOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { MdOutlineTravelExplore } from 'react-icons/md';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to TripTalk! May I know your name?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize or retrieve session ID
  useEffect(() => {
    let storedSessionId = localStorage.getItem('travel_chat_session_id');

    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('travel_chat_session_id', storedSessionId);
    }

    setSessionId(storedSessionId);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !sessionId) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`http://127.0.0.1:5001/chat`, {
        user_input: currentInput,
        session_id: sessionId,
      });
      console.log('API Response:', response.data);
      
      // Store the entire response data including structured data
      const botResponse = {
        type: 'bot',
        text: response.data.ai_reply,
        structuredData: response.data, // Include all structured data
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling API:', error);

      const errorResponse = {
        type: 'bot',
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickSuggestions = [
    {
      icon: <MapPin className="w-4 h-4" />,
      text: 'Popular destinations in India',
    },
    { icon: <Calendar className="w-4 h-4" />, text: 'Plan a 7-day trip' },
    { icon: <DollarSign className="w-4 h-4" />, text: 'Budget travel tips' },
    { icon: <Sparkles className="w-4 h-4" />, text: 'Hidden gems to explore' },
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleNewChat = () => {
    let storedSessionId = localStorage.getItem('travel_chat_session_id');
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('travel_chat_session_id', storedSessionId);
      setSessionId(storedSessionId);
    } else {
      setSessionId(storedSessionId);
    }

    setMessages([
      {
        type: 'bot',
        text: 'Hello! 👋 Welcome to TripTalk! May I know your name?',
      },
    ]);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md shadow-sm z-50 flex-shrink-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <MdOutlineTravelExplore className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">TripTalk</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <TiArrowBackOutline className="w-5 h-5" />
                <span>Home</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewChat}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md"
              >
                <RiChatAiLine className="w-5 h-5" />
                <span>New Chat</span>
              </motion.button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Messages Section - Scrollable Only */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} index={index} />
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start items-start gap-3"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <MdOutlineTravelExplore className="w-6 h-6 text-white" />
              </div>
              <div className="bg-blue-50 rounded-3xl rounded-tl-sm px-6 py-4 shadow-lg max-w-[70%] relative border border-blue-100">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="text-gray-700">Thinking...</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Our AI is finding the best options for you. This may take a few
                  moments.
                </div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-50 rounded-full border border-blue-100"></div>
                <div className="absolute -bottom-2 left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
              </div>
            </motion.div>
          )}

          {/* {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-4"
            >
              <p className="text-sm text-gray-600 mb-3 text-center">
                Quick suggestions:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all text-sm text-gray-700 hover:text-blue-600 border border-gray-100"
                  >
                    {suggestion.icon}
                    <span>{suggestion.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )} */}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section - Fixed at Bottom */}
      <div className="">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
          >
            <form onSubmit={handleSendMessage} className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Where would you like to go? Tell me about your dream trip..."
                  className="w-full resize-none rounded-xl px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 min-h-[56px] max-h-[120px]"
                  rows="1"
                  style={{
                    height: 'auto',
                    overflowY: inputMessage.length > 100 ? 'auto' : 'hidden',
                  }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 p-4 rounded-xl transition-all ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Send
                  className={`w-5 h-5 ${
                    inputMessage.trim() && !isLoading
                      ? 'text-white'
                      : 'text-gray-500'
                  }`}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message, index }) => {
  const isUser = message.type === 'user';
  const hasStructuredData = message.structuredData && !isUser;

  // Check if structured data exists and has the required fields
  const showStructuredData = hasStructuredData && (
    message.structuredData.DayWiseItinerary ||
    message.structuredData.Activities ||
    message.structuredData.hotel_details ||
    message.structuredData.estimated_cost
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } items-start gap-3`}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <MdOutlineTravelExplore className="w-6 h-6 text-white" />
        </motion.div>
      )}

      <div className={`${isUser ? 'max-w-[70%]' : 'max-w-[85%]'} w-full`}>
        {/* Text Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`relative px-6 py-4 shadow-lg mb-3 ${
            isUser
              ? 'bg-white text-gray-800 rounded-3xl rounded-tr-sm border border-gray-200'
              : 'bg-blue-50 text-gray-800 rounded-3xl rounded-tl-sm border border-blue-100'
          }`}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>

          {/* Cloud bubble effect */}
          {!isUser && (
            <>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-50 rounded-full border border-blue-100"></div>
              <div className="absolute -bottom-2 left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
            </>
          )}
          {isUser && (
            <>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border border-gray-200"></div>
              <div className="absolute -bottom-2 right-1 w-2 h-2 bg-white rounded-full"></div>
            </>
          )}
        </motion.div>

        {/* Structured Data Display */}
        {showStructuredData && (
          <StructuredDataDisplay data={message.structuredData} />
        )}
      </div>

      {isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-lg"
        >
          <User2Icon className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

const StructuredDataDisplay = ({ data }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  const getWeatherIcon = (condition) => {
    if (!condition) return <Sun className="w-5 h-5 text-yellow-500" />;
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) return <CloudRain className="w-5 h-5 text-blue-500" />;
    if (conditionLower.includes('cloud')) return <Cloud className="w-5 h-5 text-gray-500" />;
    if (conditionLower.includes('wind')) return <Wind className="w-5 h-5 text-gray-400" />;
    return <Sun className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      {/* Destination Header */}
      {data.suggested_destinations && data.suggested_destinations.length > 0 && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-white" />
            <div>
              <p className="text-white/80 text-sm font-medium">Destination</p>
              <p className="text-white text-xl font-bold">
                {data.suggested_destinations.join(', ')}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Budget Summary */}
      {data.estimated_cost && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Estimated Cost</p>
                <p className="text-gray-900 text-2xl font-bold">
                  ₹{data.estimated_cost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Activities Overview */}
      {data.Activities && data.Activities.length > 0 && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900 font-bold text-lg">Activities Included</h3>
          </div>
          <div className="space-y-2">
            {data.Activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{activity}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Day-wise Itinerary */}
      {data.DayWiseItinerary && Object.keys(data.DayWiseItinerary).length > 0 && (
        <motion.div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900 font-bold text-lg">Day-wise Itinerary</h3>
          </div>
          
          {Object.entries(data.DayWiseItinerary).map(([dayKey, dayData], idx) => (
            <motion.div
              key={dayKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Day Header */}
              <button
                onClick={() => setExpandedDay(expandedDay === dayKey ? null : dayKey)}
                className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold rounded-xl px-4 py-2 text-lg">
                    {dayKey.replace('Day ', 'Day ')}
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900 font-semibold text-base">
                      {dayData.day}
                    </p>
                    {dayData.weather_details && (
                      <div className="flex items-center gap-2 mt-1">
                        {getWeatherIcon(dayData.weather_details.condition)}
                        <span className="text-gray-600 text-sm">
                          {dayData.weather_details.temperature || 'Pleasant'} • {dayData.weather_details.condition || 'Good weather'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-gray-600 text-xs">Cost</p>
                    <p className="text-blue-600 font-bold text-base">
                      ₹{dayData.approximate_cost?.toLocaleString()}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedDay === dayKey ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Day Activities (Expandable) */}
              <AnimatePresence>
                {expandedDay === dayKey && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-5 space-y-3 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
                      {dayData.activities?.map((activity, actIdx) => (
                        <motion.div
                          key={actIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: actIdx * 0.05 }}
                          className="flex gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {actIdx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{activity.activity || activity.name || activity}</p>
                            {activity.description && (
                              <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                            )}
                            {activity.cost && (
                              <p className="text-blue-600 text-sm font-semibold mt-2">
                                ₹{activity.cost.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}

     
    </motion.div>
  );
};

export default ChatPage;