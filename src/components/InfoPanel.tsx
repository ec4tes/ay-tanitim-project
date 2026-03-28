'use client';

import { motion } from 'framer-motion';
import { BookOpen, Lightbulb } from 'lucide-react';
import { Station } from '@/types/game';

interface InfoPanelProps {
    station: Station;
}

export default function InfoPanel({ station }: InfoPanelProps) {
    return (
        <motion.div
            className="h-full flex flex-col gap-5 p-5 md:p-7"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            key={station.id}
        >
            <div className="rounded-2xl border border-cyan-400/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15">
                        <span className="font-space text-sm font-bold text-cyan-300">{station.id}</span>
                    </div>
                    <span className="font-space text-sm text-cyan-200/60">{station.altitude}</span>
                </div>
                <h2 className="text-2xl font-space font-bold text-white md:text-[1.75rem]">{station.name}</h2>
                <p className="mt-1 text-base text-cyan-200/60 font-body">{station.subtitle}</p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <BookOpen size={17} className="text-blue-400" />
                        <span className="font-space text-sm text-blue-300">Bilgi Notu</span>
                    </div>
                    <p className="font-body text-[15px] leading-7 text-white/82">{station.infoText}</p>
                </div>

                {station.funFact && (
                    <motion.div
                        className="mt-4 rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <Lightbulb size={17} className="text-yellow-300" />
                            <span className="font-space text-sm text-yellow-300">Biliyor muydun?</span>
                        </div>
                        <p className="font-body text-[15px] leading-7 text-yellow-100/82">{station.funFact}</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
