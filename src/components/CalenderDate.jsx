import { useState, lazy, Suspense } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/th";

// Icons
import { RotateCcw, CalendarDays, ChevronRight } from "lucide-react";

const Summery = lazy(() => import('./Summery'));

dayjs.locale("th");

export default function CalenderDate() {
  // --- States ---
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "year"));
  const [duration, setDuration] = useState(endDate.diff(dayjs(), "day"));

  // --- Logics ---
  const getThaiYear = (date) => date.year() + 543;

  const handleStartDateChange = (newStart) => {
    setStartDate(newStart);
    setEndDate(newStart.add(duration, "day"));
  };

  const handleEndDateChange = (newEnd) => {
    setEndDate(newEnd);
    setDuration(newEnd.diff(startDate, "day"));
  };

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setDuration(value);
    setEndDate(startDate.add(value, "day"));
  };

  const handleReset = () => {
    const initialStart = dayjs();
    const initialEnd = dayjs().add(1, "year");
    setStartDate(initialStart);
    setEndDate(initialEnd);
    setDuration(initialEnd.diff(initialStart, "day"));
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start mx-auto w-full">

      {/* ================= ฝั่งซ้าย: ปฏิทิน + สรุปเบี้ย (Card หลัก) ================= */}
      <div className="flex-1 w-full bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col xl:flex-row gap-8">

        {/* ส่วนปฏิทิน */}
        <div className="flex-1 xl:border-r xl:border-gray-100 dark:xl:border-gray-700 xl:border-dashed xl:pr-8 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700 border-dashed">
            <div className="flex items-center gap-3">
              <div className="p-2 text-blue-500">
                <CalendarDays size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">กำหนดระยะเวลา</h2>
            </div>
            <button onClick={handleReset} className="group flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all">
              <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />
              รีเซ็ตค่า
            </button>
          </div>

          {/* ช่องกรอกจำนวนวัน */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3 group">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Duration</span>
              <input
                type="number"
                value={duration}
                onChange={handleDurationChange}
                className="w-20 bg-transparent text-center text-2xl font-black text-gray-900 dark:text-gray-100 border-b-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 focus:outline-none transition-all"
              />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Days</span>
            </div>
          </div>

          {/* ปฏิทินคู่ (ซ้าย - ขวา) */}
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">

              {/* ปฏิทินเริ่ม (ซ้าย) */}
              <div className="flex flex-col items-center bg-gray-50/30 dark:bg-gray-900/50 p-2 rounded-2xl border border-gray-50 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2 px-4 py-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400">เริ่ม ({getThaiYear(startDate)})</span>
                </div>
                <DateCalendar value={startDate} onChange={handleStartDateChange} views={['year', 'month', 'day']} />
              </div>

              {/* ลูกศรคั่นตรงกลาง */}
              <div className="hidden lg:flex items-center justify-center text-gray-300 dark:text-gray-600">
                <ChevronRight size={32} strokeWidth={1.5} />
              </div>

              {/* ปฏิทินสิ้นสุด (ขวา) */}
              <div className="flex flex-col items-center bg-gray-50/30 dark:bg-gray-900/50 p-2 rounded-2xl border border-gray-50 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2 px-4 py-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs font-bold text-green-700 dark:text-green-400">สิ้นสุด ({getThaiYear(endDate)})</span>
                </div>
                <DateCalendar value={endDate} onChange={handleEndDateChange} views={['year', 'month', 'day']} minDate={startDate} />
              </div>

            </div>
          </LocalizationProvider>

        </div>

        {/* ส่วนอัตราเบี้ย (Summary) อัปเดตแบบ Real-time */}
        <div className="w-full xl:w-[30%] flex flex-col">
          <Suspense fallback={<p className="text-center text-gray-400 mt-10">กำลังโหลดข้อมูล...</p>}>
            <div className="h-full">
              {/* ส่ง startDate และ endDate ไปตรงๆ เลย */}
              <Summery startDate={startDate} endDate={endDate} />
            </div>
          </Suspense>
        </div>

      </div>

    </div>
  );
}