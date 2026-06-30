import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ value, duration = 2000, className }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        const target = Number(value);
        if (target === 0) {
            setCount(0);
            return;
        }

        const startTime = performance.now();
        let raf;

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                raf = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [started, value, duration]);

    return (
        <span ref={ref} className={className}>
            {count}
        </span>
    );
}
