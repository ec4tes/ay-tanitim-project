'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { stations } from '@/data/stations';
import { soundManager } from '@/lib/soundManager';
import StarField from '@/components/StarField';
import Rocket from '@/components/Rocket';
import HUD from '@/components/HUD';
import ProgressBar from '@/components/ProgressBar';
import InfoPanel from '@/components/InfoPanel';
import QuestionCard from '@/components/QuestionCard';
import MoonLanding from '@/components/MoonLanding';
import CompletionScreen from '@/components/CompletionScreen';
import SoundToggle from '@/components/SoundToggle';
import ToastContainer, { useToast } from '@/components/Toast';
import Planet from '@/components/Planet';

export default function GamePage() {
    const {
        username,
        currentStation,
        completedStations,
        phase,
        score,
        totalCorrect,
        totalWrong,
        combo,
        maxCombo,
        speed,
        isMuted,
        answerQuestion,
        nextStation,
        completeLanding,
        resetGame,
        toggleMute,
        loadSavedState,
    } = useGameStore();

    const { toasts, addToast, removeToast } = useToast();
    const [isShaking, setIsShaking] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        loadSavedState();
        setHasInitialized(true);
    }, [loadSavedState]);

    // Ses durumunu güncelle
    useEffect(() => {
        soundManager.setMuted(isMuted);
    }, [isMuted]);

    // Mevcut durak verisini al
    const currentStationData = useMemo(
        () => stations.find((s) => s.id === currentStation) || stations[0],
        [currentStation]
    );

    // Kullanıcı adı yoksa ana sayfaya yönlendir
    useEffect(() => {
        if (hasInitialized && !username && typeof window !== 'undefined') {
            window.location.href = '/';
        }
    }, [hasInitialized, username]);

    // Soru cevaplama
    const handleAnswer = useCallback(
        (isCorrect: boolean) => {
            answerQuestion(isCorrect);

            if (isCorrect) {
                soundManager.play('correct');

                const newCombo = combo + 1;
                if (newCombo >= 3) {
                    soundManager.play('combo');
                    addToast(`🔥 ${newCombo}x Combo! Harika gidiyorsun, ${username}!`, 'combo', 4000);
                } else {
                    addToast(`Doğru cevap! Harika, ${username}! 🎯`, 'success');
                }
            } else {
                soundManager.play('wrong');
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 500);
                addToast(`İyi ilerledin, tekrar dene ${username}! 💫`, 'error');
            }
        },
        [combo, username, answerQuestion, addToast]
    );

    // Sonraki durağa geç
    const handleNext = useCallback(() => {
        setIsTransitioning(true);
        soundManager.play('transition');
        soundManager.play('thrust');

        setTimeout(() => {
            nextStation();
            setIsTransitioning(false);
        }, 800);
    }, [nextStation]);

    // İniş tamamlandı
    const handleLandingComplete = useCallback(() => {
        soundManager.play('landing');
        soundManager.play('success');
        completeLanding();
    }, [completeLanding]);

    // Yeniden başlat
    const handleRestart = useCallback(() => {
        resetGame();
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
    }, [resetGame]);

    // Ay inişi aşaması
    if (!hasInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-space-900 text-white">
                <p className="font-space text-sm text-white/60">Gorev yukleniyor...</p>
            </div>
        );
    }

    if (phase === 'landing') {
        return (
            <>
                <StarField starsVisible={true} speed={speed} />
                <MoonLanding speed={speed} onComplete={handleLandingComplete} username={username} />
                <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
                <ToastContainer toasts={toasts} onRemove={removeToast} />
            </>
        );
    }

    // Tamamlanma aşaması
    if (phase === 'completed') {
        return (
            <>
                <StarField starsVisible={true} speed={1} />
                <CompletionScreen
                    username={username}
                    score={score}
                    totalCorrect={totalCorrect}
                    totalWrong={totalWrong}
                    maxCombo={maxCombo}
                    speed={speed}
                    onRestart={handleRestart}
                />
                <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
            </>
        );
    }

    // Ana oyun aşaması
    return (
        <div className="min-h-screen flex flex-col bg-space-900 relative overflow-hidden">
            {/* Yıldızlı arka plan */}
            <StarField
                starsVisible={currentStationData.theme.starsVisible}
                atmosphereOpacity={currentStationData.theme.atmosphereOpacity}
                atmosphereColor={currentStationData.theme.particleColor}
                speed={speed}
            />

            {/* Gradyan arka plan */}
            <div
                className={`fixed inset-0 bg-gradient-to-b ${currentStationData.theme.bgGradient} transition-all duration-1000`}
                style={{ zIndex: 0 }}
            />

            {/* HUD */}
            <div className="relative z-10">
                <HUD
                    username={username}
                    score={score}
                    speed={speed}
                    currentStation={currentStation}
                    totalStations={10}
                    combo={combo}
                />
                <ProgressBar
                    currentStation={currentStation}
                    totalStations={10}
                    completedStations={completedStations}
                />
            </div>

            {/* Ana 3 Panel Düzen */}
            <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
                {/* Sol Panel — Bilgi */}
                <div className="w-full lg:w-[31%] xl:w-[29%] bg-space-900/40 backdrop-blur-sm border-r border-white/5 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <InfoPanel station={currentStationData} key={`info-${currentStation}`} />
                    </AnimatePresence>
                </div>

                {/* Orta Panel — Roket Sahnesi */}
                <div className="w-full lg:w-[38%] xl:w-[42%] relative min-h-[340px] overflow-hidden border-y border-white/5 bg-space-950/20 lg:min-h-0 lg:border-y-0">
                    {/* Durak geçiş animasyonu */}
                    <AnimatePresence>
                        {isTransitioning && (
                            <motion.div
                                className="absolute inset-0 bg-white/10 z-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        )}
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(to_bottom,transparent,rgba(2,6,23,0.24))]" />

                    <motion.div
                        className="absolute left-1/2 top-10 -translate-x-1/2"
                        key={`target-${currentStation}`}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 0.95, scale: 1 }}
                    >
                        <Planet
                            type="moon"
                            size={210}
                            detailLevel="high"
                            glow
                            animated
                        />
                    </motion.div>

                    <div className="absolute bottom-[-12%] left-1/2 h-40 w-[140%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.5),rgba(15,23,42,0.15),transparent_72%)] blur-xl" />
                    <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-cyan-300/15 to-white/0" />

                    <motion.div
                        className="absolute left-1/2 top-[18%] h-[58%] w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-300/0 via-cyan-300/25 to-cyan-300/0"
                        animate={{ opacity: [0.35, 0.7, 0.35] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {Array.from({ length: 12 }, (_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-10 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0"
                                style={{ left: `${8 + i * 7.5}%`, top: `${10 + (i % 4) * 18}%` }}
                                animate={{ y: ['-8%', '12%'], opacity: [0, 0.8, 0] }}
                                transition={{
                                    duration: 1.8 + (i % 3) * 0.2,
                                    repeat: Infinity,
                                    delay: i * 0.12,
                                    ease: 'linear',
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        className="absolute left-1/2"
                        animate={{
                            bottom: `${12 + (currentStation / 10) * 56}%`,
                            x: '-50%',
                        }}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                    >
                        <Rocket
                            speed={speed}
                            isShaking={isShaking}
                            isThrusting={true}
                            progress={(currentStation / 10) * 100}
                        />
                    </motion.div>

                    {/* Durak etiketi */}
                    <motion.div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 
                       bg-space-900/70 backdrop-blur-md border border-white/10 
                       rounded-full px-4 py-1.5"
                        key={`label-${currentStation}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="text-xs font-space text-white/60">
                            {currentStationData.theme.label}
                        </span>
                    </motion.div>

                    {/* Hız göstergesi yıldızları — hız efekti */}
                    {speed > 5 && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {Array.from({ length: speed * 2 }, (_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-0.5 bg-white/20"
                                    style={{
                                        left: `${10 + Math.random() * 80}%`,
                                        height: `${10 + speed * 3}px`,
                                    }}
                                    animate={{
                                        top: ['-5%', '105%'],
                                        opacity: [0, 0.5, 0],
                                    }}
                                    transition={{
                                        duration: 0.5 + Math.random() * 0.5,
                                        repeat: Infinity,
                                        delay: Math.random() * 0.5,
                                        ease: 'linear',
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Sağ Panel — Soru */}
                <div className="w-full lg:w-[31%] xl:w-[29%] bg-space-900/40 backdrop-blur-sm border-l border-white/5 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <QuestionCard
                            question={currentStationData.question}
                            stationId={currentStation}
                            onAnswer={handleAnswer}
                            onNext={handleNext}
                            key={`question-${currentStation}`}
                        />
                    </AnimatePresence>
                </div>
            </div>

            {/* Ses Kontrolü */}
            <SoundToggle isMuted={isMuted} onToggle={toggleMute} />

            {/* Toast Bildirimleri */}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    );
}
