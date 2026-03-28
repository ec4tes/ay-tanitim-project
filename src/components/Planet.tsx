'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type PlanetType = 'earth' | 'moon';
type DetailLevel = 'low' | 'medium' | 'high';

interface PlanetProps {
    type: PlanetType;
    size?: number;
    detailLevel?: DetailLevel;
    glow?: boolean;
    animated?: boolean;
    className?: string;
}

export default function Planet({
    type,
    size = 144,
    glow = true,
    animated = false,
    className = '',
}: PlanetProps) {
    const src = type === 'earth' ? '/earth.png' : '/moon.png';
    const glowClass = type === 'earth' ? 'bg-cyan-300/14' : 'bg-white/12';

    const content = (
        <div
            className={`relative overflow-hidden rounded-full ${className}`}
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <div className="absolute inset-0 rounded-full bg-white/5" />
            <Image
                src={src}
                alt={type === 'earth' ? 'Earth' : 'Moon'}
                fill
                sizes={`${size}px`}
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(132deg,rgba(255,255,255,0.18),transparent_30%,transparent_62%,rgba(0,0,0,0.28))]" />
        </div>
    );

    if (!animated) {
        return (
            <div className="relative">
                {glow && <div className={`absolute inset-[-4%] rounded-full blur-2xl ${glowClass}`} />}
                {content}
            </div>
        );
    }

    return (
        <motion.div
            className="relative"
            animate={{ y: [0, -8, 0], rotate: type === 'earth' ? [-2, 2, -2] : [-1, 1, -1] }}
            transition={{ duration: type === 'earth' ? 12 : 10, repeat: Infinity, ease: 'easeInOut' }}
        >
            {glow && <div className={`absolute inset-[-4%] rounded-full blur-2xl ${glowClass}`} />}
            {content}
        </motion.div>
    );
}
