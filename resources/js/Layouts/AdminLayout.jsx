import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const { messages, locale, auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const m = (key) => messages?.[key] || key;
    const isRtl = locale === 'ar';

    const navItems = [
        { label: 'Dashboard', route: 'admin.dashboard', code: 'DB' },
        { label: 'Articles', route: 'admin.articles.index', code: 'AR' },
        { label: 'Etablissements', route: 'admin.etablissements.index', code: 'ET' },
        { label: 'Documents', route: 'admin.documents.index', code: 'DO' },
        { label: "Appels d'offres", route: 'admin.appels-offres.index', code: 'AO' },
        { label: 'Prevention', route: 'admin.prevention.index', code: 'PR' },
        { label: 'Professionnels', route: 'admin.professionnels.index', code: 'PS' },
        { label: 'Médiathèque', route: 'admin.media.index', code: 'MD' },
        { label: 'Reclamations', route: 'admin.reclamations.index', code: 'RC' },
        { label: 'Contacts', route: 'admin.contacts.index', code: 'CT' },
        { label: 'Contenu pages', route: 'admin.page-contents.index', code: 'PG' },
        { label: 'FAQ', route: 'admin.faqs.index', code: 'FQ' },
        { label: 'Utilisateurs', route: 'admin.users.index', code: 'US' },
    ];

    const handleLogout = (event) => {
        event.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-[#EEF3F7]" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="flex min-h-screen">
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-[290px] transform border-r border-white/10 bg-gradient-to-b from-[#081B2D] via-[#0C2740] to-[#081B2D] text-white shadow-[0_24px_60px_-24px_rgba(2,6,23,0.65)] transition-transform duration-300 lg:static lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-full flex-col">
                        <div className="border-b border-white/10 px-5 py-5">
                            <Link href={route('admin.dashboard')} className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold tracking-[0.18em] text-white backdrop-blur-sm">
                                    DSP
                                </div>
                                <div>
                                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8DB6DA]">
                                        Admin panel
                                    </div>
                                    <div
                                        className="mt-1 text-lg text-white"
                                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                                    >
                                        DSP Tlemcen
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="px-5 py-5">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <div className="text-[11px] uppercase tracking-[0.18em] text-[#8DB6DA]">
                                    Session active
                                </div>
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#1E6BA0] text-sm font-bold text-white">
                                        {(auth?.user?.name || auth?.user?.email || 'A').charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-semibold text-white">
                                            {auth?.user?.name || 'Administrateur'}
                                        </div>
                                        <div className="truncate text-xs text-[#B6CBDD]">{auth?.user?.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <nav className="flex-1 overflow-y-auto px-4 pb-6">
                            <div className="space-y-1">
                                {navItems.map((item) => {
                                    const isActive = window.route().current(item.route);

                                    return (
                                        <Link
                                            key={item.route}
                                            href={route(item.route)}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                                                isActive
                                                    ? 'bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                                                    : 'text-[#C7D9E8] hover:bg-white/8 hover:text-white'
                                            }`}
                                        >
                                            <span
                                                className={`flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-semibold tracking-[0.14em] ${
                                                    isActive
                                                        ? 'bg-gradient-to-br from-[#0F4C81] to-[#1E6BA0] text-white'
                                                        : 'bg-white/8 text-[#8DB6DA] group-hover:text-white'
                                                }`}
                                            >
                                                {item.code}
                                            </span>
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>

                        <div className="border-t border-white/10 px-5 py-5">
                            <div className="flex gap-3">
                                <Link
                                    href={route('home')}
                                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
                                >
                                    Voir le site
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 rounded-xl bg-red-500/90 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-500"
                                >
                                    Deconnexion
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {sidebarOpen && (
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-[#020617]/55 lg:hidden"
                        aria-label="Fermer le menu"
                    />
                )}

                <div className="flex min-h-screen flex-1 flex-col">
                    <header className="sticky top-0 z-20 border-b border-[#DCE6EF] bg-white/85 backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DCE6EF] bg-white text-[#334155] transition hover:bg-[#F8FBFD] lg:hidden"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>

                                <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">
                                        Espace administration
                                    </div>
                                    <h1
                                        className="text-xl text-[#13243A]"
                                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                                    >
                                        Pilotage et gestion
                                    </h1>
                                </div>
                            </div>

                            <div className="hidden items-center gap-3 md:flex">
                                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FBFD] px-4 py-2 text-right">
                                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#7B92A8]">
                                        Connecte en tant que
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-[#13243A]">
                                        {auth?.user?.email}
                                    </div>
                                </div>
                                <Link
                                    href={route('admin.dashboard')}
                                    className="rounded-2xl bg-[#0F4C81] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0A2540]"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
                        <div className="mx-auto max-w-7xl">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}
