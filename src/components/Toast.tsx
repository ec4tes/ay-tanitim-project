'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastMessage } from '@/types/game';

// Toast yönetim hook'u
export function useToast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info', duration = 3000) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const toast: ToastMessage = { id, message, type, duration };
        setToasts((prev) => [...prev, toast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
}

// Toast bileşeni
interface ToastContainerProps {
    toasts: ToastMessage[];
    onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    const typeStyles = {
        success: 'bg-green-500/20 border-green-400/50 text-green-300',
        error: 'bg-red-500/20 border-red-400/50 text-red-300',
        info: 'bg-blue-500/20 border-blue-400/50 text-blue-300',
        combo: 'bg-orange-500/20 border-orange-400/50 text-orange-300',
    };

    const typeIcons = {
        success: '✅',
        error: '💫',
        info: 'ℹ️',
        combo: '🔥',
    };

    return (
        <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`px-4 py-3 rounded-lg border backdrop-blur-md cursor-pointer font-body text-sm ${typeStyles[toast.type]}`}
                        onClick={() => onRemove(toast.id)}
                    >
                        <span className="mr-2">{typeIcons[toast.type]}</span>
                        {toast.message}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
