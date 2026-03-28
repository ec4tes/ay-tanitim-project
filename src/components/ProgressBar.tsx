'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
    currentStation: number;
    totalStations: number;
    completedStations: number[];
}

const stationNames = [
    'Troposfer',
    'Stratosfer',
    'Mezosfer',
    'Termosfer',
    'Ekzosfer',
    'Yörünge',
    'Derin Uzay',
    'Ay Yörüngesi',
    'Yaklaşma',
    'Ay Yüzeyi',
];

export default function ProgressBar({ currentStation, totalStations, completedStations }: ProgressBarProps) {
    const progressPercent = (completedStations.length / totalStations) * 100;

    return (
        <div className="w-full px-3 py-2 md:px-6 md:py-3 bg-space-900/60 backdrop-blur-sm border-b border-white/5">
            {/* Ana ilerleme çubuğu */}
            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                {/* Parlama efekti */}
                <motion.div
                    className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ left: ['-10%', '110%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
            </div>

            {/* Durak noktaları - sadece masaüstünde göster */}
            <div className="hidden md:flex justify-between items-center">
                {Array.from({ length: totalStations }, (_, i) => {
                    const stationNum = i + 1;
                    const isCompleted = completedStations.includes(stationNum);
                    const isCurrent = currentStation === stationNum;

                    return (
                        <div key={stationNum} className="flex flex-col items-center gap-1">
                            <motion.div
                                className={`w-3 h-3 rounded-full border-2 transition-all ${isCompleted
                                        ? 'bg-green-400 border-green-400 shadow-lg shadow-green-400/30'
                                        : isCurrent
                                            ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/30'
                                            : 'bg-transparent border-white/30'
                                    }`}
                                animate={isCurrent ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span
                                className={`text-[9px] font-space ${isCurrent ? 'text-cyan-400' : isCompleted ? 'text-green-400/70' : 'text-white/30'
                                    }`}
                            >
                                {stationNames[i]}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobil durak göstergesi */}
            <div className="flex md:hidden justify-center">
                <span className="text-[10px] font-space text-cyan-400">
                    📍 {stationNames[currentStation - 1]} ({currentStation}/{totalStations})
                </span>
            </div>
        </div>
    );
}
