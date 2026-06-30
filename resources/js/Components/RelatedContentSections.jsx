import { Link } from '@inertiajs/react';

export default function RelatedContentSections({
    locale,
    relatedArticles = [],
    relatedTopics = [],
    linkedDocuments = [],
    usefulServices = [],
    articleRouteName = 'actualites.show',
    topicRouteName = 'prevention.show',
}) {
    const isAr = locale === 'ar';

    const labels = {
        relatedNews: isAr ? 'Actualites liees' : 'Actualites liees',
        similarTopics: isAr ? 'Sujets similaires' : 'Sujets de prevention similaires',
        linkedDocs: isAr ? 'Documents lies' : 'Documents utiles',
        usefulServices: isAr ? 'Services utiles' : 'Services utiles',
        seeAllNews: isAr ? 'Voir toutes les actualites' : 'Toutes les actualites',
        seeAllPrevention: isAr ? 'Voir toute la prevention' : 'Toute la prevention',
        seeAllDocs: isAr ? 'Voir tous les documents' : 'Tous les documents',
        openService: isAr ? 'Ouvrir' : 'Ouvrir le service',
        readMore: isAr ? 'Lire plus' : 'Lire plus',
        download: isAr ? 'Telecharger' : 'Telecharger',
        emptyNews: isAr ? 'Aucune actualite liee pour le moment.' : 'Aucune actualite liee pour le moment.',
        emptyTopics: isAr ? 'Aucun sujet similaire pour le moment.' : 'Aucun sujet similaire pour le moment.',
        emptyDocs: isAr ? 'Aucun document utile pour le moment.' : 'Aucun document utile pour le moment.',
        emptyServices: isAr ? 'Aucun service suggere pour le moment.' : 'Aucun service suggere pour le moment.',
    };

    const renderText = (frValue, arValue, fallback) => {
        if (isAr) {
            return arValue || frValue || fallback;
        }

        return frValue || arValue || fallback;
    };

    return (
        <section className="mt-10 space-y-8 border-t border-[#E5ECF2] pt-10">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                <div>
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {labels.relatedNews}
                        </h2>
                        <Link href={route('actualites')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                            {labels.seeAllNews}
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {relatedArticles.length > 0 ? (
                            relatedArticles.map((article) => {
                                const title = renderText(article.title_fr, article.title_ar, 'Actualite');
                                const content = renderText(article.content_fr, article.content_ar, '');

                                return (
                                    <Link
                                        key={article.id}
                                        href={route(articleRouteName, article.slug)}
                                        className="block rounded-2xl border border-[#DCE6EF] bg-white p-5 transition hover:-translate-y-1 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)]"
                                    >
                                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A9FB0]">
                                            {article.category || 'News'}
                                        </div>
                                        <h3 className="mt-2 text-[1.05rem] text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                            {title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5C7184]">
                                            {content ? `${content.substring(0, 120)}...` : labels.readMore}
                                        </p>
                                        <div className="mt-4 text-sm font-medium text-[#0F4C81]">{labels.readMore}</div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="rounded-2xl border border-dashed border-[#D6E1EB] bg-[#F8FBFD] p-5 text-sm text-[#5C7184]">
                                {labels.emptyNews}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {labels.similarTopics}
                        </h2>
                        <Link href={route('prevention')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                            {labels.seeAllPrevention}
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {relatedTopics.length > 0 ? (
                            relatedTopics.map((topic) => {
                                const title = renderText(topic.titre_fr, topic.titre_ar, 'Prevention');
                                const content = renderText(topic.contenu_fr, topic.contenu_ar, '');
                                const category = renderText(topic.categorie, topic.categorie_ar, 'Prevention');

                                return (
                                    <Link
                                        key={topic.id}
                                        href={route(topicRouteName, topic.slug)}
                                        className="block rounded-2xl border border-[#DCE6EF] bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.12)]"
                                    >
                                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A9FB0]">
                                            {category}
                                        </div>
                                        <h3 className="mt-2 text-[1.05rem] text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                            {title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5C7184]">
                                            {content ? `${content.substring(0, 120)}...` : labels.readMore}
                                        </p>
                                        <div className="mt-4 text-sm font-medium text-emerald-700">{labels.readMore}</div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="rounded-2xl border border-dashed border-[#D6E1EB] bg-[#F8FBFD] p-5 text-sm text-[#5C7184]">
                                {labels.emptyTopics}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                <div>
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {labels.linkedDocs}
                        </h2>
                        <Link href={route('documents')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                            {labels.seeAllDocs}
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {linkedDocuments.length > 0 ? (
                            linkedDocuments.map((document) => {
                                const title = renderText(document.titre_fr, document.titre_ar, 'Document');
                                const description = renderText(document.description_fr, document.description_ar, '');

                                return (
                                    <a
                                        key={document.id}
                                        href={document.fichier ? `/storage/${document.fichier}` : route('documents')}
                                        target={document.fichier ? '_blank' : undefined}
                                        rel={document.fichier ? 'noreferrer' : undefined}
                                        className="block rounded-2xl border border-[#DCE6EF] bg-white p-5 transition hover:-translate-y-1 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)]"
                                    >
                                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A9FB0]">
                                            {document.categorie || 'Document'}
                                        </div>
                                        <h3 className="mt-2 text-[1.05rem] text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                            {title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5C7184]">
                                            {description ? `${description.substring(0, 120)}...` : labels.download}
                                        </p>
                                        <div className="mt-4 text-sm font-medium text-[#0F4C81]">{labels.download}</div>
                                    </a>
                                );
                            })
                        ) : (
                            <div className="rounded-2xl border border-dashed border-[#D6E1EB] bg-[#F8FBFD] p-5 text-sm text-[#5C7184]">
                                {labels.emptyDocs}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="mb-5">
                        <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {labels.usefulServices}
                        </h2>
                    </div>
                    {usefulServices.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {usefulServices.map((service) => (
                                <Link
                                    key={service.href}
                                    href={service.href}
                                    className="rounded-2xl border border-[#DCE6EF] bg-white p-5 transition hover:-translate-y-1 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)]"
                                >
                                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A9FB0]">
                                        {service.code}
                                    </div>
                                    <h3 className="mt-2 text-[1.05rem] text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                        {service.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#5C7184]">{service.description}</p>
                                    <div className="mt-4 text-sm font-medium text-[#0F4C81]">{labels.openService}</div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[#D6E1EB] bg-[#F8FBFD] p-5 text-sm text-[#5C7184]">
                            {labels.emptyServices}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
