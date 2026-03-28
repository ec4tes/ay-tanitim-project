import { create } from 'zustand';
import { GameState, GamePhase } from '@/types/game';

const STORAGE_KEY = 'ay-ilk-temas-save';

// localStorage'dan kayıtlı durumu yükle
const loadFromStorage = (): Partial<GameState> | null => {
    if (typeof window === 'undefined') return null;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch {
        // localStorage erişim hatası
    }
    return null;
};

// Durumu localStorage'a kaydet
const saveToStorage = (state: Partial<GameState>) => {
    if (typeof window === 'undefined') return;
    try {
        const toSave = {
            username: state.username,
            currentStation: state.currentStation,
            completedStations: state.completedStations,
            phase: state.phase,
            score: state.score,
            totalCorrect: state.totalCorrect,
            totalWrong: state.totalWrong,
            combo: state.combo,
            maxCombo: state.maxCombo,
            speed: state.speed,
            isMuted: state.isMuted,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
        // localStorage yazma hatası
    }
};

// Başlangıç değerleri
const initialState = {
    username: '',
    currentStation: 1,
    completedStations: [] as number[],
    phase: 'intro' as GamePhase,
    score: 0,
    totalCorrect: 0,
    totalWrong: 0,
    combo: 0,
    maxCombo: 0,
    speed: 3,
    isMuted: false,
};

export const useGameStore = create<GameState>((set, get) => ({
    ...initialState,

    setUsername: (name: string) => {
        set({ username: name });
        saveToStorage({ ...get(), username: name });
    },

    startGame: () => {
        const state = get();
        set({ phase: 'playing' });
        saveToStorage({ ...state, phase: 'playing' });
    },

    answerQuestion: (isCorrect: boolean) => {
        const state = get();

        if (isCorrect) {
            const newCombo = state.combo + 1;
            const newSpeed = Math.min(10, state.speed + 1);
            const comboBonus = newCombo >= 3 ? 50 : 0;
            const newScore = state.score + 100 + comboBonus;

            const newState = {
                score: newScore,
                totalCorrect: state.totalCorrect + 1,
                combo: newCombo,
                maxCombo: Math.max(state.maxCombo, newCombo),
                speed: newSpeed,
            };

            set(newState);
            saveToStorage({ ...state, ...newState });
        } else {
            // Hız azalır ama minimum 1
            const newSpeed = Math.max(1, state.speed - 1);
            const newState = {
                totalWrong: state.totalWrong + 1,
                combo: 0,
                speed: newSpeed,
            };

            set(newState);
            saveToStorage({ ...state, ...newState });
        }
    },

    nextStation: () => {
        const state = get();
        const nextStationNum = state.currentStation + 1;
        const newCompleted = [...state.completedStations, state.currentStation];

        if (nextStationNum > 10) {
            // Tüm duraklar tamamlandı, iniş aşamasına geç
            const newState = {
                completedStations: newCompleted,
                phase: 'landing' as GamePhase,
            };
            set(newState);
            saveToStorage({ ...state, ...newState });
        } else {
            const newState = {
                currentStation: nextStationNum,
                completedStations: newCompleted,
            };
            set(newState);
            saveToStorage({ ...state, ...newState });
        }
    },

    startLanding: () => {
        set({ phase: 'landing' });
        saveToStorage({ ...get(), phase: 'landing' });
    },

    completeLanding: () => {
        set({ phase: 'completed' });
        saveToStorage({ ...get(), phase: 'completed' });
    },

    resetGame: () => {
        set({ ...initialState, phase: 'intro' });
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    },

    toggleMute: () => {
        const newMuted = !get().isMuted;
        set({ isMuted: newMuted });
        saveToStorage({ ...get(), isMuted: newMuted });
    },

    loadSavedState: () => {
        const saved = loadFromStorage();
        if (saved && saved.username) {
            set({
                ...saved,
                // fonksiyonları korumak için spread etmiyoruz
            } as Partial<GameState>);
        }
    },
}));
