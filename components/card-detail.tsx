"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// --- DATA CONSTANTS ---
const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// --- DATA KARTU & GALERI ---
const vinkaCardData = {
  type: "Ulang tahun",
  fullName: "Vinka Afiyata Mentari Pranata, Tavalerien!",
  tanggal: "4 Januari 2026",
  from: "Vastroboy",
  ucapan:
    "selamaat ulaang taaun sayaangggggg🔥💗🥰😍🥳 terimaa kaasih ataas 5 taaun bersamaa dan atas support serta kepercayaanmu ke aku buat bisa wujudin mimpi kita satu persatu. suka dan dukaa dilewati bersamaa dari aku yang ngojek, dirawat di rs sampe sekarang bisa kerja dari mana ajaa kaamu selalu adaa disetiap momen hidupku. aku harap semoga kaamu semaakin bahagiaa, cantik, sehaat, dan bijaaksanaa selalu. rasanyaa semakin dewasa kata kataa aja ngga cukup buaat semuaa yang udah kamu kaasih ke akuu. ayo perjalanan kita masih panjang kita jalani semuanyaa sama samaa trus yaa, semogaa kitaa bisa lulus wisuda bareng, bisa punya rumah sebelum menikah, lamaran, menikah, s2 barengg di aussie aamiin. apapun yang kamu inginkan ayo kita wujudkan bersama!. so let's make today about you, about us, and moments we will remember forever!",
  gallery: [
    { src: "/vinka.jpeg", caption: "💖" },
    { src: "/vinka2.jpeg", caption: "💖" },
    { src: "/vinka3.jpeg", caption: "💖" },
  ]
};

const CardDetail: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [balloonPositions, setBalloonPositions] = useState<number[]>([]);
  const [balloonImages, setBalloonImages] = useState<string[]>([]);
  
  // --- STATE AUTHENTICATION ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // State Input Dropdown
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState("Januari");
  const [errorMsg, setErrorMsg] = useState("");

  // --- STATE COUNTDOWN ---
  const [isLocked, setIsLocked] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setBalloonPositions([...Array(15)].map(() => Math.random() * 100));
    setBalloonImages([...Array(15)].map(() => `ballon${Math.floor(Math.random() * 3) + 1}.svg`));

    // Target: 4 Januari 2026, Jam 00:00:00
    const targetDate = new Date("Jan 4, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsLocked(false);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setIsLocked(true);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- LOGIKA BUKA KARTU (ANIMASI) ---
  const triggerOpenCard = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFC0CB', '#FF69B4', '#FFD700', '#FFFFFF']
    });
    
    setShowBalloons(true);
    setIsOpen(true); // Langsung buka

    setTimeout(() => {
      setShowBalloons(false);
    }, 10000);
  };

  // --- HANDLE KLIK COVER ---
  const handleCardCoverClick = () => {
    if (isAuthenticated) {
        // Jika sudah login tapi kartu tertutup, buka lagi
        if (!isOpen) triggerOpenCard();
    } else {
        // Jika belum login, tampilkan modal
        setShowPasswordModal(true);
        setErrorMsg(""); // Reset error saat modal dibuka
    }
  };

  // --- HANDLE SUBMIT PASSWORD ---
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    
    // VALIDASI: 25 Oktober
    if (selectedDay === "25" && selectedMonth === "Oktober") {
        setIsAuthenticated(true);
        setShowPasswordModal(false);
        triggerOpenCard(); // Otomatis buka kartu setelah sukses
    } else {
        setErrorMsg("Tanggal anniversary salah sayang :(");
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLocked && isOpen) {
       confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFC0CB', '#FF69B4', '#FFFFFF']
      });
    }
  }, [isAuthenticated, isLocked, isOpen]);

  return (
    <div className="flex justify-center items-center h-screen relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 via-purple-300/40 to-indigo-300/40 z-0"></div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* BALON ANIMASI */}
      {showBalloons && (
        <motion.div className="absolute w-full h-full pointer-events-none z-50">
          {balloonPositions.map((left, index) => (
            <motion.img
              key={index}
              src={`/${balloonImages[index]}`}
              alt="Balon"
              className="absolute w-24 md:w-32 bottom-0 opacity-80"
              style={{ left: `${left}%` }}
              initial={{ y: "100%" }}
              animate={{ y: "-120vh" }}
              transition={{
                duration: 8 + Math.random() * 5,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* --- MODAL PASSWORD (POPUP) --- */}
      <AnimatePresence>
        {showPasswordModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                onClick={() => setShowPasswordModal(false)} // Tutup jika klik luar
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()} // Jangan tutup jika klik dalam
                    className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center border-4 border-pink-100"
                >
                    <span className="text-4xl mb-2 block">🔐</span>
                    <h3 className="text-xl font-bold text-slate-700 mb-1">Security Check</h3>
                    <p className="text-sm text-slate-500 mb-6">Kapan kita anniversary?</p>

                    <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                        <div className="flex gap-2 justify-center">
                            {/* DROPDOWN HARI */}
                            <select 
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300 w-1/3 text-center appearance-none cursor-pointer"
                            >
                                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>

                            {/* DROPDOWN BULAN */}
                            <select 
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300 w-2/3 text-center appearance-none cursor-pointer"
                            >
                                {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        {errorMsg && <p className="text-red-500 text-xs font-bold animate-pulse">{errorMsg}</p>}

                        <button 
                            type="submit"
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
                        >
                            Buka Hadiah 🎁
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- COVER KARTU --- */}
      <motion.div
        onClick={handleCardCoverClick}
        className={`w-11/12 max-w-md h-[650px] absolute cursor-pointer z-40`}
        initial={{ x: 0, rotate: 0 }}
        animate={{ 
          x: isOpen ? "-100%" : 0, 
          rotate: isOpen ? -10 : 0, 
          opacity: isOpen ? 0 : 1 
        }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <div className="w-full h-full rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:bg-white/40 transition-all duration-300">
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-inner"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-inner"></div>
            </div>
            
            {/* TAMPILAN COVER */}
            <div className="text-center p-8">
                <span className="text-6xl mb-4 block drop-shadow-sm">💌</span>
                <h2 className="text-2xl font-bold text-slate-700 tracking-wide">For Vinka</h2>
                <p className="text-slate-600 mt-2 text-sm font-medium">Tap to open surprise</p>
                {/* Indikator gembok kecil jika belum login */}
                {!isAuthenticated && (
                    <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-500 text-xl opacity-60">🔒</span>
                )}
            </div>

            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
        </div>
      </motion.div>

      {/* --- KONTEN KARTU (ISI) --- */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 1 : 0.8, 
          opacity: isOpen ? 1 : 0,
          rotate: isOpen ? 0 : 5
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-11/12 max-w-md h-[650px] relative z-30"
      >
        <div className="w-full h-full rounded-2xl bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex flex-col overflow-hidden">
            
            <div className="h-10 bg-white/40 border-b border-white/20 flex items-center px-4 justify-between shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Vinka&apos;s_Birthday.pdf
                </div>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scroll-smooth relative no-scrollbar">
                
                <div className="text-center mb-6">
                    <p className="text-sm font-medium text-pink-500 uppercase tracking-widest mb-1">{vinkaCardData.tanggal}</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                        {vinkaCardData.fullName}
                    </h1>
                </div>

                <div className="min-h-[300px] mb-8 relative">
                    <AnimatePresence mode="wait">
                        {!isLocked ? (
                            <motion.div 
                                key="locked"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                className="absolute inset-0 w-full h-full rounded-xl bg-white/40 border border-white/50 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-inner z-10 p-4"
                            >
                                <span className="text-4xl mb-2">🎁</span>
                                <h3 className="text-slate-600 font-bold text-sm uppercase tracking-wide mb-2">Unlocking in...</h3>
                                
                                <div className="text-3xl md:text-4xl font-black text-slate-700 font-mono my-2 tracking-tighter">
                                    {countdown.days > 0 && <span className="mr-1">{countdown.days}d</span>}
                                    <span>{countdown.hours.toString().padStart(2, '0')}:</span>
                                    <span>{countdown.minutes.toString().padStart(2, '0')}:</span>
                                    <span>{countdown.seconds.toString().padStart(2, '0')}</span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">Wait until 4 January 2026</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="content"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="mb-6">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Captured Moments</h3>
                                    
                                    <div className="flex overflow-x-auto gap-4 pb-4 px-2 snap-x snap-mandatory no-scrollbar">
                                        {vinkaCardData.gallery.map((item, index) => (
                                            <div 
                                                key={index} 
                                                className={`flex-shrink-0 snap-center w-60 bg-white p-3 rounded-xl shadow-md border border-white/60 transform transition-transform hover:scale-105 ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
                                            >
                                                <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-100 mb-3">
                                                    <img 
                                                        src={item.src} 
                                                        alt="Memory" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-center text-slate-600 font-handwriting text-sm font-medium">{item.caption}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-center text-[10px] text-slate-400 mt-1 animate-pulse">← Swipe for more →</p>
                                </div>

                                <div className="bg-white/40 p-5 rounded-xl border border-white/40 shadow-sm mx-1">
                                    <p className="text-slate-700 italic text-justify font-medium leading-relaxed text-sm">
                                        &quot;{vinkaCardData.ucapan}&quot; - {vinkaCardData.from}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-3 pb-4 mt-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Birthday&apos;s Itinerary</h3>
                    
                    <ul className="relative space-y-0">
                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>

                        <li className="relative pl-8 pb-4">
                            <div className="absolute left-0 top-1.5 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                                <span className="text-[10px]">🚗</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg border border-white/30 shadow-sm">
                                <span className="font-bold text-slate-800 block text-sm">10.00 WIB</span>
                                <span className="text-slate-600 text-sm">Pick up the Princess</span>
                                <span className="text-xs text-slate-400 block mt-1">📍 Kemangkon</span>
                            </div>
                        </li>

                        <li className="relative pl-8 pb-4">
                            <div className="absolute left-0 top-1.5 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                                <span className="text-[10px]">🎮</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg border border-white/30 shadow-sm">
                                <span className="font-bold text-slate-800 block text-sm">11.00 WIB</span>
                                <span className="text-slate-600 text-sm">Timezone & Birthday Treats</span>
                                <span className="text-xs text-pink-500 font-medium mt-1 block">🍣 Sushi & 🍩 Donuts @ Rita Supermall</span>
                            </div>
                        </li>

                        <li className="relative pl-8 pb-4">
                            <div className="absolute left-0 top-1.5 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                                <span className="text-[10px]">🎨</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg border border-white/30 shadow-sm">
                                <span className="font-bold text-slate-800 block text-sm">14.30 WIB</span>
                                <span className="text-slate-600 text-sm">Have fun at Thera Art</span>
                                <span className="text-xs text-slate-400 block mt-1">✨ Creative Session</span>
                            </div>
                        </li>
                        
                        <li className="relative pl-8 pb-4">
                            <div className="absolute left-0 top-1.5 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                                <span className="text-[10px]">🏠</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg border border-white/30 shadow-sm">
                                <span className="font-bold text-slate-800 block text-sm">17.00 WIB</span>
                                <span className="text-slate-600 text-sm">Rest & Recharge</span>
                                <span className="text-xs text-slate-400 block mt-1">📍 At Boarding House (Kos)</span>
                            </div>
                        </li>

                        <li className="relative pl-8">
                            <div className="absolute left-0 top-1.5 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                                <span className="text-[10px]">🌌</span>
                            </div>
                            <div className="bg-gradient-to-r from-pink-100/80 to-purple-100/80 p-3 rounded-lg border border-white/50 shadow-sm">
                                <span className="font-bold text-slate-800 block text-sm">20.00 WIB</span>
                                <span className="text-slate-700 text-sm font-medium">Romantic Dinner</span>
                                <span className="text-xs text-slate-500 block mt-1">📍 Taman Langit</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardDetail;