
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from './common/Container';
import Button from './common/Button';

const Lottie = lazy(() => import('lottie-react'));

const CallToAction = () => {
  const [animationData, setAnimationData] = useState(null);
  const [animationError, setAnimationError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch('/lottie/analytics.json')
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
  return (
    <section className="py-24 relative overflow-hidden" aria-label="Call to Action">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-500 to-brand-blue-400 grain" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-white space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Make every report count.
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl opacity-90 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join cities building trust with transparent, data-driven service.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-brand-blue-500 hover:bg-opacity-90"
                aria-label="Launch the app"
              >
                Launch the app
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:bg-opacity-10"
                aria-label="Schedule a demo"
              >
                Schedule a demo
              </Button>
            </motion.div>
            <motion.div 
              className="pt-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-sm mb-4">Trusted by 50+ municipalities</p>
              <div className="flex items-center space-x-8">
                <div className="text-xs font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  SOC 2 Certified
                </div>
                <div className="text-xs font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  99.9% Uptime
                </div>
                <div className="text-xs font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  GDPR Compliant
                </div>
              </div>
            </motion.div>
          </motion.div>
          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            aria-label="Analytics Animation"
          >
            <div className="relative">
              <div className="glass rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <Suspense fallback={
                  <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-white/20 rounded-xl mx-auto" aria-label="Loading animation" />
                }>
                  {animationError ? (
                    <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center bg-[#fee] text-[#c00] border-2 border-[#c00] rounded-xl mx-auto">
                      Animation unavailable
                    </div>
                  ) : animationData ? (
                    <div className="flex items-center justify-center">
                      <Lottie
                        animationData={animationData}
                        style={{
                          width: 'min(320px, 100%)',
                          height: 'min(320px, 100%)',
                          minWidth: '280px',
                          minHeight: '280px'
                        }}
                        className="mx-auto"
                        loop={true}
                        aria-label="Lottie animation"
                        renderSettings={{
                          preserveAspectRatio: 'xMidYMid meet',
                          clearCanvas: true
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-white/20 rounded-xl mx-auto" aria-label="Loading animation" />
                  )}
                </Suspense>
              </div>
              <motion.div
                className="absolute -top-4 -left-4 glass rounded-xl p-4 text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <div className="text-2xl font-bold">20 hours</div>
                <div className="text-sm opacity-75">Avg Response</div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 glass rounded-xl p-4 text-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                aria-hidden="true"
              >
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-75">Resolution Rate</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;
