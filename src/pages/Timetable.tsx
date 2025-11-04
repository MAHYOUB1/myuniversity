
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavigationBar from "@/components/NavigationBar";
import CourseSchedule from '@/components/CourseSchedule';
import { Calendar, Clock, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

const Timetable = () => {
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

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'اختبار منتصف الفصل - هندسة البرمجيات',
      date: '12 مايو 2025',
      time: '10:00 صباحاً',
      location: 'قاعة الاختبارات المركزية',
      type: 'exam'
    },
    {
      id: 2,
      title: 'تسليم مشروع - الذكاء الاصطناعي',
      date: '15 مايو 2025',
      time: '11:59 مساءً',
      location: 'عبر المنصة الإلكترونية',
      type: 'assignment'
    },
    {
      id: 3,
      title: 'محاضرة إضافية - قواعد البيانات ',
      date: '18 مايو 2025',
      time: '2:00 ظهراً',
      location: 'قاعة 305 ',
      type: 'lecture'
    }
  ];

  const getEventTypeStyle = (type: string) => {
    switch(type) {
      case 'exam':
        return 'border-r-4 border-r-red-500';
      case 'assignment':
        return 'border-r-4 border-r-yellow-500';
      case 'lecture':
        return 'border-r-4 border-r-blue-500';
      default:
        return 'border-r-4 border-r-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 pb-24">
      <div className="container px-4 sm:px-6 pt-6 max-w-4xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
        >
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              الجدول الدراسي
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span>الفصل الدراسي الثاني 2024-2025</span>
            </p>
          </div>
          
          <div className="flex items-center mt-4 sm:mt-0 gap-2">
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="اختر الفصل الدراسي" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">الفصل الحالي</SelectItem>
                <SelectItem value="fall2023">الفصل الأول 2024-2025</SelectItem>
                <SelectItem value="spring2023">الفصل الثاني 2024-2025</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <CourseSchedule />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5" />
                  الأحداث القادمة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 space-y-3">
                  {upcomingEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ x: 3 }}
                      className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all ${getEventTypeStyle(event.type)}`}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <div>{event.location}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-3 border-t flex justify-between items-center bg-gray-50">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    <span>السابق</span>
                  </Button>
                  
                  <div className="text-xs text-gray-500">
                    الأحداث في الـ 30 يوم القادمة
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-teal-600">
                    <span>التالي</span>
                    <ChevronLeft className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="weekly" className="w-full">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-gray-50 border-b">
                  <TabsTrigger value="weekly" className="py-2">عرض أسبوعي</TabsTrigger>
                  <TabsTrigger value="daily" className="py-2">عرض يومي</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly" className="p-4">
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border px-4 py-2 text-center w-20">الوقت</th>
                          <th className="border px-4 py-2 text-center">الأحد</th>
                          <th className="border px-4 py-2 text-center">الإثنين</th>
                          <th className="border px-4 py-2 text-center">الثلاثاء</th>
                          <th className="border px-4 py-2 text-center">الأربعاء</th>
                          <th className="border px-4 py-2 text-center">الخميس</th>
                        </tr>
                      </thead>
                       <tbody>
                        {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-3 text-center text-sm font-medium">
                              {time}
                            </td>
                            <td className="border p-1 h-16"></td>
                            <td className="border p-1 h-16">
                              {time === "09:00" && (
                                <div className="bg-blue-100 border-r-4 border-r-blue-500 p-1 rounded text-xs h-full flex flex-col justify-center">
                                  <div className="font-medium">محاسبة</div>
                                  <div className="text-gray-600">09:00 - 11:00</div>
                                  <div className="text-gray-600">قاعة 201</div>
                                </div>
                              )}
                            </td>
                            <td className="border p-1 h-16">
                              {time === "13:00" && (
                                <div className="bg-purple-100 border-r-4 border-r-purple-500 p-1 rounded text-xs h-full flex flex-col justify-center">
                                  <div className="font-medium">برمحة للامن السيبراني</div>
                                  <div className="text-gray-600">13:30 - 15:30</div>
                                  <div className="text-gray-600">قاعة 102</div>
                                </div>
                              )}
                              {time === "16:00" && (
                                <div className="bg-teal-100 border-r-4 border-r-teal-500 p-1 rounded text-xs h-full flex flex-col justify-center">
                                  <div className="font-medium">أمن المعلومات</div>
                                  <div className="text-gray-600">16:00 - 18:00</div>
                                  <div className="text-gray-600">قاعة 303</div>
                                </div>
                              )}
                            </td>
                            <td className="border p-1 h-16">
                              {time === "10:00" && (
                                <div className="bg-green-100 border-r-4 border-r-green-500 p-1 rounded text-xs h-full flex flex-col justify-center">
                                  <div className="font-medium">هندسة البرمجيات </div>
                                  <div className="text-gray-600">10:00 - 12:00</div>
                                  <div className="text-gray-600">قاعة 101</div>
                                </div>
                              )}
                            </td>
                            <td className="border p-1 h-16">
                              {time === "12:00" && (
                                <div className="bg-amber-100 border-r-4 border-r-amber-500 p-1 rounded text-xs h-full flex flex-col justify-center">
                                  <div className="font-medium">قواعد البيانات</div>
                                  <div className="text-gray-600">12:30 - 2:30</div>
                                  <div className="text-gray-600">قاعة 101</div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="daily" className="p-4">
                  <div className="flex justify-center mb-4">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <Button variant="outline" className="rounded-r-none">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="rounded-none border-x-0 font-medium px-6">
                        الأحد، 5 مايو 2024
                      </Button>
                      <Button variant="outline" className="rounded-l-none">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 p-2 rounded">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">هندسة البرمجيات</h3>
                            <p className="text-sm text-gray-500">محاضرة</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">08:30 - 10:30</div>
                          <div className="text-xs text-gray-500">قاعة 305 - مبنى B</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <div className="font-medium mb-1">ملاحظات:</div>
                        <div>سيتم مناقشة مشاريع نهاية الفصل وتوزيع المجموعات.</div>
                      </div>
                    </div>
                    
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 p-2 rounded">
                            <Clock className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">قواعد البيانات </h3>
                            <p className="text-sm text-gray-500">عملي</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">11:00 - 1:00</div>
                          <div className="text-xs text-gray-500">معمل الحاسوب د </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <div className="font-medium mb-1">ملاحظات:</div>
                        <div>تطبيق عملي على استعلامات SQL المتقدمة وتحسين الأداء.</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </motion.div>
        
        <NavigationBar />
      </div>
    </div>
  );
};


export default Timetable;
