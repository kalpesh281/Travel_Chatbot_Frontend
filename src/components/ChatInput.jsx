import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ChatInput = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  inputRef,
}) => (
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
            inputMessage.trim() && !isLoading ? 'text-white' : 'text-gray-500'
          }`}
        />
      </motion.button>
    </form>
  </motion.div>
);

export default ChatInput;
