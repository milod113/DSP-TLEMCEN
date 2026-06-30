import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminPageContentForm({ content }) {
    const { errors } = usePage().props;

    const [valueFr, setValueFr] = useState(content.value_fr || '');
    const [valueAr, setValueAr] = useState(content.value_ar || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('admin.page-contents.update', content.id), {
            value_fr: valueFr,
            value_ar: valueAr,
        });
    };

    const isLong = content.type === 'html' || (valueFr && valueFr.length > 200);

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
                        <p className="mt-1 text-xs text-[#94A3B8] font-mono">{content.key}</p>
                    </div>
                    <Link href={route('admin.page-contents.index')}
                        className="inline-flex items-center justify-center rounded-2xl border border-[#DCE6EF] bg-white px-5 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]">
                        Retour à la liste
                    </Link>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)] md:p-8">
                    <div className="mb-6 flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">{content.label_fr}</span>
                        {content.label_ar && (
                            <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">{content.label_ar}</span>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors && Object.values(errors).map((error, index) => (
                            error ? <div key={index} className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null
                        ))}

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">Français</label>
                            {isLong ? (
                                <textarea value={valueFr} onChange={(e) => setValueFr(e.target.value)} rows="6"
                                    className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                            ) : (
                                <input type="text" value={valueFr} onChange={(e) => setValueFr(e.target.value)}
                                    className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#334155]">العربية</label>
                            {isLong ? (
                                <textarea value={valueAr} onChange={(e) => setValueAr(e.target.value)} rows="6"
                                    className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" dir="rtl" />
                            ) : (
                                <input type="text" value={valueAr} onChange={(e) => setValueAr(e.target.value)}
                                    className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <button type="submit"
                                className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                                Enregistrer
                            </button>
                            <Link href={route('admin.page-contents.index')}
                                className="inline-flex items-center justify-center rounded-xl border border-[#DCE6EF] bg-white px-6 py-3 text-sm font-medium text-[#334155] transition hover:bg-[#F8FBFD]">
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
