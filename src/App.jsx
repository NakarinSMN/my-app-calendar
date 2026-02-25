import { useState } from "react";
import MainContent from "./components/MainContent";
// นำเข้าไอคอนเพื่อความสม่ำเสมอของดีไซน์
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function App() {
  const [isEntered, setIsEntered] = useState(false);

  if (!isEntered) {
    return (
      // เปลี่ยนพื้นหลังเป็นสีขาวสะอาด หรือเทาจางมากๆ (bg-gray-50/30)
      <div className="flex flex-col items-center justify-center h-screen bg-white font-sans overflow-hidden">
        
        {/* 1. Icon Decoration: ใช้เส้นที่บางมาก (strokeWidth={1}) และแอนิเมชันชีพจรเบาๆ */}
        <div className="mb-10 p-5 bg-gray-50 rounded-full animate-pulse">
          <ShieldCheck className="text-gray-300" size={40} strokeWidth={1} />
        </div>

        {/* 2. Typography: ใช้ตัวหนังสือเล็กแต่เว้นระยะห่างเยอะ (Tracking) จะดูแพงมาก */}
        <div className="text-center mb-12">
          <h1 className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold mb-4">
            P.R.B. Management System
          </h1>
          <p className="text-2xl font-light text-gray-800 tracking-tight">
            เริ่มต้นจัดการความคุ้มครองของคุณ
          </p>
        </div>

        {/* 3. Button: สไตล์ Capsule Outlined ที่ดูเบาสบายตา */}
        <button
          onClick={() => setIsEntered(true)}
          className="group flex items-center gap-3 px-10 py-3 border border-gray-100 bg-white text-gray-500 rounded-full hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all duration-500 active:scale-95 shadow-sm shadow-gray-100/50"
        >
          <span className="text-sm font-semibold tracking-wide">เข้าสู่ระบบ</span>
          {/* ลูกศรที่จะขยับเมื่อเอาเมาส์ไปชี้ (Hover) */}
          <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </button>
        
        {/* Footer เล็กๆ สำหรับความมินิมอล */}
        <footer className="absolute bottom-10 text-[10px] text-gray-300 tracking-widest uppercase">
          Internal access only
        </footer>
      </div>
    );
  }

  return (
    // ปรับพื้นหลังหน้าหลักให้จางลงเพื่อความต่อเนื่อง
    <div className="min-h-screen bg-gray-50/30">
      <MainContent />
    </div>
  );
}