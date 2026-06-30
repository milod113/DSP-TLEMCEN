import RelatedContentSections from '@/Components/RelatedContentSections';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AppelOffreShow({
    item,
    relatedItems = [],
    relatedArticles = [],
    relatedTopics = [],
    linkedDocuments = [],
}) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isAr = locale === 'ar';
    const title = isAr && item.titre_ar ? item.titre_ar : item.titre_fr;
    const description = isAr && item.description_ar ? item.description_ar : item.description_fr;
    const now = new Date();
    const hasDeadline = Boolean(item.date_limite);
    const deadlineDate = hasDeadline ? new Date(item.date_limite) : null;
    const publishedDate = item.date_publication ? new Date(item.date_publication) : null;
    const isExpired = deadlineDate ? deadlineDate < now : false;
    const daysLeft = deadlineDate ? Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24)) : null;

    const paragraphs = description
        ?.split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const status = !hasDeadline
        ? { label: 'Permanent', classes: 'bg-blue-100 text-blue-700 border-blue-200' }
        : isExpired
          ? { label: 'Expire', classes: 'bg-red-100 text-red-700 border-red-200' }
          : daysLeft <= 7
            ? { label: `Urgent - ${daysLeft}j`, classes: 'bg-orange-100 text-orange-700 border-orange-200' }
            : { label: 'Ouvert', classes: 'bg-green-100 text-green-700 border-green-200' };

    const usefulServices = [
        {
            code: 'DOCUMENTS',
            href: route('documents'),
            title: 'Documents administratifs',
            description: 'Consultez les documents complements et ressources utiles.',
        },
        {
            code: 'SERVICES',
            href: route('services'),
            title: 'Services citoyens',
            description: 'Accedez aux services publics proposes par la DSP.',
        },
        {
            code: 'CONTACT',
            href: route('contact'),
            title: 'Contact administratif',
            description: "Prenez contact pour toute demande d'information complementaire.",
        },
        {
            code: 'URGENCES',
            href: route('services.urgences'),
            title: "Services d'urgence",
            description: 'Retrouvez les numeros et orientations prioritaires.',
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
                        <pattern id="tenderHeroGrid" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                            <path d="M40 0L80 23.1V69.2L40 92.4L0 69.2V23.1L40 0Z" fill="none" stroke="#7FB3DE" strokeWidth="0.8" />
                        </pattern>
                    </defs>
                    <rect width="1200" height="560" fill="url(#tenderHeroGrid)" />
                </svg>

                <div className="relative mx-auto max-w-5xl">
                    <Link href={route('appels-offres')} className="inline-flex items-center gap-2 text-sm font-medium text-[#C3D9EE] transition hover:text-white">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {m('menu_appels_offres')}
                    </Link>

                    <div className="mt-8 max-w-4xl">
                        <span className={`inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${status.classes}`}>
                            {status.label}
                        </span>

                        <h1 className="mt-5 text-3xl leading-tight text-white md:text-5xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#B8D0E5]">
                            {publishedDate && (
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    Publication: {publishedDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            )}
                            {deadlineDate && (
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    Date limite: {deadlineDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                <article className="-mt-8 relative z-10 overflow-hidden rounded-[28px] border border-[#DCE6EF] bg-white shadow-[0_18px_40px_-20px_rgba(10,37,64,0.18)]">
                    <div className="grid gap-0 lg:grid-cols-[0.76fr_1.24fr]">
                        <aside className="border-b border-[#E5ECF2] bg-[#F8FBFD] p-6 lg:border-b-0 lg:border-r">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Type</p>
                                    <div className="mt-2">
                                        <span className="inline-flex rounded-full bg-[#E8F1F8] px-3 py-1.5 text-sm font-medium text-[#0F4C81]">
                                            Appel d'offres
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Statut</p>
                                    <div className="mt-2">
                                        <span className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-medium ${status.classes}`}>
                                            {status.label}
                                        </span>
                                    </div>
                                </div>

                                {deadlineDate && (
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Echeance</p>
                                        <div className="mt-2 text-sm text-[#13243A]">
                                            {deadlineDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Actions</p>
                                    <div className="mt-3 flex flex-col gap-3">
                                        {item.fichier && (
                                            <a
                                                href={`/storage/${item.fichier}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]"
                                            >
                                                Telecharger le fichier
                                            </a>
                                        )}
                                        <Link
                                            href={route('appels-offres')}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm font-medium text-[#13243A] transition hover:border-[#0F4C81] hover:text-[#0F4C81]"
                                        >
                                            Retour a la liste
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div className="p-6 md:p-8 lg:p-10">
                            <div className="mb-6 h-0.5 w-20 bg-gradient-to-r from-[#0F4C81] via-[#7FB3DE] to-transparent" />
                            <div className="space-y-5 text-[15px] leading-8 text-[#33485C] md:text-[16px]">
                                {paragraphs?.length > 0 ? (
                                    paragraphs.map((paragraph, index) => (
                                        <p key={`${index}-${paragraph.slice(0, 24)}`} className={index === 0 ? 'text-[18px] leading-8 text-[#13243A] md:text-[19px]' : ''}>
                                            {paragraph}
                                        </p>
                                    ))
                                ) : (
                                    <p>{description}</p>
                                )}
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

                {relatedItems.length > 0 && (
                    <section className="mt-10">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                Autres appels d'offres
                            </h2>
                            <Link href={route('appels-offres')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                                Voir tout
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {relatedItems.map((related) => (
                                <Link
                                    key={related.id}
                                    href={route('appels-offres.show', related.id)}
                                    className="rounded-2xl border border-[#DCE6EF] bg-white p-5 transition hover:-translate-y-1 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)]"
                                >
                                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A9FB0]">
                                        {new Date(related.date_publication).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </div>
                                    <h3 className="mt-3 text-[1.05rem] text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                        {related.titre_fr}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5C7184]">
                                        {related.description_fr?.substring(0, 130)}...
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
