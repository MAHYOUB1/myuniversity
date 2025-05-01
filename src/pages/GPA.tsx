
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from "@/components/NavigationBar";
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const GPA = () => {
  // Sample data for the GPA chart
  const gpaData = [
    { semester: 'الفصل 1', gpa: 3.2 },
    { semester: 'الفصل 2', gpa: 3.5 },
    { semester: 'الفصل 3', gpa: 3.3 },
    { semester: 'الفصل 4', gpa: 3.8 },
    { semester: 'الفصل 5', gpa: 3.7 },
    { semester: 'الفصل 6', gpa: 3.9 }
  ];
  
  const [isLoading, setIsLoading] = useState(true);
  const [chartHover, setChartHover] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
        variants={itemVariants}
      >
        <Link to="/" className="ml-2">
          <ArrowRight className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold">المعدل التراكمي</h1>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="h-12 w-12 border-4 border-t-teal-600 border-r-teal-600 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-teal-600">جاري تحميل البيانات...</p>
        </div>
      ) : (
        <>
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-teal-50 shadow-md border-none overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-gray-700">المعدل التراكمي الحالي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <motion.p 
                      className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 text-transparent bg-clip-text"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        delay: 0.5
                      }}
                    >
                      3.9
                    </motion.p>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-white px-2 py-0.5 rounded-full">
                      ممتاز
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="h-[300px] w-full"
                  variants={itemVariants}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={gpaData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      onMouseMove={(e) => {
                        if (e.activeTooltipIndex !== undefined) {
                          setChartHover(e.activeTooltipIndex);
                        }
                      }}
                      onMouseLeave={() => setChartHover(null)}
                    >
                      <defs>
                        <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0694a2" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0694a2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="semester" tick={{ fill: '#666' }} />
                      <YAxis domain={[0, 4]} tick={{ fill: '#666' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          textAlign: 'right'
                        }} 
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="gpa"
                        name="المعدل التراكمي"
                        stroke="#0694a2"
                        strokeWidth={3}
                        dot={(props) => {
                          const { cx, cy, index } = props;
                          return (
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r={index === chartHover ? 8 : 6}
                              fill={index === chartHover ? "#0694a2" : "white"}
                              stroke="#0694a2" 
                              strokeWidth={2}
                              className="transition-all duration-300"
                            />
                          )
                        }}
                        activeDot={{ r: 8 }}
                        fill="url(#gpaGradient)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <motion.div 
              className="relative p-6 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl text-center text-white shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
              <h3 className="text-blue-100 mb-2">عدد الساعات المجتازة</h3>
              <p className="text-3xl font-bold">96</p>
              <div className="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto"></div>
            </motion.div>
            
            <motion.div 
              className="relative p-6 bg-gradient-to-br from-green-600 to-green-400 rounded-xl text-center text-white shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-500 opacity-10 rounded-full blur-2xl"></div>
              <h3 className="text-green-100 mb-2">التقدير العام</h3>
              <p className="text-3xl font-bold">امتياز</p>
              <div className="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto"></div>
            </motion.div>
          </motion.div>
        </>
      )}
      
      <NavigationBar />
    </motion.div>
  );
};

export default GPA;
