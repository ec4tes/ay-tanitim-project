'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, Zap, RotateCcw, Share2, Star, Award } from 'lucide-react';

interface CompletionScreenProps {
    username: string;
    score: number;
    totalCorrect: number;
    totalWrong: number;
    maxCombo: number;
    speed: number;
    onRestart: () => void;
}

export default function CompletionScreen({
    username,
    score,
    totalCorrect,
    totalWrong,
    maxCombo,
    speed,
    onRestart,
}: CompletionScreenProps) {
    const accuracy = totalCorrect + totalWrong > 0
        ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100)
        : 0;

    // Başarı seviyesi
    const getRank = () => {
        if (accuracy >= 90 && maxCombo >= 5) return { title: 'Uzay Efsanesi', emoji: '🌟', color: 'text-yellow-400' };
        if (accuracy >= 80) return { title: 'Kıdemli Astronot', emoji: '🚀', color: 'text-cyan-400' };
        if (accuracy >= 60) return { title: 'Uzay Kaşifi', emoji: '🛰️', color: 'text-blue-400' };
        return { title: 'Uzay Çırağı', emoji: '🌙', color: 'text-purple-400' };
    };

    const rank = getRank();

    // Tarih
    const today = new Date().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Arka plan */}
            <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-indigo-950 to-black" />

            {/* Konfeti/yıldız efekti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: -10,
                            opacity: 0,
                        }}
                        animate={{
                            y: typeof window !== 'undefined' ? window.innerHeight + 10 : 1000,
                            opacity: [0, 1, 1, 0],
                            rotate: Math.random() * 360,
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Ana İçerik */}
            <motion.div
                className="relative z-10 w-full max-w-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                {/* Sertifika Kartı */}
                <div className="bg-gradient-to-b from-space-800/90 to-space-900/90 backdrop-blur-xl 
                        border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Üst Banner */}
                    <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 
                          border-b border-white/10 p-6 text-center">
                        <motion.div
                            className="text-5xl mb-3"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            {rank.emoji}
                        </motion.div>
                        <h1 className="text-2xl md:text-3xl font-space font-bold text-white mb-1">
                            Görev Tamamlandı!
                        </h1>
                        <p className="text-white/50 text-sm font-body">Ay'a İlk Temas Sertifikası</p>
                    </div>

                    {/* Sertifika İçeriği */}
                    <div className="p-6 md:p-8">
                        {/* Kullanıcı ve Rütbe */}
                        <div className="text-center mb-6">
                            <p className="text-white/40 text-xs font-body mb-1">Bu sertifika</p>
                            <h2 className="text-xl font-space font-bold text-white mb-2">{username}</h2>
                            <p className="text-white/40 text-xs font-body mb-1">adına düzenlenmiştir</p>
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mt-2`}>
                                <Award size={14} className={rank.color} />
                                <span className={`font-space text-sm ${rank.color}`}>{rank.title}</span>
                            </div>
                        </div>

                        {/* İstatistikler */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                                <Trophy size={20} className="text-yellow-400 mx-auto mb-2" />
                                <p className="text-xl font-space font-bold text-white">{score}</p>
                                <p className="text-[10px] text-white/40 font-body">Toplam Puan</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                                <Target size={20} className="text-green-400 mx-auto mb-2" />
                                <p className="text-xl font-space font-bold text-white">%{accuracy}</p>
                                <p className="text-[10px] text-white/40 font-body">Doğruluk Oranı</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                                <Zap size={20} className="text-orange-400 mx-auto mb-2" />
                                <p className="text-xl font-space font-bold text-white">x{maxCombo}</p>
                                <p className="text-[10px] text-white/40 font-body">En Yüksek Combo</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                                <Star size={20} className="text-cyan-400 mx-auto mb-2" />
                                <p className="text-xl font-space font-bold text-white">
                                    {totalCorrect}/{totalCorrect + totalWrong}
                                </p>
                                <p className="text-[10px] text-white/40 font-body">Doğru Cevap</p>
                            </div>
                        </div>

                        {/* Tarih */}
                        <p className="text-center text-white/30 text-xs font-body mb-6">{today}</p>

                        {/* Butonlar */}
                        <div className="flex flex-col gap-3">
                            <motion.button
                                className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 
                           rounded-xl font-space text-sm text-white font-bold
                           hover:from-cyan-400 hover:to-blue-400 transition-all
                           flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                                onClick={onRestart}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <RotateCcw size={16} />
                                Yeniden Başla
                            </motion.button>
                        </div>
                    </div>

                    {/* Alt Bant */}
                    <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 
                          border-t border-white/5 px-6 py-3 text-center">
                        <p className="text-[10px] text-white/30 font-body">
                            🚀 Ay'a İlk Temas – Dijital Eğitim ve Hikayecilik Aracı
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
