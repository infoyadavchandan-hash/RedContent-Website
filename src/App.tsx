import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Music, 
  Video, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Youtube, 
  Instagram, 
  Menu, 
  X,
  Star,
  Zap,
  Users,
  Lock,
  ChevronRight,
  Fingerprint,
  Activity,
  Eye,
  Search
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 6000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.3,
          speed: Math.random() * 0.15 + 0.02,
          opacity: Math.random()
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';

      stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 0.7) star.opacity = 0.7;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-[#030303]"
    />
  );
};

const Counter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const totalSteps = 60 * duration;
      const increment = end / totalSteps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={cn("mb-12 md:mb-16", centered ? "text-center" : "text-left")}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-gradient">{title}</h2>
      {subtitle && <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Performance', href: '#performance' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const logoUrl = "https://lh3.googleusercontent.com/d/1QVC4p_71_AbSeDeosZtgoJ0SOCgljK80";

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-black/40 backdrop-blur-2xl border-b border-white/[0.05] py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <img 
            src={logoUrl} 
            alt="RedContant Digital Logo" 
            className="h-12 md:h-14 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = 'text-2xl font-display font-bold tracking-tighter text-white';
                span.innerText = 'REDCONTANT';
                parent.appendChild(span);
              }
            }}
          />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-white text-black px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/[0.05] overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xl font-display font-medium text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-white text-black px-6 py-4 rounded-2xl text-center font-bold uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const logoUrl = "https://lh3.googleusercontent.com/d/1QVC4p_71_AbSeDeosZtgoJ0SOCgljK80";
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="text-white selection:bg-white selection:text-black">
      <StarBackground />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Next-Gen Copyright Enforcement</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 leading-[1.1] md:leading-[0.9]"
          >
            Protecting <br />
            <span className="text-gradient">Creativity.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4"
          >
            Advanced copyright protection and digital asset security for music and entertainment content. Safeguarding your vision with strategic precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a 
              href="#contact" 
              className="group bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-gray-200 transition-all duration-300 glow-shadow"
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#about" 
              className="px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm border border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              Explore Solutions
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] -z-10" />
      </section>

      {/* Stats Bento */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Daily Actions", value: 250, suffix: "+", icon: <Activity className="text-white/40" /> },
              { label: "Assets Protected", value: 20000, suffix: "+", icon: <Shield className="text-white/40" /> },
              { label: "Uptime Monitoring", value: 100, suffix: "%", icon: <Zap className="text-white/40" /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass glass-hover p-10 rounded-[2.5rem] flex flex-col items-center text-center group"
              >
                <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors">
                  {stat.icon}
                </div>
                <div className="text-5xl font-display font-bold mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Bento Grid */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Strategic Protection" 
            subtitle="We redefine how digital rights are enforced through a blend of human intelligence and advanced monitoring."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-8 glass glass-hover p-12 rounded-[3rem] flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <h3 className="text-4xl font-display font-bold mb-6">Leader in Content Protection</h3>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  RedContant Digital is at the forefront of copyright enforcement. We understand the intrinsic value of your intellectual property and provide a shield against unauthorized use in the modern digital world.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#030303] bg-white/10 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 font-medium">Trusted by 500+ global creators</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 glass glass-hover p-12 rounded-[3rem] flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8">
                <Fingerprint size={40} className="text-white" />
              </div>
              <h4 className="text-2xl font-display font-bold mb-4">Unique Identity</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every piece of content is unique. Our systems ensure its digital fingerprint is protected everywhere.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 glass glass-hover p-12 rounded-[3rem] flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8">
                <Lock size={40} className="text-white" />
              </div>
              <h4 className="text-2xl font-display font-bold mb-4">Secure Rights</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Maintaining full control over your content is not just a service, it's our mission.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-8 glass glass-hover p-12 rounded-[3rem] flex flex-col justify-center"
            >
              <h3 className="text-3xl font-display font-bold mb-6">Our Mission</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                We combine human expertise with strategic monitoring to provide a shield against unauthorized use. We ensure creators maintain full control over their content in the digital world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services - High End Cards */}
      <section id="services" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Core Solutions" 
            subtitle="Tailored protection strategies for the global entertainment industry."
            centered
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Music size={32} />,
                title: "Audio & Sonic Works",
                desc: "Specialized protection for music tracks, DJ remixes, and sonic branding. We ensure your sound remains yours.",
                features: ["Track Fingerprinting", "Global Radio Monitoring", "Remix Identification"]
              },
              {
                icon: <Video size={32} />,
                title: "Visual Content",
                desc: "Robust enforcement for cartoon animations, entertainment videos, and cinematic productions.",
                features: ["Frame-by-Frame Analysis", "Platform-Wide Scanning", "Automated Takedowns"]
              },
              {
                icon: <Globe size={32} />,
                title: "Digital Assets",
                desc: "Global monitoring and enforcement for all digital properties, protecting your brand across the web.",
                features: ["Social Media Guard", "Website Domain Protection", "Brand Asset Security"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="glass glass-hover p-12 rounded-[3.5rem] h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-opacity">
                    {service.icon}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-white/10 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6">{service.title}</h3>
                  <p className="text-gray-400 mb-10 leading-relaxed flex-grow">{service.desc}</p>
                  <ul className="space-y-4">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance - Radial/Visual */}
      <section id="performance" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 leading-tight">Unrivaled <br /><span className="text-gradient">Performance.</span></h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Our continuous monitoring system and fast enforcement protocols set the industry standard for digital rights management.
              </p>
              
              <div className="space-y-12">
                {[
                  { label: "Daily Copyright Actions", value: 250, max: 300 },
                  { label: "Detection Accuracy", value: 99, max: 100, suffix: "%" },
                  { label: "Enforcement Speed", value: 95, max: 100, suffix: "%" }
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-4 items-end">
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">{stat.label}</span>
                      <span className="text-3xl font-display font-bold">
                        <Counter value={stat.value} suffix={stat.suffix || "+"} />
                      </span>
                    </div>
                    <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/[0.02] blur-[100px] rounded-full" />
              <div className="grid grid-cols-1 gap-6 relative z-10">
                {[
                  { icon: <Eye size={24} />, title: "24/7 Vigilance", desc: "Our systems never sleep, scanning the global web every second." },
                  { icon: <Zap size={24} />, title: "Rapid Response", desc: "Immediate action protocols to neutralize unauthorized content." },
                  { icon: <Activity size={24} />, title: "Live Analytics", desc: "Real-time insights into your content's digital footprint." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass glass-hover p-10 rounded-[2.5rem] flex items-start gap-8"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section id="process" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="The Process" 
            subtitle="A streamlined, high-efficiency workflow designed for maximum protection."
            centered
          />
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.05] hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { step: "01", title: "Monitoring", desc: "Automated systems scan major platforms for your intellectual property.", icon: <Search size={20} /> },
                { step: "02", title: "Review", desc: "Our experts verify detections to ensure 100% accuracy and zero false positives.", icon: <CheckCircle2 size={20} /> },
                { step: "03", title: "Enforcement", desc: "Immediate legal and technical actions to remove unauthorized infringements.", icon: <Zap size={20} /> },
                { step: "04", title: "Protection", desc: "Ongoing vigilance and strategic reporting to prevent future use.", icon: <Shield size={20} /> }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#030303] border border-white/10 flex items-center justify-center mb-10 relative z-10 group-hover:border-white/30 transition-colors">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/20 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Editorial Style */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-5xl font-display font-bold mb-8 leading-tight">What Our <br /><span className="text-gradient">Clients Say.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Trusted by leading creators and entertainment companies worldwide to safeguard their digital legacy.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030303] bg-white/10" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">+500 Happy Clients</span>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Alex Rivera",
                  role: "Music Producer",
                  text: "RedContant Digital changed how I manage my catalog. Their daily enforcement is incredibly effective and gives me peace of mind."
                },
                {
                  name: "Sarah Chen",
                  role: "Animation Studio Lead",
                  text: "The level of accuracy in their detection is unmatched. They've successfully protected our visual assets across multiple global platforms."
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-12 rounded-[3rem] flex flex-col justify-between"
                >
                  <p className="text-xl text-gray-300 italic mb-10 font-light leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <div className="font-display font-bold text-lg">{testimonial.name}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact - Premium Form */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-[4rem] overflow-hidden grid lg:grid-cols-2">
            <div className="p-8 sm:p-16 lg:p-24 flex flex-col justify-between bg-white/[0.02]">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-10 leading-tight">Let's Secure <br />Your <span className="text-gradient">Future.</span></h2>
                <p className="text-lg sm:text-xl text-gray-400 mb-12 sm:mb-16 leading-relaxed">
                  Ready to protect your digital legacy? Contact our team for a strategic consultation.
                </p>
                
                <div className="space-y-10">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-1">Email Us</div>
                      <a href="mailto:legal@redcontentdigital.com" className="text-base md:text-lg font-medium hover:text-gray-400 transition-colors block">legal@redcontentdigital.com</a>
                      <a href="mailto:musicrajpuras@gmail.com" className="text-base md:text-lg font-medium hover:text-gray-400 transition-colors block">musicrajpuras@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-1">Visit Us</div>
                      <p className="text-lg font-medium">C7, Shivani PG, Challera, Gali Number 2 Noida, Uttar Pradesh 201303 IN</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-16">
                <a href="https://www.youtube.com/channel/UC0pGu1s_vTAarIvRbNOUTDA" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Youtube size={24} />
                </a>
                <a href="https://www.instagram.com/redcontantdigital/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            <div className="p-8 sm:p-16 lg:p-24 border-l border-white/[0.05]">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-xl font-light"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-xl font-light"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-xl font-light resize-none"
                    placeholder="Tell us about your project"
                  />
                </div>
                <button className="w-full bg-white text-black font-bold py-6 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all transform hover:-translate-y-1 glow-shadow">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-sm">
              <img 
                src={logoUrl} 
                alt="RedContant Digital Logo" 
                className="h-14 w-auto object-contain mb-8"
                referrerPolicy="no-referrer"
              />
              <p className="text-gray-500 leading-relaxed">
                Leading the way in digital content protection and copyright enforcement. Safeguarding the creative vision of the modern world.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white">Platform</h4>
                <div className="flex flex-col gap-4 text-sm text-gray-500">
                  <a href="#home" className="hover:text-white transition-colors">Home</a>
                  <a href="#about" className="hover:text-white transition-colors">About</a>
                  <a href="#services" className="hover:text-white transition-colors">Services</a>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white">Company</h4>
                <div className="flex flex-col gap-4 text-sm text-gray-500">
                  <a href="#process" className="hover:text-white transition-colors">Process</a>
                  <a href="#performance" className="hover:text-white transition-colors">Performance</a>
                  <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white">Social</h4>
                <div className="flex flex-col gap-4 text-sm text-gray-500">
                  <a href="https://www.youtube.com/channel/UC0pGu1s_vTAarIvRbNOUTDA" className="hover:text-white transition-colors">YouTube</a>
                  <a href="https://www.instagram.com/redcontantdigital/" className="hover:text-white transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
            <div>© {new Date().getFullYear()} RedContant Digital. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
