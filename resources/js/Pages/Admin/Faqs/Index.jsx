import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function FaqsIndex({ faqs }) {
    const { messages } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const [editingId, setEditingId] = useState(null);

    const handleDelete = (faq) => {
        if (!confirm(`Supprimer cette FAQ ?`)) return;
        router.delete(route('admin.faqs.destroy', faq.id));
    };

    return (
        <>
            <Head title="FAQ" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">FAQ</h1>
                    <p className="text-gray-500 text-sm mt-1">Questions fréquentes — page publique /services/faq</p>
                </div>
                <Link href={route('admin.faqs.create')} className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md">
                    + Nouvelle FAQ
                </Link>
            </div>

            <div className="space-y-3">
                {faqs?.data?.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-gray-800">{faq.question_fr}</span>
                                    {faq.categorie && (
                                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{faq.categorie}</span>
                                    )}
                                    {!faq.is_published && (
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Brouillon</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{faq.answer_fr}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={route('admin.faqs.edit', faq.id)} className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
                                    Modifier
                                </Link>
                                <button onClick={() => handleDelete(faq)} className="text-red-600 hover:text-red-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {faqs?.data?.length === 0 && (
                    <div className="py-16 text-center text-gray-500">Aucune FAQ pour le moment.</div>
                )}
            </div>

            {faqs?.last_page > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {faqs.links?.map((link, i) => (
                        <Link key={i} href={link.url || '#'}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${link.active ? 'bg-blue-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
