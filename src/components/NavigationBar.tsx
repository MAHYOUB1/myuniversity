
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, MessageSquare, Settings, CreditCard, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavigationBar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Updated navigation items focusing on the core elements as requested
  const navItems = [
    { icon: <Home size={22} />, label: "الرئيسية", path: "/", description: "العودة للصفحة الرئيسية" },
    { icon: <Bell size={22} />, label: "الإشعارات", path: "/notifications", description: "عرض جميع الإشعارات" },
    { icon: <MessageSquare size={22} />, label: "المحادثات", path: "/chat", description: "مركز المحادثات والدعم" },
    { icon: <CreditCard size={22} />, label: "الدفع", path: "/payment", description: "خدمات الدفع الإلكتروني" },
    { icon: <Settings size={22} />, label: "الإعدادات", path: "/settings", description: "تخصيص إعدادات الحساب" },
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-30"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
    >
      <div className="h-full mx-auto max-w-screen-lg">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500"></div>
        
        {/* Navigation for all devices - now the same for both mobile and desktop */}
        <div className="flex items-center justify-around h-16">
          {navItems.map((item, index) => {
            const active = isActive(item.path);
            
            return (
              <HoverCard key={index} openDelay={200}>
                <HoverCardTrigger asChild>
                  <Link 
                    to={item.path} 
                    className={`flex flex-col items-center justify-center p-2 rounded-lg relative group ${isMobile ? '' : 'hover:bg-teal-50'}`}
                    onMouseEnter={() => !isMobile && setHoverIndex(index)}
                    onMouseLeave={() => !isMobile && setHoverIndex(null)}
                  >
                    <div className="relative">
                      <motion.div
                        className={`relative z-10 transition-colors ${active ? 'text-teal-600' : 'text-gray-500 group-hover:text-teal-500'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {item.icon}
                      </motion.div>
                      
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -inset-2 bg-teal-50 rounded-lg z-0"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                    
                    <span className={`text-xs mt-1 transition-colors ${
                      active 
                        ? 'text-teal-600 font-medium' 
                        : 'text-gray-500 group-hover:text-teal-500'
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                </HoverCardTrigger>
                {!isMobile && (
                  <HoverCardContent className="w-48 p-2">
                    <p className="text-center text-sm">{item.description}</p>
                  </HoverCardContent>
                )}
              </HoverCard>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationBar;
