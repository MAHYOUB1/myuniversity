
import React from 'react';
import { Calendar, ChevronLeft, Bell, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    id: 1,
    title: 'بدء التسجيل للفصل الصيفي 2024',
    date: '1 مايو 2024',
    category: 'إعلان',
    categoryColor: 'bg-blue-500',
    excerpt: 'تعلن عمادة القبول والتسجيل عن بدء التسجيل للفصل الصيفي...'
  },
  {
    id: 2,
    title: 'مؤتمر التقنيات الحديثة في الهندسة',
    date: '15 مايو 2024',
    category: 'فعاليات',
    categoryColor: 'bg-purple-500',
    excerpt: 'تنظم كلية الهندسة مؤتمراً علمياً حول التقنيات الحديثة...'
  },
  {
    id: 3,
    title: 'نتائج اختبارات منتصف الفصل متاحة الآن',
    date: '28 أبريل 2024',
    category: 'أكاديمي',
    categoryColor: 'bg-green-500',
    excerpt: 'يمكن للطلاب الاطلاع على نتائج اختبارات منتصف الفصل من خلال...'
  }
];

const LatestNews: React.FC = () => {
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
    <motion.div 
      className="my-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-6">
        <Link to="/notifications" className="text-teal-600 text-sm hover:text-teal-700 flex items-center group transition-all duration-300 ease-in-out">
          <span className="border-b border-transparent group-hover:border-teal-500">عرض الكل</span>
          <ChevronLeft className="h-4 w-4 transform group-hover:translate-x-[-4px] transition-transform" />
        </Link>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <div className="bg-teal-100 p-2 rounded-full">
            <Bell className="h-5 w-5 text-teal-600" />
          </div>
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            أحدث الإعلانات والفعاليات
          </span>
        </h2>
      </div>
      
      <div className="space-y-3">
        {newsItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="feature-card"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-transparent hover:border-t-teal-500">
              <CardContent className="p-0">
                <div className="flex">
                  <div className={`w-2 ${item.categoryColor}`}></div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center text-gray-500 text-xs mb-1">
                        <Calendar className="h-3.5 w-3.5 ml-1" />
                        {item.date}
                      </div>
                      <Badge className={`${item.categoryColor} text-white`}>
                        {item.category}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-right">{item.title}</h3>
                    <p className="text-gray-600 text-xs mt-2 text-right">{item.excerpt}</p>
                    <div className="mt-3 text-left">
                      <Link 
                        to={`/notifications/${item.id}`}
                        className="text-xs text-teal-600 hover:text-teal-800 font-medium flex items-center group"
                      >
                        <span className="border-b border-transparent group-hover:border-teal-500">قراءة المزيد</span>
                        <ChevronLeft className="h-3.5 w-3.5 transform group-hover:translate-x-[-2px] transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LatestNews;
