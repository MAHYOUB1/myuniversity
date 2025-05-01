
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, 
  ClipboardList, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  Settings 
} from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  to: string;
  description: string;
  delay: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, color, to, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link 
            to={to} 
            className={`feature-card p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 ${color} h-32 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-white p-3 rounded-full bg-white bg-opacity-20 ripple relative z-10 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <span className="text-white font-medium text-center relative z-10">{title}</span>
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-white group-hover:w-full transition-all duration-500"></div>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="flex flex-col items-center p-2 text-center space-y-2">
            <div className={`p-3 rounded-full ${color} text-white`}>
              {icon}
            </div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
};

const FeaturesGrid = () => {
  const features = [
    { 
      icon: <Award size={28} />, 
      title: "المعدل التراكمي", 
      color: "bg-gradient-to-br from-teal-600 to-teal-400", 
      to: "/gpa",
      description: "عرض المعدل التراكمي والإحصائيات الأكاديمية"
    },
    { 
      icon: <ClipboardList size={28} />, 
      title: "الدرجات والتقديرات", 
      color: "bg-gradient-to-br from-blue-600 to-blue-400", 
      to: "/grades",
      description: "استعراض الدرجات والتقديرات لجميع المواد" 
    },
    { 
      icon: <Calendar size={28} />, 
      title: "الجدول الدراسي", 
      color: "bg-gradient-to-br from-purple-600 to-purple-400", 
      to: "/timetable",
      description: "عرض الجدول الدراسي والمحاضرات الأسبوعية" 
    },
    { 
      icon: <GraduationCap size={28} />, 
      title: "خدمات الخريجين", 
      color: "bg-gradient-to-br from-green-600 to-green-400", 
      to: "/graduation",
      description: "خدمات شاملة للخريجين والحفلات" 
    },
    { 
      icon: <CreditCard size={28} />, 
      title: "الدفع الإلكتروني", 
      color: "bg-gradient-to-br from-orange-600 to-orange-400", 
      to: "/payment",
      description: "دفع الرسوم والمستحقات المالية بسهولة" 
    },
    { 
      icon: <Settings size={28} />, 
      title: "الإعدادات", 
      color: "bg-gradient-to-br from-gray-600 to-gray-400", 
      to: "/settings",
      description: "تخصيص إعدادات الحساب والتطبيق" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };

  return (
    <motion.div 
      className="my-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <div className="h-6 w-1 bg-teal-500 rounded-full"></div>
        الخدمات الرئيسية
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureItem 
            key={index}
            icon={feature.icon}
            title={feature.title}
            color={feature.color}
            to={feature.to}
            description={feature.description}
            delay={index}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg shadow-sm border border-blue-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-sm text-blue-700">آخر تحديث للبيانات</span>
          </div>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString('ar-SA', { 
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturesGrid;
