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
        relatedNews: isAr ? 'أخبار ذات صلة' : 'Actualites liees',
        similarTopics: isAr ? 'مواضيع وقائية مشابهة' : 'Sujets prevention similaires',
        linkedDocs: isAr ? 'وثائق مرتبطة' : 'Documents utiles',
        usefulServices: isAr ? 'خدمات مفيدة' : 'Services utiles',
        seeAllNews: isAr ? 'كل الاخبار' : 'Toutes les actualites',
        seeAllPrevention: isAr ? 'كل المواضيع' : 'Toute la prevention',
        seeAllDocs: isAr ? 'كل الوثائق' : 'Tous les documents',
        openService: isAr ? 'فتح الخدمة' : 'Ouvrir le service',
        readMore: isAr ? 'اقرأ المزيد' : 'Lire plus',
        download: isAr ? 'تحميل' : 'Telecharger',
    };

    return (
        <section className="mt-10 space-y-8">
            {(relatedArticles?.length > 0 || relatedTopics?.length > 0) && (
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                {labels.relatedNews}
                            </h2>
                            <Link href={route('actualites')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                                {labels.seeAllNews}
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {relatedArticles.map((article) => {
                                const title = isAr ? article.title_ar || article.title_fr : article.title_fr;
                                const content = isAr ? article.content_ar || article.content_fr : article.content_fr;

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
                                            {content?.substring(0, 120)}...
                                        </p>
                                        <div className="mt-4 text-sm font-medium text-[#0F4C81]">{labels.readMore}</div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                {labels.similarTopics}
                            </h2>
                            <Link href={route('prevention')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                                {labels.seeAllPrevention}
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {relatedTopics.map((topic) => {
                                const title = isAr ? topic.titre_ar || topic.titre_fr : topic.titre_fr;
                                const content = isAr ? topic.contenu_ar || topic.contenu_fr : topic.contenu_fr;

                                return (
                                    <Link
                                        key={topic.id}
                                        href={route(topicRouteName, topic.slug)}
                                        className="block rounded-2xl border border-[#DCE6EF] bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.12)]"
                                    >
                                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A9FB0]">
                                            {topic.categorie || 'Prevention'}
                                        </div>
                                        <h3 className="mt-2 text-[1.05rem] text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                            {title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5C7184]">
                                            {content?.substring(0, 120)}...
                                        </p>
                                        <div className="mt-4 text-sm font-medium text-emerald-700">{labels.readMore}</div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                <div>
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {labels.linkedDocs}
                        </h2>
                        <Link href={route('documents')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                            {labels.seeAllDocs}
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {linkedDocuments.map((document) => {
                            const title = isAr ? document.titre_ar || document.titre_fr : document.titre_fr;
                            const description = isAr ? document.description_ar || document.description_fr : document.description_fr;

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
                                        {description?.substring(0, 120)}...
                                    </p>
                                    <div className="mt-4 text-sm font-medium text-[#0F4C81]">{labels.download}</div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="mb-5">
                        <h2 className="text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {labels.usefulServices}
                        </h2>
                    </div>
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
                </div>
            </div>
        </section>
    );
}
