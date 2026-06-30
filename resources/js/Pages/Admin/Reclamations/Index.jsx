import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminReclamationsIndex({ reclamations }) {
    const statusColors = {
        en_attente: 'bg-amber-100 text-amber-700',
        en_cours: 'bg-blue-100 text-blue-700',
        resolu: 'bg-emerald-100 text-emerald-700',
    };

    const handleStatusChange = (id, statut) => {
        router.put(route('admin.reclamations.update', id), { statut });
    };

    return (
        <>
            <Head title="Administration - Reclamations" />

            <div className="space-y-6">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Suivi citoyen</p>
                    <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                        Reclamations
                    </h1>
                    <p className="mt-2 text-sm text-[#5C7184]">
                        Gere les statuts, la priorisation et le suivi des demandes recues.
                    </p>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[940px] text-sm">
                            <thead>
                                <tr className="border-b border-[#E8EEF4] bg-[#F8FBFD] text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">
                                    <th className="px-6 py-4">N suivi</th>
                                    <th className="px-6 py-4">Nom</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Action rapide</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EDF2F7]">
                                {reclamations?.data?.length ? reclamations.data.map((reclamation) => (
                                    <tr key={reclamation.id} className="transition hover:bg-[#FAFCFE]">
                                        <td className="px-6 py-4 font-mono text-xs text-[#475569]">{reclamation.numero_suivi || '-'}</td>
                                        <td className="px-6 py-4 font-medium text-[#13243A]">{reclamation.nom}</td>
                                        <td className="px-6 py-4 text-[#5C7184]">{reclamation.type}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={reclamation.statut}
                                                onChange={(e) => handleStatusChange(reclamation.id, e.target.value)}
                                                className={`rounded-xl px-3 py-2 text-xs font-medium outline-none ${statusColors[reclamation.statut]}`}
                                            >
                                                <option value="en_attente">En attente</option>
                                                <option value="en_cours">En cours</option>
                                                <option value="resolu">Resolu</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-[#5C7184]">{reclamation.created_at?.substring(0, 10)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleStatusChange(reclamation.id, reclamation.statut === 'resolu' ? 'en_attente' : 'resolu')}
                                                    className="rounded-xl border border-[#DCE6EF] px-3 py-2 text-xs font-medium text-[#0F4C81] transition hover:border-[#0F4C81] hover:bg-[#F8FBFD]"
                                                >
                                                    {reclamation.statut === 'resolu' ? 'Reouvrir' : 'Marquer resolu'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center text-sm text-[#7B92A8]">
                                            Aucune reclamation trouvee.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {reclamations?.links && (
                    <div className="flex justify-center gap-2">
                        {reclamations.links.map((link, i) => (
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
        </>
    );
}

AdminReclamationsIndex.layout = (page) => <AdminLayout children={page} />;
