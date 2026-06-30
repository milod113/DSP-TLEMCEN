import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../../Components/PageHero';

export default function MediaShow({ item, related }) {
    const { locale } = usePage().props;
    const isRtl = locale === 'ar';
    const title = isRtl && item.title_ar ? item.title_ar : item.title_fr;
    const description = isRtl && item.description_ar ? item.description_ar : item.description_fr;

    const typeIcons = { image: '🖼️', video: '🎬', poster: '📄' };
    const typeLabels = { image: 'Image', video: 'Vidéo', poster: 'Affiche' };
    const categoryLabels = {
        campagnes: 'Campagnes', visites: 'Visites institutionnelles',
        evenements: 'Événements', annonces: 'Annonces publiques',
    };

    return (
        <>
            <Head title={title} />

            <PageHero
                title={title}
                description={description}
                badge={`${typeIcons[item.type]} ${typeLabels[item.type]}`}
            />

            <div className="mx-auto max-w-7xl px-4 pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="-mt-6 relative z-10">
                    {/* Back link */}
                    <Link href={route('mediatheque')} className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#334155] shadow-sm border border-[#DCE6EF] transition hover:bg-[#F8FBFD]">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRtl ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} /></svg>
                        Retour à la médiathèque
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main media */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-[#DCE6EF]">
                                {item.type === 'video' && item.video_id ? (
                                    <div className="aspect-video w-full">
                                        <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${item.video_id}?autoplay=0`} allow="encrypted-media" allowFullScreen />
                                    </div>
                                ) : item.file_url ? (
                                    <img src={item.file_url} alt={title} className="w-full object-contain max-h-[70vh] bg-[#F8FBFD]" />
                                ) : (
                                    <div className="flex aspect-video items-center justify-center bg-[#F8FBFD] text-6xl text-[#7FA8C9]">{typeIcons[item.type]}</div>
                                )}
                            </div>

                            {/* Description card */}
                            <div className="mt-6 rounded-3xl border border-[#DCE6EF] bg-white p-6 shadow-sm">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="rounded-full bg-[#0F4C81]/10 px-3 py-1 text-xs font-semibold text-[#0F4C81]">
                                        {typeIcons[item.type]} {typeLabels[item.type]}
                                    </span>
                                    {item.categorie && (
                                        <span className="rounded-full bg-[#E8F1F8] px-3 py-1 text-xs font-medium text-[#45596B]">
                                            {categoryLabels[item.categorie] || item.categorie}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-[#13243A]">{title}</h1>
                                {description && (
                                    <p className="mt-4 text-base leading-relaxed text-[#45596B]">{description}</p>
                                )}
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Link href={route('mediatheque')} className="rounded-xl border border-[#DCE6EF] bg-white px-4 py-2 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]">
                                        ← Retour à la médiathèque
                                    </Link>
                                    {item.type === 'poster' && item.file_url && (
                                        <a href={item.file_url} target="_blank"
                                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                            Télécharger l'affiche
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Related */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-3xl border border-[#DCE6EF] bg-white p-5 shadow-sm">
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#7B92A8]">
                                    {isRtl ? 'وسائط ذات صلة' : 'Médias similaires'}
                                </h3>
                                {related.length > 0 ? (
                                    <div className="space-y-3">
                                        {related.map((r) => {
                                            const rTitle = isRtl && r.title_ar ? r.title_ar : r.title_fr;
                                            return (
                                                <Link key={r.id} href={route('mediatheque.show', r.id)}
                                                    className="group flex gap-3 rounded-2xl p-2 transition hover:bg-[#F8FBFD]">
                                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#E8F1F8]">
                                                        {r.type === 'video' && r.video_id ? (
                                                            <div className="relative h-full w-full">
                                                                <img src={`https://img.youtube.com/vi/${r.video_id}/default.jpg`} alt="" className="h-full w-full object-cover" />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80">
                                                                        <svg className="ml-0.5 h-3 w-3 text-[#0F4C81]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : r.file_url ? (
                                                            <img src={r.file_url} alt="" className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center text-lg">{typeIcons[r.type]}</div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-semibold text-[#13243A] line-clamp-2 group-hover:text-[#0F4C81] transition">{rTitle}</p>
                                                        <p className="text-xs text-[#7B92A8]">{typeLabels[r.type]}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[#5C7184]">Aucun média similaire.</p>
                                )}

                                {/* Back to gallery */}
                                <div className="mt-5 border-t border-[#DCE6EF] pt-5">
                                    <Link href={route('mediatheque')}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRtl ? 'M19 12H5m14 0l-4 4m4-4l-4-4' : 'M5 12h14m-14 0l4 4m-4-4l4-4'} /></svg>
                                        Voir toute la galerie
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
