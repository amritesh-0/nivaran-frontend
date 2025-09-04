import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { PlayIcon, ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import Container from './common/Container';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const Lottie = lazy(() => import('lottie-react'));

const heroStats = [
  { label: 'Avg acknowledgment', value: '< 2 hours' },
  { label: 'Issues resolved', value: '10K+' },
  { label: 'Coverage', value: 'City-wide' },
];

const Hero = () => {
  const [animationData, setAnimationData] = useState(null);
  const [animationError, setAnimationError] = useState(false);
  const [cleanAnimationData, setCleanAnimationData] = useState(null);
  const [cleanAnimationError, setCleanAnimationError] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadJson = (url) =>
      fetch(url).then((r) => {
        if (!r.ok) throw new Error(`Failed to load ${url}`);
        return r.json();
      });

    Promise.allSettled([loadJson('/lottie/report.json'), loadJson('/lottie/clean.json')])
      .then((results) => {
        if (!isMounted) return;
        const [reportRes, cleanRes] = results;

        if (reportRes.status === 'fulfilled') {
          const data = reportRes.value?.default ?? reportRes.value;
          setAnimationData(data);
          setAnimationError(false);
        } else {
          setAnimationError(true);
        }

        if (cleanRes.status === 'fulfilled') {
          const data = cleanRes.value?.default ?? cleanRes.value;
          setCleanAnimationData(data);
          setCleanAnimationError(false);
        } else {
          setCleanAnimationError(true);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setAnimationError(true);
        setCleanAnimationError(true);
      });

    controls.start({
      y: [0, 6, 0],
      opacity: [1, 1, 0.2, 1],
      transition: { loop: Infinity, duration: 1.8, ease: 'easeInOut' },
    });

    return () => {
      isMounted = false;
    };
  }, [controls]);

  // Accessible spinner
  const Spinner = ({ size = 12 }) => (
    <div
      role="status"
      aria-label="Loading animation"
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
      className="border-4 border-[#5B9DFF]/30 border-t-[#5B9DFF] rounded-full animate-spin"
    />
  );

  // Lottie wrappers
  const ReportLottie = ({ fit = 'meet' }) =>
    animationData && (
      <Lottie
        animationData={animationData}
        loop
        aria-label="Civic reporting animation"
        className="w-full h-full"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        rendererSettings={{
          preserveAspectRatio: fit === 'slice' ? 'xMidYMid slice' : 'xMidYMid meet',
          clearCanvas: true,
        }}
      />
    );

  const CleanLottie = ({ fit = 'meet' }) =>
    cleanAnimationData && (
      <Lottie
        animationData={cleanAnimationData}
        loop
        aria-label="City cleaning animation"
        className="w-full h-full"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        rendererSettings={{
          preserveAspectRatio: fit === 'slice' ? 'xMidYMid slice' : 'xMidYMid meet',
          clearCanvas: true,
        }}
      />
    );

  return (
    <section
      className="relative min-h-screen flex items-center bg-bg-DEFAULT dark:bg-[#10151E] overflow-hidden"
      aria-label="Hero, report civic issues in seconds"
    >
      {/* Background gradient wash */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.33 }}
        style={{
          background: 'linear-gradient(139deg,#5B9DFF33 10%,#7CCBFF33 60%,#A9BFFF33 95%)',
        }}
      />

      {/* Subtle grain overlay */}
      <div
        className="grain absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg width=\"32\" height=\"32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"32\" height=\"32\" fill=\"%23F5F7FA\"/><circle fill-opacity=\".04\" cx=\"6\" cy=\"22\" r=\"3\" fill=\"%23222222\"/><circle fill-opacity=\".04\" cx=\"26\" cy=\"10\" r=\"2\" fill=\"%23222222\"/></svg>')",
          opacity: 0.13,
          mixBlendMode: 'overlay',
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen pt-16">
          {/* LEFT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-10"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary dark:text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              tabIndex={0}
            >
              Report civic issues in{' '}
              <span className="text-gradient bg-gradient-to-r from-[#5B9DFF] via-[#7CCBFF] to-[#A9BFFF] bg-clip-text text-transparent drop-shadow-lg">
                seconds
              </span>
              .{' '}
              <span className="block text-gradient bg-gradient-to-l from-[#5B9DFF] via-[#7CCBFF] to-[#A9BFFF] bg-clip-text text-transparent">
                See them resolved.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-text-muted dark:text-slate-300 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
            >
              Capture a photo, auto-tag location, and track status in real time.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              role="group"
              aria-label="Call To Actions"
            >
              <Button
                size="lg"
                aria-label="Start Reporting"
                className="focus-visible:ring-4 focus-visible:ring-[#5B9DFF]"
                onClick={() => navigate('/auth')}
              >
                Start Reporting
              </Button>
              <Button variant="ghost" size="lg" className="group" aria-label="Watch how it works">
                <PlayIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Watch how it works
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16 } } }}
            >
              {heroStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.7 + idx * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div
                    aria-live="polite"
                    className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#5B9DFF] via-[#7CCBFF] to-[#A9BFFF] bg-clip-text"
                  >
                    {stat.value}
                  </div>
                  <div className="text-text-muted dark:text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: VISUAL PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.22 }}
            className="relative w-full"
            aria-label="Hero animations"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[3/2]">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2.5rem] shadow-2xl"
                  style={{
                    background: 'linear-gradient(90deg,#5B9DFF,#7CCBFF,#A9BFFF,#5B9DFF)',
                    backgroundSize: '300% 100%',
                    padding: '3px',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '200% 0%', '300% 0%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.25, 0.75, 1],
                  }}
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-[calc(1.25rem-3px)] sm:rounded-[calc(1.5rem-3px)] lg:rounded-[calc(2.5rem-3px)] bg-white dark:bg-gray-950 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 p-3 sm:p-4 lg:p-5">
                      {/* MOBILE: single Lottie */}
                      <div className="lg:hidden w-full h-full">
                        <Suspense
                          fallback={
                            <div className="w-full h-full min-h-[220px] flex items-center justify-center">
                              <Spinner size={12} />
                            </div>
                          }
                        >
                          {animationError ? (
                            <div className="w-full h-full flex items-center justify-center text-red-500">
                              Animation unavailable
                            </div>
                          ) : (
                            <ReportLottie fit="slice" />
                          )}
                        </Suspense>
                      </div>

                      {/* DESKTOP: two Lotties */}
                      <div className="hidden lg:block w-full h-full">
                        <div className="grid grid-cols-2 gap-5 h-full">
                          <div className="relative flex items-center justify-center bg-gradient-to-br from-[#5B9DFF10] to-[#A9BFFF10] rounded-2xl">
                            <Suspense
                              fallback={
                                <div className="w-full h-[200px] flex items-center justify-center">
                                  <Spinner size={14} />
                                </div>
                              }
                            >
                              {animationError ? (
                                <div className="w-full h-[200px] flex items-center justify-center text-red-500">
                                  Animation unavailable
                                </div>
                              ) : (
                                <ReportLottie fit="meet" />
                              )}
                            </Suspense>
                          </div>

                          <div className="relative flex items-center justify-center bg-gradient-to-br from-[#5B9DFF10] to-[#A9BFFF10] rounded-2xl">
                            <Suspense
                              fallback={
                                <div className="w-full h-[200px] flex items-center justify-center">
                                  <Spinner size={14} />
                                </div>
                              }
                            >
                              {cleanAnimationError ? (
                                <div className="w-full h-[200px] flex items-center justify-center text-red-500">
                                  Animation unavailable
                                </div>
                              ) : (
                                <CleanLottie fit="meet" />
                              )}
                            </Suspense>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating status chip */}
              <motion.div
                className="absolute -top-5 -right-5 bg-white dark:bg-gray-900 rounded-xl p-3 shadow"
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                aria-hidden="true"
              >
                <div className="text-xs font-medium text-[#5B9DFF]">Status: Routed</div>
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.div
              className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 z-20 pointer-events-none select-none"
              animate={controls}
              tabIndex={-1}
              aria-hidden="true"
            >
              <ChevronDoubleDownIcon className="w-7 h-7 text-[#5B9DFF] opacity-80 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
