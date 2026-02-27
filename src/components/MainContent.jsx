import React, { useState, useEffect } from "react";
import { LayoutDashboard, Calendar as CalendarIcon, Sun, Moon } from "lucide-react";

// นำเข้า Components ของคุณ
import CalenderDate from "./CalenderDate";

export default function MainContent() {
  // สร้าง State สำหรับเก็บค่า ธีม
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // เช็คค่าเริ่มต้นจาก LocalStorage หรือระบบของเครื่อง
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  // Effect สำหรับสลับคลาส 'dark' ที่ element <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // เพิ่ม dark:bg-gray-900 เพื่อให้พื้นหลังเปลี่ยนสีตอนเปิดโหมดมืด
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 font-sans p-6 md:p-5 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-500 mb-1">
              <LayoutDashboard size={14} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Overview</span>
            </div>
            {/* เพิ่ม dark:text-white เพื่อเปลี่ยนสีตัวหนังสือ */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">
              ระบบจัดการ พ.ร.บ.
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              ตรวจสอบเบี้ยประกันและจัดการตารางความคุ้มครอง
            </p>
          </div>

          {/* ส่วนปุ่มต่างๆ ด้านขวา */}
          <div className="flex items-center gap-3">
            {/* ปุ่มเปลี่ยนธีม */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all active:scale-95"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* ป้ายมุมมองปฏิทิน */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full shadow-sm transition-colors">
              <CalendarIcon size={14} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">มุมมองปฏิทิน</span>
            </div>
          </div>
        </header>

        {/* เส้นคั่น */}
        <div className="w-full border-b border-gray-200 dark:border-gray-800 border-dashed mb-5 transition-colors"></div>

        <main className="w-full animate-in fade-in duration-700">
          <CalenderDate />
        </main>

      </div>
    </div>
  );
}