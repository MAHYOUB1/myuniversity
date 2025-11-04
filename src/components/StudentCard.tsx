
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, QrCode, Calendar, BookOpen, BadgeCheck, BadgeX, Clock, Award, ScrollText } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface StudentCardProps {
  name: string;
  college: string;
  department: string;
  studentId: string;
  level: string;
  academicYear: string;
  studySystem: string;
  photoUrl?: string;
  feesStatus?: "مسدد" | "غير مسدد";
  completedCredits?: number;
  totalCredits?: number;
  gpa?: number;
}

const StudentCard: React.FC<StudentCardProps> = ({
  name,
  college,
  department,
  studentId,
  level,
  academicYear,
  studySystem,
  photoUrl ,
  feesStatus = "مسدد",
  completedCredits = 76,
  totalCredits = 120,
  gpa = 3.5
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const progressPercentage = Math.round((completedCredits / totalCredits) * 100);
  
  const containerVariants = {
    collapsed: { 
      height: 'auto',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    expanded: { 
      height: 'auto',
      transition: { duration: 0.3, ease: "easeInOut", delayChildren: 0.1, staggerChildren: 0.05 }
    }
  };
  
  const childVariants = {
    collapsed: { opacity: 0, y: 10 },
    expanded: { opacity: 1, y: 0 }
  };

  // GPA color based on value
  const getGpaColor = () => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 2.5) return 'text-blue-600';
    if (gpa >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div 
      initial="collapsed"
      animate={expanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      className="w-full mx-auto my-4 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="relative neumorph p-4 bg-gradient-to-r from-white to-gray-50 border-t border-white">
        {/* Semi-transparent university logo */}
      
       
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Link to="/id-card" className="block">
              <Avatar className="h-16 w-16 border-2 border-teal-500 shadow-lg hover:scale-105 transition-transform duration-200">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-700 text-lg font-medium">
                  {photoUrl ? 
                    <img src={photoUrl} alt={name} className="h-full w-full object-cover" /> : 
                    name.charAt(0)
                  }
                </div>
              </Avatar>
            </Link>
            <div className="absolute -bottom-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              {name}
              <Badge className={`mr-2 ${gpa >= 3.0 ? 'bg-gold-500' : 'bg-teal-500'} hover:${gpa >= 3.0 ? 'bg-gold-600' : 'bg-teal-600'}`}>
                <Award className="h-3 w-3 ml-1" />
                {gpa.toFixed(1)}
              </Badge>
            </h3>
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="text-sm text-teal-700 cursor-pointer">{college} - {department}</p>
              </HoverCardTrigger>
              <HoverCardContent className="w-60">
                <div className="flex justify-center mb-2">
                  <div className="bg-teal-100 text-teal-800 p-2 rounded-full">
                    <BookOpen size={16} />
                  </div>
                </div>
                <p className="text-center text-sm">طالب في {college}</p>
                <p className="text-center text-xs text-gray-500">{department}</p>
              </HoverCardContent>
            </HoverCard>
            
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <User size={12} className="inline-block" />
                {studentId}
              </p>
              
              {feesStatus === "مسدد" ? (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                  <BadgeCheck className="h-3 w-3 mr-1" />
                  {feesStatus}
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  <BadgeX className="h-3 w-3 mr-1" />
                  {feesStatus}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="text-teal-600 bg-teal-50 p-2 rounded-full">
            {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expanded && (
          <motion.div 
            variants={childVariants}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 flex items-center">
                  <Clock size={14} className="ml-1" />
                  تقدم الساعات المعتمدة
                </span>
                <span className="text-xs text-teal-700 font-semibold">{progressPercentage}%</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-1.5 rounded-full" 
                indicatorClassName={`${progressPercentage < 30 ? 'bg-red-500' : progressPercentage < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{completedCredits} ساعة</span>
                <span>{totalCredits} ساعة</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <motion.div 
                variants={childVariants}
                className="p-3 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <Calendar size={14} />
                  <p className="text-gray-700 font-medium">المستوى الدراسي:</p>
                </div>
                <p className="pr-6 text-gray-800">{level}</p>
              </motion.div>
              
              <motion.div 
                variants={childVariants}
                className="p-3 bg-green-50 rounded-lg"
              >
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <Calendar size={14} />
                  <p className="text-gray-700 font-medium">العام الدراسي:</p>
                </div>
                <p className="pr-6 text-gray-800">{academicYear}</p>
              </motion.div>
              
              <motion.div 
                variants={childVariants}
                className="p-3 bg-yellow-50 rounded-lg"
              >
                <div className="flex items-center gap-2 text-yellow-700 mb-1">
                  <BookOpen size={14} />
                  <p className="text-gray-700 font-medium">نظام الدراسة:</p>
                </div>
                <p className="pr-6 text-gray-800">{studySystem}</p>
              </motion.div>
              
              <Link to="/id-card">
                <motion.div
                  variants={childVariants}
                  className="p-3 bg-purple-50 rounded-lg text-center cursor-pointer hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center gap-2 text-purple-700 mb-1 justify-center">
                    <QrCode size={14} />
                    <p className="text-gray-700 font-medium">البطاقة الجامعية</p>
                  </div>
                  <p className="text-xs text-purple-600">اضغط للعرض</p>
                </motion.div>
              </Link>
            </div>

            {/* New section for academic info */}
            <motion.div 
              variants={childVariants}
              className="mt-3 p-3 bg-teal-50 rounded-lg"
            >
              <div className="flex items-center gap-2 text-teal-700 mb-2">
                <ScrollText size={14} />
                <p className="text-gray-700 font-medium">ملخص أكاديمي</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">المعدل التراكمي:</span>
                  <span className={`font-medium ${getGpaColor()}`}>{gpa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التقدير:</span>
                  <span className={`font-medium ${getGpaColor()}`}>
                    {gpa >= 3.5 ? 'ممتاز' : gpa >= 2.5 ? 'جيد جدًا' : gpa >= 2.0 ? 'جيد' : 'مقبول'}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentCard;
