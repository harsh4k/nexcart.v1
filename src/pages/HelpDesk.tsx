import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  Send, 
  ThumbsUp, 
  ThumbsDown,
  HelpCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const FAQS = [
  {
    category: 'Shipping',
    icon: Truck,
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business day delivery.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International rates vary by location.' },
      { q: 'Can I track my order?', a: 'Absolutely. Once your order ships, you will receive a tracking number via email.' }
    ]
  },
  {
    category: 'Returns',
    icon: RotateCcw,
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 30-day return policy for all unused items in their original packaging.' },
      { q: 'How do I start a return?', a: 'Visit our returns portal or contact our support team to receive a return label.' },
      { q: 'Are returns free?', a: 'Returns are free for domestic orders. International returns may incur a shipping fee.' }
    ]
  },
  {
    category: 'Product & Warranty',
    icon: ShieldCheck,
    questions: [
      { q: 'What is the warranty period?', a: 'All NexCart products come with a 2-year limited warranty against manufacturing defects.' },
      { q: 'Are the products water-resistant?', a: 'Most of our wearables are IP68 rated, meaning they are water-resistant up to 1.5m for 30 minutes.' },
      { q: 'How do I update my device firmware?', a: 'Firmware updates are handled automatically through the NexCart mobile app.' }
    ]
  }
];

export default function HelpDeskPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const filteredFaqs = FAQS.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            How can we <br /> help you?
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white rounded-[2.5rem] shadow-sm border-none focus:ring-2 focus:ring-black transition-all text-lg"
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQs */}
          <div className="lg:col-span-2 space-y-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <cat.icon size={24} className="text-black" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{cat.category}</h2>
                  </div>
                  <div className="space-y-4">
                    {cat.questions.map((faq) => (
                      <div key={faq.q} className="bg-white rounded-[2rem] shadow-sm overflow-hidden">
                        <button 
                          onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                          className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-bold pr-8">{faq.q}</span>
                          <ChevronDown 
                            size={20} 
                            className={`text-gray-400 transition-transform duration-300 ${openFaq === faq.q ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {openFaq === faq.q && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-8 pb-8 text-gray-500 text-sm leading-relaxed"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm">
                <HelpCircle size={64} className="text-gray-100 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Contact & Feedback */}
          <div className="space-y-8">
            {/* Contact Form */}
            <div className="bg-black text-white p-10 rounded-[3rem] shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Direct Support</h3>
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none focus:ring-2 focus:ring-white transition-all text-sm" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none focus:ring-2 focus:ring-white transition-all text-sm" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-1">Message</label>
                  <textarea 
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none focus:ring-2 focus:ring-white transition-all text-sm resize-none" 
                    placeholder="How can we help?" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full py-5 bg-white text-black rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <CheckCircle2 size={18} /> Sent
                    </motion.div>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Feedback Section */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm text-center">
              <h3 className="text-xl font-bold mb-2">Was this helpful?</h3>
              <p className="text-gray-500 text-sm mb-8">Your feedback helps us improve our support experience.</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setFeedbackType('positive')}
                  className={`flex-1 py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                    feedbackType === 'positive' ? 'bg-green-50 border-green-200 text-green-600' : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Yes</span>
                </button>
                <button 
                  onClick={() => setFeedbackType('negative')}
                  className={`flex-1 py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                    feedbackType === 'negative' ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsDown size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">No</span>
                </button>
              </div>
              {feedbackType && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-xs font-medium text-gray-400"
                >
                  Thank you for your feedback!
                </motion.p>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-6 bg-white rounded-[2rem] shadow-sm">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Live Chat</p>
                  <p className="text-xs text-gray-400">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-[2rem] shadow-sm">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Call Us</p>
                  <p className="text-xs text-gray-400">+1 (888) NEX-CART</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
