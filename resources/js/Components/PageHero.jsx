import { Link, usePage } from '@inertiajs/react';

export default function PageHero({ title, description, badge, stats, breadcrumb }) {
    const { locale, messages } = usePage().props;
    const isRtl = locale === 'ar';
    const m = (key) => messages?.[key] || key;

    return (
        <section className="relative -mx-4 -mt-6 overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0F3A5C] to-[#0A2540] px-4 pt-12 pb-16 md:pt-16 md:pb-20">
            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1A5A8C_0%,_transparent_60%)] opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0F4C81_0%,_transparent_50%)] opacity-20" />
            
            <svg className="absolute inset-0 h-full w-full opacity-[0.06]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                    <pattern id="heroHex" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                        <path d="M40 0L80 23.1V69.2L40 92.4L0 69.2V23.1L40 0Z" fill="none" stroke="#7FB3DE" strokeWidth="0.8" />
                    </pattern>
                </defs>
                <rect width="1200" height="600" fill="url(#heroHex)" />
            </svg>

            {/* Floating orbs */}
            <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-[#5A8FC4] opacity-[0.06] blur-3xl" />
            <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-[#7FB3DE] opacity-[0.05] blur-3xl" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5A8FC4]/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5A8FC4]/30 to-transparent" />

            <div className="relative mx-auto max-w-5xl">
                {badge && (
                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-[#9DC2E6]">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{badge}</span>
                    </div>
                )}
                
                <h1 
                    className="mt-4 text-3xl font-semibold text-white md:text-4xl lg:text-5xl"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                >
                    {title}
                </h1>
                
                {description && (
                    <p className="mt-3 max-w-2xl text-[#C3D9EE] md:text-lg">{description}</p>
                )}

                {stats && (
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                        {stats.map((s, i) => (
                            <span key={i} className="flex items-center gap-2 text-[#9DC2E6]">
                                <span className="inline-block h-2 w-2 rounded-full bg-[#5A8FC4]" />
                                {s}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Breadcrumb */}
            {breadcrumb !== false && (
                <nav className="relative mx-auto mt-8 max-w-5xl px-4 text-sm text-[#8A9FB0]">
                    <ol className="flex items-center gap-2" dir={isRtl ? 'rtl' : 'ltr'}>
                        <li>
                            <Link href={route('home')} className="hover:text-white transition text-[#9DC2E6]">
                                {m('menu_accueil')}
                            </Link>
                        </li>
                        <li className="text-[#5A8FC4]">/</li>
                        <li className="text-white font-medium">{title}</li>
                    </ol>
                </nav>
            )}
        </section>
    );
}
