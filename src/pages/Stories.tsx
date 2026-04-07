import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Tag, ChevronRight } from 'lucide-react';
import { STORIES } from '../data/stories';
import { Story } from '../types';

const StoryCard: React.FC<{ story: Story, isFeatured?: boolean }> = ({ story, isFeatured = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    layout
    className={`group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 ${isFeatured ? 'md:grid md:grid-cols-2 gap-0' : ''}`}
  >
    <div className={`overflow-hidden ${isFeatured ? 'h-[400px] md:h-full' : 'aspect-[4/3]'}`}>
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        src={story.coverImage}
        alt={story.title}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className={`p-8 flex flex-col justify-center ${isFeatured ? 'md:p-12' : ''}`}>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 px-3 py-1 border border-gray-100 rounded-full">
          {story.category}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Clock size={12} /> {story.readTime}
        </span>
      </div>
      <h3 className={`${isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl'} font-bold tracking-tight mb-4 group-hover:text-gray-600 transition-colors`}>
        {story.title}
      </h3>
      <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed">
        {story.excerpt}
      </p>
      <Link 
        to={`/stories/${story.slug}`}
        className="flex items-center gap-2 text-sm font-bold group/btn"
      >
        Read More 
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </motion.span>
      </Link>
    </div>
  </motion.div>
);

export default function StoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(STORIES.map(s => s.category))], []);
  const tags = useMemo(() => ['All', ...new Set(STORIES.flatMap(s => s.tags))], []);

  const filteredStories = useMemo(() => {
    return STORIES.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
      const matchesTag = activeTag === 'All' || story.tags.includes(activeTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, activeCategory, activeTag]);

  const featuredStory = STORIES[0];
  const isFiltering = searchQuery || activeCategory !== 'All' || activeTag !== 'All';
  const otherStories = filteredStories.filter(s => s.id !== featuredStory.id || isFiltering);

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block"
            >
              The Magazine
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter"
            >
              Stories of <br /> Innovation.
            </motion.h1>
          </div>
          
          <div className="flex flex-col gap-6 w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-black transition-all w-full text-sm"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-black text-white shadow-lg shadow-black/20' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTag === tag ? 'bg-gray-800 text-white shadow-lg shadow-black/20' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Story */}
        {!isFiltering && (
          <div className="mb-16">
            <StoryCard story={featuredStory} isFeatured />
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {otherStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </AnimatePresence>
        </div>

        {filteredStories.length === 0 && (
          <div className="py-24 text-center bg-white rounded-[3rem] shadow-sm">
            <p className="text-gray-400 font-medium">No stories found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveTag('All'); }}
              className="mt-4 px-8 py-3 bg-black text-white rounded-full text-sm font-bold hover:scale-105 transition-transform"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
