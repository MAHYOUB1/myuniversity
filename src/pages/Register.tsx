
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, User, Mail, Phone, Lock, Building, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "الاسم يجب أن يكون 3 أحرف على الأقل.",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح.",
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل.",
  }),
  college: z.string({
    required_error: "يرجى اختيار الكلية.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call a registration API
    console.log(values);
    toast({
      title: "تم إنشاء الحساب بنجاح",
      description: "تم إرسال رابط تفعيل الحساب إلى بريدك الإلكتروني",
    });
    navigate("/login");
  }

  const colleges = [
    { value: "engineering", label: "كلية الهندسة" },
    { value: "medicine", label: "كلية الطب" },
    { value: "commerce", label: "كلية التجارة" },
    { value: "science", label: "كلية العلوم" },
    { value: "arts", label: "كلية الآداب" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 flex flex-col items-center justify-center p-4 py-16">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mb-6"
      >
        <div className="flex justify-center mb-2">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 rounded-full">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
          جامعتي
        </h1>
        <p className="text-gray-600 text-center mb-8">
          أنشئ حسابك الجديد للوصول إلى خدمات البوابة
        </p>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl text-center">إنشاء حساب جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="أدخل اسمك الكامل" 
                            {...field} 
                            className="pl-10" 
                          />
                        </FormControl>
                        <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="أدخل بريدك الإلكتروني" 
                            {...field} 
                            className="pl-10" 
                          />
                        </FormControl>
                        <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="أدخل رقم هاتفك" 
                            {...field} 
                            className="pl-10" 
                          />
                        </FormControl>
                        <Phone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الكلية</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="اختر الكلية" />
                            </SelectTrigger>
                            <SelectContent>
                              {colleges.map((college) => (
                                <SelectItem key={college.value} value={college.value}>
                                  {college.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Building className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="أدخل كلمة المرور" 
                            {...field} 
                            className="pl-10" 
                          />
                        </FormControl>
                        <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تأكيد كلمة المرور</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="أعد إدخال كلمة المرور" 
                            {...field} 
                            className="pl-10" 
                          />
                        </FormControl>
                        <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transition-all"
                >
                  إنشاء الحساب
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button 
              variant="ghost" 
              className="w-full text-gray-600 hover:text-gray-800" 
              onClick={() => navigate("/login")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>لديك حساب بالفعل؟ تسجيل الدخول</span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Register;
