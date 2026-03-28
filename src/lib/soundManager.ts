import { SoundEffect } from '@/types/game';

// Web Audio API tabanlı ses efektleri üreteci
// Harici dosya gerektirmez, tarayıcıda sentezlenir
class SoundManager {
    private audioContext: AudioContext | null = null;
    private isMuted: boolean = false;

    private getContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
        }
        return this.audioContext;
    }

    setMuted(muted: boolean) {
        this.isMuted = muted;
    }

    // Osilatör bazlı ses efekti çal
    private playTone(
        frequency: number,
        duration: number,
        type: OscillatorType = 'sine',
        volume: number = 0.3,
        rampDown: boolean = true
    ) {
        if (this.isMuted) return;

        try {
            const ctx = this.getContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);
            gain.gain.setValueAtTime(volume, ctx.currentTime);

            if (rampDown) {
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            }

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch {
            // Ses çalma hatası sessizce yoksay
        }
    }

    // Melodili ses efekti çal
    private playMelody(notes: { freq: number; dur: number; delay: number }[], type: OscillatorType = 'sine') {
        if (this.isMuted) return;

        try {
            const ctx = this.getContext();

            notes.forEach(({ freq, dur, delay }) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
                gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + dur);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + dur);
            });
        } catch {
            // Ses çalma hatası sessizce yoksay
        }
    }

    // Gürültü efekti (roket itiş)
    private playNoise(duration: number, volume: number = 0.1) {
        if (this.isMuted) return;

        try {
            const ctx = this.getContext();
            const bufferSize = ctx.sampleRate * duration;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * volume;
            }

            const source = ctx.createBufferSource();
            source.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, ctx.currentTime);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            source.start();
            source.stop(ctx.currentTime + duration);
        } catch {
            // Ses çalma hatası sessizce yoksay
        }
    }

    // Ana ses çalma fonksiyonu
    play(effect: SoundEffect) {
        if (this.isMuted) return;

        switch (effect) {
            case 'correct':
                // Yükselen iki nota — başarı hissi
                this.playMelody([
                    { freq: 523, dur: 0.15, delay: 0 },    // C5
                    { freq: 659, dur: 0.15, delay: 0.1 },   // E5
                    { freq: 784, dur: 0.3, delay: 0.2 },    // G5
                ], 'sine');
                break;

            case 'wrong':
                // Alçalan ton — hafif hata hissi
                this.playMelody([
                    { freq: 400, dur: 0.15, delay: 0 },
                    { freq: 300, dur: 0.3, delay: 0.1 },
                ], 'sawtooth');
                break;

            case 'thrust':
                // Kısa roket itiş sesi
                this.playNoise(0.3, 0.08);
                this.playTone(120, 0.3, 'sawtooth', 0.1);
                break;

            case 'success':
                // Zafer melodisi
                this.playMelody([
                    { freq: 523, dur: 0.12, delay: 0 },     // C5
                    { freq: 587, dur: 0.12, delay: 0.12 },   // D5
                    { freq: 659, dur: 0.12, delay: 0.24 },   // E5
                    { freq: 784, dur: 0.12, delay: 0.36 },   // G5
                    { freq: 1047, dur: 0.4, delay: 0.48 },  // C6
                ], 'sine');
                break;

            case 'landing':
                // İniş sesi — derin ton ve titreşim
                this.playTone(80, 1.5, 'sine', 0.2);
                this.playNoise(1.0, 0.15);
                this.playMelody([
                    { freq: 440, dur: 0.3, delay: 0.5 },
                    { freq: 523, dur: 0.3, delay: 0.8 },
                    { freq: 659, dur: 0.5, delay: 1.1 },
                ], 'sine');
                break;

            case 'combo':
                // Combo sesi — heyecan verici yükselen seri
                this.playMelody([
                    { freq: 600, dur: 0.08, delay: 0 },
                    { freq: 750, dur: 0.08, delay: 0.06 },
                    { freq: 900, dur: 0.08, delay: 0.12 },
                    { freq: 1100, dur: 0.2, delay: 0.18 },
                ], 'square');
                break;

            case 'transition':
                // Durak geçiş sesi
                this.playTone(300, 0.5, 'sine', 0.15);
                this.playMelody([
                    { freq: 400, dur: 0.2, delay: 0.2 },
                    { freq: 500, dur: 0.3, delay: 0.4 },
                ], 'triangle');
                break;
        }
    }
}

// Singleton instance
export const soundManager = new SoundManager();
