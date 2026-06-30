import RelatedContentSections from '@/Components/RelatedContentSections';
import { Head, Link, usePage } from '@inertiajs/react';

export default function PreventionShow({ topic, similarTopics = [], relatedArticles = [], linkedDocuments = [] }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isAr = locale === 'ar';
    const title = isAr && topic.titre_ar ? topic.titre_ar : topic.titre_fr;
    const content = isAr && topic.contenu_ar ? topic.contenu_ar : topic.contenu_fr;
    const category = isAr && topic.categorie_ar ? topic.categorie_ar : topic.categorie;

    const contentParagraphs = content
        ?.split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const usefulServices = [
        {
            code: 'PREVENTION',
            href: route('prevention'),
            title: 'Tous les sujets de prevention',
            description: 'Parcourez les campagnes de sensibilisation et les conseils de sante.',
        },
        {
            code: 'URGENCES',
            href: route('services.urgences'),
            title: "Orientation d'urgence",
            description: 'Trouvez rapidement les numeros et services utiles.',
        },
        {
            code: 'SERVICES',
            href: route('services'),
            title: 'Services de proximite',
            description: 'Consultez les structures et services disponibles pour les citoyens.',
        },
        {
            code: 'CONTACT',
            href: route('contact'),
            title: "Besoin d'orientation",
            description: 'Contactez-nous pour obtenir une aide ou une information complementaire.',
        },
    ];

    return (
        <>
            <Head title={title} />

            <section className="relative -mx-4 -mt-6 overflow-hidden bg-gradient-to-br from-[#0A3A2D] via-[#0F5A44] to-[#0A3A2D] px-4 pb-14 pt-12 md:pb-16 md:pt-16">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#34D399_0%,_transparent_60%)] opacity-20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#10B981_0%,_transparent_45%)] opacity-20" />
                <svg className="absolute inset-0 h-full w-full opacity-[0.06]" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="preventionHeroGrid" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                            <path d="M40 0L80 23.1V69.2L40 92.4L0 69.2V23.1L40 0Z" fill="none" stroke="#A7F3D0" strokeWidth="0.8" />
                        </pattern>
                    </defs>
                    <rect width="1200" height="560" fill="url(#preventionHeroGrid)" />
                </svg>

                <div className="relative mx-auto max-w-5xl">
                    <Link href={route('prevention')} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {isAr ? 'Retour prevention' : 'Retour a la prevention'}
                    </Link>

                    <div className="mt-8 max-w-4xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-50 backdrop-blur-sm">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            {category || 'Prevention'}
                        </span>

                        <h1 className="mt-5 text-3xl leading-tight text-white md:text-5xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {title}
                        </h1>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/90 md:text-lg">
                            Des conseils de prevention et de sensibilisation pour aider les citoyens a mieux proteger leur sante au quotidien.
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                <article className="-mt-8 relative z-10 overflow-hidden rounded-[28px] border border-[#DCE6EF] bg-white shadow-[0_18px_40px_-20px_rgba(10,37,64,0.18)]">
                    {topic.image && (
                        <div className="relative h-72 overflow-hidden bg-emerald-50 md:h-[400px]">
                            <img src={`/storage/${topic.image}`} alt={title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                    )}

                    <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
                        <aside className="border-b border-[#E5ECF2] bg-[#F7FCFA] p-6 lg:border-b-0 lg:border-r">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E8B81]">Theme</p>
                                    <div className="mt-2">
                                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700">
                                            {category || 'Prevention'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E8B81]">Objectif</p>
                                    <p className="mt-2 text-sm leading-relaxed text-[#4C625A]">
                                        Informer, prevenir et encourager les bons reflexes de sante.
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E8B81]">Navigation</p>
                                    <div className="mt-3 flex flex-col gap-3">
                                        <Link
                                            href={route('prevention')}
                                            className="inline-flex items-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm font-medium text-[#13243A] transition hover:border-emerald-500 hover:text-emerald-700"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Tous les sujets
                                        </Link>
                                        <Link
                                            href={route('services.urgences')}
                                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {m('urgences')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div className="p-6 md:p-8 lg:p-10">
                            <div className="max-w-none">
                                <div className="mb-6 h-0.5 w-20 bg-gradient-to-r from-emerald-600 via-emerald-300 to-transparent" />
                                <div className="space-y-5 text-[15px] leading-8 text-[#33485C] md:text-[16px]">
                                    {contentParagraphs?.length > 0 ? (
                                        contentParagraphs.map((paragraph, index) => (
                                            <p key={`${index}-${paragraph.slice(0, 24)}`} className={index === 0 ? 'text-[18px] leading-8 text-[#13243A] md:text-[19px]' : ''}>
                                                {paragraph}
                                            </p>
                                        ))
                                    ) : (
                                        <p>{content}</p>
                                    )}
                                </div>
                            </div>

                            <RelatedContentSections
                                locale={locale}
                                relatedArticles={relatedArticles}
                                relatedTopics={similarTopics}
                                linkedDocuments={linkedDocuments}
                                usefulServices={usefulServices}
                            />
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
}
