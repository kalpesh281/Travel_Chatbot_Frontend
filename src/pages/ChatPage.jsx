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
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';

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
                  Our AI is finding the best options for you. This may take a
                  few moments.
                </div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-50 rounded-full border border-blue-100"></div>
                <div className="absolute -bottom-2 left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section - Fixed at Bottom */}
      <div className="">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
