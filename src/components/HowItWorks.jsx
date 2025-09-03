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
      .then(response => {
        if (!response.ok) throw new Error('Failed to load animation');
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          setAnimationData(data.default ? data.default : data);
          setAnimationError(false);
        }
      })
      .catch(() => {
        if (isMounted) setAnimationError(true);
      });
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
      className="py-24 bg-bg-muted dark:bg-gray-900 relative overflow-hidden"
      aria-label="How It Works"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <Suspense
          fallback={
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 384,
                height: 384,
                background: '#eee',
                border: '2px dashed #f00',
                borderRadius: '1rem',
              }}
              aria-label="Loading animation"
            />
          }
        >
          {animationError ? (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 384,
                height: 384,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fee',
                color: '#c00',
                border: '2px solid #c00',
                borderRadius: '1rem',
              }}
            >
              Animation unavailable
            </div>
          ) : animationData ? (
            <Lottie
              animationData={animationData}
              style={{
                width: 384,
                height: 384,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
              loop={true}
              aria-label="Lottie animation"
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 384,
                height: 384,
                background: '#eee',
                border: '2px dashed #f00',
                borderRadius: '1rem',
              }}
              aria-label="Loading animation"
            />
          )}
        </Suspense>
      </div>

      {/* Section Content */}
      <Container className="relative z-10">
        <SectionHeader
          kicker="Simple Process"
          title="How it works"
          subtitle="From report to resolution in four simple steps"
          centered
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: step.delay,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -8 }}
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-transparent group-hover:border-brand-blue-500 group-hover:border-opacity-50 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-brand-primary rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="text-3xl font-bold text-brand-blue-500 opacity-30">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">{step.text}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-brand-blue-500 to-transparent"
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
