
import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotivationalBanner = () => {
  const motivationalQuotes = [
    { text: "اجتهد اليوم واحصد نجاحك غداً!!", icon: "star" },
    { text: "المثابرة هي مفتاح النجاح", icon: "trophy" },
    { text: "العلم نور والجهل ظلام", icon: "bulb" },
    { text: "بالعلم نبني المستقبل", icon: "book" },
    { text: "العقل السليم في الجسم السليم", icon: "heart" },
    { text: "خير جليس في الزمان كتاب", icon: "book" },
    { text: "المعرفة قوة، اكتسبها", icon: "brain" },
    { text: "الاجتهاد طريق التفوق", icon: "star" },
    { text: "تعلم من الأمس، عش اليوم، وتطلع للغد", icon: "compass" },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => 
          prevIndex === motivationalQuotes.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 500);
    }, 7000); // Change quote every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === motivationalQuotes.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const prevQuote = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === 0 ? motivationalQuotes.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "star":
        return <Star size={20} className="text-yellow-300" />;
      case "heart":
        return <Heart size={20} className="text-red-400" />;
      default:
        return <Star size={20} className="text-yellow-300" />;
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-teal-600 via-teal-500 to-blue-500 rounded-lg p-4 shadow-lg my-6 overflow-hidden relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full -translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-white opacity-5 rounded-full translate-x-8 translate-y-8"></div>
      
      <div className="flex items-center justify-between gap-2 relative z-10">
        <button 
          onClick={prevQuote}
          className="text-white/70 hover:text-white transition-colors p-1 focus:outline-none"
        >
          <ArrowRight size={18} />
        </button>
        
        <div className="flex-1 relative overflow-hidden h-12">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuoteIndex}
              initial={{ 
                opacity: 0, 
                x: direction > 0 ? 50 : -50 
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }
              }}
              exit={{ 
                opacity: 0, 
                x: direction > 0 ? -50 : 50,
              }}
              className="flex items-center justify-center gap-3 h-full"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse-subtle">
                {renderIcon(motivationalQuotes[currentQuoteIndex].icon)}
              </div>
              <p className="text-white font-bold text-lg text-center">
                {motivationalQuotes[currentQuoteIndex].text}
              </p>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse-subtle">
                {renderIcon(motivationalQuotes[currentQuoteIndex].icon)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <button 
          onClick={nextQuote}
          className="text-white/70 hover:text-white transition-colors p-1 focus:outline-none"
        >
          <ArrowLeft size={18} />
        </button>
      </div>
      
      <div className="mt-2 flex justify-center gap-1">
        {motivationalQuotes.map((_, index) => (
          <div 
            key={index} 
            className={`h-1 ${index === currentQuoteIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'} rounded-full transition-all duration-300`}
          ></div>
        ))}
      </div>
    </motion.div>
  );
};

export default MotivationalBanner;
