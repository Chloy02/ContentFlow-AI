import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PixelTransitionProps {
    firstContent: React.ReactNode;
    secondContent: React.ReactNode;
    gridSize?: number;
    pixelColor?: string;
    once?: boolean;
    animationStepDuration?: number;
    className?: string;
    trigger?: 'hover' | 'click' | 'auto';
}

export const PixelTransition = ({
    firstContent,
    secondContent,
    gridSize = 12,
    pixelColor = '#ffffff',
    once = false,
    animationStepDuration = 0.4,
    className = '',
    trigger = 'hover',
}: PixelTransitionProps) => {
    const [isTransitioned, setIsTransitioned] = useState(false);
    const [hasTransitioned, setHasTransitioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);

    const totalPixels = gridSize * gridSize;

    useEffect(() => {
        if (trigger === 'auto' && !hasTransitioned) {
            const timer = setTimeout(() => {
                handleTransition();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [trigger, hasTransitioned]);

    const handleTransition = () => {
        if (once && hasTransitioned) return;

        const pixels = pixelsRef.current.filter(Boolean);
        if (pixels.length === 0) return;

        const newState = !isTransitioned;
        setIsTransitioned(newState);
        setHasTransitioned(true);

        // Animate pixels in random order
        const indices = Array.from({ length: pixels.length }, (_, i) => i);
        const shuffled = indices.sort(() => Math.random() - 0.5);

        shuffled.forEach((index, i) => {
            const pixel = pixels[index];
            if (!pixel) return;

            gsap.to(pixel, {
                scale: newState ? 1 : 0,
                opacity: newState ? 1 : 0,
                duration: animationStepDuration,
                delay: i * 0.005,
                ease: 'power2.inOut',
            });
        });
    };

    const handleMouseEnter = () => {
        if (trigger === 'hover') {
            handleTransition();
        }
    };

    const handleMouseLeave = () => {
        if (trigger === 'hover' && !once) {
            handleTransition();
        }
    };

    const handleClick = () => {
        if (trigger === 'click') {
            handleTransition();
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* First Content */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    opacity: isTransitioned ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                {firstContent}
            </div>

            {/* Second Content */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    opacity: isTransitioned ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                {secondContent}
            </div>

            {/* Pixel Grid Overlay */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    gap: '1px',
                }}
            >
                {Array.from({ length: totalPixels }).map((_, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            pixelsRef.current[index] = el;
                        }}
                        style={{
                            backgroundColor: pixelColor,
                            transform: 'scale(0)',
                            opacity: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
