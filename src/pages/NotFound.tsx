
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 text-center bg-gradient-to-br from-white via-blue-50 to-teal-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="mb-8">
          <motion.div 
            className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <AlertCircle className="h-12 w-12 text-red-500" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">404</h1>
          <h2 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h2>
          <p className="text-gray-600 mb-6">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Button asChild className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
            <Link to="/" className="flex items-center justify-center gap-2">
              <Home className="h-5 w-5" />
              العودة للصفحة الرئيسية
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full border-teal-200 hover:bg-teal-50 transition-all duration-300">
            <Link to="/" className="flex items-center justify-center gap-2">
              <ArrowRight className="h-5 w-5" />
              تواصل مع الدعم الفني
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
