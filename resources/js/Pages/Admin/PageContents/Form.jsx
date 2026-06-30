import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminPageContentForm({ content }) {
    const { errors } = usePage().props;

    const [valueFr, setValueFr] = useState(content.value_fr || '');
    const [valueAr, setValueAr] = useState(content.value_ar || '');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        content.value_fr ? (content.value_fr.startsWith('http') ? content.value_fr : `/storage/${content.value_fr}`) : null
    );

    const isLong = content.type === 'html' || content.type === 'list_json' || (valueFr && valueFr.length > 200);
    const isImage = content.type === 'image';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isImage) {
            const payload = new FormData();
            payload.append('_method', 'PUT');
            payload.append('value_fr', valueFr);
            payload.append('value_ar', valueAr);

            if (imageFile) {
                payload.append('image', imageFile);
            }

            router.post(route('admin.page-contents.update', content.id), payload);
            return;
        }

        router.put(route('admin.page-contents.update', content.id), {
            value_fr: valueFr,
            value_ar: valueAr,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <>
            <Head title="Modifier le contenu" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Edition contenu</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            Modifier le contenu
                        </h1>
                        <p className="mt-1 font-mono text-xs text-[#94A3B8]">{content.key}</p>
                    </div>
                    <Link
                        href={route('admin.page-contents.index')}
                        className="inline-flex items-center justify-center rounded-2xl border border-[#DCE6EF] bg-white px-5 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]"
                    >
                        Retour a la liste
                    </Link>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)] md:p-8">
                    <div className="mb-6 flex items-center gap-2">
                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">{content.label_fr}</span>
                        {content.label_ar && (
                            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">{content.label_ar}</span>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {errors && Object.values(errors).map((error, index) => (
                            error ? <div key={index} className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null
                        ))}

                        {isImage ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Image du directeur</label>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleImageChange}
                                        className="w-full text-sm text-[#64748B] file:mr-4 file:rounded-xl file:border-0 file:bg-[#E8F1F8] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-[#0F4C81] hover:file:bg-[#D8E8F5]"
                                    />
                                </div>

                                {imagePreview ? (
                                    <div className="overflow-hidden rounded-2xl border border-[#DCE6EF] bg-[#F8FBFD] p-3">
                                        <img src={imagePreview} alt="Apercu directeur" className="h-72 w-full rounded-xl object-cover" />
                                    </div>
                                ) : (
                                    <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FBFD] text-sm text-[#94A3B8]">
                                        Aucune image selectionnee
                                    </div>
                                )}

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Chemin ou URL</label>
                                    <input
                                        type="text"
                                        value={valueFr}
                                        onChange={(e) => {
                                            setValueFr(e.target.value);
                                            setValueAr(e.target.value);
                                        }}
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        placeholder="page-contents/directeur.jpg ou https://..."
                                    />
                                    <p className="mt-2 text-xs text-[#7B92A8]">
                                        Si vous importez une image, ce champ sera mis a jour automatiquement.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Francais</label>
                                    {isLong ? (
                                        <textarea
                                            value={valueFr}
                                            onChange={(e) => setValueFr(e.target.value)}
                                            rows="6"
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={valueFr}
                                            onChange={(e) => setValueFr(e.target.value)}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Arabe</label>
                                    {isLong ? (
                                        <textarea
                                            value={valueAr}
                                            onChange={(e) => setValueAr(e.target.value)}
                                            rows="6"
                                            dir="rtl"
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={valueAr}
                                            onChange={(e) => setValueAr(e.target.value)}
                                            className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]"
                                        />
                                    )}
                                </div>
                            </>
                        )}

                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]"
                            >
                                Enregistrer
                            </button>
                            <Link
                                href={route('admin.page-contents.index')}
                                className="inline-flex items-center justify-center rounded-xl border border-[#DCE6EF] bg-white px-6 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]"
                            >
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

AdminPageContentForm.layout = (page) => <AdminLayout children={page} />;
