
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GPA from "./pages/GPA";
import Grades from "./pages/Grades";
import Timetable from "./pages/Timetable";
import GraduationServices from "./pages/GraduationServices";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import IdCard from "./pages/IdCard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gpa" element={<GPA />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/graduation" element={<GraduationServices />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/id-card" element={<IdCard />} />
      
        <Route path="/register" element={<Register />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
