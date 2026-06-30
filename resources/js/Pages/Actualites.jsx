import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Actualites({ articles, categories = [], filters = {} }) {
    const { messages, pageContents } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const activeCategory = filters?.category || '';

    return (
        <>
            <Head title={m('menu_actualites')} />

            <PageHero
                title={m('menu_actualites')}
                description={
                    pageContents?.actualites_hero_description?.value_fr ||
                    'Retrouvez toutes les actualites et communiques officiels de la DSP Tlemcen'
                }
                badge="Actualites"
                stats={articles?.total ? [`${articles.total} article${articles.total > 1 ? 's' : ''}`] : null}
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                {categories.length > 0 && (
                    <div className="-mt-6 relative z-10 mb-8">
                        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-4 shadow-[0_4px_20px_-8px_rgba(10,37,64,0.08)]">
                            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#5C7184]">
                                Categories :
                            </span>
                            <Link
                                href={route('actualites')}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                                    !activeCategory
                                        ? 'bg-[#0F4C81] text-white shadow-sm hover:bg-[#0A2540]'
                                        : 'border border-[#DCE6EF] bg-white text-[#13243A] hover:border-[#0F4C81] hover:bg-[#F7F9FB]'
                                }`}
                            >
                                Toutes
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={route('actualites', { category })}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                                        activeCategory === category
                                            ? 'bg-[#0F4C81] text-white shadow-sm hover:bg-[#0A2540]'
                                            : 'border border-[#DCE6EF] bg-white text-[#13243A] hover:border-[#0F4C81] hover:bg-[#F7F9FB]'
                                    }`}
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {articles?.data?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.data.map((article) => (
                                <Link
                                    key={article.id}
                                    href={route('actualites.show', article.slug)}
                                    className="group relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.15)]"
                                >
                                    <div className="relative h-48 overflow-hidden bg-[#E8F1F8]">
                                        {article.image ? (
                                            <img
                                                src={`/storage/${article.image}`}
                                                alt={article.title_fr}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-[#7FA8C9]">
                                                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                </svg>
                                            </div>
                                        )}
                                        {article.category && (
                                            <div className="absolute left-4 top-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0F4C81] shadow-sm backdrop-blur-sm">
                                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0F4C81]" />
                                                    {article.category}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>

                                    <div className="p-5">
                                        <h2
                                            className="text-[1.05rem] font-semibold leading-snug text-[#13243A] transition group-hover:text-[#0F4C81]"
                                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                                        >
                                            {article.title_fr}
                                        </h2>
                                        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-[#5C7184]">
                                            {article.content_fr?.substring(0, 150)}...
                                        </p>
                                        <div className="mt-4 flex items-center justify-between border-t border-[#E5ECF2] pt-4">
                                            <div className="flex items-center gap-2 text-xs text-[#8A9FB0]">
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>
                                                    {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0F4C81] transition group-hover:gap-2">
                                                Lire plus
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {articles?.last_page > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <Link
                                    href={articles.prev_page_url || '#'}
                                    className={`inline-flex items-center gap-2 rounded-xl border border-[#DCE6EF] px-4 py-2 text-sm font-medium transition ${
                                        articles.prev_page_url
                                            ? 'text-[#13243A] hover:border-[#0F4C81] hover:bg-[#F7F9FB]'
                                            : 'cursor-not-allowed text-[#8A9FB0] opacity-50'
                                    }`}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Precedent
                                </Link>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(articles.last_page, 5) }, (_, i) => {
                                        let start = Math.max(1, articles.current_page - 2);
                                        let end = Math.min(articles.last_page, start + 4);

                                        if (end - start < 4) {
                                            start = Math.max(1, end - 4);
                                        }

                                        const pageNum = start + i;
                                        if (pageNum > articles.last_page) return null;

                                        return (
                                            <Link
                                                key={pageNum}
                                                href={route('actualites', {
                                                    page: pageNum,
                                                    ...(activeCategory ? { category: activeCategory } : {}),
                                                })}
                                                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition ${
                                                    pageNum === articles.current_page
                                                        ? 'bg-[#0F4C81] text-white shadow-md'
                                                        : 'border border-[#DCE6EF] text-[#13243A] hover:bg-[#F7F9FB]'
                                                }`}
                                            >
                                                {pageNum}
                                            </Link>
                                        );
                                    })}
                                </div>

                                <Link
                                    href={articles.next_page_url || '#'}
                                    className={`inline-flex items-center gap-2 rounded-xl border border-[#DCE6EF] px-4 py-2 text-sm font-medium transition ${
                                        articles.next_page_url
                                            ? 'text-[#13243A] hover:border-[#0F4C81] hover:bg-[#F7F9FB]'
                                            : 'cursor-not-allowed text-[#8A9FB0] opacity-50'
                                    }`}
                                >
                                    Suivant
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#F7F9FB] text-5xl">
                            NEWS
                        </div>
                        <h3
                            className="text-xl font-semibold text-[#13243A]"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            {m('aucune_actualite')}
                        </h3>
                        <p className="mt-2 text-[#5C7184]">Aucune actualite disponible pour le moment.</p>
                        <Link
                            href={route('home')}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#0A2540] shadow-md"
                        >
                            Retour a l'accueil
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
