'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface SoundToggleProps {
    isMuted: boolean;
    onToggle: () => void;
}

export default function SoundToggle({ isMuted, onToggle }: SoundToggleProps) {
    return (
        <motion.button
            className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full 
                 bg-space-900/80 backdrop-blur-md border border-white/10
                 flex items-center justify-center
                 hover:bg-white/10 transition-all"
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
            {isMuted ? (
                <VolumeX size={18} className="text-red-400" />
            ) : (
                <Volume2 size={18} className="text-cyan-400" />
            )}
        </motion.button>
    );
}
