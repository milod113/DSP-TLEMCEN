import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminFaqsForm({ faq }) {
    const { errors } = usePage().props;
    const isEdit = !!faq;

    const [form, setForm] = useState({
        question_fr: faq?.question_fr || '',
        question_ar: faq?.question_ar || '',
        answer_fr: faq?.answer_fr || '',
        answer_ar: faq?.answer_ar || '',
        categorie: faq?.categorie || '',
        sort_order: faq?.sort_order ?? 0,
        is_published: faq?.is_published ?? true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            router.put(route('admin.faqs.update', faq.id), form);
        } else {
            router.post(route('admin.faqs.store'), form);
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Modifier FAQ' : 'Nouvelle FAQ'} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Edition FAQ</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {isEdit ? 'Modifier FAQ' : 'Nouvelle FAQ'}
                        </h1>
                        <p className="mt-2 text-sm text-[#5C7184]">
                            {isEdit ? 'Modifiez la question et la réponse.' : 'Ajoutez une nouvelle question fréquente.'}
                        </p>
                    </div>
                    <Link href={route('admin.faqs.index')}
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
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Question (FR) *</label>
                                        <input type="text" name="question_fr" value={form.question_fr} onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Question (AR)</label>
                                        <input type="text" name="question_ar" value={form.question_ar} onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Réponse (FR) *</label>
                                    <textarea name="answer_fr" value={form.answer_fr} onChange={handleChange} rows="6"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Réponse (AR)</label>
                                    <textarea name="answer_ar" value={form.answer_ar} onChange={handleChange} rows="6"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Publication</p>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Catégorie</label>
                                            <input type="text" name="categorie" value={form.categorie} onChange={handleChange} placeholder="ex: Soins, Vaccination"
                                                className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                        </div>
                                        <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#334155]">
                                            <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange}
                                                className="rounded border-[#CBD5E1] text-[#0F4C81] focus:ring-[#0F4C81]" />
                                            Publier cette FAQ
                                        </label>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Ordre</p>
                                    <div className="mt-4">
                                        <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Actions</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button type="submit"
                                            className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                                            {isEdit ? 'Mettre à jour' : 'Créer'}
                                        </button>
                                        <Link href={route('admin.faqs.index')}
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

AdminFaqsForm.layout = (page) => <AdminLayout children={page} />;
