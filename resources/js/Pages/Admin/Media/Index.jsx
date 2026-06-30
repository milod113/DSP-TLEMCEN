import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminMediaIndex({ items, filters }) {
    const { errors } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailItem, setDetailItem] = useState(null);
    const [editing, setEditing] = useState(null);
    const [file, setFile] = useState(null);
    const [thumbFile, setThumbFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [thumbPreview, setThumbPreview] = useState(null);
    const [form, setForm] = useState({
        type: 'image', title_fr: '', title_ar: '', description_fr: '', description_ar: '',
        file_path: '', video_url: '', thumbnail: '', categorie: '', sort_order: 0, is_published: true,
    });

    const typeLabels = { image: 'Image', video: 'Vidéo', poster: 'Affiche' };
    const typeIcons = { image: '🖼️', video: '🎬', poster: '📄' };

    const openEdit = (item) => {
        setEditing(item);
        setFile(null);
        setThumbFile(null);
        setPreview(null);
        setThumbPreview(null);
        setForm({
            type: item.type, title_fr: item.title_fr || '', title_ar: item.title_ar || '',
            description_fr: item.description_fr || '', description_ar: item.description_ar || '',
            file_path: item.file_path || '', video_url: item.video_url || '',
            thumbnail: item.thumbnail || '', categorie: item.categorie || '',
            sort_order: item.sort_order ?? 0, is_published: item.is_published ?? true,
        });
        setModalOpen(true);
    };

    const openCreate = () => {
        setEditing(null);
        setFile(null);
        setThumbFile(null);
        setPreview(null);
        setThumbPreview(null);
        setForm({ type: 'image', title_fr: '', title_ar: '', description_fr: '', description_ar: '', file_path: '', video_url: '', thumbnail: '', categorie: '', sort_order: 0, is_published: true });
        setModalOpen(true);
    };

    const openDetail = (item) => {
        setDetailItem(item);
        setDetailOpen(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e, isThumb) => {
        const f = e.target.files[0];
        if (!f) return;
        if (isThumb) {
            setThumbFile(f);
            setThumbPreview(URL.createObjectURL(f));
        } else {
            setFile(f);
            setPreview(URL.createObjectURL(f));
            setForm((prev) => ({ ...prev, file_path: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === 'is_published') {
                payload.append(key, value ? '1' : '0');
            } else {
                payload.append(key, value);
            }
        });
        if (file) payload.append('file', file);
        if (thumbFile) payload.append('thumb', thumbFile);

        if (editing) {
            payload.append('_method', 'PUT');
            router.post(route('admin.media.update', editing.id), payload, { onSuccess: () => setModalOpen(false) });
        } else {
            router.post(route('admin.media.store'), payload, { onSuccess: () => setModalOpen(false) });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Supprimer ce média ?')) {
            router.delete(route('admin.media.destroy', id));
        }
    };

    const filterBy = (key, value) => {
        router.get(route('admin.media.index'), { ...filters, [key]: value || '' });
    };

    return (
        <>
            <Head title="Administration - Médiathèque" />
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Médiathèque</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Galerie média</h1>
                        <p className="mt-2 text-sm text-[#5C7184]">Images, vidéos et affiches des campagnes et événements.</p>
                    </div>
                    <button onClick={openCreate} className="inline-flex items-center justify-center rounded-2xl bg-[#0F4C81] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                        + Nouveau média
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    <select value={filters?.type || ''} onChange={(e) => filterBy('type', e.target.value)}
                        className="rounded-xl border border-[#DCE6EF] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F4C81]">
                        <option value="">Tous les types</option>
                        <option value="image">Images</option>
                        <option value="video">Vidéos</option>
                        <option value="poster">Affiches</option>
                    </select>
                    <select value={filters?.categorie || ''} onChange={(e) => filterBy('categorie', e.target.value)}
                        className="rounded-xl border border-[#DCE6EF] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F4C81]">
                        <option value="">Toutes les catégories</option>
                        <option value="campagnes">Campagnes</option>
                        <option value="visites">Visites institutionnelles</option>
                        <option value="evenements">Événements</option>
                        <option value="annonces">Annonces publiques</option>
                    </select>
                </div>

                {/* Grid */}
                <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                    {items?.data?.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {items.data.map((item) => (
                                <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-[#F8FBFD] transition hover:shadow-md">
                                    <button onClick={() => openDetail(item)} className="block w-full text-left">
                                        <div className="aspect-[4/3] overflow-hidden bg-[#E8F1F8]">
                                            {item.type === 'image' && item.file_url ? (
                                                <img src={item.file_url} alt={item.title_fr} className="h-full w-full object-cover transition group-hover:scale-105" />
                                            ) : item.type === 'video' && item.thumbnail_url ? (
                                                <img src={item.thumbnail_url} alt={item.title_fr} className="h-full w-full object-cover transition group-hover:scale-105" />
                                            ) : item.type === 'video' && item.video_id ? (
                                                <img src={`https://img.youtube.com/vi/${item.video_id}/mqdefault.jpg`} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-3xl text-[#7FA8C9]">{typeIcons[item.type]}</div>
                                            )}
                                            {item.type === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                                                        <svg className="ml-0.5 h-5 w-5 text-[#0F4C81]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="text-xs">{typeIcons[item.type]}</span>
                                                <span className="text-[10px] font-medium text-[#7B92A8] uppercase">{typeLabels[item.type]}</span>
                                                {item.categorie && <span className="text-[10px] bg-[#F0F4F9] text-[#45596B] px-1.5 py-0.5 rounded">{item.categorie}</span>}
                                            </div>
                                            <p className="text-xs font-medium text-[#13243A] line-clamp-2">{item.title_fr}</p>
                                            {!item.is_published && (
                                                <span className="mt-1 inline-block text-[10px] text-amber-600 font-medium">Brouillon</span>
                                            )}
                                        </div>
                                    </button>
                                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                                        <button onClick={() => openEdit(item)} className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-[#0F4C81] shadow-sm hover:bg-white">Modifier</button>
                                        <button onClick={() => handleDelete(item.id)} className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-red-600 shadow-sm hover:bg-white">Suppr.</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center text-sm text-[#7B92A8]">Aucun média trouvé.</div>
                    )}
                </div>

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

            {/* Detail modal */}
            {detailOpen && detailItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/55 px-4" onClick={() => setDetailOpen(false)}>
                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_30px_60px_-24px_rgba(2,6,23,0.35)]" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <button onClick={() => setDetailOpen(false)} className="mb-4 rounded-xl border border-[#DCE6EF] px-3 py-2 text-sm text-[#64748B] transition hover:bg-[#F8FBFD]">Fermer</button>
                            {detailItem.type === 'image' && detailItem.file_url && (
                                <img src={detailItem.file_url} alt={detailItem.title_fr} className="w-full rounded-2xl" />
                            )}
                            {detailItem.type === 'video' && detailItem.video_id && (
                                <div className="aspect-video overflow-hidden rounded-2xl">
                                    <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${detailItem.video_id}`} allowFullScreen />
                                </div>
                            )}
                            {detailItem.type === 'poster' && detailItem.file_url && (
                                <img src={detailItem.file_url} alt={detailItem.title_fr} className="w-full rounded-2xl" />
                            )}
                            <div className="mt-4">
                                <h3 className="text-lg font-bold text-[#13243A]">{detailItem.title_fr}</h3>
                                <p className="text-sm text-[#5C7184] mt-1">{detailItem.description_fr}</p>
                                {detailItem.file_url && detailItem.type === 'poster' && (
                                    <a href={detailItem.file_url} target="_blank" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-2 text-sm text-white">Télécharger l'affiche</a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/55 px-4" onClick={() => setModalOpen(false)}>
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_30px_60px_-24px_rgba(2,6,23,0.35)]" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Edition média</p>
                                <h2 className="mt-2 text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                    {editing ? 'Modifier le média' : 'Nouveau média'}
                                </h2>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="rounded-xl border border-[#DCE6EF] px-3 py-2 text-sm text-[#64748B] transition hover:bg-[#F8FBFD]">Fermer</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                            {errors && Object.values(errors).map((err, i) => (
                                err ? <div key={i} className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div> : null
                            ))}

                            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                                <div className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Titre (FR) *</label>
                                            <input type="text" name="title_fr" value={form.title_fr} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Titre (AR)</label>
                                            <input type="text" name="title_ar" value={form.title_ar} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Description (FR)</label>
                                        <textarea name="description_fr" value={form.description_fr} onChange={handleChange} rows="3" className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Description (AR)</label>
                                        <textarea name="description_ar" value={form.description_ar} onChange={handleChange} rows="3" className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Type & Publication</p>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-[#334155]">Type *</label>
                                                <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]">
                                                    <option value="image">Image</option>
                                                    <option value="video">Vidéo</option>
                                                    <option value="poster">Affiche</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-[#334155]">Catégorie</label>
                                                <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]">
                                                    <option value="">—</option>
                                                    <option value="campagnes">Campagnes</option>
                                                    <option value="visites">Visites institutionnelles</option>
                                                    <option value="evenements">Événements</option>
                                                    <option value="annonces">Annonces publiques</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-[#334155]">Ordre</label>
                                                <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                            </div>
                                            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#334155]">
                                                <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="rounded border-[#CBD5E1] text-[#0F4C81] focus:ring-[#0F4C81]" />
                                                Publier
                                            </label>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">
                                            {form.type === 'video' ? 'URL Vidéo' : 'Fichier'}
                                        </p>
                                        <div className="mt-4 space-y-4">
                                            {form.type === 'video' ? (
                                                <div>
                                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">URL YouTube</label>
                                                    <input type="text" name="video_url" value={form.video_url} onChange={handleChange} placeholder="https://youtube.com/watch?v=..."
                                                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                                </div>
                                            ) : (
                                                <div>
                                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Uploader un fichier</label>
                                                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFileChange(e, false)}
                                                        className="w-full text-sm text-[#64748B] file:mr-4 file:rounded-xl file:border-0 file:bg-[#E8F1F8] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-[#0F4C81] hover:file:bg-[#D8E8F5]" />
                                                    {preview ? (
                                                        <div className="mt-3 overflow-hidden rounded-xl border border-[#DCE6EF]">
                                                            <img src={preview} alt="" className="h-40 w-full object-cover" />
                                                        </div>
                                                    ) : form.file_path ? (
                                                        <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#F0F4F9] px-3 py-2 text-xs text-[#45596B]">
                                                            <span>📁 {form.file_path}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="mt-3 flex h-24 items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] text-xs text-[#94A3B8]">
                                                            Aucun fichier sélectionné
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-[#334155]">Miniature (optionnelle)</label>
                                                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFileChange(e, true)}
                                                    className="w-full text-sm text-[#64748B] file:mr-4 file:rounded-xl file:border-0 file:bg-[#E8F1F8] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-[#0F4C81] hover:file:bg-[#D8E8F5]" />
                                                {thumbPreview ? (
                                                    <div className="mt-3 overflow-hidden rounded-xl border border-[#DCE6EF]">
                                                        <img src={thumbPreview} alt="" className="h-24 w-full object-cover" />
                                                    </div>
                                                ) : form.thumbnail ? (
                                                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#F0F4F9] px-3 py-2 text-xs text-[#45596B]">
                                                        <span>📁 {form.thumbnail}</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Actions</p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                                                {editing ? 'Mettre à jour' : 'Créer'}
                                            </button>
                                            <button type="button" onClick={() => setModalOpen(false)} className="inline-flex items-center justify-center rounded-xl border border-[#DCE6EF] bg-white px-6 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]">
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

AdminMediaIndex.layout = (page) => <AdminLayout children={page} />;
