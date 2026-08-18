'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 32,
  delay = 200,
  loop = false,
  pauseDuration = 3500,
  showCursor = true,
  cursorClassName,
  className
}: TypewriterTextProps) {
  const prefersReduced = useReducedMotion();
  const [displayedText, setDisplayedText] = useState(prefersReduced ? text : '');
  const [isTypingDone, setIsTypingDone] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayedText(text);
      setIsTypingDone(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;
    let index = 0;

    setDisplayedText('');
    setIsTypingDone(false);

    const typeChar = () => {
      if (isCancelled) return;
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        const jitter = Math.random() * 15;
        timeoutId = setTimeout(typeChar, speed + jitter);
      } else {
        setIsTypingDone(true);
        if (loop) {
          timeoutId = setTimeout(startDelete, pauseDuration);
        }
      }
    };

    const startDelete = () => {
      if (isCancelled) return;
      setIsTypingDone(false);
      let delIndex = text.length;

      const deleteChar = () => {
        if (isCancelled) return;
        if (delIndex > 0) {
          setDisplayedText(text.slice(0, delIndex - 1));
          delIndex--;
          timeoutId = setTimeout(deleteChar, 18);
        } else {
          timeoutId = setTimeout(() => {
            index = 0;
            typeChar();
          }, 300);
        }
      };

      deleteChar();
    };

    timeoutId = setTimeout(typeChar, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, loop, pauseDuration, prefersReduced]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          className={cursorClassName}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.05em',
            backgroundColor: 'var(--accent)',
            marginLeft: '3px',
            verticalAlign: 'middle'
          }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </span>
  );
}
