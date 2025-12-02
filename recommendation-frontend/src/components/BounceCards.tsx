import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BounceCardsProps {
    className?: string;
    images: string[];
    containerWidth?: number;
    containerHeight?: number;
    animationDelay?: number;
    animationStagger?: number;
    easeType?: string;
    transformStyles?: string[];
    enableHover?: boolean;
}

export const BounceCards = ({
    className = '',
    images,
    containerWidth = 500,
    containerHeight = 250,
    animationDelay = 1,
    animationStagger = 0.08,
    easeType = 'elastic.out(1, 0.5)',
    transformStyles = [],
    enableHover = true,
}: BounceCardsProps) => {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean);
        if (cards.length === 0) return;

        // Initial animation
        gsap.fromTo(
            cards,
            {
                scale: 0,
                opacity: 0,
                rotation: (i: number) => (i % 2 === 0 ? -45 : 45),
            },
            {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                ease: easeType,
                delay: animationDelay,
                stagger: animationStagger,
            }
        );

        // Apply transform styles
        if (transformStyles.length > 0) {
            cards.forEach((card, i) => {
                if (transformStyles[i]) {
                    gsap.to(card, {
                        transform: transformStyles[i],
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: animationDelay + animationStagger * cards.length,
                    });
                }
            });
        }
    }, [images, animationDelay, animationStagger, easeType, transformStyles]);

    const handleMouseEnter = (index: number) => {
        if (!enableHover) return;
        const card = cardsRef.current[index];
        if (!card) return;

        gsap.to(card, {
            scale: 1.1,
            y: -20,
            zIndex: 100,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = (index: number) => {
        if (!enableHover) return;
        const card = cardsRef.current[index];
        if (!card) return;

        gsap.to(card, {
            scale: 1,
            y: 0,
            zIndex: images.length - index,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{
                width: containerWidth,
                height: containerHeight,
            }}
        >
            {images.map((image, index) => (
                <div
                    key={`${image}-${index}`}
                    ref={(el) => {
                        cardsRef.current[index] = el;
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                        width: '80%',
                        height: '90%',
                        zIndex: images.length - index,
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                >
                    <img
                        src={image}
                        alt={`Card ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent pointer-events-none" />
                </div>
            ))}
        </div>
    );
};
