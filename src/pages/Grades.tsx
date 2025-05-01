
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import NavigationBar from "@/components/NavigationBar";
import {
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  BarChart3
} from 'lucide-react';

// Mock data for grades
const semesters = [
  {
    id: 'spring2024',
    name: 'الفصل الدراسي الثاني 2023-2024',
    gpa: 3.85,
    courses: [
      {
        id: 1,
        code: 'CS401',
        name: 'هندسة البرمجيات',
        credits: 3,
        grade: 'A',
        points: 4.0,
        percentageScore: 94,
        instructor: 'د. أحمد محمد',
        details: [
          { name: 'اختبار منتصف الفصل', score: 18, total: 20 },
          { name: 'الواجبات', score: 14, total: 15 },
          { name: 'المشاركة', score: 9, total: 10 },
          { name: 'المشروع', score: 27, total: 25 },
          { name: 'الاختبار النهائي', score: 28, total: 30 }
        ]
      },
      {
        id: 2,
        code: 'CS402',
        name: 'قواعد البيانات ',
        credits: 3,
        grade: 'A-',
        points: 3.7,
        percentageScore: 89,
        instructor: 'د. خالد',
        details: [
          { name: 'اختبار منتصف الفصل', score: 17, total: 20 },
          { name: 'الواجبات', score: 13, total: 15 },
          { name: 'المشاركة', score: 8, total: 10 },
          { name: 'المشروع', score: 23, total: 25 },
          { name: 'الاختبار النهائي', score: 28, total: 30 }
        ]
      },
      {
        id: 3,
        code: 'CS403',
        name: 'شبكات الحاسوب',
        credits: 3,
        grade: 'B+',
        points: 3.3,
        percentageScore: 86,
        instructor: 'د. محمد علي',
        details: [
          { name: 'اختبار منتصف الفصل', score: 16, total: 20 },
          { name: 'الواجبات', score: 13, total: 15 },
          { name: 'المشاركة', score: 8, total: 10 },
          { name: 'المشروع', score: 24, total: 25 },
          { name: 'الاختبار النهائي', score: 25, total: 30 }
        ]
      },
      {
        id: 4,
        code: 'CS404',
        name: 'الذكاء الاصطناعي',
        credits: 3,
        grade: 'A',
        points: 4.0,
        percentageScore: 92,
        instructor: 'د. حسن',
        details: [
          { name: 'اختبار منتصف الفصل', score: 19, total: 20 },
          { name: 'الواجبات', score: 14, total: 15 },
          { name: 'المشاركة', score: 9, total: 10 },
          { name: 'المشروع', score: 24, total: 25 },
          { name: 'الاختبار النهائي', score: 26, total: 30 }
        ]
      },
      {
        id: 5,
        code: 'CS405',
        name: 'أمن المعلومات',
        credits: 3,
        grade: 'A-',
        points: 3.7,
        percentageScore: 88,
        instructor: 'د. خالد عبدالله',
        details: [
          { name: 'اختبار منتصف الفصل', score: 18, total: 20 },
          { name: 'الواجبات', score: 12, total: 15 },
          { name: 'المشاركة', score: 9, total: 10 },
          { name: 'المشروع', score: 24, total: 25 },
          { name: 'الاختبار النهائي', score: 25, total: 30 }
        ]
      }
    ]
  },
  {
    id: 'fall2023',
    name: 'الفصل الدراسي الأول 2024-2025',
    gpa: 3.7,
    courses: [
      {
        id: 6,
        code: 'CS301',
        name: 'نظم التشغيل',
        credits: 3,
        grade: 'B+',
        points: 3.3,
        percentageScore: 87,
        instructor: 'د. عمر السيد',
        details: [
          { name: 'اختبار منتصف الفصل', score: 17, total: 20 },
          { name: 'الواجبات', score: 13, total: 15 },
          { name: 'المشاركة', score: 9, total: 10 },
          { name: 'المشروع', score: 23, total: 25 },
          { name: 'الاختبار النهائي', score: 25, total: 30 }
        ]
      },
      {
        id: 7,
        code: 'CS302',
        name: 'تطوير تطبيقات الويب',
        credits: 3,
        grade: 'A',
        points: 4.0,
        percentageScore: 93,
        instructor: 'د. أحمد',
        details: [
          { name: 'اختبار منتصف الفصل', score: 19, total: 20 },
          { name: 'الواجبات', score: 14, total: 15 },
          { name: 'المشاركة', score: 10, total: 10 },
          { name: 'المشروع', score: 23, total: 25 },
          { name: 'الاختبار النهائي', score: 27, total: 30 }
        ]
      }
    ]
  }
];

const getGradeColor = (grade: string) => {
  switch(grade) {
    case 'A': return 'bg-green-500';
    case 'A-': return 'bg-green-400';
    case 'B+': return 'bg-blue-500';
    case 'B': return 'bg-blue-400';
    case 'B-': return 'bg-blue-300';
    case 'C+': return 'bg-yellow-500';
    case 'C': return 'bg-yellow-400';
    case 'C-': return 'bg-yellow-300';
    case 'D+': return 'bg-orange-500';
    case 'D': return 'bg-orange-400';
    case 'F': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const Grades = () => {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [currentSemester, setCurrentSemester] = useState('spring2024');
  
  const toggleCourseDetails = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };
  
  const overallGPA = 3.75; // Mock overall GPA
  
  const semester = semesters.find(sem => sem.id === currentSemester);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 pb-24">
      <div className="container px-4 sm:px-6 pt-6 max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              سجل الدرجات
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Award className="h-4 w-4 text-teal-600" />
              <span>المعدل التراكمي: {overallGPA}</span>
            </p>
          </div>
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold shadow-md"
          >
            {overallGPA}
          </motion.div>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <Tabs 
            defaultValue="spring2024" 
            value={currentSemester}
            onValueChange={setCurrentSemester}
            className="w-full"
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-gray-50 border-b">
                {semesters.map((semester) => (
                  <TabsTrigger
                    key={semester.id}
                    value={semester.id}
                    className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex flex-col gap-1"
                  >
                    <span>{semester.name}</span>
                    <Badge className="bg-teal-500 hover:bg-teal-600">GPA: {semester.gpa}</Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {semesters.map((sem) => (
                <TabsContent key={sem.id} value={sem.id} className="p-0">
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4">
                      {sem.courses.map((course) => (
                        <motion.div
                          key={course.id}
                          variants={itemVariants}
                          className="bg-white rounded-lg border hover:shadow-md transition-all duration-300"
                        >
                          <div 
                            className="p-4 cursor-pointer flex justify-between items-center"
                            onClick={() => toggleCourseDetails(course.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`${getGradeColor(course.grade)} h-10 w-10 rounded-full flex items-center justify-center text-white font-bold`}>
                                {course.grade}
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-800">{course.name}</h3>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                  <span>{course.code}</span>
                                  <span className="text-xs">•</span>
                                  <span>{course.credits} ساعات معتمدة</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-lg font-bold">{course.percentageScore}%</div>
                                <div className="text-sm text-gray-500">{course.points} نقاط</div>
                              </div>
                              {expandedCourse === course.id ? (
                                <ChevronUp className="h-5 w-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          
                          {expandedCourse === course.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-4 pb-4 border-t"
                            >
                              <div className="pt-4">
                                <div className="text-sm text-gray-600 mb-2">
                                  <span className="font-semibold">المدرس:</span> {course.instructor}
                                </div>
                                <div className="space-y-3 mt-4">
                                  {course.details.map((detail, idx) => (
                                    <div key={idx} className="grid grid-cols-5 gap-2 items-center">
                                      <div className="col-span-2 text-sm font-medium">{detail.name}</div>
                                      <div className="col-span-2">
                                        <Progress value={(detail.score / detail.total) * 100} className="h-3" />
                                      </div>
                                      <div className="text-sm font-medium text-right">
                                        {detail.score} / {detail.total}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
              
              <div className="bg-gray-50 p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">إجمالي الساعات المعتمدة المكتملة:</span> 
                  {" "}
                  {semester?.courses.reduce((sum, course) => sum + course.credits, 0) ?? 0}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-teal-600 text-sm font-medium cursor-pointer"
                >
                  <span>عرض السجل الكامل</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </div>
            </div>
          </Tabs>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                تحليل الأداء الأكاديمي
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium">المعدل التراكمي على مدار الفصول</span>
                    <span className="text-sm font-medium text-teal-600">{overallGPA} / 4.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${(overallGPA / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                    <span className="text-sm text-gray-500 mb-2">أفضل المواد أداءً</span>
                    <div className="space-y-2">
                      {semester?.courses
                        .sort((a, b) => b.percentageScore - a.percentageScore)
                        .slice(0, 2)
                        .map(course => (
                          <div key={course.id} className="flex justify-between items-center">
                            <span className="font-medium">{course.name}</span>
                            <Badge className={`${getGradeColor(course.grade)}`}>
                              {course.grade} ({course.percentageScore}%)
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                    <span className="text-sm text-gray-500 mb-2">إحصائيات الفصل الحالي</span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white rounded p-2">
                        <div className="text-2xl font-bold text-blue-500">
                          {semester?.courses.length || 0}
                        </div>
                        <div className="text-xs text-gray-500">المواد</div>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="text-2xl font-bold text-teal-500">
                          {semester?.courses.reduce((sum, course) => sum + course.credits, 0) || 0}
                        </div>
                        <div className="text-xs text-gray-500">الساعات</div>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="text-2xl font-bold text-purple-500">
                          {semester?.gpa.toFixed(2) || 0}
                        </div>
                        <div className="text-xs text-gray-500">المعدل</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <NavigationBar />
      </div>
    </div>
  );
};

export default Grades;
