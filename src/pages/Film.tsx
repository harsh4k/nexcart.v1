import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function FilmPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Auto-play blocked:", err));
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link to="/" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-gray-400 transition-colors">
          <ArrowLeft size={20} /> Back to Shop
        </Link>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/50">
          NexCart Design Lab — Film 01
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div style={{ scale, opacity }} className="w-full h-full relative">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              src="/blackhole.mp4"
              />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Centered Content */}
          <motion.div 
            style={{ y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs font-bold tracking-[0.5em] uppercase mb-6 text-white/70"
            >
              A Cinematic Experience
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-7xl md:text-9xl font-black tracking-tighter mb-8"
            >
              BEYOND <br /> HORIZONS.
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="w-px h-24 bg-gradient-to-b from-white to-transparent"
            />
          </motion.div>

          {/* Controls */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20">
            <div className="flex gap-4">
              <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>
              <button 
                onClick={toggleMute}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            <div className="hidden md:block max-w-xs text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Director's Note</p>
              <p className="text-xs text-white/80 leading-relaxed">
                Exploring the intersection of physical form and digital consciousness. A journey through the void of design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="relative z-10 py-48 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-8">The Void of Design.</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                In the silence of space, we find the purest forms. NexCart is not just about products; it's about the space they occupy in our lives. Our design philosophy is rooted in the belief that minimalism is the ultimate sophistication.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every curve, every material, and every interaction is a deliberate choice. We strip away the noise to reveal the essence of technology.
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000" 
                alt="Space" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 3D-like Parallax Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Deep Space" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center">
          <motion.h3 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-[15vw] font-black text-white/10 uppercase tracking-tighter leading-none"
          >
            IMMERSION.
          </motion.h3>
          <div className="absolute inset-0 flex items-center justify-center">
            <h4 className="text-2xl font-bold tracking-[1em] uppercase">The Future is Now</h4>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-48 px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">Ready to explore?</h2>
        <Link 
          to="/" 
          className="px-12 py-6 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block"
        >
          Return to Collection
        </Link>
      </section>
    </div>
  );
}
