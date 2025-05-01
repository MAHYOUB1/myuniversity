import React, { useState } from 'react';
import { ArrowRight, GraduationCap, Calendar, Briefcase, FileText, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from "@/components/NavigationBar";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";

interface ServiceItemProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  progress?: number;
  status?: string;
  buttonText?: string;
  onClick?: () => void;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  icon,
  description,
  progress,
  status = "متاح",
  buttonText = "تقديم الطلب",
  onClick,
  index
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
      className="neumorph p-4 bg-white rounded-xl shadow-md transition-all duration-300"
    >
      <div className="flex items-start mb-3">
        <div className="p-2 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 text-teal-600 ml-3 shadow-inner">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>تقدم الطلب</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-100" 
            indicatorClassName={
              progress < 30 ? "bg-red-500" : 
              progress < 70 ? "bg-yellow-500" : 
              "bg-green-500"
            }
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <span className={`px-3 py-1 rounded-full text-xs ${
          status === "متاح" ? "bg-green-100 text-green-600 border border-green-200" : 
          status === "قيد المعالجة" ? "bg-yellow-100 text-yellow-600 border border-yellow-200" :
          status === "مكتمل" ? "bg-blue-100 text-blue-600 border border-blue-200" :
          "bg-gray-100 text-gray-600 border border-gray-200"
        }`}>
          <div className="flex items-center gap-1">
            {status === "مكتمل" && <Check size={12} />}
            {status === "قيد المعالجة" && <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>}
            {status}
          </div>
        </span>
        
        {status !== "مكتمل" && (
          <motion.button 
            className="px-4 py-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-1"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        )}
        
        {status === "مكتمل" && (
          <motion.button 
            className="px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-1"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            عرض
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const GraduationServices = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleServiceClick = (title: string) => {
    setSelectedService(title);
    if (title === "طلب شهادة التخرج") {
      setIsDialogOpen(true);
    } else {
      setIsDrawerOpen(true);
    }
  };

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
      className="container pb-20 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="ml-2">
          <ArrowRight className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold">خدمات الخريجين</h1>
      </motion.div>
      
      <div className="space-y-4">
        <ServiceItem 
          title="طلب شهادة التخرج"
          icon={<GraduationCap size={24} />}
          description="تقديم طلب للحصول على شهادة التخرج الرسمية"
          status="قيد المعالجة"
          progress={65}
          buttonText="متابعة"
          onClick={() => handleServiceClick("طلب شهادة التخرج")}
          index={0}
        />
        
        <ServiceItem 
          title="حجز حفلة التخرج"
          icon={<Calendar size={24} />}
          description="حجز مقعد في حفل التخرج القادم"
          onClick={() => handleServiceClick("حجز حفلة التخرج")}
          index={1}
        />
        
        <ServiceItem 
          title="التسجيل كباحث عن عمل"
          icon={<Briefcase size={24} />}
          description="التسجيل في قاعدة بيانات الخريجين للوظائف"
          onClick={() => handleServiceClick("التسجيل كباحث عن عمل")}
          index={2}
        />
        
        <ServiceItem 
          title="طباعة السجل الأكاديمي"
          icon={<FileText size={24} />}
          description="طباعة نسخة رسمية من السجل الأكاديمي"
          status="مكتمل"
          progress={100}
          onClick={() => handleServiceClick("طباعة السجل الأكاديمي")}
          index={3}
        />
      </div>
      
      {/* Dialog for Certificate Application */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">متابعة طلب شهادة التخرج</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
              <h3 className="text-yellow-800 font-medium text-right flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                حالة الطلب: قيد المعالجة
              </h3>
              <p className="text-yellow-700 text-sm text-right">تم تقديم طلبك بنجاح، وهو الآن قيد المراجعة من قبل عميد الكلية.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-gray-700 text-right">خطوات الطلب:</h4>
              <div className="flex items-center text-right">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center ml-2">
                  <Check size={14} />
                </div>
                <span className="text-sm text-gray-700">تقديم الطلب</span>
              </div>
              <div className="flex items-center text-right">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center ml-2">
                  <Check size={14} />
                </div>
                <span className="text-sm text-gray-700">موافقة رئيس القسم</span>
              </div>
              <div className="flex items-center text-right">
                <div className="h-6 w-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center ml-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                </div>
                <span className="text-sm text-gray-700">موافقة عميد الكلية</span>
              </div>
              <div className="flex items-center text-right">
                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center ml-2">
                  <X size={14} />
                </div>
                <span className="text-sm text-gray-400">طباعة الشهادة</span>
              </div>
              <div className="flex items-center text-right">
                <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center ml-2">
                  <X size={14} />
                </div>
                <span className="text-sm text-gray-400">تسليم الشهادة</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <p className="text-xs text-gray-500 text-right">تاريخ تقديم الطلب: 15 أبريل 2023</p>
              <p className="text-xs text-gray-500 text-right">الوقت المتوقع لإكمال الطلب: 7-10 أيام عمل</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Drawer for other services */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">{selectedService}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 text-center">
            <div className="py-12 flex flex-col items-center justify-center">
              {selectedService === "طباعة السجل الأكاديمي" ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <Check size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">تم تجهيز السجل الأكاديمي</h3>
                  <p className="text-gray-600 mb-4">يمكنك استلام السجل من قسم شؤون الطلاب</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    تحميل نسخة إلكترونية
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4 text-teal-600">
                    <Calendar size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">هل ترغب في تقديم طلب جديد؟</h3>
                  <p className="text-gray-600 mb-4">سيتم توجيهك لاستكمال بيانات الطلب</p>
                  <Button className="bg-teal-600 hover:bg-teal-700 mb-2 w-full">
                    متابعة
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setIsDrawerOpen(false)}>
                    إلغاء
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DrawerFooter>
            <p className="text-xs text-gray-500 text-center">لمزيد من المساعدة، يرجى التواصل مع شؤون الطلاب</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      <NavigationBar />
    </motion.div>
  );
};

export default GraduationServices;
