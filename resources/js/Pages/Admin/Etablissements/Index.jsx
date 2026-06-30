import { Head, Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminEtablissementsIndex({ etablissements }) {
    const { messages } = usePage().props;
    const m = (key) => messages?.[key] || key;

    const handleDelete = (id) => {
        if (confirm('Supprimer cet établissement ?')) {
            router.delete(route('admin.etablissements.destroy', id));
        }
    };

    return (
        <>
            <Head title="Administration - Établissements" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Établissements</h1>
                <Link href={window.route('admin.etablissements.create')} className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors">
                    + Nouvel établissement
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Nom</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Téléphone</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Actif</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {etablissements?.data?.length ? etablissements.data.map((e) => (
                            <tr key={e.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-800">{e.nom_fr}</td>
                                <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{e.type}</span></td>
                                <td className="px-4 py-3 text-gray-500">{e.telephone || '-'}</td>
                                <td className="px-4 py-3 text-gray-500">{e.email || '-'}</td>
                                <td className="px-4 py-3">{e.is_active ? <span className="text-green-600 font-medium">Oui</span> : <span className="text-red-500">Non</span>}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <Link href={window.route('admin.etablissements.edit', e.id)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Modifier</Link>
                                    <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">Supprimer</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">Aucun établissement trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {etablissements?.links && (
                <div className="mt-4 flex justify-center gap-1">
                    {etablissements.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'} disabled={!link.url} className={`px-3 py-1.5 text-sm rounded ${link.active ? 'bg-blue-900 text-white' : link.url ? 'bg-white text-gray-700 hover:bg-gray-100' : 'bg-gray-100 text-gray-400 cursor-default'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            )}
        </>
    );
}

AdminEtablissementsIndex.layout = page => <AdminLayout children={page} />;
