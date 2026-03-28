'use client';

import { motion } from 'framer-motion';
import { Gauge, Zap, MapPin, Trophy, User } from 'lucide-react';

interface HUDProps {
    username: string;
    score: number;
    speed: number;
    currentStation: number;
    totalStations: number;
    combo: number;
}

export default function HUD({ username, score, speed, currentStation, totalStations, combo }: HUDProps) {
    // Hız göstergesi rengi
    const speedColor =
        speed <= 3 ? 'text-red-400' : speed <= 6 ? 'text-yellow-400' : 'text-green-400';
    const speedBarWidth = (speed / 10) * 100;
    const speedBarColor =
        speed <= 3
            ? 'bg-red-500'
            : speed <= 6
                ? 'bg-yellow-500'
                : 'bg-green-500';

    return (
        <motion.div
            className="flex flex-wrap items-center justify-between gap-2 md:gap-4 px-3 py-2 md:px-6 md:py-3 
                 bg-space-900/80 backdrop-blur-md border-b border-white/10"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Kullanıcı Adı */}
            <div className="flex items-center gap-2">
                <User size={14} className="text-cyan-400" />
                <span className="text-cyan-400 font-space text-xs md:text-sm truncate max-w-[100px] md:max-w-[150px]">
                    {username}
                </span>
            </div>

            {/* Skor */}
            <div className="flex items-center gap-2">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-yellow-400 font-space text-xs md:text-sm">{score}</span>
            </div>

            {/* Hız Göstergesi */}
            <div className="flex items-center gap-2 min-w-[120px] md:min-w-[160px]">
                <Gauge size={14} className={speedColor} />
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full ${speedBarColor}`}
                        animate={{ width: `${speedBarWidth}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
                <span className={`font-space text-xs ${speedColor}`}>{speed}x</span>
            </div>

            {/* Durak */}
            <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" />
                <span className="text-blue-400 font-space text-xs md:text-sm">
                    {currentStation}/{totalStations}
                </span>
            </div>

            {/* Combo */}
            {combo >= 2 && (
                <motion.div
                    className="flex items-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                >
                    <Zap size={14} className="text-orange-400" />
                    <span className="text-orange-400 font-space text-xs md:text-sm font-bold">
                        x{combo}
                    </span>
                </motion.div>
            )}
        </motion.div>
    );
}
