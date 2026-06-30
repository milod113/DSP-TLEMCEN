import { Link, usePage, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isRtl = locale === 'ar';
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length >= 2) {
            router.get(route('search'), { q: query.trim() });
            setFocused(false);
            inputRef.current?.blur();
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <form onSubmit={handleSubmit} className="flex items-center">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        placeholder={m('rechercher') || 'Rechercher...'}
                        className={`w-40 lg:w-48 rounded-lg border pl-8 pr-3 py-1.5 text-[12px] outline-none transition-all ${
                            focused
                                ? 'border-blue-400 bg-white shadow-sm'
                                : 'border-transparent bg-white/10 text-white placeholder:text-white/50 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400'
                        }`}
                        dir={isRtl ? 'rtl' : 'ltr'}
                    />
                    <svg
                        className={`absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors ${
                            focused ? 'text-blue-500' : 'text-white/60'
                        }`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {focused && query.length >= 2 && (
                    <button
                        type="submit"
                        className="ml-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-blue-500"
                    >
                        Go
                    </button>
                )}
            </form>
        </div>
    );
}
