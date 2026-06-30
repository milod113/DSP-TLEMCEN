import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import PageHero from '../../Components/PageHero';

export default function MediaIndex({ items, categories, filters }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isRtl = locale === 'ar';
    const [lightbox, setLightbox] = useState(null);
    const [activeCategory, setActiveCategory] = useState(filters?.categorie || '');
    const [activeType, setActiveType] = useState(filters?.type || '');

    const typeLabels = { image: 'Image', video: 'Vidéo', poster: 'Affiche' };
    const typeIcons = { image: '🖼️', video: '🎬', poster: '📄' };
    const categoryLabels = {
        campagnes: 'Campagnes', visites: 'Visites institutionnelles',
        evenements: 'Événements', annonces: 'Annonces publiques',
    };

    const filterItems = (type, cat) => {
        const t = type || '';
        const c = cat || '';
        setActiveType(t);
        setActiveCategory(c);
        router.get(route('mediatheque'), { type: t, categorie: c }, { preserveState: true });
    };

    const itemIsVideo = (item) => item.type === 'video' && item.video_id;
    const itemIsPoster = (item) => item.type === 'poster' && item.file_url;
    const itemIsImage = (item) => item.type === 'image' && item.file_url;

    return (
        <>
            <Head title="Médiathèque" />

            <PageHero
                title="Médiathèque"
                description="Galerie d'images, vidéos et affiches des campagnes, visites et événements de la DSP Tlemcen"
                badge="Média"
            />

            <div className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
                <div className="-mt-6 relative z-10 space-y-6">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => filterItems('', activeCategory)}
                                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${!activeType ? 'bg-[#0F4C81] text-white shadow-md' : 'bg-white border border-[#DCE6EF] text-[#334155] hover:bg-[#F8FBFD]'}`}>
                                Tout
                            </button>
                            {['image', 'video', 'poster'].map((t) => (
                                <button key={t} onClick={() => filterItems(t, activeCategory)}
                                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${activeType === t ? 'bg-[#0F4C81] text-white shadow-md' : 'bg-white border border-[#DCE6EF] text-[#334155] hover:bg-[#F8FBFD]'}`}>
                                    {typeIcons[t]} {typeLabels[t]}
                                </button>
                            ))}
                        </div>
                        <div className="h-6 w-px bg-[#DCE6EF]" />
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => filterItems(activeType, '')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${!activeCategory ? 'bg-[#0F4C81]/10 text-[#0F4C81]' : 'bg-[#F0F4F9] text-[#45596B] hover:bg-[#E8EEF4]'}`}>
                                Tout
                            </button>
                            {categories?.map((c) => (
                                <button key={c} onClick={() => filterItems(activeType, c)}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${activeCategory === c ? 'bg-[#0F4C81]/10 text-[#0F4C81]' : 'bg-[#F0F4F9] text-[#45596B] hover:bg-[#E8EEF4]'}`}>
                                    {categoryLabels[c] || c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    {items?.data?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {items.data.map((item) => (
                                <div key={item.id} className="group overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white transition hover:shadow-lg hover:-translate-y-1">
                                    {/* Preview */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E8F1F8] cursor-pointer" onClick={() => setLightbox(item)}>
                                        {itemIsImage(item) ? (
                                            <img src={item.file_url} alt={item.title_fr} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        ) : itemIsVideo(item) ? (
                                            <>
                                                <img src={`https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
                                                        <svg className="ml-1 h-6 w-6 text-[#0F4C81]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                    </div>
                                                </div>
                                            </>
                                        ) : itemIsPoster(item) ? (
                                            <img src={item.file_url} alt={item.title_fr} className="h-full w-full object-contain p-4" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-4xl text-[#7FA8C9]">{typeIcons[item.type]}</div>
                                        )}
                                        {item.categorie && (
                                            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#0F4C81] shadow-sm">
                                                {categoryLabels[item.categorie] || item.categorie}
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className="text-xs">{typeIcons[item.type]}</span>
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7B92A8]">{typeLabels[item.type]}</span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-[#13243A] line-clamp-2">{isRtl && item.title_ar ? item.title_ar : item.title_fr}</h3>
                                        {item.description_fr && (
                                            <p className="mt-1 text-xs text-[#5C7184] line-clamp-2">{item.description_fr}</p>
                                        )}
                                        <div className="mt-3 flex items-center gap-2">
                                            <button onClick={() => setLightbox(item)} className="text-xs font-medium text-[#0F4C81] hover:text-[#0A2540] transition">
                                                {itemIsVideo(item) ? 'Regarder' : 'Voir'}
                                            </button>
                                            {itemIsPoster(item) && (
                                                <a href={item.file_url} target="_blank" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition">
                                                    Télécharger ↓
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F9FB] text-3xl">📸</div>
                            <p className="text-[#5C7184]">Aucun média trouvé.</p>
                        </div>
                    )}

                    {items?.links && (
                        <div className="flex justify-center gap-2">
                            {items.links.map((link, i) => (
                                <button key={i} type="button" onClick={() => link.url && router.get(link.url)}
                                    className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm transition ${
                                        link.active ? 'bg-[#0F4C81] text-white' : link.url ? 'border border-[#DCE6EF] bg-white text-[#334155] hover:bg-[#F8FBFD]' : 'cursor-not-allowed border border-[#EDF2F7] bg-[#F8FBFD] text-[#94A3B8]'
                                    }`} dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 px-4 py-8" onClick={() => setLightbox(null)}>
                    <div className="relative max-h-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setLightbox(null)} className="absolute right-4 top-4 z-10 rounded-xl bg-white/90 px-3 py-2 text-sm font-medium text-[#64748B] shadow-sm hover:bg-white">Fermer</button>

                        {itemIsImage(lightbox) && (
                            <img src={lightbox.file_url} alt={lightbox.title_fr} className="max-h-[70vh] w-full rounded-2xl object-contain" />
                        )}
                        {itemIsVideo(lightbox) && (
                            <div className="aspect-video w-[800px] max-w-full rounded-2xl overflow-hidden">
                                <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${lightbox.video_id}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
                            </div>
                        )}
                        {itemIsPoster(lightbox) && (
                            <img src={lightbox.file_url} alt={lightbox.title_fr} className="max-h-[70vh] w-full rounded-2xl object-contain" />
                        )}

                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-[#13243A]">{lightbox.title_fr}</h3>
                            <p className="mt-1 text-sm text-[#5C7184]">{lightbox.description_fr}</p>
                            {lightbox.type === 'poster' && (
                                <a href={lightbox.file_url} target="_blank" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Télécharger l'affiche
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
