'use client';

import React, { useRef } from 'react';
import { motion, useInView, UseInViewOptions } from 'framer-motion';

interface AnimatedRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
}

export default function AnimatedReveal({
  children,
  direction = 'up',
  duration = 0.6,
  delay = 0,
  distance = 30,
  className = '',
  triggerOnce = true,
}: AnimatedRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: triggerOnce, margin: '-10% 0px' } as UseInViewOptions);

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth premium easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
