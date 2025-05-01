
import React from 'react';
import { Award, BookOpen, Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface AcademicStatusProps {
  gpa: number;
  completedCredits: number;
  totalCredits: number;
  level: string;
  semester: string;
  academicYear: string;
  expectedGraduation?: string;
}

const AcademicStatus: React.FC<AcademicStatusProps> = ({
  gpa,
  completedCredits,
  totalCredits,
  level,
  semester,
  academicYear,
  expectedGraduation = "2026"
}) => {
  const progressPercentage = Math.round((completedCredits / totalCredits) * 100);
  
  // GPA color based on value
  const getGpaColor = () => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 2.5) return 'text-blue-600';
    if (gpa >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // GPA grade based on value
  const getGpaGrade = () => {
    if (gpa >= 3.5) return 'ممتاز';
    if (gpa >= 2.5) return 'جيد جدًا';
    if (gpa >= 2.0) return 'جيد';
    return 'مقبول';
  };
  
  return (
    <Card className="shadow-md overflow-hidden border-t-4 border-t-teal-500">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-teal-600" />
          الحالة الأكاديمية
        </h3>
        
        <div className="space-y-4">
          {/* GPA Section */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-xl font-bold ${getGpaColor()}`}>{gpa.toFixed(2)}</span>
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className="text-gray-700 text-sm font-medium">المعدل التراكمي</span>
                  <Award className="h-4 w-4 text-gold-500 mr-1" />
                </div>
                <span className={`text-xs ${getGpaColor()}`}>{getGpaGrade()}</span>
              </div>
            </div>
            
            {/* GPA Visual Indicator */}
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(gpa / 4 * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full rounded-full ${
                  gpa >= 3.5 ? 'bg-green-500' : 
                  gpa >= 2.5 ? 'bg-blue-500' : 
                  gpa >= 2.0 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} 
              />
            </div>
          </div>
          
          {/* Credits Progress */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">{progressPercentage}%</span>
              <div className="flex items-center">
                <span className="text-gray-700 text-sm font-medium">تقدم الساعات المعتمدة</span>
                <Clock className="h-4 w-4 text-teal-600 mr-1" />
              </div>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 rounded-full" 
              indicatorClassName={`${progressPercentage < 30 ? 'bg-red-500' : progressPercentage < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{completedCredits} ساعة مكتملة</span>
              <span>{totalCredits} ساعة إجمالية</span>
            </div>
          </div>
          
          {/* Academic Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-1 text-blue-700 mb-1 justify-end">
                <span className="text-gray-700 font-medium">المستوى</span>
                <Calendar size={14} />
              </div>
              <p className="text-right text-gray-800 font-medium">{level}</p>
            </div>
            
            <div className="p-3 bg-teal-50 rounded-lg">
              <div className="flex items-center gap-1 text-teal-700 mb-1 justify-end">
                <span className="text-gray-700 font-medium">الفصل الدراسي</span>
                <Calendar size={14} />
              </div>
              <p className="text-right text-gray-800 font-medium">{semester}</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-1 text-green-700 mb-1 justify-end">
                <span className="text-gray-700 font-medium">السنة الدراسية</span>
                <Calendar size={14} />
              </div>
              <p className="text-right text-gray-800 font-medium">{academicYear}</p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-1 text-purple-700 mb-1 justify-end">
                <span className="text-gray-700 font-medium">التخرج المتوقع</span>
                <Award size={14} />
              </div>
              <p className="text-right text-gray-800 font-medium">{expectedGraduation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicStatus;
