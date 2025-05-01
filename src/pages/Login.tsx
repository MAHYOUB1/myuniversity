
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
import { GraduationCap, Lock, Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call an authentication API
    console.log(values);
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في بوابة الطالب",
    });
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 flex flex-col items-center justify-center p-4">
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
          بوابة الطالب الجامعية
        </h1>
        <p className="text-gray-600 text-center mb-8">
          قم بتسجيل الدخول للوصول إلى حسابك
        </p>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-t-4 border-t-teal-500">
          <CardHeader>
            <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all"
                >
                  تسجيل الدخول
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center w-full">
              <a href="#" className="text-sm text-teal-600 hover:text-teal-800 transition-colors">
                نسيت كلمة المرور؟
              </a>
            </div>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">أو</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/register")}
            >
              <span>إنشاء حساب جديد</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
