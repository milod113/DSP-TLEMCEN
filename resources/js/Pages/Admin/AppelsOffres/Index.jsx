import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminAppelsOffresIndex({ items }) {
    const { errors } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        titre_fr: '',
        titre_ar: '',
        description_fr: '',
        description_ar: '',
        type: 'appel_offres',
        fichier: '',
        date_limite: '',
        date_publication: '',
        is_published: false,
    });

    const typeLabels = {
        appel_offres: "Appel d'offres",
        recrutement: 'Recrutement',
        concours: 'Concours',
        resultat: 'Resultat',
    };

    const typeColors = {
        appel_offres: 'bg-blue-100 text-blue-700',
        recrutement: 'bg-indigo-100 text-indigo-700',
        concours: 'bg-purple-100 text-purple-700',
        resultat: 'bg-emerald-100 text-emerald-700',
    };

    const openEdit = (item) => {
        setEditing(item);
        setForm({
            titre_fr: item.titre_fr || '',
            titre_ar: item.titre_ar || '',
            description_fr: item.description_fr || '',
            description_ar: item.description_ar || '',
            type: item.type || 'appel_offres',
            fichier: item.fichier || '',
            date_limite: item.date_limite?.substring(0, 10) || '',
            date_publication: item.date_publication?.substring(0, 10) || '',
            is_published: item.is_published ?? false,
        });
        setModalOpen(true);
    };

    const openCreate = () => {
        setEditing(null);
        setForm({
            titre_fr: '',
            titre_ar: '',
            description_fr: '',
            description_ar: '',
            type: 'appel_offres',
            fichier: '',
            date_limite: '',
            date_publication: new Date().toISOString().substring(0, 10),
            is_published: false,
        });
        setModalOpen(true);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editing) {
            router.put(route('admin.appels-offres.update', editing.id), form, {
                onSuccess: () => setModalOpen(false),
            });
        } else {
            router.post(route('admin.appels-offres.store'), form, {
                onSuccess: () => setModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Supprimer cet element ?')) {
            router.delete(route('admin.appels-offres.destroy', id));
        }
    };

    return (
        <>
            <Head title="Administration - Appels d'offres" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Marches publics</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            Appels d'offres
                        </h1>
                        <p className="mt-2 text-sm text-[#5C7184]">
                            Publie et gere les offres, concours, resultats et recrutements.
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center justify-center rounded-2xl bg-[#0F4C81] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]"
                    >
                        + Nouvel element
                    </button>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px] text-sm">
                            <thead>
                                <tr className="border-b border-[#E8EEF4] bg-[#F8FBFD] text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">
                                    <th className="px-6 py-4">Publication</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Date publication</th>
                                    <th className="px-6 py-4">Date limite</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EDF2F7]">
                                {items?.data?.length ? items.data.map((item) => (
                                    <tr key={item.id} className="transition hover:bg-[#FAFCFE]">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-[#13243A]">{item.titre_fr}</div>
                                            <div className="mt-1 line-clamp-1 text-sm text-[#5C7184]">{item.description_fr}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${typeColors[item.type] || 'bg-slate-100 text-slate-700'}`}>
                                                {typeLabels[item.type] || item.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#5C7184]">{item.date_publication?.substring(0, 10)}</td>
                                        <td className="px-6 py-4 text-[#5C7184]">{item.date_limite?.substring(0, 10) || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${item.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {item.is_published ? 'Publie' : 'Brouillon'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(item)}
                                                    className="rounded-xl border border-[#DCE6EF] px-3 py-2 text-xs font-medium text-[#0F4C81] transition hover:border-[#0F4C81] hover:bg-[#F8FBFD]"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center text-sm text-[#7B92A8]">
                                            Aucun element trouve.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {items?.links && (
                    <div className="flex justify-center gap-2">
                        {items.links.map((link, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => link.url && router.get(link.url)}
                                className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm transition ${
                                    link.active
                                        ? 'bg-[#0F4C81] text-white'
                                        : link.url
                                            ? 'border border-[#DCE6EF] bg-white text-[#334155] hover:bg-[#F8FBFD]'
                                            : 'cursor-not-allowed border border-[#EDF2F7] bg-[#F8FBFD] text-[#94A3B8]'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/55 px-4" onClick={() => setModalOpen(false)}>
                    <div
                        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_30px_60px_-24px_rgba(2,6,23,0.35)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Edition</p>
                                <h2 className="mt-2 text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                    {editing ? 'Modifier la publication' : 'Nouvelle publication'}
                                </h2>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="rounded-xl border border-[#DCE6EF] px-3 py-2 text-sm text-[#64748B] transition hover:bg-[#F8FBFD]">
                                Fermer
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errors && Object.values(errors).map((error, index) => (
                                error ? <div key={index} className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null
                            ))}

                            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                                <div className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Titre (FR) *</label>
                                            <input type="text" name="titre_fr" value={form.titre_fr} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Titre (AR)</label>
                                            <input type="text" name="titre_ar" value={form.titre_ar} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Description (FR)</label>
                                        <textarea name="description_fr" value={form.description_fr} onChange={handleChange} rows="4" className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Description (AR)</label>
                                        <textarea name="description_ar" value={form.description_ar} onChange={handleChange} rows="4" className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Publication</p>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-[#334155]">Type *</label>
                                                <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]">
                                                    <option value="appel_offres">Appel d'offres</option>
                                                    <option value="recrutement">Recrutement</option>
                                                    <option value="concours">Concours</option>
                                                    <option value="resultat">Resultat</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-[#334155]">Date publication</label>
                                                <input type="date" name="date_publication" value={form.date_publication} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-[#334155]">Date limite</label>
                                                <input type="date" name="date_limite" value={form.date_limite} onChange={handleChange} className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                            </div>
                                            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#334155]">
                                                <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="rounded border-[#CBD5E1] text-[#0F4C81] focus:ring-[#0F4C81]" />
                                                Publier cet élément
                                            </label>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Fichier</p>
                                        <div className="mt-4">
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">URL du fichier</label>
                                            <input type="text" name="fichier" value={form.fichier} onChange={handleChange} placeholder="/storage/appels-offres/..." className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
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

AdminAppelsOffresIndex.layout = (page) => <AdminLayout children={page} />;
