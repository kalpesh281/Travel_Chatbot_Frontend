import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

function EmptyChat() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-sky-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Start a conversation
        </h3>
        <p className="text-gray-600">
          Ask me about destinations, travel tips, itineraries, or anything
          travel-related!
        </p>
      </div>
    </motion.div>
  );
}

export default EmptyChat;
