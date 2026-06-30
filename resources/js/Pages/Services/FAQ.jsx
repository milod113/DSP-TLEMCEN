import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PageHero from '../../Components/PageHero';

export default function Faq({ faqs }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isRtl = locale === 'ar';
    const [openId, setOpenId] = useState(null);

    const categories = faqs?.length
        ? [...new Set(faqs.map(f => f.categorie).filter(Boolean))]
        : [];

    const grouped = categories.length > 0
        ? Object.fromEntries(categories.map(c => [c, faqs.filter(f => f.categorie === c)]))
        : { 'Général': faqs || [] };

    return (
        <>
            <Head title={m('faq')} />

            <PageHero
                title={m('faq')}
                description={pageContents?.faq_hero_description?.value_fr || 'Questions fréquemment posées sur les services de la DSP Tlemcen'}
                badge="FAQ"
            />

            <div className="mx-auto max-w-4xl px-4 pb-16 md:pb-20">
                {faqs?.length > 0 ? (
                    <div className="-mt-6 relative z-10 space-y-8">
                        {Object.entries(grouped).map(([cat, items]) => (
                            <div key={cat}>
                                {categories.length > 1 && (
                                    <h2 className="text-lg font-semibold text-[#0A2540] mb-4 flex items-center gap-2" style={{ fontFamily: "'Fraunces', serif" }}>
                                        <span className="inline-block h-2 w-2 rounded-full bg-[#0F4C81]" />
                                        {cat}
                                    </h2>
                                )}
                                <div className="space-y-3">
                                    {items.map((faq) => (
                                        <div key={faq.id} className="bg-white rounded-2xl border border-[#DCE6EF] overflow-hidden transition hover:border-[#B7CCDE]">
                                            <button
                                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-[#F7F9FB]"
                                            >
                                                <span className="text-sm font-medium text-[#13243A] flex-1">
                                                    {isRtl && faq.question_ar ? faq.question_ar : faq.question_fr}
                                                </span>
                                                <svg className={`h-5 w-5 shrink-0 text-[#0F4C81] transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="px-6 pb-4 pt-0 border-t border-[#DCE6EF]">
                                                    <p className="text-sm text-[#5C7184] leading-relaxed pt-3">
                                                        {isRtl && faq.answer_ar ? faq.answer_ar : faq.answer_fr}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F9FB] text-3xl">❓</div>
                        <p className="text-[#5C7184]">Aucune question pour le moment.</p>
                    </div>
                )}

                {/* Contact CTA */}
                <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#0F4C81] p-8 text-center">
                    <h3 className="text-lg font-semibold text-white">Vous avez une autre question ?</h3>
                    <p className="text-sm text-blue-200 mt-2">Notre équipe est à votre disposition pour vous répondre.</p>
                    <a href={route('contact')} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-[#0A2540] hover:bg-[#E8F1F8] transition shadow-md">
                        Nous contacter
                    </a>
                </div>
            </div>
        </>
    );
}
