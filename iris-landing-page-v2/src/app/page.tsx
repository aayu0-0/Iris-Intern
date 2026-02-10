'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Play, Battery, Wifi, Bluetooth, Zap, Eye, Mic, Camera, Shield, Check, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function IRISLandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const scrollVideoSectionRef = useRef<HTMLDivElement>(null);
  const scrollVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<HTMLDivElement>(null);
  const smartFeaturesRef = useRef<HTMLDivElement>(null);
  const chargingRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const preorderRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Hero section animations
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8, stagger: 0.2 }
      );

      // Scroll-synced video removed - now uses normal loop playback

      // Reveal animations for sections
      const sections = [showcaseRef, scrollVideoSectionRef, audioRef, micRef, smartFeaturesRef, chargingRef, specsRef, preorderRef];

      sections.forEach((section) => {
        if (section.current) {
          const items = section.current.querySelectorAll('.reveal-item');
          if (items.length > 0) {
            gsap.fromTo(items,
              { opacity: 0, y: 80 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: {
                  trigger: section.current,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }
        }
      });

      // Parallax effects
      const parallaxImages = document.querySelectorAll('.parallax-image');
      parallaxImages.forEach((img) => {
        const parent = (img as HTMLElement).parentElement;
        if (parent) {
          gsap.to(img, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: parent,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans scroll-smooth">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between bg-black/20 backdrop-blur-sm transition-all duration-200">
          {/* Left: Brand */}
          <a
            href="#hero"
            className="text-xl md:text-2xl font-semibold tracking-tight text-white transition-all duration-200 hover:opacity-80"
          >
            IRIS
          </a>

          {/* Right: Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm">
            <a
              href="#features"
              className="px-4 py-2 rounded-full text-gray-400 hover:text-gray-200 transition-all duration-200 hover:bg-white/5"
            >
              How It Works
            </a>
            <a
              href="#specs"
              className="px-4 py-2 rounded-full text-gray-400 hover:text-gray-200 transition-all duration-200 hover:bg-white/5"
            >
              What's Inside
            </a>
            <a
              href="#waitlist"
              className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
            >
              Get Early Access
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm md:hidden flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-8 text-lg">
              <a 
                href="#hero" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 rounded-full text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200"
              >
                IRIS
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 rounded-full text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200"
              >
                How It Works
              </a>
              <a 
                href="#specs" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 rounded-full text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200"
              >
                What's Inside
              </a>
              <a 
                href="#waitlist" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
              >
                Get Early Access
              </a>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative h-screen w-full overflow-hidden">
          {!videoLoaded && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            poster="/upload/Glasses_CinematicShot.png"
            onCanPlay={() => setVideoLoaded(true)}
            onLoadStart={() => setVideoLoaded(false)}
          >
            <source src="/upload/heroSection.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/90" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight max-w-4xl mb-4">
              See Beyond Reality
            </h1>
            <p className="hero-title text-lg md:text-xl lg:text-2xl text-gray-400 font-normal tracking-wide max-w-3xl mx-auto">
              Redefining perception through intelligence.
            </p>
          </div>
        </section>

        {/* Product Showcase Gallery */}
        <section id="features" ref={showcaseRef} className="py-32 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-item text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Crafted for the Everyday</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                Designed to disappear, engineered to perform. Experience technology that feels like it's barely there.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="reveal-item group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black aspect-[4/5] md:aspect-[4/5] mb-4 md:mb-6">
                  <img
                    src="/upload/feather_light.png"
                    alt="IRIS Smartglasses - Ultra Light Frame"
                    className="parallax-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Ultra-Light Frame</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  Weighing just 45g, IRIS is lighter than most sunglasses. Wear it all day without fatigue.
                </p>
              </div>
              
              <div className="reveal-item group md:mt-12">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black aspect-[4/5] md:aspect-[4/5] mb-4 md:mb-6">
                  <img
                    src="/upload/ad_3rdimage.png"
                    alt="IRIS Smartglasses - Side Profile"
                    className="parallax-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Seamless Design</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  Clean lines and premium materials. Looks like eyewear, performs like intelligent technology.
                </p>
              </div>
              
              <div className="reveal-item group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black aspect-[4/5] md:aspect-[4/5] mb-4 md:mb-6">
                  <img
                    src="/upload/Glasses_CinematicShot.png"
                    alt="IRIS Smartglasses - Detail Shot"
                    className="parallax-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">All-Day Comfort</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  Ergonomically balanced for all-day wear. Perfect for work, travel, and everything in between.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Home/Office Assistant Section */}
        <section id="technology" ref={scrollVideoSectionRef} className="relative h-screen w-full overflow-hidden">
          <video
            ref={scrollVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/upload/room_lighting (without wm).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-5xl">
              <div className="reveal-item mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">Your Intelligent Assistant</h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
                  Control your home and office with natural voice commands and smart gestures
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
                <div className="reveal-item bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-amber-600/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-600/20 mb-4">
                    <Mic className="w-7 h-7 md:w-8 md:h-8 text-amber-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Voice Control</h3>
                  <p className="text-sm md:text-base text-gray-300">Adjust lights, temperature, and more with natural commands</p>
                </div>
                
                <div className="reveal-item bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-amber-600/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-600/20 mb-4">
                    <Eye className="w-7 h-7 md:w-8 md:h-8 text-amber-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Smart Recognition</h3>
                  <p className="text-sm md:text-base text-gray-300">Identify devices and suggest actions automatically</p>
                </div>
                
                <div className="reveal-item bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-amber-600/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-600/20 mb-4">
                    <Zap className="w-7 h-7 md:w-8 md:h-8 text-amber-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Quick Automation</h3>
                  <p className="text-sm md:text-base text-gray-300">Create smart routines with simple gestures</p>
                </div>
                
                <div className="reveal-item bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-amber-600/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-600/20 mb-4">
                    <Bluetooth className="w-7 h-7 md:w-8 md:h-8 text-amber-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Seamless Sync</h3>
                  <p className="text-sm md:text-base text-gray-300">Connect to all your smart devices instantly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audio Technology Section */}
        <section id="audio" ref={audioRef} className="py-16 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-item mb-12 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">Premium Audio</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl md:max-w-3xl">
                Immersive sound that surrounds you, wherever you go
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: Audio Features */}
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: Play, title: 'Spatial Audio', desc: '3D sound that follows your head movement' },
                  { icon: Mic, title: 'Active Noise Cancellation', desc: 'Block out the world, focus on what matters' },
                  { icon: Bluetooth, title: 'Multi-Point Connection', desc: 'Connect to multiple devices simultaneously' },
                  { icon: Zap, title: 'Transparency Mode', desc: 'Stay aware of your surroundings' }
                ].map((feature, i) => (
                  <div key={i} className="reveal-item text-left p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-transparent hover:from-gray-800/50 transition-all duration-300 border border-gray-800/50 hover:border-amber-600/30">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-amber-600/20 text-amber-500 flex-shrink-0">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-base text-gray-400 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Images */}
              <div className="reveal-item grid grid-cols-2 gap-3 h-full">
                <div>
                  <img
                    src="/upload/speaker2_ad.jpeg"
                    alt="Audio Design Detail"
                    className="w-full h-40 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </div>
                <div>
                  <img
                    src="/upload/speakers1stframe.jpeg"
                    alt="Speaker Technology"
                    className="w-full h-40 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </div>
                <div className="col-span-2 mt-2">
                  <img
                    src="/upload/speakers_ad.jpeg"
                    alt="Premium Audio System"
                    className="w-full h-56 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voice & Microphone Section */}
        <section ref={micRef} className="py-16 md:py-32 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="reveal-item order-2 lg:order-1">
                <img
                  src="/upload/microphone_ad.jpeg"
                  alt="IRIS Voice Control"
                  className="parallax-image w-full rounded-2xl shadow-2xl"
                />
              </div>
              
              <div className="reveal-item order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">Your Voice, Your Command</h2>
                <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8">
                  Advanced voice recognition technology that understands you better than ever
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-base md:text-lg">Multi-language voice assistant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-base md:text-lg">Beamforming microphone array</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-base md:text-lg">Wind noise reduction technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-base md:text-lg">Voice isolation for clear calls</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Features Section */}
        <section ref={smartFeaturesRef} className="py-16 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-item text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">Smart Features</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl md:max-w-3xl mx-auto">
                Intelligent technology that adapts to your life
              </p>
            </div>
            
            <div className="reveal-item relative rounded-2xl overflow-hidden mb-8 md:mb-12">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[40vh] md:h-[50vh] lg:h-[70vh] object-cover"
              >
                <source src="/upload/scrollable_animation.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Mic, title: 'Smart Voice Assistant', desc: 'AI-powered voice commands with natural language processing' },
                { icon: Bluetooth, title: 'Auto-Pairing', desc: 'Automatically connects to your trusted devices' },
                { icon: Shield, title: 'Privacy First', desc: 'On-device processing keeps your data secure' }
              ].map((feature, i) => (
                <div key={i} className="reveal-item p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-amber-600/50 transition-all group">
                  <div className="p-3 md:p-4 rounded-xl bg-amber-600/20 text-amber-500 w-fit mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Charging & Battery Section */}
        <section ref={chargingRef} className="py-16 md:py-32 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="reveal-item">
                <img
                  src="/upload/charging_ad.jpeg"
                  alt="IRIS Charging Case"
                  className="parallax-image w-full rounded-2xl shadow-2xl"
                />
              </div>
              
              <div className="reveal-item">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">Power That Lasts</h2>
                <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-10">
                  All-day battery life with intelligent power management
                </p>
                
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                  <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black">
                    <Battery className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-amber-500" />
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">8h</div>
                    <div className="text-xs md:text-sm text-gray-400">Continuous Use</div>
                  </div>
                  <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black">
                    <Zap className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-amber-500" />
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">32h</div>
                    <div className="text-xs md:text-sm text-gray-400">With Case</div>
                  </div>
                  <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black">
                    <Wifi className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-amber-500" />
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">15min</div>
                    <div className="text-xs md:text-sm text-gray-400">Quick Charge</div>
                  </div>
                  <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black">
                    <Bluetooth className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-amber-500" />
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">5.0</div>
                    <div className="text-xs md:text-sm text-gray-400">Bluetooth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Specs Section */}
        <section id="specs" ref={specsRef} className="py-16 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-item text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">Technical Specifications</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: Mic, label: 'Audio', value: 'Spatial 3D Sound' },
                { icon: Wifi, label: 'Connectivity', value: 'Bluetooth 5.0' },
                { icon: Battery, label: 'Battery', value: '500mAh Li-ion' },
                { icon: Shield, label: 'Weight', value: '45g (ultra-light)' },
                { icon: Zap, label: 'Processor', value: 'Neural Engine Chip' },
                { icon: Bluetooth, label: 'Range', value: '10m Bluetooth' },
                { icon: Mic, label: 'Microphone', value: 'Beamforming Array' },
                { icon: Shield, label: 'Water Resistance', value: 'IPX4 Rated' }
              ].map((spec, i) => (
                <div key={i} className="reveal-item p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 text-center hover:border-amber-600/50 transition-all">
                  <div className="p-2 md:p-3 rounded-full bg-amber-600/20 text-amber-500 w-fit mx-auto mb-3 md:mb-4">
                    <spec.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">{spec.label}</div>
                  <div className="text-sm md:text-base lg:text-lg font-semibold">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" ref={preorderRef} className="py-16 md:py-32 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal-item">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4">
                The future awaits
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-amber-500 mb-4 md:mb-6">
                Experience IRIS.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                Be the first to know when IRIS becomes available. Join the waitlist for exclusive early access.
              </p>
            </div>
            
            <div className="reveal-item flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 md:px-6 py-3 md:py-4 rounded-full bg-gray-900 border border-gray-700 text-white text-sm md:text-base focus:outline-none focus:border-amber-500 w-full sm:w-80 md:w-96 transition-all"
              />
              <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-base md:text-lg font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)] whitespace-nowrap">
                Notify Me
              </button>
            </div>
            
            <div className="reveal-item flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                No spam
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 md:py-16 px-4 md:px-8 lg:px-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">IRIS</div>
                <p className="text-sm md:text-base text-gray-400">
                  Next-generation smartglasses for the modern world
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 md:mb-4">Product</h4>
                <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-400">
                  <li><a href="#features" className="hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="#specs" className="hover:text-white transition-colors">What's Inside</a></li>
                  <li><a href="#waitlist" className="hover:text-white transition-colors">Get Early Access</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 md:mb-4">Support</h4>
                <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 md:mb-4">Company</h4>
                <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-gray-800 gap-4">
              <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
                © 2025 IRIS Smartglasses. All rights reserved.
              </p>
              <div className="flex gap-4 md:gap-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">YouTube</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}
