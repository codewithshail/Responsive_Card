"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: Math.random() * window.innerWidth,
            y: -100,
          }}
          transition={{
            duration: 4,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute"
        >
          <Heart
            className="text-pink-500 fill-pink-500"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}