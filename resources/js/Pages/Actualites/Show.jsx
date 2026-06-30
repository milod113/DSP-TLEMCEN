import RelatedContentSections from '@/Components/RelatedContentSections';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ActualiteShow({ article, relatedArticles = [], relatedTopics = [], linkedDocuments = [] }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isAr = locale === 'ar';
    const title = isAr && article.title_ar ? article.title_ar : article.title_fr;
    const content = isAr && article.content_ar ? article.content_ar : article.content_fr;
    const formattedDate = article.published_at
        ? new Date(article.published_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    const contentParagraphs = content
        ?.split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const usefulServices = [
        {
            code: 'SERVICES',
            href: route('services'),
            title: 'Services de sante',
            description: 'Accedez aux services citoyens et aux informations pratiques.',
        },
        {
            code: 'URGENCES',
            href: route('services.urgences'),
            title: "Centre d'urgence",
            description: "Consultez les numeros utiles et les consignes en cas d'urgence.",
        },
        {
            code: 'DOCUMENTS',
            href: route('documents'),
            title: 'Documents officiels',
            description: 'Retrouvez les formulaires et documents a telecharger.',
        },
        {
            code: 'CONTACT',
            href: route('contact'),
            title: 'Nous contacter',
            description: 'Joignez rapidement les services de la DSP Tlemcen.',
        },
    ];

    return (
        <>
            <Head title={title} />

            <section className="relative -mx-4 -mt-6 overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0F3A5C] to-[#0A2540] px-4 pb-14 pt-12 md:pb-16 md:pt-16">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1A5A8C_0%,_transparent_60%)] opacity-30" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0F4C81_0%,_transparent_50%)] opacity-20" />
                <svg className="absolute inset-0 h-full w-full opacity-[0.06]" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="articleHeroGrid" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                            <path d="M40 0L80 23.1V69.2L40 92.4L0 69.2V23.1L40 0Z" fill="none" stroke="#7FB3DE" strokeWidth="0.8" />
                        </pattern>
                    </defs>
                    <rect width="1200" height="560" fill="url(#articleHeroGrid)" />
                </svg>

                <div className="relative mx-auto max-w-5xl">
                    <Link href={route('actualites')} className="inline-flex items-center gap-2 text-sm font-medium text-[#C3D9EE] transition hover:text-white">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {m('toutes_actualites')}
                    </Link>

                    <div className="mt-8 max-w-4xl">
                        {article.category && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D7E7F5] backdrop-blur-sm">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {article.category}
                            </span>
                        )}

                        <h1 className="mt-5 text-3xl leading-tight text-white md:text-5xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#B8D0E5]">
                            {formattedDate && (
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z" />
                                    </svg>
                                    {formattedDate}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                DSP Tlemcen
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                <article className="-mt-8 relative z-10 overflow-hidden rounded-[28px] border border-[#DCE6EF] bg-white shadow-[0_18px_40px_-20px_rgba(10,37,64,0.18)]">
                    {article.image && (
                        <div className="relative h-72 overflow-hidden bg-[#E8F1F8] md:h-[420px]">
                            <img src={`/storage/${article.image}`} alt={title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                    )}

                    <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
                        <aside className="border-b border-[#E5ECF2] bg-[#F8FBFD] p-6 lg:border-b-0 lg:border-r">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Publication</p>
                                    <div className="mt-2 text-sm font-medium text-[#13243A]">{formattedDate || '-'}</div>
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Categorie</p>
                                    <div className="mt-2">
                                        <span className="inline-flex rounded-full bg-[#E8F1F8] px-3 py-1.5 text-sm font-medium text-[#0F4C81]">
                                            {article.category || 'Actualite'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Navigation</p>
                                    <div className="mt-3 flex flex-col gap-3">
                                        <Link
                                            href={route('actualites')}
                                            className="inline-flex items-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm font-medium text-[#13243A] transition hover:border-[#0F4C81] hover:text-[#0F4C81]"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            {m('toutes_actualites')}
                                        </Link>
                                        <Link
                                            href={route('home')}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            {isAr ? 'Retour accueil' : "Retour a l'accueil"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div className="p-6 md:p-8 lg:p-10">
                            <div className="max-w-none">
                                <div className="mb-6 h-0.5 w-20 bg-gradient-to-r from-[#0F4C81] via-[#7FB3DE] to-transparent" />
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
                                relatedTopics={relatedTopics}
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
