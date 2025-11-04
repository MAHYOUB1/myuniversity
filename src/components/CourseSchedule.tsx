
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, BookOpen, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for courses schedule
const scheduleData = {
  sunday: [
    {
      id: 1,
      courseName: 'هندسة البرمجيات',
      courseCode: 'CS401',
      startTime: '08:00',
      endTime: '10:00',
      instructor:"د. عبدالملك القباطي",
      location: 'قاعة 101 ',
      type: 'محاضرة'
    },
    {
      id: 2,
      courseName: 'قواعد البيانات ',
      courseCode: 'CS402',
      startTime: '11:00',
      endTime: '13:00',
      instructor:  'د. عيسى ',
      location: 'قاعة 101',
      type: 'محاضرة'
    }
  ],
  monday: [
    {
      id: 3,
      courseName: "برمحة للامن السيبراني",
      courseCode: 'CS403',
      startTime: '09:00',
      endTime: '11:00',
      instructor: "م. سامية قاسم",
      location: "305",
      type: 'محاضرة'
    }
  ],
  tuesday: [
    {
      id: 4,
      courseName: "انجليزي تقني",
      courseCode: 'CS404',
      startTime: '13:30',
      endTime: '15:30',
      instructor:"د.الحريبي",
      location: "القاعة 305",
      type: 'محاضرة'
    },
    {
      id: 5,
      courseName: "محاسبة",
      courseCode: 'CS405',
      startTime: '16:00',
      endTime: '18:00',
      instructor: "د. اليوسفي",
      location: 'مدرج الكلية',
      type: 'محاضرة'
    }
  ],
  wednesday: [
    {
      id: 6,
      courseName: 'هندسة البرمجيات',
      courseCode: 'CS401',
      startTime: '10:00',
      endTime: '12:00',
      instructor: 'م. عبدالله احمد',
      location: "معمل د",
      type: 'عملي'
    }
  ],
  thursday: [
    {
      id: 7,
      courseName: "تطوير تطبيقات الويب",
      courseCode: 'CS499',
      startTime: '10:30',
      endTime: '11:30',
      instructor: "د.احمد الشميري",
      location: "القاعة 101",
      type: 'محاضرة'
    }
  ],
  friday: [],
  saturday: []
};

type DayKey = keyof typeof scheduleData;

const daysArabic: Record<DayKey, string> = {
  sunday: 'الأحد',
  monday: 'الإثنين',
  tuesday: 'الثلاثاء',
  wednesday: 'الأربعاء',
  thursday: 'الخميس',
  friday: 'الجمعة',
  saturday: 'السبت'
};

const CourseSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayKey>('sunday');
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'محاضرة': return 'bg-blue-500';
      case 'عملي': return 'bg-green-500';
      case 'إشراف': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
        <CardTitle className="flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Calendar className="h-6 w-6" />
          جدول المحاضرات الأسبوعي
        </CardTitle>
      </CardHeader>
      <div className="bg-gray-50 overflow-x-auto">
        <Tabs 
          defaultValue="sunday" 
          value={selectedDay}
          onValueChange={(value) => setSelectedDay(value as DayKey)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-7 h-auto p-1 bg-white border-b">
            {Object.keys(daysArabic).map((day) => (
              <TabsTrigger
                key={day}
                value={day}
                className="py-2 text-xs sm:text-sm relative"
                disabled={scheduleData[day as DayKey].length === 0}
              >
                {daysArabic[day as DayKey]}
                {scheduleData[day as DayKey].length > 0 && (
                  <span className="absolute top-0 right-0 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center -mt-1 -mr-1">
                    {scheduleData[day as DayKey].length}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(daysArabic).map((day) => (
            <TabsContent key={day} value={day} className="p-0">
              <CardContent className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {scheduleData[day as DayKey].length > 0 ? (
                      <div className="space-y-4">
                        {scheduleData[day as DayKey].map((course) => (
                          <motion.div
                            key={course.id}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all"
                          >
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <BookOpen className="h-5 w-5 text-teal-600" />
                                  <h3 className="font-bold text-gray-800">
                                    {course.courseName}
                                  </h3>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">
                                  {course.courseCode}
                                </div>
                              </div>
                              <Badge className={`${getTypeColor(course.type)} hover:${getTypeColor(course.type)}`}>
                                {course.type}
                              </Badge>
                            </div>

                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2 text-gray-700">
                                <Clock className="h-4 w-4 text-gray-500" />
                                {course.startTime} - {course.endTime}
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                {course.location}
                              </div>
                              <div className="flex items-center gap-2 text-gray-700 md:col-span-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                {course.instructor}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto opacity-30 mb-2" />
                        <p>لا توجد محاضرات في هذا اليوم</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
};

export default CourseSchedule;
