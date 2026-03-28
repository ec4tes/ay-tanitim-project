'use client';

import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface StarFieldProps {
    starsVisible?: boolean;
    atmosphereOpacity?: number;
    atmosphereColor?: string;
    speed?: number;
}

export default function StarField({
    starsVisible = true,
    atmosphereOpacity = 0,
    atmosphereColor = 'rgba(59, 130, 246, 0.3)',
    speed = 1,
}: StarFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        // Yıldız oluştur
        const starCount = 200;
        starsRef.current = Array.from({ length: starCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.5 + 0.1,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2,
        }));

        let frame = 0;

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (starsVisible) {
                starsRef.current.forEach((star) => {
                    // Kırpışma efekti
                    const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
                    const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

                    // Yıldız hareketi (yukarı doğru kayma — uzayda ilerleme hissi)
                    star.y -= star.speed * speed * 0.3;
                    if (star.y < -5) {
                        star.y = canvas.height + 5;
                        star.x = Math.random() * canvas.width;
                    }

                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                    ctx.fill();

                    // Büyük yıldızlara ışıltı ekle
                    if (star.size > 1.5) {
                        ctx.beginPath();
                        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.1})`;
                        ctx.fill();
                    }
                });
            }

            // Atmosfer efekti
            if (atmosphereOpacity > 0) {
                const gradient = ctx.createRadialGradient(
                    canvas.width / 2,
                    canvas.height,
                    0,
                    canvas.width / 2,
                    canvas.height,
                    canvas.height
                );
                gradient.addColorStop(0, atmosphereColor);
                gradient.addColorStop(1, 'transparent');

                ctx.globalAlpha = atmosphereOpacity;
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
            }

            frame++;
            animRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animRef.current);
        };
    }, [starsVisible, atmosphereOpacity, atmosphereColor, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
