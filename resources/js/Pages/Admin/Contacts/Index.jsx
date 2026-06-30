import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminContactsIndex({ contacts }) {
    const handleMarkAsRead = (id) => {
        router.put(route('admin.contacts.update', id));
    };

    return (
        <>
            <Head title="Administration - Contacts" />

            <div className="space-y-6">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Messagerie</p>
                    <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                        Messages de contact
                    </h1>
                    <p className="mt-2 text-sm text-[#5C7184]">
                        Consulte les demandes citoyennes et traite rapidement les messages non lus.
                    </p>
                </div>

                <div className="rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px] text-sm">
                            <thead>
                                <tr className="border-b border-[#E8EEF4] bg-[#F8FBFD] text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Sujet</th>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EDF2F7]">
                                {contacts?.data?.length ? contacts.data.map((contact) => (
                                    <tr key={contact.id} className={`transition hover:bg-[#FAFCFE] ${!contact.lu ? 'bg-blue-50/40' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-[#13243A]">{contact.nom}</div>
                                            <div className="mt-1 text-sm text-[#5C7184]">{contact.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-[#334155]">{contact.sujet || '-'}</td>
                                        <td className="max-w-[360px] px-6 py-4 text-[#5C7184]">
                                            <div className="line-clamp-2">{contact.message}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${contact.lu ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {contact.lu ? 'Lu' : 'Nouveau'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#5C7184]">{contact.created_at?.substring(0, 10)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end">
                                                {!contact.lu ? (
                                                    <button
                                                        onClick={() => handleMarkAsRead(contact.id)}
                                                        className="rounded-xl border border-emerald-200 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
                                                    >
                                                        Marquer lu
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-[#94A3B8]">Traite</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center text-sm text-[#7B92A8]">
                                            Aucun message trouve.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {contacts?.links && (
                    <div className="flex justify-center gap-2">
                        {contacts.links.map((link, i) => (
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

AdminContactsIndex.layout = (page) => <AdminLayout children={page} />;
