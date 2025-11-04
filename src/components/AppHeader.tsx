
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AppHeader = ({ userName }: { userName?: string }) => {
  return (
    <motion.header 
      className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-0.5 rounded-full">
          
                      <img 
                    src="https://iconape.com/wp-content/png_logo_vector/%D8%AC%D8%A7%D9%85%D8%B9%D8%A9-%D8%AA%D8%B9%D8%B2-2.png" 
                    alt="حامعة تعز" 
                    className="w-10 rounded-full overflow-hidden object-contain"
                  />
                
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent hidden sm:inline-block">
            بوابة جامعة تعز الإلكترونية
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent sm:hidden">
            جامعة تعز
          </span>
        </Link>
        
        <Link to="/settings" className="flex items-center gap-2">
          {userName && (
            <span className="text-sm text-gray-700 hidden sm:block">{userName}</span>
          )}
          <Avatar className="h-8 w-8 bg-teal-100">
            <AvatarFallback className="bg-gradient-to-br from-teal-100 to-blue-100 text-teal-700">
              <User size={16} />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </motion.header>
  );
};

export default AppHeader;
