import { Head, usePage, Link } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Direction() {
    const { messages, locale, pageContents } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const pc = (key) => {
        const c = pageContents?.[key];
        if (!c) return null;
        return locale === 'ar' && c.value_ar ? c.value_ar : c.value_fr;
    };

    const motNom = pc('mot_directeur_nom') || 'Dr. Mohamed Benali';
    const motTitre = pc('mot_directeur_titre') || 'Directeur de la Santé';
    const motMessage = pc('mot_directeur_message');
    const missionsList = (() => {
        try { const raw = pc('missions_list'); return raw ? JSON.parse(raw) : null; } catch { return null; }
    })();
    const organigrammeServices = (() => {
        try { const raw = pc('organigramme_services'); return raw ? JSON.parse(raw) : null; } catch { return null; }
    })();

    return (
        <>
            <Head title={m('menu_direction')} />

            <PageHero
                title={m('menu_direction')}
                description={pc('direction_hero_description') || 'Présentation de la Direction de la Santé et de la Population de la wilaya de Tlemcen'}
                badge="Direction de la Santé"
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                {/* ============ MOT DU DIRECTEUR ============ */}
                <section className="-mt-8 relative z-10 mb-10 overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_-12px_rgba(10,37,64,0.15)]">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="relative col-span-1 min-h-[250px] bg-gradient-to-br from-[#0A2540] to-[#0F4C81] p-8 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1A5A8C_0%,_transparent_70%)] opacity-30" />
                            <div className="relative text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 transition-transform hover:scale-105 duration-300">
                                    <svg className="h-10 w-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white">{motNom}</h3>
                                <p className="text-sm text-[#9DC2E6]">{motTitre}</p>
                            </div>
                        </div>
                        <div className="col-span-2 p-8 md:p-10">
                            <div className="mb-4 flex items-center gap-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0F4C81]">Mot du Directeur</span>
                                <span className="flex-1 border-b border-[#DCE6EF]" />
                            </div>
                            <blockquote className="relative">
                                <svg className="absolute -left-2 -top-2 h-8 w-8 text-[#DCE6EF]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                                </svg>
                                <p className="pl-6 text-[15px] leading-relaxed text-[#13243A] italic">
                                    {motMessage || m('mot_directeur') || 'Bienvenue sur le site officiel de la Direction de la Santé et de la Population de la wilaya de Tlemcen.'}
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* ============ MISSIONS & ORGANIGRAMME ============ */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Missions */}
                    <div className="rounded-2xl border border-[#DCE6EF] bg-white p-8 transition-all duration-300 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)]">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl">
                                🎯
                            </div>
                            <h2 className="text-xl font-semibold text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                {m('missions')}
                            </h2>
                        </div>
                        <ul className="space-y-3 text-[15px] text-[#5C7184]">
                            {(missionsList || ['Mise en œuvre de la politique sanitaire nationale','Gestion et coordination des établissements de santé','Programmes de prévention et promotion de la santé','Contrôle sanitaire et veille épidémiologique','Formation et développement des ressources humaines']).map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F1F8] text-[10px] font-bold text-[#0F4C81]">
                                        {i + 1}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Organigramme */}
                    <div className="rounded-2xl border border-[#DCE6EF] bg-white p-8 transition-all duration-300 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)]">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-2xl">
                                📊
                            </div>
                            <h2 className="text-xl font-semibold text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                {m('organigramme')}
                            </h2>
                        </div>
                        <p className="mb-5 text-[15px] text-[#5C7184]">
                            {pc('organigramme_description') || 'La DSP de Tlemcen est structurée en services spécialisés pour assurer une gestion efficace du secteur sanitaire.'}
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#0A2540] to-[#0F4C81] p-4 text-sm shadow-md">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white font-bold text-xs">D</div>
                                <span className="font-semibold text-white">Direction</span>
                                <span className="text-blue-200">— {motTitre}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {(organigrammeServices || ['Santé publique','Gestion des EPH','Prévention','Ressources humaines','Finances','Informatique médicale']).map((service) => (
                                    <div key={service} className="rounded-xl border border-[#E5ECF2] bg-white p-3.5 text-center text-xs font-medium text-[#13243A] transition-all hover:border-[#B7CCDE] hover:bg-[#F7F9FB] hover:shadow-sm hover:-translate-y-0.5">
                                        {service}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============ CONTACT ============ */}
                <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_-12px_rgba(10,37,64,0.12)]">
                    <div className="border-b border-[#E5ECF2] bg-[#F7F9FB] px-8 py-5">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📬</span>
                            <h2 className="text-xl font-semibold text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                {m('contact_officiel')}
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
                        <div className="space-y-5">
                            <div className="flex items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1F8] text-[#0F4C81] transition group-hover:bg-[#0F4C81] group-hover:text-white">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#13243A]">{m('adresse')}</p>
                                    <p className="text-sm text-[#5C7184]">{pc('direction_adresse') || 'Direction de la Santé et de la Population, Wilaya de Tlemcen'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1F8] text-[#0F4C81] transition group-hover:bg-[#0F4C81] group-hover:text-white">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#13243A]">{m('telephone')}</p>
                                    <p className="text-sm text-[#5C7184]">{pc('direction_telephone') || '043 20 XX XX'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1F8] text-[#0F4C81] transition group-hover:bg-[#0F4C81] group-hover:text-white">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#13243A]">{m('email')}</p>
                                    <p className="text-sm text-[#5C7184]">{pc('direction_email') || 'contact@dsp-tlemcen.dz'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1F8] text-[#0F4C81] transition group-hover:bg-[#0F4C81] group-hover:text-white">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#13243A]">{m('horaires')}</p>
                                    <p className="text-sm text-[#5C7184]">{pc('direction_horaires') || m('horaires_ouverture')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
