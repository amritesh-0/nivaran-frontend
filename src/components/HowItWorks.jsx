import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CameraIcon, MapIcon, ClockIcon, BellIcon } from '@heroicons/react/24/outline';
import Container from './common/Container';
import SectionHeader from './common/SectionHeader';

const Lottie = lazy(() => import('lottie-react'));

const HowItWorks = () => {
  const [animationData, setAnimationData] = useState(null);
  const [animationError, setAnimationError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch('/lottie/route.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load animation');
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setAnimationData(data.default ?? data);
          setAnimationError(false);
        }
      })
      .catch(() => isMounted && setAnimationError(true));

    return () => { isMounted = false; };
  }, []);

  const steps = [
    {
      icon: CameraIcon,
      title: 'Snap & tag',
      text: 'Capture a photo and auto-locate in seconds.',
      delay: 0,
    },
    {
      icon: MapIcon,
      title: 'Auto-route',
      text: 'Smartly routes to the right department for action.',
      delay: 0.1,
    },
    {
      icon: ClockIcon,
      title: 'Track status',
      text: 'Follow progress with real-time updates and timelines.',
      delay: 0.2,
    },
    {
      icon: BellIcon,
      title: 'Get notified',
      text: 'Receive confirmation, acknowledgment, and resolution alerts.',
      delay: 0.3,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-bg-secondary dark:bg-gray-900 relative overflow-hidden"
      aria-labelledby="how-it-works-title"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-500/10 via-transparent to-brand-violet/10" />
        <Suspense fallback={null}>
          {!animationError && animationData && (
            <Lottie
              animationData={animationData}
              loop
              className="absolute inset-0 w-[480px] h-[480px] opacity-20"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              aria-hidden="true"
            />
          )}
        </Suspense>
      </div>

      {/* Section Content */}
      <Container className="relative z-10">
        <SectionHeader
          kicker="Simple Process"
          title="How it works"
          subtitle="From report to resolution in four easy steps"
          centered
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="relative group focus-within:ring-2 focus-within:ring-brand-blue-500 rounded-xl outline-none"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay, ease: 'easeOut' }}
                whileHover={{ y: -10, rotate: -1 }}
                tabIndex={0}
                role="listitem"
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-brand-blue-400/50 h-full relative">
                  {/* Icon + Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-brand-blue-500 to-brand-violet rounded-xl flex items-center justify-center shadow-md">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <motion.div
                      className="text-3xl font-extrabold text-brand-blue-500/30 select-none"
                      whileHover={{ scale: 1.15 }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted leading-relaxed">
                    {step.text}
                  </p>
                </div>

                {/* Arrow connector on large screens */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 w-10 h-0.5 bg-gradient-to-r from-brand-blue-500 to-transparent"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
