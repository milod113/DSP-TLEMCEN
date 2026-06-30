import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function SearchResults({ query, articles, etablissements, documents }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isRtl = locale === 'ar';
    const total = (articles?.length || 0) + (etablissements?.length || 0) + (documents?.length || 0);

    return (
        <>
            <Head title={query ? `Résultats pour "${query}"` : 'Recherche'} />

            <PageHero
                title={m('resultats_recherche') || 'Résultats de recherche'}
                description={query ? `Résultats pour "${query}" (${total} trouvé(s))` : 'Effectuez une recherche'}
                badge="Recherche"
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                <div className="-mt-6 relative z-10 mb-8">
                    <form method="GET" action={route('search')} className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                name="q"
                                defaultValue={query}
                                placeholder={m('rechercher') || 'Rechercher...'}
                                className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition"
                                dir={isRtl ? 'rtl' : 'ltr'}
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="rounded-xl bg-[#0F4C81] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#0A3D6B] shadow-md">
                            {m('rechercher') || 'Rechercher'}
                        </button>
                    </form>
                </div>

                {query && total === 0 && (
                    <div className="py-16 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">🔍</div>
                        <p className="text-gray-500">Aucun résultat trouvé pour "{query}"</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez avec d'autres termes.</p>
                    </div>
                )}

                {query && total > 0 && (
                    <div className="space-y-10">
                        {articles?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                                    <span className="text-xl">📝</span> Articles ({articles.length})
                                </h2>
                                <div className="space-y-2">
                                    {articles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={route('actualites.show', article.slug)}
                                            className="block rounded-xl bg-white border border-gray-100 p-4 transition hover:border-blue-200 hover:shadow-md"
                                        >
                                            <h3 className="text-sm font-semibold text-[#0A2540]">{isRtl && article.title_ar ? article.title_ar : article.title_fr}</h3>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{isRtl && article.content_ar ? article.content_ar : article.content_fr}</p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {etablissements?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                                    <span className="text-xl">🏥</span> Établissements ({etablissements.length})
                                </h2>
                                <div className="space-y-2">
                                    {etablissements.map((etab) => (
                                        <Link
                                            key={etab.id}
                                            href={route('etablissements.show', etab.id)}
                                            className="block rounded-xl bg-white border border-gray-100 p-4 transition hover:border-blue-200 hover:shadow-md"
                                        >
                                            <h3 className="text-sm font-semibold text-[#0A2540]">{isRtl && etab.nom_ar ? etab.nom_ar : etab.nom_fr}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{etab.type}</p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {documents?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                                    <span className="text-xl">📄</span> Documents ({documents.length})
                                </h2>
                                <div className="space-y-2">
                                    {documents.map((doc) => (
                                        <Link
                                            key={doc.id}
                                            href={route('documents')}
                                            className="block rounded-xl bg-white border border-gray-100 p-4 transition hover:border-blue-200 hover:shadow-md"
                                        >
                                            <h3 className="text-sm font-semibold text-[#0A2540]">{isRtl && doc.titre_ar ? doc.titre_ar : doc.titre_fr}</h3>
                                            {doc.description_fr && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{isRtl && doc.description_ar ? doc.description_ar : doc.description_fr}</p>}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {!query && (
                    <div className="py-16 text-center text-gray-400">
                        <p>Saisissez un mot-clé pour lancer la recherche.</p>
                    </div>
                )}
            </div>
        </>
    );
}
