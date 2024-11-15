"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterProps {
  messages: string[];
  onComplete?: () => void;
}

export default function Typewriter({ messages, onComplete }: TypewriterProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const message = messages[currentMessageIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setDisplayedText(message.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        if (currentMessageIndex < messages.length - 1) {
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedText("");
          }, 5000);
        }
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex, messages, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-3xl font-dancing text-pink-600"
      >
        {displayedText}
      </motion.div>
    </AnimatePresence>
  );
}