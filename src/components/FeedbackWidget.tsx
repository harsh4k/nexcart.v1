import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

export const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setFeedback('');
      setRating(null);
    }, 3000);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 left-0 w-80 bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold tracking-tight">Feedback</h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 size={32} />
                </motion.div>
                <p className="font-bold">Thank you!</p>
                <p className="text-xs text-gray-400 mt-2">Your feedback helps us improve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        rating === num ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think..."
                  rows={4}
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={!rating || !feedback}
                  className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:bg-gray-200"
                >
                  <Send size={16} /> Send Feedback
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
};
