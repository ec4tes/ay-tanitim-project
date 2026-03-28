'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Gauge, Play, RotateCcw, Sparkles, Target, User } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import StarField from '@/components/StarField';
import SoundToggle from '@/components/SoundToggle';
import Planet from '@/components/Planet';
import Rocket from '@/components/Rocket';

export default function HomePage() {
    const { username, setUsername, startGame, loadSavedState, resetGame, phase, currentStation, score, isMuted, toggleMute } =
        useGameStore();

    const [inputName, setInputName] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [hasSavedGame, setHasSavedGame] = useState(false);

    useEffect(() => {
        loadSavedState();
    }, [loadSavedState]);

    useEffect(() => {
        if (username && phase === 'playing' && currentStation > 1) {
            setHasSavedGame(true);
        }
    }, [username, phase, currentStation]);

    const handleSkipIntro = () => {
        setShowIntro(false);
    };

    const handleStart = () => {
        if (inputName.trim()) {
            setUsername(inputName.trim());
            startGame();
            window.location.href = '/game';
        }
    };

    const handleContinue = () => {
        startGame();
        window.location.href = '/game';
    };

    const handleRestart = () => {
        resetGame();
        setHasSavedGame(false);
        setInputName('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleStart();
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
            <StarField starsVisible speed={0.8} />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(148,163,184,0.12),transparent_18%),linear-gradient(180deg,#020617_0%,#060b21_48%,#030712_100%)]" />

            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black"
                        onClick={handleSkipIntro}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative text-center">
                            <motion.div
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="mx-auto mb-8 flex w-fit items-end gap-8 rounded-[32px] border border-white/10 bg-white/5 px-10 py-8 backdrop-blur-xl"
                            >
                                <Rocket speed={4} isShaking={false} isThrusting={true} progress={30} />
                                <Planet type="moon" size={148} detailLevel="high" glow animated={false} />
                            </motion.div>
                            <motion.h1
                                className="font-space text-4xl font-bold tracking-tight text-white md:text-7xl"
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.35 }}
                            >
                                Ay&apos;a Ilk Temas
                            </motion.h1>
                            <motion.p
                                className="mt-3 text-sm text-white/55 md:text-base"
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.55 }}
                            >
                                Dunya&apos;dan Ay yuzeyine uzanan etkilesimli gorev.
                            </motion.p>
                            <motion.p
                                className="mt-8 text-xs uppercase tracking-[0.35em] text-white/30"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.3] }}
                                transition={{ delay: 1, duration: 2.2, repeat: Infinity }}
                            >
                                Devam etmek icin tikla
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1450px] flex-col px-5 pb-12 pt-24 md:px-8 xl:px-12">
                <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.95fr]">
                    <motion.section
                        className="relative"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                            <Sparkles size={14} />
                            Lunar Mission
                        </div>

                        <h1 className="max-w-3xl font-space text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl">
                            Dunya&apos;dan Ay&apos;a uzanan sinematik bir gorev deneyimi.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
                            Atmosfer katmanlarini gec, uzay bilgisini topla, roketini yonet ve son
                            iniste Ay yuzeyine kontrollu sekilde dokun. Bu ekran artik sadece giris
                            degil, gorevin basladigi yer.
                        </p>

                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                                <Gauge size={18} className="text-cyan-300" />
                                <p className="mt-3 font-space text-sm text-white">10 duraklik rota</p>
                                <p className="mt-2 text-sm leading-6 text-white/55">Troposferden Ay yuzeyine kadar kademeli akis.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                                <Target size={18} className="text-emerald-300" />
                                <p className="mt-3 font-space text-sm text-white">Canli gorev akisi</p>
                                <p className="mt-2 text-sm leading-6 text-white/55">Bilgi, soru ve hiz hissi ayni sahnede birlesiyor.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                                <Sparkles size={18} className="text-amber-300" />
                                <p className="mt-3 font-space text-sm text-white">Ay inişi finali</p>
                                <p className="mt-2 text-sm leading-6 text-white/55">Roketin gucunu ayarlayip yumusak inis yap.</p>
                            </div>
                        </div>

                        <div className="relative mt-12 h-[340px] overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.24),transparent_22%),linear-gradient(180deg,rgba(15,23,42,0.72),rgba(2,6,23,0.92))] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.5)] md:h-[420px] md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(255,255,255,0.1),transparent_16%),radial-gradient(circle_at_24%_75%,rgba(14,165,233,0.15),transparent_22%)]" />

                            <div className="absolute left-6 top-1/2 -translate-y-1/2 md:left-8">
                                <Planet type="earth" size={250} detailLevel="medium" glow animated />
                            </div>
                            <div className="absolute right-6 top-8 md:right-8">
                                <Planet type="moon" size={150} detailLevel="high" glow animated />
                            </div>

                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    d="M 10 78 C 30 60, 45 42, 60 34 S 84 24, 92 16"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="0.5"
                                    strokeDasharray="2 2"
                                />
                                <path
                                    d="M 10 78 C 30 60, 45 42, 60 34 S 84 24, 92 16"
                                    fill="none"
                                    stroke="rgba(34,211,238,0.55)"
                                    strokeWidth="0.9"
                                    strokeDasharray="0 6"
                                />
                            </svg>

                            <motion.div
                                className="absolute left-[16%] top-[60%] md:left-[22%]"
                                animate={{ x: ['0%', '255%'], y: ['0%', '-118%'], rotate: [-18, 5, -12] }}
                                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Rocket speed={5} isShaking={false} isThrusting={true} progress={50} />
                            </motion.div>

                            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md md:bottom-8 md:left-8">
                                <p className="font-space text-xs uppercase tracking-[0.25em] text-cyan-200/60">Rota</p>
                                <p className="mt-2 text-sm text-white/75">Dunya orbitasindan Ay yuzeyine kontrollu gecis</p>
                            </div>

                            <div className="absolute right-6 top-6 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md md:right-8 md:top-8">
                                <p className="font-space text-xs uppercase tracking-[0.25em] text-white/45">Hedef</p>
                                <p className="mt-2 text-sm text-white/75">Yumusak inis ve gorev tamamlama</p>
                            </div>
                        </div>
                    </motion.section>

                    <motion.aside
                        className="relative"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.12 }}
                    >
                        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(2,6,23,0.92))] shadow-[0_30px_90px_rgba(2,6,23,0.55)]">
                            <div className="border-b border-white/10 px-6 py-6 md:px-8">
                                <p className="font-space text-xs uppercase tracking-[0.35em] text-cyan-200/55">Mission Brief</p>
                                <h2 className="mt-3 max-w-md font-space text-2xl font-bold text-white md:text-3xl">
                                    Ucus planini kilitle, roketi hazirla.
                                </h2>
                                <p className="mt-3 max-w-md text-sm leading-7 text-white/58 md:text-base">
                                    Her dogru cevap roketine ivme kazandirir. Son hedef: Ay yuzeyine sakin ve kontrollu bir inis.
                                </p>
                            </div>

                            <div className="grid gap-4 px-6 py-6 md:px-8">
                                <div className="grid gap-3">
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <p className="font-space text-sm text-cyan-200">Gorev Akisi</p>
                                        <div className="mt-4 space-y-3 text-sm text-white/65">
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                                                <span>Atmosfer katmanlarini gec ve uzay bilgisini topla.</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                                                <span>Sorulari cevapla, puan ve hiz kombosu yakala.</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                                                <span>Finalde roket itkisini yonetip Ay&apos;a in.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {hasSavedGame ? (
                                    <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                                        <p className="font-space text-sm text-emerald-300">Kayitli Gorev Bulundu</p>
                                        <p className="mt-2 text-sm leading-7 text-white/65">
                                            {username} icin durak {currentStation}/10 hazir. Toplam puan: {score}.
                                        </p>
                                        <div className="mt-5 flex gap-3">
                                            <motion.button
                                                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 px-5 py-3 font-space text-sm font-bold text-white"
                                                onClick={handleContinue}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <Play size={15} />
                                                    Devam Et
                                                </span>
                                            </motion.button>
                                            <motion.button
                                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75"
                                                onClick={handleRestart}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <RotateCcw size={16} />
                                            </motion.button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                                        <label className="mb-3 block font-space text-sm text-white/70">
                                            <User size={14} className="mr-2 inline" />
                                            Astronot Kimligi
                                        </label>
                                        <input
                                            type="text"
                                            value={inputName}
                                            onChange={(e) => setInputName(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Adini gir..."
                                            maxLength={20}
                                            className="w-full rounded-2xl border border-white/10 bg-[#11182d] px-4 py-4 text-sm text-white placeholder:text-white/25 focus:border-cyan-400/50 focus:outline-none"
                                            autoFocus
                                        />
                                        <motion.button
                                            className={`mt-4 w-full rounded-2xl px-6 py-4 font-space text-sm font-bold transition-all ${
                                                inputName.trim()
                                                    ? 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 text-white shadow-[0_18px_40px_rgba(14,165,233,0.28)]'
                                                    : 'bg-white/5 text-white/30'
                                            }`}
                                            onClick={handleStart}
                                            disabled={!inputName.trim()}
                                            whileHover={inputName.trim() ? { scale: 1.02 } : {}}
                                            whileTap={inputName.trim() ? { scale: 0.98 } : {}}
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                Goreve Basla
                                                <ArrowRight size={15} />
                                            </span>
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
        </div>
    );
}
