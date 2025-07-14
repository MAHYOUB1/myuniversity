
import React, { useState } from 'react';
import { ArrowRight, Bell, Globe, Moon, User, Lock, Shield, HelpCircle, LogOut, Smartphone, Palette, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/NavigationBar";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  endContent?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, description, onClick, endContent }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center">
        <div className="p-2 bg-gray-100 rounded-full ml-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      <div>
        {endContent || <ChevronRight className="h-5 w-5 text-gray-400" />}
      </div>
    </motion.div>
  );
};

const Settings = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const handleLogout = () => {
    // Implement logout logic
    setLogoutDialogOpen(false);
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح من النظام",
    });
    // Redirect to login page or show login modal
  };
  
  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast({
      title: checked ? "تم تفعيل الإشعارات" : "تم إيقاف الإشعارات",
      description: checked ? "ستتلقى إشعارات عن التحديثات الهامة" : "لن تتلقى إشعارات بعد الآن",
    });
  };
  
  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    // Implement dark mode toggle logic
  };
  
  const handleToggleBiometric = (checked: boolean) => {
    setBiometricLogin(checked);
    toast({
      title: checked ? "تم تفعيل تسجيل الدخول بالبصمة" : "تم إيقاف تسجيل الدخول بالبصمة",
      description: checked ? "يمكنك الآن استخدام بصمة الإصبع لتسجيل الدخول" : "ستحتاج لإدخال كلمة المرور في كل مرة",
    });
  };

  const settingsSections = [
    {
      title: "الحساب",
      items: [
        {
          icon: <User size={20} className="text-blue-600" />,
          title: "معلومات الملف الشخصي",
          description: "تعديل معلوماتك الشخصية",
        },
        {
          icon: <Lock size={20} className="text-purple-600" />,
          title: "الأمان والخصوصية",
          description: "كلمة المرور وإعدادات الحماية",
        },
        {
          icon: <Smartphone size={20} className="text-teal-600" />,
          title: "تسجيل الدخول بالبصمة",
          description: "استخدام بصمة الإصبع لتسجيل الدخول",
          endContent: <Switch checked={biometricLogin} onCheckedChange={handleToggleBiometric} />,
        }
      ]
    },
    {
      title: "التفضيلات",
      items: [
        {
          icon: <Bell size={20} className="text-orange-600" />,
          title: "الإشعارات",
          description: "إدارة إشعارات التطبيق",
          endContent: <Switch checked={notificationsEnabled} onCheckedChange={handleToggleNotifications} />,
        },
        {
          icon: <Moon size={20} className="text-indigo-600" />,
          title: "الوضع الليلي",
          description: "تفعيل المظهر الداكن",
          endContent: <Switch checked={darkMode} onCheckedChange={handleToggleDarkMode} />,
        },
        {
          icon: <Globe size={20} className="text-green-600" />,
          title: "اللغة",
          description: "تغيير لغة التطبيق",
          endContent: <span className="text-sm text-gray-500">العربية</span>,
        },
        {
          icon: <Palette size={20} className="text-pink-600" />,
          title: "المظهر",
          description: "تخصيص شكل التطبيق",
        }
      ]
    },
    {
      title: "الدعم",
      items: [
        {
          icon: <HelpCircle size={20} className="text-amber-600" />,
          title: "مركز المساعدة",
          description: "الأسئلة الشائعة والدعم",
        },
        {
          icon: <Shield size={20} className="text-red-600" />,
          title: "سياسة الخصوصية",
          description: "معلومات حول جمع واستخدام البيانات",
        }
      ]
    },
    {
      title: "الحساب",
      items: [
        {
          icon: <LogOut size={20} className="text-gray-600" />,
          title: "تسجيل الخروج",
          description: "تسجيل الخروج من حسابك",
          onClick: () => setLogoutDialogOpen(true),
        }
      ]
    }
  ];

  return (
    <div className="container pb-20 pt-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="ml-2">
          <ArrowRight className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>
      
      <div className="space-y-6">
        {settingsSections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-3">{section.title}</h2>
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <SettingsItem 
                  key={itemIdx}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  onClick={item.onClick}
                  endContent={item.endContent}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">تأكيد تسجيل الخروج</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p className="text-center text-gray-600">
              هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="flex-1" onClick={() => setLogoutDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>إصدار التطبيق: 1.1.0</p>
        <p className="mt-1">© جميع الحقوق محفوظة - للمهندس : مهيوب الحمادي 2025</p>
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default Settings;
