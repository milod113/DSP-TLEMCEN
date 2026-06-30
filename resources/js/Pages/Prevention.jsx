import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Prevention({ topics }) {
    const { messages, pageContents, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isAr = locale === 'ar';

    const heroDescription = isAr
        ? pageContents?.prevention_hero_description?.value_ar || 'معلومات حول حملات الوقاية والممارسات الصحية الجيدة.'
        : pageContents?.prevention_hero_description?.value_fr || 'Informations sur les campagnes de prevention et les bonnes pratiques sanitaires.';

    return (
        <>
            <Head title={m('prevention_sante')} />

            <PageHero
                title={m('prevention_sante')}
                description={heroDescription}
                badge={isAr ? 'الوقاية' : 'Prevention'}
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                {topics?.data?.length > 0 ? (
                    <div className="-mt-6 relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {topics.data.map((topic) => {
                            const title = isAr ? topic.titre_ar || topic.titre_fr : topic.titre_fr;
                            const content = isAr ? topic.contenu_ar || topic.contenu_fr : topic.contenu_fr;
                            const category = isAr ? topic.categorie_ar || topic.categorie : topic.categorie;

                            return (
                                <Link
                                    key={topic.id}
                                    href={route('prevention.show', topic.slug)}
                                    className="group relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.15)]"
                                >
                                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50">
                                        {topic.image ? (
                                            <img src={`/storage/${topic.image}`} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-emerald-300">
                                                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                        )}

                                        {category && (
                                            <div className="absolute left-4 top-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-emerald-700 shadow-sm backdrop-blur-sm">
                                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    {category}
                                                </span>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>

                                    <div className="p-5">
                                        <h2 className="font-bold text-[#13243A] transition group-hover:text-emerald-700">
                                            {title}
                                        </h2>
                                        <p className="mt-2 line-clamp-2 text-sm text-[#5C7184]">
                                            {content?.substring(0, 120)}...
                                        </p>
                                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 transition group-hover:gap-2">
                                            {isAr ? 'اقرأ المزيد' : 'En savoir plus'}
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#F7F9FB] text-5xl">
                            SHLD
                        </div>
                        <p className="text-[#5C7184]">
                            {isAr ? 'لا يوجد حاليا اي موضوع وقائي.' : 'Aucun sujet de prevention pour le moment.'}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
