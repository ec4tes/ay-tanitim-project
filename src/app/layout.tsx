import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: "Ay'a İlk Temas – Dijital Eğitim ve Hikayecilik Aracı",
    description:
        "Dünya'dan Ay'a uzay yolculuğu temalı interaktif eğitim deneyimi. Soruları cevapla, roketini hızlandır, Ay'a iniş yap!",
    keywords: ['uzay', 'eğitim', 'ay', 'roket', 'astronomi', 'interaktif', 'oyun'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-space-900 text-white antialiased overflow-x-hidden">
                {children}
            </body>
        </html>
    );
}
