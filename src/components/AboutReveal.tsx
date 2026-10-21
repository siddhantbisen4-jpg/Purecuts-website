
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AboutRevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export function AboutReveal({
    children,
    className = "",
    delay = 0,
}: AboutRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion || !("IntersectionObserver" in window)) {
            element.dataset.visible = "true";
            return;
        }

        element.dataset.revealReady = "true";

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.dataset.visible = "true";
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            data-visible="false"
            style={{ transitionDelay: `${delay}ms` }}
            className={`pc-about-reveal ${className}`}
        >
            {children}
        </div>
    );
}

type AboutCountUpProps = {
    end: number;
    suffix?: string;
};

export function AboutCountUp({
    end,
    suffix = "",
}: AboutCountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion || !("IntersectionObserver" in window)) {
            setValue(end);
            return;
        }

        let animationFrame = 0;
        let started = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started) return;

                started = true;
                const startTime = performance.now();
                const duration = 1400;

                const animate = (now: number) => {
                    const progress = Math.min(
                        (now - startTime) / duration,
                        1
                    );

                    const eased = 1 - Math.pow(1 - progress, 3);

                    setValue(Math.round(end * eased));

                    if (progress < 1) {
                        animationFrame = requestAnimationFrame(animate);
                    }
                };

                animationFrame = requestAnimationFrame(animate);
                observer.unobserve(element);
            },
            { threshold: 0.5 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [end]);

    return (
        <span ref={ref}>
            {value.toLocaleString("en-IN")}
            {suffix}
        </span>
    );
}
