'use client';

import Planet from './Planet';

interface MoonVisualProps {
    className?: string;
    glow?: boolean;
    animated?: boolean;
}

export default function MoonVisual({
    className = '',
    glow = true,
    animated = false,
}: MoonVisualProps) {
    return <Planet type="moon" size={160} detailLevel="high" glow={glow} animated={animated} className={className} />;
}
