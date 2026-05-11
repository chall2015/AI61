import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  ChevronRight, 
  History, 
  RotateCcw, 
  Share2, 
  Play, 
  Gift, 
  Image as ImageIcon,
  AlertCircle,
  X
} from 'lucide-react';
import { AppStep, ChildhoodTheme } from './types';
import { THEMES, TRIVIA_QUESTIONS } from './constants';

export default function App() {
  const [step, setStep] = useState<AppStep>('welcome');
  const [selectedTheme, setSelectedTheme] = useState<ChildhoodTheme | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [showBlindBox, setShowBlindBox] = useState(false);
  const [blindBoxReward, setBlindBoxReward] = useState<string | null>(null);

  const handleStart = () => {
    setStep('style-select');
  };

  const handleStyleSelect = (theme: ChildhoodTheme) => {
    setSelectedTheme(theme);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setStep('generating');
        startGenerating();
      };
      reader.readAsDataURL(file);
    }
  };

  const startGenerating = () => {
    setTimeout(() => {
      setGeneratedImage("https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=800&auto=format&fit=crop");
      setStep('result');
    }, 6000); 
  };

  const handleTriviaAnswer = (index: number) => {
    if (index === TRIVIA_QUESTIONS[currentTriviaIndex].answer) {
      setTriviaScore(prev => prev + 1);
    }
    if (currentTriviaIndex < TRIVIA_QUESTIONS.length - 1) {
      setCurrentTriviaIndex(prev => prev + 1);
    }
  };

  const openBlindBox = () => {
    const rewards = [
      "弹珠大师勋章",
      "小霸王终极周五券",
      "大白兔奶糖兑换码",
      "铁皮玩具表情包",
      "复古珍藏背景卡"
    ];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setBlindBoxReward(randomReward);
    setShowBlindBox(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-stone-100 font-sans overflow-hidden py-4 sm:py-8">
      <div className="tv-scanlines fixed inset-0 z-50 pointer-events-none opacity-20"></div>
      
      {/* H5 Container - Aspect Ratio 750:1624 */}
      <div className="relative w-full max-w-[390px] aspect-[750/1624] bg-retro-beige shadow-2xl rounded-[40px] overflow-hidden flex flex-col noise-bg border-[12px] border-stone-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-800 rounded-b-2xl z-[60]"></div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <WelcomeScreen key="welcome" onStart={handleStart} />
            )}

            {step === 'style-select' && (
              <StyleSelectScreen 
                key="style-select" 
                selectedTheme={selectedTheme}
                onSelect={handleStyleSelect} 
                onUpload={handleUpload}
                onBack={() => setStep('welcome')} 
              />
            )}

            {step === 'generating' && (
              <GeneratingScreen 
                key="generating" 
                currentIndex={currentTriviaIndex}
                onAnswer={handleTriviaAnswer}
                score={triviaScore}
              />
            )}

            {step === 'result' && (
              <ResultScreen 
                key="result"
                selectedTheme={selectedTheme!}
                uploadedImage={uploadedImage!}
                generatedImage={generatedImage!}
                onBack={() => setStep('welcome')}
                onOpenBlindBox={openBlindBox}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {showBlindBox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative border-4 border-yellow-400 shadow-2xl"
          >
            <button 
              onClick={() => setShowBlindBox(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X size={24} />
            </button>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <Gift size={40} className="text-yellow-600 text-glow" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 font-nostalgia">获得时光珍藏</h3>
            <p className="text-stone-600 mb-6">{blindBoxReward}</p>
            <button 
              onClick={() => setShowBlindBox(false)}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 rounded-xl font-bold transition-colors"
            >
              收入回忆包
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

interface StepProps {
  onStart?: () => void;
  onSelect?: (t: ChildhoodTheme) => void;
  onBack?: () => void;
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnswer?: (i: number) => void;
  onOpenBlindBox?: () => void;
  key?: string;
}

function WelcomeScreen({ onStart }: StepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12"
    >
      <div className="mb-8 relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-4 border-2 border-dashed border-retro-brown rounded-full opacity-20"
        />
        <div className="w-28 h-28 bg-retro-brown rounded-full flex items-center justify-center shadow-inner relative z-10">
          <History size={56} className="text-retro-beige animate-pulse" />
        </div>
      </div>

      <h1 className="text-4xl font-nostalgia font-bold text-retro-brown mb-4 tracking-wider leading-tight">
        AI 时光机<br/><span className="text-xl md:text-2xl opacity-80">- 回到小时候 -</span>
      </h1>
      
      <p className="text-base text-stone-600 mb-12 font-medium">
        沉浸式穿越体验，重拾童年纯真记忆<br/>
        让这一刻，定格最无忧无虑的时光
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative px-10 py-4 bg-retro-brown text-retro-beige font-bold text-lg rounded-full shadow-xl flex items-center gap-2"
      >
        <span>启动时光机</span>
        <ChevronRight size={20} />
      </motion.button>

      <p className="mt-8 text-xs text-stone-400 tracking-widest">
        80s · 90s · 00s Memories
      </p>
    </motion.div>
  );
}

interface StyleSelectProps extends StepProps {
  selectedTheme: ChildhoodTheme | null;
}

function StyleSelectScreen({ onSelect, onBack, onUpload, selectedTheme }: StyleSelectProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartCrossing = () => {
    if (!selectedTheme) {
      alert("请先选择一个童年主题哦～");
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 w-full px-6 py-8 flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 text-stone-500 hover:text-retro-brown">
          <RotateCcw size={20} />
        </button>
        <h2 className="text-xl font-nostalgia font-bold text-retro-brown">我们要穿越到...</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pb-6">
        {THEMES.map((theme) => (
          <motion.div
            key={theme.id}
            onClick={() => onSelect?.(theme.id)}
            className={`group cursor-pointer bg-white rounded-2xl p-4 shadow-md border-2 transition-all relative overflow-hidden flex items-center gap-4 ${
              selectedTheme === theme.id ? 'border-retro-brown scale-[1.02]' : 'border-transparent'
            }`}
          >
            <div className={`w-12 h-12 shrink-0 ${theme.bgColor} rounded-xl flex items-center justify-center text-2xl shadow-sm italic`}>
              {theme.icon}
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-base font-bold font-nostalgia truncate text-stone-800">{theme.name}</h3>
                <span className={`px-1.5 py-0.5 ${theme.bgColor} text-white text-[8px] font-bold rounded-md`}>
                  {theme.tag}
                </span>
               </div>
              <p className="text-stone-500 text-[10px] leading-snug line-clamp-2">
                {theme.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 space-y-3 flex flex-col items-center">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={onUpload} 
        />
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartCrossing}
          className={`w-full py-3.5 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all ${
            selectedTheme ? 'bg-retro-brown text-retro-beige shadow-retro-brown/20' : 'bg-stone-200 text-stone-400 shadow-none'
          }`}
        >
          <Camera size={18} />
          <span>选好了，开始穿越</span>
        </motion.button>
        
        <p className="text-[10px] text-stone-400 font-medium">
          请上传清晰正面照，还原效果更好哦
        </p>
      </div>
    </motion.div>
  );
}

interface GenProps extends StepProps {
  currentIndex: number;
  score: number;
}

function GeneratingScreen({ currentIndex, onAnswer, score }: GenProps) {
  const currentTrivia = TRIVIA_QUESTIONS[currentIndex];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full px-6 py-8 flex flex-col animate-pulse-slow"
    >
      <div className="mb-10 flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-4 border-retro-brown border-t-transparent rounded-full"
          />
        </div>
        <h2 className="text-xl font-nostalgia font-bold text-retro-brown mb-2">正在时空隧道中...</h2>
        <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 10, ease: 'linear' }}
            className="h-full bg-retro-brown"
          />
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex-1 bg-white rounded-3xl p-6 shadow-xl relative border-2 border-retro-paper flex flex-col"
      >
        <div className="absolute -top-3 right-6 bg-retro-brown text-retro-beige px-3 py-0.5 rounded-full text-[10px] font-bold">
          挑战: {currentIndex + 1} / {TRIVIA_QUESTIONS.length}
        </div>
        
        <h3 className="text-sm font-bold mb-6 text-stone-800 leading-relaxed">
          📖 考考你的童年回忆：<br/>
          <span className="text-retro-brown block mt-2 text-base">{currentTrivia.question}</span>
        </h3>

        <div className="flex-1 space-y-2">
          {currentTrivia.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer?.(idx)}
              className="w-full p-4 text-left bg-stone-50 border-2 border-transparent rounded-xl hover:border-retro-brown hover:bg-retro-beige/20 transition-all text-sm font-medium"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-stone-400 text-[10px]">
          <span className="font-bold">获得勋章: {score}</span>
          <div className="flex gap-1">
            {Array.from({ length: TRIVIA_QUESTIONS.length }).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < score ? 'bg-yellow-400' : 'bg-stone-200'}`} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ResultCompProps extends StepProps {
  selectedTheme: ChildhoodTheme;
  uploadedImage: string;
  generatedImage: string;
}

function ResultScreen({ selectedTheme, generatedImage, onBack, onOpenBlindBox }: ResultCompProps) {
  const themeData = THEMES.find(t => t.id === selectedTheme);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full px-5 py-6 flex flex-col items-center overflow-y-auto no-scrollbar"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-nostalgia font-bold text-retro-brown">穿越成功！</h2>
        <p className="text-[10px] text-stone-500 font-medium mt-1 italic">长按图片即可保存到相册</p>
      </div>

      <div className="w-full space-y-6">
        {/* Photo Area + Insight */}
        <div className="w-full flex flex-col items-center bg-white p-4 rounded-[32px] shadow-xl border-4 border-white">
          <div className="w-full aspect-[3/4] bg-stone-200 rounded-2xl overflow-hidden relative shadow-inner mb-4">
            <img src={generatedImage} alt="Childhood Memory" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <span className={`px-2 py-1 ${themeData?.bgColor} text-white text-[8px] font-bold rounded-md shadow-sm`}>
                {themeData?.tag}主题
              </span>
            </div>
          </div>
          
          {/* Reflection Text moved here */}
          <div className="w-full px-2 py-1 text-center">
             <p className="text-xs font-calligraphy leading-relaxed text-stone-600 italic">
              “童年很短，快乐很长。那颗赤诚的童心，永远是你对抗世俗的盾牌。”
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          {/* Primary Video Action */}
          <button className="w-full flex items-center justify-center gap-3 bg-retro-brown text-retro-beige py-4 rounded-2xl font-bold text-base shadow-lg shadow-retro-brown/20 active:scale-[0.98] transition-all">
            <Play size={20} fill="currentColor" />
            <span>生成童年专属视频</span>
          </button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center gap-1.5 bg-white text-stone-700 py-3 rounded-2xl font-bold text-[11px] shadow-md border border-stone-50 active:scale-95 transition-all">
              <div className="w-8 h-8 bg-retro-beige rounded-full flex items-center justify-center">
                <Share2 size={16} className="text-retro-brown" />
              </div>
              <span>保存海报</span>
            </button>
            <button onClick={onOpenBlindBox} className="flex flex-col items-center justify-center gap-1.5 bg-yellow-400 text-yellow-900 py-3 rounded-2xl font-bold text-[11px] shadow-md active:scale-95 transition-all">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Gift size={16} />
              </div>
              <span>时光盲盒</span>
            </button>
            <button onClick={onBack} className="flex flex-col items-center justify-center gap-1.5 bg-stone-100 text-stone-600 py-3 rounded-2xl font-bold text-[11px] shadow-md active:scale-95 transition-all">
              <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center">
                <RotateCcw size={16} />
              </div>
              <span>重新开始</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
