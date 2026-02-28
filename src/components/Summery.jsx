import React, { useState, useEffect } from "react";
// นำเข้า Icon จาก lucide-react เพื่อใช้ตกแต่ง
import { CalendarDays, ArrowRight, Car, Truck, Bike, ShieldCheck } from "lucide-react";

// ข้อมูลตั้งต้น: แนบ Icon ให้ตรงกับประเภทรถ
const vehicleTypes = [
  { name: "รย.1 (รถยนต์นั่ง)", basePrice: 645.41, icon: Car },
  { name: "รย.2 (รถโดยสาร)", basePrice: 1182.55, icon: Car },
  { name: "รย.2 (เชิงพาณิชย์)", basePrice: 2493.30, icon: Truck },
  { name: "รย.3 (กระบะ)", basePrice: 967.88, icon: Truck },
  { name: "รย.3 (น้ำหนักเกิน 3-6 ตัน)", basePrice: 1310.95, icon: Truck },
  { name: "รย.3 (น้ำหนักเกิน 6-12 ตัน)", basePrice: 1408.32, icon: Truck },
  { name: "รย.3 (น้ำหนักเกิน 12 ตัน)", basePrice: 1826.69, icon: Truck },
  { name: "รย.12 (ขนาดไม่เกิน 75 ซีซี)", basePrice: 161.77, icon: Bike },
  { name: "รย.12 (ขนาดเกิน 75-125 ซีซี)", basePrice: 323.34, icon: Bike },
  { name: "รย.12 (ขนาดเกิน 125-150 ซีซี)", basePrice: 430.34, icon: Bike },
  { name: "รย.12 (ขนาดเกิน 150 ซีซี)", basePrice: 645.41, icon: Bike },
];

// 🌟 Component พิเศษสำหรับทำตัวเลขวิ่ง
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTime;
    const startValue = displayValue;
    const duration = 600; // ความเร็วในการวิ่ง (600ms = 0.6 วินาที)

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // ทำให้ตัวเลขค่อยๆ ช้าลงตอนใกล้ถึงปลายทาง (Ease-out cubic)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(startValue + (value - startValue) * easeOutProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // จบการทำงานให้ตัวเลขเป๊ะ
      }
    };

    requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // ฟอร์แมตตัวเลขให้มีคอมม่าและทศนิยม 2 ตำแหน่งเสมอ
  return displayValue.toLocaleString('th-TH', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}

export default function Summery({ startDate, endDate }) {
  const diffDays = endDate.diff(startDate, "day");
  const validDays = diffDays > 0 ? diffDays : 0;

  // เปลี่ยนมาคืนค่าเป็นตัวเลขดิบๆ (Number) เพื่อให้ Component ลูกเอาไปวิ่งได้
  const calculatePriceRaw = (basePrice) => {
    return (validDays / 365) * basePrice;
  };

  return (
    <div className="w-full">
      
      {/* 1. ส่วนแสดงวันที่ */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700 border-dashed">
        
        {/* กลุ่มวันที่พร้อม Icon */}
        <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
          <CalendarDays className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <span className="font-medium text-sm">
            {startDate.format("DD MMM YYYY")}
          </span>
          <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          <span className="font-medium text-sm ">
            {endDate.format("DD MMM YYYY")}
          </span>
        </div>

        {/* ป้ายกำกับจำนวนวัน */}
        <div className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium rounded-full border border-gray-100 dark:border-gray-700">
          {validDays} วัน
        </div>
      </div>

      {/* หัวข้อลิสต์ */}
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">อัตราเบี้ยประกัน</h2>
      </div>

      {/* 2. ลิสต์รายการรถและราคา */}
      <div className="flex flex-col max-h-[500px] overflow-auto p-4 pr-2">
        {vehicleTypes.map((vehicle, index) => {
          const VehicleIcon = vehicle.icon;
          const priceValue = calculatePriceRaw(vehicle.basePrice);

          return (
            <div 
              key={index} 
              className={`flex items-center justify-between py-3.5 group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50 rounded-lg px-2 ${
                index !== vehicleTypes.length - 1 ? "border-b border-gray-100 dark:border-gray-800/60" : ""
              }`}
            >
              {/* ฝั่งซ้าย: Icon + ชื่อประเภทรถ */}
              <div className="flex items-center gap-3">
                <div className="p-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors bg-white dark:bg-transparent rounded-md shadow-sm dark:shadow-none border border-gray-50 dark:border-transparent">
                  <VehicleIcon className="w-4 h-4" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {vehicle.name}
                </span>
              </div>

              {/* ฝั่งขวา: ราคาที่วิ่งได้ */}
              <div className="text-right">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  {/* เรียกใช้ Component ตัวเลขวิ่งตรงนี้ */}
                  <AnimatedNumber value={priceValue} />
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-1.5 font-medium">บาท</span>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
  );
}
