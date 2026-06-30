import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';

export default function AppLayout({ children }) {
    const { messages, locale, auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showTop, setShowTop] = useState(false);
    const isRtl = locale === 'ar';
    const m = (key) => messages?.[key] || key;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            setShowTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const menuItems = [
        { label: m('menu_accueil'), href: route('home') },
        { label: m('menu_direction'), href: route('direction') },
        { label: m('menu_etablissements'), href: route('etablissements') },
        { label: m('menu_actualites'), href: route('actualites') },
        { label: m('menu_prevention'), href: route('prevention') },
        { label: m('menu_services'), href: route('services') },
        { label: m('menu_professionnels'), href: route('professionnels') },
        { label: 'Médiathèque', href: route('mediatheque') },
        { label: m('menu_appels_offres'), href: route('appels-offres') },
        { label: m('menu_documents'), href: route('documents') },
        { label: m('menu_contact'), href: route('contact') },
    ];

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const NavLinks = ({ mobile }) => (
        <>
            {menuItems.map((item, i) => (
                <Link
                    key={i}
                    href={item.href}
                    className={
                        mobile
                            ? 'block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-900 border-b border-gray-100 last:border-0 transition'
                            : 'text-[13px] font-medium text-white/85 hover:text-white transition-colors whitespace-nowrap'
                    }
                    onClick={() => setMenuOpen(false)}
                >
                    {item.label}
                </Link>
            ))}
        </>
    );

    return (
        <div className="min-h-screen bg-[#F5F7FA]" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* ============ TOP BAR ============ */}
            <div className="relative z-50 bg-[#071B2E] text-white/80 text-[11px]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <svg className="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {m('adresse_complete')}
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5">
                            <svg className="h-3 w-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {m('horaires_ouverture')}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:flex items-center gap-1.5">
                            <svg className="h-3 w-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {m('tel_urgence')}: 043 20 XX XX
                        </span>
                        <div className="h-3 w-px bg-white/20" />
                        <form method="POST" action={`/locale/${locale === 'fr' ? 'ar' : 'fr'}`}>
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                            <button type="submit" className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 transition hover:bg-white/20">
                                {locale === 'fr' ? (
                                    <>
                                        <span className="text-green-400">&#127462;&#127465;</span>
                                        العربية
                                    </>
                                ) : (
                                    <>
                                        <span>🇫🇷</span>
                                        Français
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* ============ MAIN HEADER ============ */}
            <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-[#0A2540]'}`}>
                {/* Logo + Title + Auth row */}
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center gap-4 py-2 md:py-3">
                        <Link href={route('home')} className="flex shrink-0 items-center gap-3 group">
                            <div className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                                scrolled 
                                    ? 'bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-lg shadow-blue-900/20' 
                                    : 'bg-white/10 text-white backdrop-blur-sm group-hover:bg-white/20'
                            }`}>
                                <span className="text-[9px] md:text-[10px] font-bold leading-tight text-center">
                                    DSP
                                </span>
                            </div>
                            <div className="hidden sm:block">
                                <h2 className={`text-xs md:text-sm font-bold leading-tight transition-colors ${
                                    scrolled ? 'text-gray-900' : 'text-white'
                                }`} style={{ fontFamily: "'Fraunces', serif" }}>
                                    {m('site_name')}
                                </h2>
                            </div>
                        </Link>

                        <div className="flex-1" />

                        {/* Auth buttons */}
                        <div className="flex items-center gap-2">
                            {auth?.user ? (
                                <>
                                    <Link href={route('admin.dashboard')} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
                                        scrolled
                                            ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md'
                                            : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20'
                                    }`}>
                                        {m('admin_dashboard')}
                                    </Link>
                                    <form method="POST" action={route('logout')}>
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                                        <button type="submit" className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                                            scrolled ? 'text-red-600 hover:bg-red-50' : 'text-white/80 hover:bg-white/10'
                                        }`}>
                                            {m('deconnexion')}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <Link href={route('login')} className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[11px] font-semibold transition-all ${
                                    scrolled
                                        ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md'
                                        : 'border border-white/30 text-white hover:bg-white/10'
                                }`}>
                                    {m('connexion')}
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`lg:hidden relative h-9 w-9 rounded-lg transition-all ${
                                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}
                            aria-label="Menu"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                                <span className={`block h-0.5 w-5 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
                                <span className={`block h-0.5 w-5 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
                                <span className={`block h-0.5 w-5 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* ============ FULL-WIDTH NAV BAR ============ */}
                <div className={`hidden lg:block border-t ${scrolled ? 'border-gray-200 bg-white' : 'border-white/10 bg-white/5'}`}>
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
                        <NavLinks />
                        <SearchBar />
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="border-t border-gray-100 bg-white shadow-xl">
                        <div className="max-h-[70vh] overflow-y-auto py-2">
                            <NavLinks mobile />
                        </div>
                    </div>
                </div>
            </header>

            {/* ============ MAIN CONTENT ============ */}
            <main className="min-h-[50vh]">
                {children}
            </main>

            {/* ============ FOOTER ============ */}
            <footer className="relative mt-16 bg-[#0A2540]">
                <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-[#0A2540]" />
                
                <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                        <div className="lg:col-span-1">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white text-xs font-bold leading-tight text-center">
                                    DSP<br/>Tlemcen
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">DSP Tlemcen</h3>
                                    <p className="text-[11px] text-blue-300">Direction de la Santé</p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-blue-200/80">
                                {m('site_slogan')}
                            </p>
                            <div className="mt-5 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300 hover:bg-white/20 hover:text-white transition cursor-pointer">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300 hover:bg-white/20 hover:text-white transition cursor-pointer">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" /></svg>
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-300 hover:bg-white/20 hover:text-white transition cursor-pointer">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{m('liens_rapides')}</h3>
                            <ul className="space-y-2.5">
                                {[
                                    { label: m('menu_actualites'), href: route('actualites') },
                                    { label: m('menu_etablissements'), href: route('etablissements') },
                                    { label: m('menu_services'), href: route('services') },
                                    { label: m('menu_prevention'), href: route('prevention') },
                                    { label: m('menu_appels_offres'), href: route('appels-offres') },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm text-blue-200/80 transition hover:text-white">
                                            <span className="h-1 w-1 rounded-full bg-blue-400 transition group-hover:bg-white" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{m('nos_services')}</h3>
                            <ul className="space-y-2.5">
                                {[
                                    { label: m('reclamation'), href: route('services.reclamation') },
                                    { label: m('faq'), href: route('services.faq') },
                                    { label: m('signalement'), href: route('services.signalement') },
                                    { label: m('telechargements'), href: route('documents') },
                                    { label: m('contactez_nous'), href: route('contact') },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm text-blue-200/80 transition hover:text-white">
                                            <span className="h-1 w-1 rounded-full bg-blue-400 transition group-hover:bg-white" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{m('contactez_nous')}</h3>
                            <div className="space-y-3 text-sm text-blue-200/80">
                                <div className="flex items-start gap-3">
                                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{m('adresse_complete')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>043 20 XX XX</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>contact@dsp-tlemcen.dz</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{m('horaires_ouverture')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <p className="text-xs text-blue-300/60">{m('copyright')}</p>
                            <p className="text-xs text-blue-300/40">{m('realisation')} — Direction de la Santé et de la Population</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-white shadow-xl shadow-blue-900/30 transition-all duration-300 hover:bg-blue-800 hover:scale-110 active:scale-95 ${
                    showTop ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
                }`}
                aria-label="Retour en haut"
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    );
}
