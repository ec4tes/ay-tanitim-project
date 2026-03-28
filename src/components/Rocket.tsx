'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface RocketProps {
    speed: number;
    isShaking: boolean;
    isThrusting: boolean;
    progress: number;
}

export default function Rocket({ speed, isShaking, isThrusting, progress }: RocketProps) {
    const flameScale = 0.82 + (speed / 10) * 0.55;
    const trailOpacity = 0.2 + (speed / 10) * 0.22;
    const travelOffset = Math.min(progress, 100) * 1.2;

    return (
        <motion.div
            className="relative flex flex-col items-center"
            animate={
                isShaking
                    ? { x: [0, -3, 3, -2, 2, 0], rotate: [0, -1, 1, 0] }
                    : { y: [0, -6, 0], rotate: [-1, 1, -1] }
            }
            transition={
                isShaking
                    ? { duration: 0.45, ease: 'easeInOut', repeat: Infinity }
                    : { duration: 2.8 - Math.min(speed, 8) * 0.12, ease: 'easeInOut', repeat: Infinity }
            }
            style={{ transform: `translateY(${-travelOffset * 0.12}px)` }}
        >
            <div
                className="absolute left-1/2 top-[56%] -z-10 w-40 -translate-x-1/2 rounded-full blur-2xl"
                style={{
                    height: `${190 + progress * 1.6}px`,
                    background: `linear-gradient(to bottom, rgba(125,211,252,0.08), rgba(56,189,248,${trailOpacity}), transparent)`,
                }}
            />

            <div className="absolute inset-0 -z-20 rounded-full bg-orange-300/10 blur-3xl" />

            <div className="relative h-72 w-52 md:h-96 md:w-64">
                <Image
                    src="/rocket.png"
                    alt="Rocket"
                    fill
                    sizes="(max-width: 768px) 208px, 256px"
                    className="object-contain"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                />
            </div>

            {isThrusting && (
                <motion.div
                    className="relative -mt-5 flex flex-col items-center"
                    animate={{ scaleY: [flameScale, flameScale * 1.1, flameScale], scaleX: [1, 1.05, 1] }}
                    transition={{ duration: 0.18, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div
                        className="h-24 w-12 md:h-28 md:w-14"
                        style={{
                            clipPath: 'polygon(50% 0%, 82% 18%, 100% 56%, 60% 100%, 40% 100%, 0 56%, 18% 18%)',
                            background:
                                'linear-gradient(to bottom, rgba(254,240,138,1), rgba(251,146,60,0.98), rgba(239,68,68,0.55), transparent)',
                            filter: 'drop-shadow(0 0 14px rgba(251,146,60,0.42))',
                        }}
                    />
                    <div
                        className="absolute top-3 h-20 w-16 md:h-24 md:w-20"
                        style={{
                            clipPath: 'polygon(50% 0%, 90% 26%, 100% 58%, 65% 100%, 35% 100%, 0 58%, 10% 26%)',
                            background:
                                'linear-gradient(to bottom, rgba(253,224,71,0.45), rgba(249,115,22,0.35), transparent)',
                            filter: 'blur(6px)',
                        }}
                    />
                </motion.div>
            )}
        </motion.div>
    );
}
