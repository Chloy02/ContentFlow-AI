import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingLinesProps {
    enabledWaves?: ('top' | 'middle' | 'bottom')[];
    lineCount?: number | number[];
    lineDistance?: number | number[];
    bendRadius?: number;
    bendStrength?: number;
    interactive?: boolean;
    parallax?: boolean;
}

export const FloatingLines = ({
    enabledWaves = ['top', 'middle', 'bottom'],
    lineCount = [10, 15, 20],
    lineDistance = [8, 6, 4],
    bendRadius = 5.0,
    bendStrength = -0.5,
    interactive = true,
    parallax = true,
}: FloatingLinesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<SVGPathElement[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });

    const getLineCount = (waveIndex: number): number => {
        return Array.isArray(lineCount) ? lineCount[waveIndex] || 15 : lineCount;
    };

    const getLineDistance = (waveIndex: number): number => {
        return Array.isArray(lineDistance) ? lineDistance[waveIndex] || 6 : lineDistance;
    };

    useEffect(() => {
        const lines = linesRef.current.filter(Boolean);
        if (lines.length === 0) return;

        // Floating animation
        lines.forEach((line, index) => {
            const delay = index * 0.1;
            const duration = 3 + Math.random() * 2;

            gsap.to(line, {
                y: `+=${5 + Math.random() * 10}`,
                x: `+=${Math.random() * 20 - 10}`,
                opacity: 0.3 + Math.random() * 0.4,
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        });

        // Interactive mouse effect
        if (interactive) {
            const handleMouseMove = (e: MouseEvent) => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                mousePos.current = {
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                };

                lines.forEach((line, index) => {
                    const distance = Math.abs(index / lines.length - mousePos.current.y);
                    const intensity = Math.max(0, 1 - distance * 2);

                    gsap.to(line, {
                        x: `+=${(mousePos.current.x - 0.5) * 30 * intensity}`,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [interactive, parallax]);

    const generateWavePath = (
        yPosition: number,
        waveIndex: number,
        lineIndex: number
    ): string => {
        const width = 100;
        const segments = 20;
        let path = `M 0 ${yPosition}`;

        for (let i = 1; i <= segments; i++) {
            const x = (i / segments) * width;
            const randomOffset = Math.sin(i + lineIndex + waveIndex) * bendRadius * bendStrength;
            path += ` L ${x} ${yPosition + randomOffset}`;
        }

        return path;
    };

    const renderWave = (waveType: 'top' | 'middle' | 'bottom', waveIndex: number) => {
        const baseY = waveType === 'top' ? 20 : waveType === 'middle' ? 50 : 80;
        const count = getLineCount(waveIndex);
        const distance = getLineDistance(waveIndex);
        const opacity = waveType === 'top' ? 0.3 : waveType === 'middle' ? 0.5 : 0.7;

        return Array.from({ length: count }).map((_, lineIndex) => {
            const yPos = baseY + lineIndex * distance;
            const color = waveType === 'top' 
                ? '#8b5cf6' 
                : waveType === 'middle' 
                ? '#a855f7' 
                : '#c084fc';

            return (
                <path
                    key={`${waveType}-${lineIndex}`}
                    ref={(el) => {
                        if (el) linesRef.current.push(el);
                    }}
                    d={generateWavePath(yPos, waveIndex, lineIndex)}
                    stroke={color}
                    strokeWidth="0.5"
                    fill="none"
                    opacity={opacity}
                    vectorEffect="non-scaling-stroke"
                />
            );
        });
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {enabledWaves.includes('top') && renderWave('top', 0)}
                {enabledWaves.includes('middle') && renderWave('middle', 1)}
                {enabledWaves.includes('bottom') && renderWave('bottom', 2)}
            </svg>
        </div>
    );
};
