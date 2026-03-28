'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Rocket from './Rocket';
import Planet from './Planet';

interface MoonLandingProps {
    speed: number;
    onComplete: () => void;
    username: string;
}

export default function MoonLanding({ speed, onComplete, username }: MoonLandingProps) {
    const [altitude, setAltitude] = useState(100);
    const [thrustPower, setThrustPower] = useState(52);
    const [isLanded, setIsLanded] = useState(false);
    const [landingQuality, setLandingQuality] = useState<'perfect' | 'good' | 'rough' | null>(null);

    const handleScroll = useCallback(
        (e: WheelEvent) => {
            if (isLanded) return;
            e.preventDefault();

            if (e.deltaY > 0) {
                setThrustPower((prev) => Math.max(10, prev - 4));
            } else {
                setThrustPower((prev) => Math.min(90, prev + 4));
            }
        },
        [isLanded]
    );

    useEffect(() => {
        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => window.removeEventListener('wheel', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (isLanded) return;

        const interval = setInterval(() => {
            setAltitude((prev) => {
                const normalizedThrust = thrustPower / 100;
                const descendRate = Math.max(0.12, (1 - normalizedThrust) * 1.25 + prev * 0.0025);
                const nextAltitude = prev - descendRate;

                if (nextAltitude <= 0) {
                    setIsLanded(true);

                    if (thrustPower >= 42 && thrustPower <= 58) {
                        setLandingQuality('perfect');
                    } else if (thrustPower >= 28 && thrustPower <= 72) {
                        setLandingQuality('good');
                    } else {
                        setLandingQuality('rough');
                    }

                    return 0;
                }

                return nextAltitude;
            });
        }, 60);

        return () => clearInterval(interval);
    }, [thrustPower, isLanded]);

    const thrustColor =
        thrustPower < 28
            ? 'text-red-400'
            : thrustPower < 42
                ? 'text-yellow-300'
                : thrustPower <= 58
                    ? 'text-emerald-300'
                    : 'text-cyan-300';

    const thrustBarColor =
        thrustPower < 28
            ? 'bg-red-500'
            : thrustPower < 42
                ? 'bg-yellow-400'
                : thrustPower <= 58
                    ? 'bg-emerald-400'
                    : 'bg-cyan-400';

    const rocketBottom = isLanded ? '8%' : `${6 + altitude * 0.48}%`;
    const showDust = !isLanded && altitude < 24 && thrustPower > 14;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.14),transparent_30%),radial-gradient(circle_at_78%_14%,rgba(59,130,246,0.12),transparent_18%),linear-gradient(to_bottom,#020617_0%,#040816_46%,#0b1120_100%)]" />

            <div className="absolute right-[8%] top-[8%]">
                <Planet type="earth" size={340} detailLevel="high" glow animated />
            </div>

            <div className="absolute inset-x-0 bottom-[17%] h-24 bg-[linear-gradient(to_bottom,rgba(203,213,225,0.02),rgba(148,163,184,0.05),rgba(71,85,105,0.08),transparent)]" />

            <div className="absolute inset-x-0 bottom-0 h-[28%] overflow-hidden">
                <div className="absolute left-1/2 bottom-[-1380px] h-[1600px] w-[1600px] -translate-x-1/2 rounded-full overflow-hidden md:bottom-[-1320px] md:h-[1700px] md:w-[1700px]">
                    <Image
                        src="/moon.png"
                        alt="Moon surface"
                        fill
                        sizes="1700px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,18,18,0.36),rgba(0,0,0,0.08)_42%,transparent_64%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(255,255,255,0.12),transparent_32%)]" />
                </div>

                <div className="absolute inset-x-0 bottom-[42%] h-[16%] bg-[linear-gradient(to_top,rgba(255,255,255,0.06),rgba(255,255,255,0.02),transparent)]" />

                <motion.div
                    className="absolute bottom-[18%] left-[68%] h-64 w-40 md:h-80 md:w-52"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLanded ? 1 : 0, y: isLanded ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: isLanded ? 0.4 : 0 }}
                >
                    <div className="absolute bottom-0 left-1/2 h-20 w-2 -translate-x-1/2 rounded-full bg-stone-900 md:h-28" />
                    <Image
                        src="/flag.png"
                        alt="Flag"
                        fill
                        sizes="208px"
                        className="object-contain object-bottom"
                    />
                </motion.div>
            </div>

            <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                animate={{ bottom: rocketBottom }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
            >
                <div className="relative scale-[0.68] md:scale-[0.8]">
                    <motion.div
                        className="absolute left-1/2 top-[88%] h-8 w-32 -translate-x-1/2 rounded-[50%] bg-black/45 blur-md"
                        animate={{
                            scaleX: isLanded ? 1.15 : 0.42 + (100 - altitude) / 170,
                            scaleY: isLanded ? 0.96 : 0.45 + (100 - altitude) / 280,
                            opacity: isLanded ? 0.46 : 0.14 + (100 - altitude) / 180,
                        }}
                    />

                    <AnimatePresence>
                        {showDust && (
                            <>
                                <motion.div
                                    className="absolute left-1/2 top-[84%] h-10 w-24 -translate-x-[84%] rounded-full bg-stone-200/22 blur-md"
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: [0.08, 0.24, 0.12], x: [-6, -18, -28], scale: [0.7, 1.05, 1.25] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeOut' }}
                                />
                                <motion.div
                                    className="absolute left-1/2 top-[84%] h-10 w-24 -translate-x-[16%] rounded-full bg-stone-200/22 blur-md"
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: [0.08, 0.24, 0.12], x: [6, 18, 28], scale: [0.7, 1.05, 1.25] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeOut', delay: 0.12 }}
                                />
                            </>
                        )}
                    </AnimatePresence>

                    <Rocket
                        speed={Math.max(2, speed - 1)}
                        isShaking={thrustPower < 22}
                        isThrusting={!isLanded && thrustPower > 14}
                        progress={100 - altitude}
                    />
                </div>
            </motion.div>

            <AnimatePresence>
                {!isLanded && (
                    <motion.div
                        className="absolute bottom-6 left-1/2 w-[92%] max-w-xl -translate-x-1/2 rounded-3xl border border-white/10 bg-space-900/75 p-6 backdrop-blur-xl"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                    >
                        <div className="mb-4 text-center">
                            <h3 className="font-space text-lg text-cyan-300">Ay Inis Kontrol Paneli</h3>
                            <p className="mt-1 text-xs text-white/50 font-body">
                                Scroll yukari: yumusat. Scroll asagi: inisi hizlandir.
                            </p>
                        </div>

                        <div className="mb-3 flex items-center justify-between">
                            <span className="font-space text-xs text-white/60">Yukseklik</span>
                            <span className="font-space text-sm text-white">{altitude.toFixed(1)} km</span>
                        </div>
                        <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
                                animate={{ width: `${altitude}%` }}
                            />
                        </div>

                        <div className="mb-3 flex items-center justify-between">
                            <span className="font-space text-xs text-white/60">Itis Gucu</span>
                            <span className={`font-space text-sm ${thrustColor}`}>{thrustPower}%</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className={`h-full rounded-full ${thrustBarColor}`}
                                animate={{ width: `${thrustPower}%` }}
                                transition={{ duration: 0.15 }}
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2 text-center">
                            <ArrowDown size={14} className="animate-bounce text-white/40" />
                            <span className="font-body text-[11px] text-white/45">
                                42-58 arasi sakin bir inis verir.
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLanded && (
                    <motion.div
                        className="absolute inset-0 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="mx-4 max-w-md rounded-3xl border border-white/15 bg-space-900/90 p-8 text-center backdrop-blur-xl"
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                        >
                            <div className="mb-4 text-6xl">
                                {landingQuality === 'perfect' ? '🌕' : landingQuality === 'good' ? '🚀' : '🛰️'}
                            </div>
                            <h2 className="mb-2 text-2xl font-space font-bold text-white">
                                {landingQuality === 'perfect'
                                    ? 'Mukemmel Inis!'
                                    : landingQuality === 'good'
                                        ? 'Basarili Inis!'
                                        : 'Inis Tamamlandi!'}
                            </h2>
                            <p className="font-body text-sm text-white/65">
                                {landingQuality === 'perfect'
                                    ? `Tebrikler ${username}, Ay yuzeyine cok temiz indin.`
                                    : landingQuality === 'good'
                                        ? `${username}, guvenli bir sekilde Ay yuzeyine ulastin.`
                                        : `${username}, biraz sert olsa da gorev basariyla tamamlandi.`}
                            </p>

                            <motion.button
                                className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-space text-sm font-bold text-white shadow-lg shadow-cyan-500/20"
                                onClick={onComplete}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Gorev Raporunu Gor
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
