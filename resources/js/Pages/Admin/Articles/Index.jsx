import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminArticlesIndex({ articles }) {
    const handleDelete = (id) => {
        if (confirm('Supprimer cet article ?')) {
            router.delete(route('admin.articles.destroy', id));
        }
    };

    return (
        <>
            <Head title="Administration - Articles" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Contenu</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            Articles
                        </h1>
                        <p className="mt-2 text-sm text-[#5C7184]">
                            Gere les actualites, categories et publications du portail.
                        </p>
                    </div>
                    <Link
                        href={route('admin.articles.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-[#0F4C81] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]"
                    >
                        + Nouvel article
                    </Link>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[860px] text-sm">
                            <thead>
                                <tr className="border-b border-[#E8EEF4] bg-[#F8FBFD] text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">
                                    <th className="px-6 py-4">Visuel</th>
                                    <th className="px-6 py-4">Article</th>
                                    <th className="px-6 py-4">Categorie</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EDF2F7]">
                                {articles?.data?.length ? articles.data.map((article) => (
                                    <tr key={article.id} className="transition hover:bg-[#FAFCFE]">
                                        <td className="px-6 py-4">
                                            {article.image ? (
                                                <img src={`/storage/${article.image}`} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                                            ) : (
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[11px] font-semibold text-[#94A3B8]">
                                                    IMG
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-[#13243A]">{article.title_fr}</div>
                                        </td>
                                        <td className="px-6 py-4 text-[#5C7184]">{article.category || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${article.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {article.is_published ? 'Publie' : 'Brouillon'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#5C7184]">{article.created_at?.substring(0, 10)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('admin.articles.edit', article.id)}
                                                    className="rounded-xl border border-[#DCE6EF] px-3 py-2 text-xs font-medium text-[#0F4C81] transition hover:border-[#0F4C81] hover:bg-[#F8FBFD]"
                                                >
                                                    Modifier
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
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
                                            Aucun article trouve.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {articles?.links && (
                    <div className="flex justify-center gap-2">
                        {articles.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
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
        </>
    );
}

AdminArticlesIndex.layout = (page) => <AdminLayout children={page} />;
