
import React, { useState } from 'react';
import { ArrowRight, Bell, Calendar, BookOpen, Info, Megaphone, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { motion } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  category: 'academic' | 'event' | 'announcement' | 'important';
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'بدء التسجيل للفصل الصيفي 2025',
      content: 'تعلن عمادة القبول والتسجيل عن بدء التسجيل للفصل الصيفي للعام الجامعي 2023-2024، وذلك ابتداءً من يوم الأحد الموافق 5 مايو 2024 وحتى يوم الخميس الموافق 15 مايو 2024. على جميع الطلاب الراغبين في التسجيل مراجعة المرشد الأكاديمي قبل التسجيل.',
      date: '1 مايو 2025',
      category: 'announcement',
      read: false
    },
    {
      id: 2,
      title: 'مؤتمر التقنيات الحديثة في الهندسة',
      content: 'تنظم كلية الهندسة مؤتمراً علمياً بعنوان "التقنيات الحديثة في الهندسة وتطبيقاتها" وذلك يوم السبت الموافق 25 مايو 2024 في قاعة المؤتمرات الكبرى بالجامعة. الدعوة عامة لجميع الطلاب وأعضاء هيئة التدريس والمهتمين.',
      date: '15 أبريل 2025',
      category: 'event',
      read: true
    },
    {
      id: 3,
      title: 'نتائج اختبارات منتصف الفصل متاحة الآن',
      content: 'يمكن للطلاب الاطلاع على نتائج اختبارات منتصف الفصل من خلال نظام معلومات الطلاب. في حال وجود أي استفسار أو اعتراض على النتيجة، يرجى التواصل مع أستاذ المقرر خلال أسبوع من تاريخ إعلان النتيجة.',
      date: '28 أبريل 2025',
      category: 'academic',
      read: false
    },
    {
      id: 4,
      title: 'تحديث بيانات الطلاب المتوقع تخرجهم',
      content: 'على جميع الطلاب المتوقع تخرجهم هذا الفصل تحديث بياناتهم الشخصية ومراجعة سجلاتهم الأكاديمية للتأكد من استيفاء جميع متطلبات التخرج قبل تاريخ 10 مايو 2025.',
      date: '25 أبريل 2025',
      category: 'important',
      read: false
    },
    {
      id: 5,
      title: 'إغلاق المكتبة المركزية للصيانة',
      content: 'تعلن إدارة المكتبة المركزية عن إغلاق المكتبة للصيانة الدورية من يوم الجمعة 10 مايو إلى يوم الاثنين 13 مايو 2025. ستكون المكتبة الإلكترونية متاحة خلال هذه الفترة.',
      date: '20 أبريل 2025',
      category: 'announcement',
      read: true
    }
  ]);
  
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const handleOpenNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.category === activeTab;
  });
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <BookOpen className="h-5 w-5 text-green-600" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-purple-600" />;
      case 'announcement':
        return <Megaphone className="h-5 w-5 text-blue-600" />;
      case 'important':
        return <Info className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-teal-600" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'event':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'announcement':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'important':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'academic':
        return 'أكاديمي';
      case 'event':
        return 'فعاليات';
      case 'announcement':
        return 'إعلان';
      case 'important':
        return 'هام';
      default:
        return category;
    }
  };

  return (
    <div className="container pb-20 pt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/" className="ml-2">
            <ArrowRight className="h-6 w-6 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold">الإشعارات</h1>
        </div>
        
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
          >
            <Check className="h-4 w-4 ml-1" />
            تحديد الكل كمقروء
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">الكل{unreadCount > 0 && ` (${unreadCount})`}</TabsTrigger>
          <TabsTrigger value="academic">أكاديمي</TabsTrigger>
          <TabsTrigger value="event">فعاليات</TabsTrigger>
          <TabsTrigger value="announcement">إعلانات</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => handleOpenNotification(notification)}
            >
              <Card className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-teal-500' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex p-4">
                    <div className="ml-3 mt-1">
                      {getCategoryIcon(notification.category)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className={getCategoryColor(notification.category)}>
                          {getCategoryName(notification.category)}
                        </Badge>
                        <span className="text-xs text-gray-500">{notification.date}</span>
                      </div>
                      <h3 className={`font-medium mt-1 ${!notification.read ? 'text-black' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {notification.content}
                      </p>
                      <div className="flex justify-end mt-2">
                        {!notification.read && (
                          <span className="inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">لا توجد إشعارات</h2>
            <p className="text-gray-600">
              {activeTab === "unread" 
                ? "لقد قمت بقراءة جميع الإشعارات" 
                : "لا توجد إشعارات في هذا القسم حالياً"}
            </p>
          </div>
        )}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedNotification && (
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                {getCategoryIcon(selectedNotification.category)}
                <DialogTitle>{selectedNotification.title}</DialogTitle>
              </div>
              <div className="flex justify-between mt-1">
                <Badge variant="outline" className={getCategoryColor(selectedNotification.category)}>
                  {getCategoryName(selectedNotification.category)}
                </Badge>
                <span className="text-xs text-gray-500">{selectedNotification.date}</span>
              </div>
            </DialogHeader>
            <DialogDescription className="text-gray-800 text-right leading-relaxed whitespace-pre-line">
              {selectedNotification.content}
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>إغلاق</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <NavigationBar />
    </div>
  );
};

export default Notifications;
