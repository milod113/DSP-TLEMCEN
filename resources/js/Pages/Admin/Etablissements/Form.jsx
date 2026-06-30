import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminEtablissementsForm({ etablissement }) {
    const { errors } = usePage().props;
    const isEdit = !!etablissement;

    const [form, setForm] = useState({
        nom_fr: etablissement?.nom_fr || '',
        nom_ar: etablissement?.nom_ar || '',
        type: etablissement?.type || '',
        adresse_fr: etablissement?.adresse_fr || '',
        adresse_ar: etablissement?.adresse_ar || '',
        telephone: etablissement?.telephone || '',
        email: etablissement?.email || '',
        specialites_fr: etablissement?.specialites_fr || '',
        specialites_ar: etablissement?.specialites_ar || '',
        horaires: etablissement?.horaires || '',
        latitude: etablissement?.latitude || '',
        longitude: etablissement?.longitude || '',
        responsable: etablissement?.responsable || '',
        is_active: etablissement?.is_active ?? true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            router.put(route('admin.etablissements.update', etablissement.id), form);
        } else {
            router.post(route('admin.etablissements.store'), form);
        }
    };

    return (
        <>
            <Head title={isEdit ? "Modifier l'établissement" : 'Nouvel établissement'} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Edition établissement</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {isEdit ? "Modifier l'établissement" : 'Nouvel établissement'}
                        </h1>
                        <p className="mt-2 text-sm text-[#5C7184]">
                            {isEdit ? "Modifiez les informations de l'établissement de santé." : 'Ajoutez un nouvel établissement de santé.'}
                        </p>
                    </div>
                    <Link href={route('admin.etablissements.index')}
                        className="inline-flex items-center justify-center rounded-2xl border border-[#DCE6EF] bg-white px-5 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]">
                        Retour à la liste
                    </Link>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)] md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors && Object.values(errors).map((error, index) => (
                            error ? <div key={index} className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null
                        ))}

                        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Nom (FR) *</label>
                                        <input type="text" name="nom_fr" value={form.nom_fr} onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Nom (AR)</label>
                                        <input type="text" name="nom_ar" value={form.nom_ar} onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Type *</label>
                                    <input type="text" name="type" value={form.type} onChange={handleChange} placeholder="ex: CHU, EPSP, EHS..."
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Adresse (FR) *</label>
                                    <textarea name="adresse_fr" value={form.adresse_fr} onChange={handleChange} rows="3"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Adresse (AR)</label>
                                    <textarea name="adresse_ar" value={form.adresse_ar} onChange={handleChange} rows="3"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Téléphone</label>
                                        <input type="text" name="telephone" value={form.telephone} onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Email</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Spécialités (FR)</label>
                                    <textarea name="specialites_fr" value={form.specialites_fr} onChange={handleChange} rows="3"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Spécialités (AR)</label>
                                    <textarea name="specialites_ar" value={form.specialites_ar} onChange={handleChange} rows="3"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Statut</p>
                                    <div className="mt-4">
                                        <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#334155]">
                                            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange}
                                                className="rounded border-[#CBD5E1] text-[#0F4C81] focus:ring-[#0F4C81]" />
                                            Établissement actif
                                        </label>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Coordonnées GPS</p>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Latitude</label>
                                            <input type="text" name="latitude" value={form.latitude} onChange={handleChange}
                                                className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Longitude</label>
                                            <input type="text" name="longitude" value={form.longitude} onChange={handleChange}
                                                className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Informations</p>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Horaires</label>
                                            <input type="text" name="horaires" value={form.horaires} onChange={handleChange}
                                                className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Responsable</label>
                                            <input type="text" name="responsable" value={form.responsable} onChange={handleChange}
                                                className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Actions</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button type="submit"
                                            className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                                            {isEdit ? 'Mettre à jour' : 'Créer'}
                                        </button>
                                        <Link href={route('admin.etablissements.index')}
                                            className="inline-flex items-center justify-center rounded-xl border border-[#DCE6EF] bg-white px-6 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]">
                                            Annuler
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

AdminEtablissementsForm.layout = (page) => <AdminLayout children={page} />;
