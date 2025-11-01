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
      // Generate new session ID if not exists
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
      // Call the Flask API
      const response = await axios.post(`http://127.0.0.1:5001/chat`, {
        user_input: currentInput,
        session_id: sessionId,
      });
      console.log('API Response:', response.data);
      const botResponse = {
        type: 'bot',
        text: response.data.ai_reply,
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
    // Only set up a new session ID if one does not exist
    let storedSessionId = localStorage.getItem('travel_chat_session_id');
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('travel_chat_session_id', storedSessionId);
      setSessionId(storedSessionId);
    } else {
      setSessionId(storedSessionId);
    }

    // Reset messages to show welcome and ask name
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
                {/* Cloud effect */}
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-50 rounded-full border border-blue-100"></div>
                <div className="absolute -bottom-2 left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
              </div>
            </motion.div>
          )}

          {/* Quick Suggestions - Only shown at start */}
          {messages.length === 1 && (
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
          )}

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

      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative max-w-[70%] px-6 py-4 shadow-lg ${
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

      {isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-bold text-sm"><User2Icon /></span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatPage;
