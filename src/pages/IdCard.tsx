
import React, { useState, useEffect } from 'react';
import { ArrowRight, QrCode, BadgeCheck, BadgeX, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from "@/components/NavigationBar";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

const IdCard = () => {
  const { toast } = useToast();
  const [flipped, setFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  
  // Mock data - would come from backend in real app
  const studentData = {
    name:"مهيوب عبد الغني احمد مهيوب",
    college: "كلية العلوم",
    department: "قسم الامن السيبراني",
    studentId: "2023145786",
    level: "الثاني",
    academicYear: "2024-2025",
    studySystem: "موازي",
    feesStatus: "مسدد", // or "غير مسدد"
    completedCredits: 76,
    totalCredits: 120,
    validUntil: "31 أغسطس 2025",
    issueDate: "1 سبتمبر 2024",
    photoUrl: "", // Empty for now, would be filled with actual photo URL
    gpa: 3.5,
    lastPayment: {
      amount: "12,500",
      date: "15 فبراير 2025",
      receiptNo: "P20250215-7823"
    }
  };
  
  const progressPercentage = Math.round((studentData.completedCredits / studentData.totalCredits) * 100);
  
  const handleQrCodeClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setFlipped(!flipped);
      setTimeout(() => {
        setIsRotating(false);
      }, 700);
    }, 100);
  };
  
  useEffect(() => {
    // Show a welcome toast when component mounts
    toast({
      title: "البطاقة الجامعية",
      description: "يمكنك الضغط على البطاقة لعرض رمز QR",
    });
  }, [toast]);
  
  return (
    <div className="container pb-20 pt-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="ml-2">
          <ArrowRight className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold">البطاقة الجامعية</h1>
      </div>
      
      <div className="px-4 py-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative w-full max-w-sm aspect-[3/5] mx-auto perspective-1000 cursor-pointer ${isRotating ? 'pointer-events-none' : ''}`}
          onClick={handleQrCodeClick}
        >
          <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
            {/* Front of card */}
            <div className={`absolute w-full h-full backface-hidden ${flipped ? 'invisible' : 'visible'}`}>
              <div className="neumorph w-full h-full rounded-2xl p-5 flex flex-col overflow-hidden bg-gradient-to-br from-white to-gray-50">
                {/* University logo and background */}
                <div className="absolute inset-0 top-12 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
                  <div className="w-full   font-bold">
                      <img 
                    src="https://iconape.com/wp-content/files/jz/366850/png/366850.png" 
                    alt="حامعة تعز" 
                    className=" object-contain"
                  />
                  </div>
                </div>
                
                {/* Header with university name */}
                <div className="flex justify-center mb-4">
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-teal-800">جامعة تعز</h2>
                    <p className="text-xs text-gray-600">University of Taiz</p>
                    <div className="h-0.5 w-32 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto mt-1"></div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-700 text-2xl font-medium">
                      {studentData.photoUrl ? 
                        <img src={studentData.photoUrl} alt={studentData.name} className="h-full w-full object-cover" /> : 
                        studentData.name.charAt(0)
                      }
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 bg-clip-text text-transparent">
                    {studentData.name}
                  </h2>
                  <p className="text-sm text-teal-700 mt-1">{studentData.college} - {studentData.department}</p>
                  <div className="flex justify-center mt-2">
                    <Badge className={`${studentData.gpa >= 3.0 ? 'bg-gold-500 hover:bg-gold-600' : 'bg-teal-500 hover:bg-teal-600'}`}>
                      <Award className="h-3 w-3 ml-1" />
                      المعدل: {studentData.gpa.toFixed(2)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 mt-6 space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">الرقم الجامعي:</span>
                    <span className="font-bold">{studentData.studentId}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">المستوى:</span>
                    <span>{studentData.level}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">العام الدراسي:</span>
                    <span>{studentData.academicYear}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">نظام الدراسة:</span>
                    <span>{studentData.studySystem}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600">حالة الرسوم:</span>
                    {studentData.feesStatus === "مسدد" ? (
                      <div className="flex items-center gap-1">
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                          <BadgeCheck className="h-3 w-3 mr-1" />
                          {studentData.feesStatus}
                        </Badge>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Badge variant="destructive">
                          <BadgeX className="h-3 w-3 mr-1" />
                          {studentData.feesStatus}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600">تاريخ الإصدار: {studentData.issueDate}</p>
                  <p className="text-xs text-gray-600">صالحة لغاية: {studentData.validUntil}</p>
                </div>
                
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500 animate-pulse">اضغط لعرض رمز QR</p>
                </div>
              </div>
            </div>
            
            {/* Back of card */}
            <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${flipped ? 'visible' : 'invisible'}`}>
              <div className="neumorph w-full h-full rounded-2xl p-5 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <h3 className="text-lg font-bold text-center mb-4 text-teal-700">رمز التحقق QR</h3>
                
                <div className="w-64 h-64 bg-white p-3 rounded-lg shadow-md">
                  <div className="w-full h-full border-2 border-teal-500 flex items-center justify-center">
                    <QrCode size={180} className="text-teal-800" />
                  </div>
                </div>
                
                {/* Payment info section */}
                <div className="w-full mt-6 bg-teal-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-teal-700 mb-1">آخر عملية دفع</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المبلغ:</span>
                      <span className="font-medium">{studentData.lastPayment.amount} ر.ي</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التاريخ:</span>
                      <span className="font-medium">{studentData.lastPayment.date}</span>
                    </div>
                    <div className="col-span-2 flex justify-between">
                      <span className="text-gray-600">رقم الإيصال:</span>
                      <span className="font-medium">{studentData.lastPayment.receiptNo}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-teal-600">اضغط للعودة للبطاقة</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm mt-6"
        >
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center">
                <Clock size={16} className="ml-1" />
                تقدم الساعات المعتمدة
              </h3>
              <span className="text-sm text-teal-700 font-semibold">{progressPercentage}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 rounded-full" 
              indicatorClassName={`${progressPercentage < 30 ? 'bg-red-500' : progressPercentage < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
            />
            
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 text-sm"
              >
                <div className="flex justify-between">
                  <span className="text-gray-600">الساعات المكتملة:</span>
                  <span className="font-medium">{studentData.completedCredits} ساعة</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-600">إجمالي الساعات:</span>
                  <span className="font-medium">{studentData.totalCredits} ساعة</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">الساعات المتبقية:</span>
                  <span className="font-medium">{studentData.totalCredits - studentData.completedCredits} ساعة</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">العام الدراسي المتوقع للتخرج:</span>
                  <span className="font-medium">
                    {parseInt(studentData.academicYear.split('-')[0]) + Math.ceil((studentData.totalCredits - studentData.completedCredits) / 30)}-
                    {parseInt(studentData.academicYear.split('-')[0]) + Math.ceil((studentData.totalCredits - studentData.completedCredits) / 30) + 1}
                  </span>
                </div>
              </motion.div>
            )}
          </Card>

          {/* Payment Status Card */}
          <Card className="p-4 mt-4 border-t-4 border-t-teal-500">
            <CardContent className="p-0">
              <h3 className="font-medium mb-3">حالة الرسوم الدراسية</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الفصل الحالي:</span>
                  {studentData.feesStatus === "مسدد" ? (
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      تم الدفع
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <BadgeX className="h-3 w-3 mr-1" />
                      لم يتم الدفع
                    </Badge>
                  )}
                </div>
                
                <Link to="/payment" className="block">
                  <div className="mt-2 text-center bg-teal-50 p-2 rounded-md text-teal-600 hover:bg-teal-100 transition-colors text-sm">
                    عرض تفاصيل المدفوعات
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default IdCard;
