import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { User2Icon } from 'lucide-react';
import StructuredDataDisplay from './StructuredDataDisplay';

const MessageBubble = ({ message, index }) => {
  const isUser = message.type === 'user';
  const hasStructuredData = message.structuredData && !isUser;
  const showStructuredData =
    hasStructuredData &&
    (message.structuredData.DayWiseItinerary ||
      message.structuredData.Activities ||
      message.structuredData.hotel_details ||
      message.structuredData.estimated_cost);

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

export default MessageBubble;
