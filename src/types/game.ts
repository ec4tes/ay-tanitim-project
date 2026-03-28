// Soru tipleri
export type QuestionType = 'multiple-choice' | 'true-false' | 'image-based';

// Soru arayüzü
export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options: string[];
    correctAnswer: number; // index of correct option
    explanation: string;
    imageUrl?: string; // görselli sorular için
    difficulty: 'easy' | 'medium' | 'hard';
}

// Durak arayüzü
export interface Station {
    id: number;
    name: string;
    subtitle: string;
    infoText: string;
    funFact?: string;
    videoUrl?: string;
    videoTitle?: string;
    question: Question;
    theme: StationTheme;
    altitude: string; // Yükseklik bilgisi
}

// Her durak için tema renkleri ve atmosfer
export interface StationTheme {
    bgGradient: string;
    particleColor: string;
    atmosphereOpacity: number;
    starsVisible: boolean;
    label: string;
}

// Oyun aşamaları
export type GamePhase = 'intro' | 'playing' | 'landing' | 'completed';

// Oyun durumu
export interface GameState {
    // Kullanıcı bilgileri
    username: string;

    // İlerleme
    currentStation: number;
    completedStations: number[];
    phase: GamePhase;

    // Performans
    score: number;
    totalCorrect: number;
    totalWrong: number;
    combo: number;
    maxCombo: number;

    // Roket
    speed: number; // 1-10 arası

    // Ses
    isMuted: boolean;

    // Aksiyonlar
    setUsername: (name: string) => void;
    startGame: () => void;
    answerQuestion: (isCorrect: boolean) => void;
    nextStation: () => void;
    startLanding: () => void;
    completeLanding: () => void;
    resetGame: () => void;
    toggleMute: () => void;
    loadSavedState: () => void;
}

// Toast bildirim tipi
export interface ToastMessage {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'combo';
    duration?: number;
}

// Ses efektleri
export type SoundEffect = 'correct' | 'wrong' | 'thrust' | 'success' | 'landing' | 'combo' | 'transition';
