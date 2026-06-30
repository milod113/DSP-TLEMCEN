import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminArticlesForm({ article }) {
    const { errors } = usePage().props;
    const isEdit = Boolean(article);

    const [form, setForm] = useState({
        title_fr: article?.title_fr || '',
        title_ar: article?.title_ar || '',
        content_fr: article?.content_fr || '',
        content_ar: article?.content_ar || '',
        category: article?.category || '',
        is_published: article?.is_published ?? false,
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(article?.image ? `/storage/${article.image}` : null);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === 'is_published') {
                payload.append(key, value ? '1' : '0');
            } else {
                payload.append(key, value);
            }
        });

        if (image) payload.append('image', image);

        if (isEdit) {
            payload.append('_method', 'PUT');
            router.post(route('admin.articles.update', article.id), payload);
        } else {
            router.post(route('admin.articles.store'), payload);
        }
    };

    return (
        <>
            <Head title={isEdit ? "Modifier l'article" : 'Nouvel article'} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Edition contenu</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {isEdit ? "Modifier l'article" : 'Nouvel article'}
                        </h1>
                        <p className="mt-2 text-sm text-[#5C7184]">
                            Redige, structure et publie un article sur toute la largeur disponible.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('admin.articles.index')}
                            className="inline-flex items-center justify-center rounded-2xl border border-[#DCE6EF] bg-white px-5 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]"
                        >
                            Retour a la liste
                        </Link>
                    </div>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)] md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {errors && Object.values(errors).map((error, index) => (
                            error ? (
                                <div key={index} className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            ) : null
                        ))}

                        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Titre (FR)</label>
                                        <input
                                            type="text"
                                            name="title_fr"
                                            value={form.title_fr}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Titre (AR)</label>
                                        <input
                                            type="text"
                                            name="title_ar"
                                            value={form.title_ar}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Contenu (FR)</label>
                                    <textarea
                                        name="content_fr"
                                        value={form.content_fr}
                                        onChange={handleChange}
                                        rows="14"
                                        className="w-full rounded-2xl border border-[#DCE6EF] px-4 py-4 text-sm leading-7 outline-none focus:border-[#0F4C81]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Contenu (AR)</label>
                                    <textarea
                                        name="content_ar"
                                        value={form.content_ar}
                                        onChange={handleChange}
                                        rows="14"
                                        className="w-full rounded-2xl border border-[#DCE6EF] px-4 py-4 text-sm leading-7 outline-none focus:border-[#0F4C81]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Publication</p>
                                    <div className="mt-4">
                                        <label className="mb-1.5 block text-sm font-medium text-[#334155]">Categorie</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#DCE6EF] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        />
                                    </div>

                                    <label className="mt-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#334155]">
                                        <input
                                            type="checkbox"
                                            name="is_published"
                                            checked={form.is_published}
                                            onChange={handleChange}
                                            className="rounded border-[#CBD5E1] text-[#0F4C81] focus:ring-[#0F4C81]"
                                        />
                                        Publier cet article
                                    </label>
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Image</p>
                                    <div className="mt-4">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleImage}
                                            className="w-full text-sm text-[#64748B] file:mr-4 file:rounded-xl file:border-0 file:bg-[#E8F1F8] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-[#0F4C81] hover:file:bg-[#D8E8F5]"
                                        />
                                    </div>

                                    {preview ? (
                                        <div className="mt-4 overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white">
                                            <img src={preview} alt="Apercu" className="h-64 w-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="mt-4 flex h-48 items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-white text-sm text-[#94A3B8]">
                                            Aucun visuel selectionne
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Actions</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]"
                                        >
                                            {isEdit ? 'Mettre a jour' : 'Creer'}
                                        </button>
                                        <Link
                                            href={route('admin.articles.index')}
                                            className="inline-flex items-center justify-center rounded-xl border border-[#DCE6EF] bg-white px-6 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]"
                                        >
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

AdminArticlesForm.layout = (page) => <AdminLayout children={page} />;
