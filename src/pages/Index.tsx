
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StudentCard from '@/components/StudentCard';
import MotivationalBanner from '@/components/MotivationalBanner';
import FeaturesGrid from '@/components/FeaturesGrid';
import AcademicStatus from '@/components/AcademicStatus';
import LatestNews from '@/components/LatestNews';
import NavigationBar from "@/components/NavigationBar";
import AppHeader from '@/components/AppHeader';
import { Calendar, Bell, Award, ChevronLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  // Student data - would come from API in real app
  const studentData = {
    name:"مهيوب عبد الغني احمد مهيوب",
    college: "كلية العلوم",
    department: "قسم الامن السيبراني",
    studentId: "2023145786",
    level: "الثاني",
    
    studySystem: "موازي",
    academicYear: "2024-2025",
    
    feesStatus: "مسدد" as "مسدد" | "غير مسدد",
  };
  
  // Academic data - would come from API in real app
  const academicData = {
    gpa: 3.9,
    completedCredits: 96,
    totalCredits: 136,
    level: "المستوى الثاني",
    semester: "الفصل الدراسي الثاني",
    academicYear: "2024-2025",
    expectedGraduation: "2026"
  };

  // Today's schedule - would come from API in real app
  const todayClasses = [
    {
      id: 1,
      course: "هندسة البرمجيات",
      time: "08:30 - 10:30",
      location: "قاعة 305 ",
      type: "محاضرة"
    },
    {
      id: 2,
      course: "قواعد البيانات ",
      time: "11:00 - 13:00",
      location: "معمل الحاسوب 2 ",
      type: "عملي"
    }
  ];

  // Upcoming deadlines - would come from API in real app
  const upcomingDeadlines = [
    {
      id: 1,
      title: "مشروع هندسة البرمجيات",
      course: "CS401",
      dueDate: "10 مايو 2025",
      type: "مشروع"
    },
    {
      id: 2,
      title: "اختبار منتصف الفصل",
      course: "CS402",
      dueDate: "12 مايو 2025",
      type: "اختبار"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 pb-24">
      <AppHeader userName={studentData.name.split(' ')[0]} />
      
      <motion.div 
        className="container px-4 sm:px-6 pt-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Student Card - First priority element */}
        <motion.div variants={itemVariants} className="mb-6">
          
          <StudentCard 
            name={studentData.name}
            college={studentData.college}
            department={studentData.department}
            studentId={studentData.studentId}
            level={studentData.level}
            academicYear={studentData.academicYear}
            studySystem={studentData.studySystem}
            feesStatus={studentData.feesStatus}
          />
        </motion.div>
          
        {/* Motivational Banner - Fourth priority */}
        <motion.div variants={itemVariants} className="mb-6">
          <MotivationalBanner />
        </motion.div>
        
        {/* Features Grid - Fifth priority */}
        <motion.div variants={itemVariants} className="mb-6">
          <FeaturesGrid />
        </motion.div>
        
        {/* Latest News - Sixth priority */}
        <motion.div variants={itemVariants} className="mb-6">
          <LatestNews />
        </motion.div>
        {/* Academic Status - Second priority */}
        <motion.div variants={itemVariants} className="mb-6">
          <AcademicStatus 
            gpa={academicData.gpa}
            completedCredits={academicData.completedCredits}
            totalCredits={academicData.totalCredits}
            level={academicData.level}
            semester={academicData.semester}
            academicYear={academicData.academicYear}
            expectedGraduation={academicData.expectedGraduation}
          />
        </motion.div>
        
        {/* Today's Classes and Deadlines - Third priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={itemVariants}>
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-t-4 border-teal-500">
              <CardContent className="p-0">
                <div className="p-4 border-b bg-gradient-to-r from-teal-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-gray-800 flex items-center gap-1">
                      <Clock className="h-5 w-5 text-teal-600" />
                      محاضرات اليوم
                    </h2>
                    <Link to="/timetable" className="text-xs text-teal-600 hover:underline flex items-center">
                      <span>عرض الجدول كاملاً</span>
                      <ChevronLeft className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  {todayClasses.length > 0 ? (
                    <div className="space-y-3">
                      {todayClasses.map((cls) => (
                        <div 
                          key={cls.id} 
                          className="flex justify-between items-start p-3 bg-white border rounded-lg hover:shadow-sm transition-all"
                        >
                          <div>
                            <h3 className="font-medium text-gray-800">{cls.course}</h3>
                            <div className="text-sm text-gray-500 mt-1">{cls.location}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-teal-600">{cls.time}</div>
                            <div className="text-xs bg-teal-100 text-teal-800 rounded px-2 py-0.5 inline-block mt-1">
                              {cls.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto opacity-30 mb-2" />
                      <p>لا توجد محاضرات اليوم</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-t-4 border-blue-500">
              <CardContent className="p-0">
                <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-gray-800 flex items-center gap-1">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      المواعيد النهائية القادمة
                    </h2>
                    <Link to="/grades" className="text-xs text-blue-600 hover:underline flex items-center">
                      <span>عرض الكل</span>
                      <ChevronLeft className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  {upcomingDeadlines.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingDeadlines.map((deadline) => (
                        <div 
                          key={deadline.id} 
                          className="flex justify-between items-start p-3 bg-white border rounded-lg hover:shadow-sm transition-all"
                        >
                          <div>
                            <h3 className="font-medium text-gray-800">{deadline.title}</h3>
                            <div className="text-sm text-gray-500 mt-1">{deadline.course}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-blue-600">{deadline.dueDate}</div>
                            <div className={`text-xs ${
                              deadline.type === 'مشروع' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-red-100 text-red-800'
                              } rounded px-2 py-0.5 inline-block mt-1`}
                            >
                              {deadline.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto opacity-30 mb-2" />
                      <p>لا توجد مواعيد نهائية قادمة</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      
        
        {/* Login/Registration Buttons - Seventh priority */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button 
                variant="outline"
                className="border-teal-200 hover:bg-teal-50 hover:text-teal-700 transition-all"
              >
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white transition-all"
              >
                إنشاء حساب
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
      
      <NavigationBar />
    </div>
  );
};

export default Index;
