'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Question } from '@/types/game';

interface QuestionCardProps {
    question: Question;
    stationId: number;
    onAnswer: (isCorrect: boolean) => void;
    onNext: () => void;
}

export default function QuestionCard({ question, stationId, onAnswer, onNext }: QuestionCardProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleAnswer = (index: number) => {
        if (isAnswered) return;

        setSelectedAnswer(index);
        setIsAnswered(true);

        const correct = index === question.correctAnswer;
        setIsCorrect(correct);
        onAnswer(correct);
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsCorrect(false);
        onNext();
    };

    // Her soru tipi için başlık metni
    const questionTypeLabels = {
        'multiple-choice': '🎯 Çoktan Seçmeli',
        'true-false': '✅ Doğru / Yanlış',
        'image-based': '🖼️ Görselli Soru',
    };

    // Zorluk rozeti renkleri
    const difficultyColors = {
        easy: 'bg-green-500/20 text-green-400 border-green-500/30',
        medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        hard: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    const difficultyLabels = {
        easy: 'Kolay',
        medium: 'Orta',
        hard: 'Zor',
    };

    return (
        <motion.div
            className="h-full flex flex-col gap-4 p-4 md:p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            key={`question-${stationId}`}
        >
            {/* Soru Kartı Başlığı */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-purple-400" />
                    <span className="text-sm font-space text-purple-400">
                        {questionTypeLabels[question.type]}
                    </span>
                </div>
                <span
                    className={`text-[10px] font-space px-2 py-0.5 rounded-full border ${difficultyColors[question.difficulty]}`}
                >
                    {difficultyLabels[question.difficulty]}
                </span>
            </div>

            {/* Soru Metni */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <p className="text-white font-body text-sm md:text-base leading-relaxed">{question.text}</p>

                {/* Görselli soru için resim alanı */}
                {question.imageUrl && (
                    <div className="mt-3 aspect-video bg-black/40 rounded-lg overflow-hidden">
                        <img src={question.imageUrl} alt="Soru görseli" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Seçenekler */}
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                {question.options.map((option, index) => {
                    let buttonStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20';

                    if (isAnswered) {
                        if (index === question.correctAnswer) {
                            buttonStyle = 'bg-green-500/20 border-green-400/50 text-green-300';
                        } else if (index === selectedAnswer && !isCorrect) {
                            buttonStyle = 'bg-red-500/20 border-red-400/50 text-red-300';
                        } else {
                            buttonStyle = 'bg-white/5 border-white/5 opacity-50';
                        }
                    }

                    const optionLetters = ['A', 'B', 'C', 'D'];

                    return (
                        <motion.button
                            key={index}
                            className={`w-full text-left px-4 py-3 rounded-xl border backdrop-blur-sm 
                         transition-all font-body text-sm ${buttonStyle}
                         ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
                            onClick={() => handleAnswer(index)}
                            disabled={isAnswered}
                            whileHover={!isAnswered ? { scale: 1.02 } : {}}
                            whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-space font-bold ${isAnswered && index === question.correctAnswer
                                            ? 'bg-green-500 text-white'
                                            : isAnswered && index === selectedAnswer && !isCorrect
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white/10 text-white/60'
                                        }`}
                                >
                                    {isAnswered && index === question.correctAnswer ? (
                                        <CheckCircle size={14} />
                                    ) : isAnswered && index === selectedAnswer && !isCorrect ? (
                                        <XCircle size={14} />
                                    ) : (
                                        optionLetters[index]
                                    )}
                                </span>
                                <span className="text-white/90">{option}</span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Cevap Sonrası Açıklama ve İleri Butonu */}
            <AnimatePresence>
                {isAnswered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-3"
                    >
                        {/* Açıklama */}
                        <div
                            className={`p-4 rounded-xl border ${isCorrect
                                    ? 'bg-green-500/10 border-green-500/20'
                                    : 'bg-blue-500/10 border-blue-500/20'
                                }`}
                        >
                            <p
                                className={`text-sm font-body leading-relaxed ${isCorrect ? 'text-green-200/80' : 'text-blue-200/80'
                                    }`}
                            >
                                {question.explanation}
                            </p>
                        </div>

                        {/* İleri Butonu */}
                        <motion.button
                            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 
                         rounded-xl font-space text-sm text-white font-bold
                         hover:from-cyan-400 hover:to-blue-400 transition-all
                         flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                            onClick={handleNext}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {stationId < 10 ? 'Sonraki Durağa İlerle' : 'Ay\'a İniş Başlat!'}
                            <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
