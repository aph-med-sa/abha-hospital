import React, { useState } from 'react';
import { Download, Globe, User, Sparkles } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('ar'); // 'ar' or 'en'
  const [name, setName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const customStyles = {
    '--wp--preset--color--accent': '#01216c',
    '--wp--preset--color--base': '#f0f0f0',
    '--wp--preset--color--base-3': '#ffffff',
    '--wp--preset--color--contrast': '#222222',
    '--direction-multiplier': lang === 'ar' ? '-1' : '1',
    fontFamily: lang === 'ar' ? '"Tajawal", sans-serif' : 'sans-serif',
    direction: lang === 'ar' ? 'rtl' : 'ltr',
  };

  const content = {
    ar: {
      title: "نهنئكم بقدوم شهر رمضان المبارك",
      designTitle: "صمم بطاقة التهنئة",
      namePlaceholder: "اكتب اسمك هنا...",
      saveBtn: "حفظ البطاقة",
      downloading: "جاري الحفظ...",
      footer: "جميع الحقوق محفوظة لمستشفى ابها الخاص العالمي © 2026",
      imageName: "AR.png"
    },
    en: {
      title: "We congratulate you on the arrival of the blessed month of Ramadan.",
      designTitle: "Design Greeting Card",
      namePlaceholder: "Enter your name...",
      saveBtn: "Save Card",
      downloading: "Saving...",
      footer: "All rights reserved to Abha International Private Hospital © 2026",
      imageName: "AR.png"
    }
  };

  const currentContent = content[lang];

  const handleDownload = () => {
    if (!name.trim()) {
      alert(lang === 'ar' ? 'الرجاء كتابة الاسم' : 'Please enter a name');
      return;
    }

    setIsGenerating(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = '/AR.png';
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);

      const fontSize = canvas.width * 0.04;
      ctx.font = `bold ${fontSize}px "Tajawal", sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = canvas.width / 2;
      const y = canvas.height * 0.70;

      ctx.fillText(name, x, y);

      triggerDownload(canvas);
    };

    img.onerror = () => {
      generateMockCard(canvas, ctx);
    };
  };

  const triggerDownload = (canvas) => {
    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.download = `${name.trim() || 'Ramadan_Card'}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      setIsGenerating(false);
    }, 'image/png', 1.0);
  };

  const generateMockCard = (canvas, ctx) => {
    canvas.width = 1080;
    canvas.height = 1080;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 40;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = "#222222";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lang === 'ar' ? "رمضان مبارك" : "Ramadan Kareem", canvas.width / 2, canvas.height / 2 - 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 60px Arial";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 100);
    
    triggerDownload(canvas);
  };

  return (
    <div style={{
      ...customStyles,
      backgroundColor: '#ffffff'
    }} className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        body { font-family: 'Tajawal', sans-serif; }
        
        .animate-enter { opacity: 0; animation-fill-mode: forwards; }
        
        .fade-in-up { animation: fadeInUp 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scale-in { animation: scaleIn 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-in-down { animation: slideInDown 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-in-down-slow { animation: slideInDown 4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { animation: fadeIn 2.5s ease-out forwards; }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Main Card */}
      <div 
        className="relative z-10 w-full max-w-xl rounded-3xl shadow-xl overflow-hidden border border-gray-200 scale-in"
        style={{
            background: 'radial-gradient(circle at top right, rgba(0, 208, 132, 0.35) 0%, #ffffff 70%)',
        }}
      >
        
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#01216c] rounded-full opacity-20 animate-ping"></div>
        </div>

        {/* Top Right Decoration */}
        <img 
            src="/decoration.png" 
            alt="Decoration" 
            className="absolute top-0 right-0 w-20 z-0 pointer-events-none animate-enter slide-in-down-slow delay-100"
        />

        {/* Language Button */}
        <div className="absolute top-4 left-4 z-20 animate-enter fade-in delay-200">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-gray-100 text-[#01216c] rounded-full text-sm font-bold transition-all shadow-sm border border-gray-100"
          >
            <Globe size={16} />
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
        </div>

        {/* Logo and Title Area */}
        <div className="relative z-10 pt-16 pb-8 px-10 text-center">
            <div className="flex justify-center mb-4">
                {/* Hospital Logo */}
                <img 
                  src="/AIPH Logo 2025.svg" 
                  alt="AIPH Logo" 
                  className="h-16 object-contain animate-enter slide-in-down delay-200 mt-18"
                />
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold text-[#01216c] leading-relaxed animate-enter fade-in-up delay-300 mt-12">
                {currentContent.title}
            </h1>
        </div>

        {/* Input Area */}
        <div className="relative z-10 p-8">
            <div className="mb-6 text-center animate-enter fade-in-up delay-400">
                <h2 className="text-lg font-semibold text-[#28BA89] mb-4">
                    {currentContent.designTitle}
                </h2>
                <div className="h-1 w-16 bg-[#28BA89] mx-auto rounded-full"></div>
            </div>

            <div className="space-y-6">
                <div className="relative group animate-enter fade-in-up delay-500">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                        <User size={20} />
                    </div>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full p-4 ps-10 text-gray-900 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#01216c] focus:border-[#01216c] transition-all outline-none shadow-sm"
                        placeholder={currentContent.namePlaceholder}
                    />
                </div>

                <button 
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center gap-3 bg-[#01216c] hover:bg-[#00154a] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed animate-enter fade-in-up delay-600"
                >
                    {isGenerating ? (
                        <Sparkles className="animate-spin text-yellow-300" size={24} />
                    ) : (
                        <Download size={20} />
                    )}
                    {isGenerating ? currentContent.downloading : currentContent.saveBtn}
                </button>
            </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-8 pb-6 text-center animate-enter fade-in delay-700">
            <div className="border-t border-gray-100 mb-4"></div>
            <p className="text-[10px] text-gray-400 font-medium">
                {currentContent.footer}
            </p>
        </div>

      </div>
    </div>
  );
}
