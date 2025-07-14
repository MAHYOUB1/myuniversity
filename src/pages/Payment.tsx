
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from '@/components/NavigationBar';
import AppHeader from '@/components/AppHeader';
import { initiatePayment } from '@/services/paymentService';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    description: '',
    paymentType: 'TUITION' as 'TUITION' | 'FEES' | 'BOOKS' | 'OTHER',
    semester: 'الفصل الدراسي الثاني 2024-2025'
  });
  const [paymentStep, setPaymentStep] = useState<'form' | 'confirmation' | 'success' | 'error'>('form');
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and a single decimal point
    const value = e.target.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      return;
    }
    setPaymentDetails({ ...paymentDetails, amount: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentDetails.amount || parseFloat(paymentDetails.amount) <= 0) {
      toast({
        title: "خطأ في المبلغ",
        description: "الرجاء إدخال مبلغ صحيح للدفع",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await initiatePayment({
        amount: parseFloat(paymentDetails.amount),
        studentId: "2023145786", // In a real app, this would come from user context/state
        description: paymentDetails.description || `دفع ${paymentDetails.paymentType}`,
        paymentType: paymentDetails.paymentType,
        semester: paymentDetails.semester
      });

      if (response.success) {
        setTransactionId(response.transactionId || null);
        setPaymentStep('confirmation');
        toast({
          title: "تم إنشاء طلب الدفع",
          description: "يرجى متابعة الخطوات التالية لإتمام عملية الدفع",
        });
      } else {
        setPaymentStep('error');
        toast({
          title: "فشل في إنشاء طلب الدفع",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      setPaymentStep('error');
      toast({
        title: "خطأ في النظام",
        description: "حدث خطأ غير متوقع أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = () => {
    // In a real app, this would verify the payment with the bank
    setPaymentStep('success');
    toast({
      title: "تم الدفع بنجاح",
      description: "تم تسجيل عملية الدفع في النظام",
    });
  };

  const resetPayment = () => {
    setPaymentStep('form');
    setPaymentDetails({
      amount: '',
      description: '',
      paymentType: 'TUITION',
      semester: paymentDetails.semester
    });
  };

  // Animation variants
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

  const renderPaymentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">المبلغ (ريال يمني)</Label>
          <div className="relative">
            <Input
              id="amount"
              type="text"
              placeholder="أدخل المبلغ"
              value={paymentDetails.amount}
              onChange={handleAmountChange}
              className="pl-16 text-lg"
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              YER
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentType">نوع الدفع</Label>
          <Select
            value={paymentDetails.paymentType}
            onValueChange={(value: 'TUITION' | 'FEES' | 'BOOKS' | 'OTHER') => 
              setPaymentDetails({ ...paymentDetails, paymentType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع الدفع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TUITION">رسوم دراسية</SelectItem>
              <SelectItem value="FEES">رسوم إدارية</SelectItem>
              <SelectItem value="BOOKS">كتب ومراجع</SelectItem>
              <SelectItem value="OTHER">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="semester">الفصل الدراسي</Label>
          <Select
            value={paymentDetails.semester}
            onValueChange={(value) => setPaymentDetails({ ...paymentDetails, semester: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الفصل الدراسي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الفصل الدراسي الأول 2024-2025">الفصل الدراسي الأول 2024-2025</SelectItem>
              <SelectItem value="الفصل الدراسي الثاني 2024-2025">الفصل الدراسي الثاني 2024-2025</SelectItem>
              <SelectItem value="الفصل الصيفي 2025">الفصل الصيفي 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">الوصف (اختياري)</Label>
          <Input
            id="description"
            placeholder="وصف الدفع"
            value={paymentDetails.description}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, description: e.target.value })}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        disabled={loading}
      >
        {loading ? "جاري معالجة الطلب..." : "متابعة الدفع"}
      </Button>
    </form>
  );

  const renderPaymentConfirmation = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
          <CreditCard className="h-8 w-8 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold">تأكيد عملية الدفع</h3>
        <p className="text-gray-500">
          الرجاء التحقق من تفاصيل الدفع قبل المتابعة
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-right">
        <div className="flex justify-between py-2 border-b">
          <span className="font-bold">{paymentDetails.amount} ريال</span>
          <span className="text-gray-500">المبلغ:</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>
            {paymentDetails.paymentType === 'TUITION' && 'رسوم دراسية'}
            {paymentDetails.paymentType === 'FEES' && 'رسوم إدارية'}
            {paymentDetails.paymentType === 'BOOKS' && 'كتب ومراجع'}
            {paymentDetails.paymentType === 'OTHER' && 'أخرى'}
          </span>
          <span className="text-gray-500">نوع الدفع:</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>{paymentDetails.semester}</span>
          <span className="text-gray-500">الفصل الدراسي:</span>
        </div>
        <div className="flex justify-between py-2">
          <span>{transactionId}</span>
          <span className="text-gray-500">رقم العملية:</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={resetPayment}
        >
          عودة
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          onClick={confirmPayment}
        >
          تأكيد الدفع
        </Button>
      </div>

      <div className="text-xs text-gray-500 mt-6">
        <p>سيتم تحويلك إلى بوابة بنك الكريمي لإتمام عملية الدفع.</p>
        <p>يمكنك إتمام الدفع باستخدام خدمة كاش موبايل أو بطاقة الائتمان.</p>
      </div>
    </div>
  );

  const renderPaymentSuccess = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold">تمت عملية الدفع بنجاح</h3>
        <p className="text-gray-500">
          تم تسجيل دفعتك في النظام وسيتم تحديث سجل الدفعات الخاص بك
        </p>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-right">
        <div className="flex justify-between py-2 border-b border-green-100">
          <span className="font-bold text-green-700">{paymentDetails.amount} ريال</span>
          <span className="text-green-700">المبلغ المدفوع:</span>
        </div>
        <div className="flex justify-between py-2 border-b border-green-100">
          <span className="text-green-700">{new Date().toLocaleDateString('ar-SA')}</span>
          <span className="text-green-700">تاريخ العملية:</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-green-700">{transactionId}</span>
          <span className="text-green-700">رقم العملية:</span>
        </div>
      </div>

      <Button 
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        onClick={() => navigate('/')}
      >
        العودة للصفحة الرئيسية
      </Button>

      <div className="mt-4">
        <Button 
          variant="ghost" 
          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
          onClick={resetPayment}
        >
          دفعة جديدة
        </Button>
      </div>
    </div>
  );

  const renderPaymentError = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold">فشلت عملية الدفع</h3>
        <p className="text-gray-500">
          حدث خطأ أثناء معالجة عملية الدفع الخاصة بك. يرجى المحاولة مرة أخرى.
        </p>
      </div>

      <Button 
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        onClick={resetPayment}
      >
        محاولة مرة أخرى
      </Button>

      <div className="mt-4">
        <Button 
          variant="ghost" 
          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          onClick={() => navigate('/')}
        >
          العودة للصفحة الرئيسية
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 pb-24">
      <AppHeader userName="مهيوب عبدالغني " />
      
      <motion.div 
        className="container px-4 sm:px-6 pt-6 pb-20 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Button 
            variant="ghost" 
            className="mb-4 group flex items-center gap-1 text-gray-600 hover:text-teal-600"
            onClick={() => navigate(-1)}
          >
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            <span>عودة</span>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              خدمة الدفع الإلكتروني
            </h1>
            <div className="flex items-center gap-2">
              <img 
                src="https://ye.mashroo3k.com/wp-content/uploads/2021/12/%D9%85%D8%B5%D8%B1%D9%81-%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85%D9%8A.png" 
                alt="بنك الكريمي" 
                className="h-10 object-contain"
              />
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            يمكنك دفع الرسوم الدراسية والتكاليف الأخرى إلكترونياً عبر بنك الكريمي
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-teal-600" />
                  {paymentStep === 'form' && 'إجراء دفعة جديدة'}
                  {paymentStep === 'confirmation' && 'تأكيد الدفع'}
                  {paymentStep === 'success' && 'تأكيد نجاح العملية'}
                  {paymentStep === 'error' && 'فشل في العملية'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentStep === 'form' && renderPaymentForm()}
                {paymentStep === 'confirmation' && renderPaymentConfirmation()}
                {paymentStep === 'success' && renderPaymentSuccess()}
                {paymentStep === 'error' && renderPaymentError()}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-sm font-medium">طرق الدفع المدعومة حاليا عن طريق بنك الكريمي</CardTitle>
              </CardHeader>
              <CardContent>
                
                  <div className="p-3 border rounded-lg bg-gray-50 text-sm text-gray-600">
                    <p className="text-center">للمساعدة أو الاستفسارات</p>
                    <p className="text-center font-medium mt-1">اتصل بنا على 960-928-733</p>
                  </div>
              
              </CardContent>
              
            </Card>
          </div>
        </motion.div>
      </motion.div>
      
      <NavigationBar />
    </div>
  );
};

export default Payment;
