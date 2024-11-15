"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, EarOff } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import Typewriter from "./Typewriter";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop",
    shayari: "तेरे चेहरे की मुस्कान,\nजैसे चाँद की ठंडी चाँदनी।\nतेरे साथ हर घड़ी,\nजिंदगी बन जाए एक कहानी।",
  },
  {
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop",
    shayari: "तेरी हँसी में छिपा है जादू,\nजो हर दर्द को भुला देता है।\nतेरे साथ बिताया हर पल,\nदिल में मोहब्बत सजा देता है।",
  },
  {
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop",
    shayari: "तेरी आँखों में देखा है मैंने,\nसपनों का समंदर गहरा।\nतेरे बिना अधूरी है मेरी दुनिया,\nतू ही तो है मेरा सहारा।",
  },
];

const finalMessages = [
  `To my dearest Suran,\n\nTum meri zindagi ka sabse khoobsurat hissa ho. Tumhare saath jo pal bitaata hoon, woh meri yaadon ke geet ban jaate hain. Tumhari hasi, tumhari awaaz, aur tumhara pyar meri duniya ko roshan karta hai. 
  Tumhare saath har din ek naye sapne ki tarah lagta hai. Mujhe pata hai ki humari journey kabhi perfect nahi rahi, lekin tumhara saath har mushkil asaan bana deta hai.\n\nTum meri duniya ho, meri khushi ho, aur meri zindagi ho. Tumhare bina sab kuch adhoora hai. I feel truly blessed to have you in my life.\n\n
  Tum meri dil ki dhadkan ho, aur main hamesha tumhare saath rahunga—chaahe jo bhi ho. I love you, Suran! ❤️`,
];

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showShayari, setShowShayari] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const musicRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (musicRef.current) {
      isPlaying ? musicRef.current.play() : musicRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (showFinal) return;

    const imageTimer = setTimeout(() => {
      setShowShayari(true);
    }, 2000);

    const shayariTimer = setTimeout(() => {
      setShowShayari(false);
      setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide((prev) => prev + 1);
        } else {
          setShowFinal(true);
        }
      }, 1000);
    }, 10000);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(shayariTimer);
    };
  }, [currentSlide, showFinal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 relative overflow-hidden">
      <audio ref={musicRef} loop>
        <source src="/mp3.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <FloatingHearts />

      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="absolute top-5 right-5 z-50 bg-white p-2 rounded-full shadow-lg"
      >
        {isPlaying ? <Music className="text-pink-500" size={24} /> : <EarOff className="text-gray-500" size={24} />}
      </button>

      <AnimatePresence mode="wait">
        {!showFinal ? (
          <div className="relative h-screen">
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt="Romantic moment"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <AnimatePresence>
              {showShayari && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                >
                  <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-2xl mx-4">
                    <p className="text-2xl text-center font-hindi leading-relaxed whitespace-pre-line text-purple-800">
                      {slides[currentSlide].shayari}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-300"
          >
            <div className="text-center p-8">
              <Typewriter messages={finalMessages} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
