import { Head, Link, usePage, router } from '@inertiajs/react';

export default function UsersIndex({ users }) {
    const { messages, auth } = usePage().props;
    const m = (key) => messages?.[key] || key;

    const handleDelete = (user) => {
        if (!confirm(`Supprimer l'utilisateur "${user.name}" ?`)) return;
        router.delete(route('admin.users.destroy', user.id));
    };

    return (
        <>
            <Head title="Gestion des utilisateurs" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Utilisateurs</h1>
                    <p className="text-gray-500 text-sm mt-1">Gérer les comptes administrateurs</p>
                </div>
                <Link href={route('admin.users.create')} className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md">
                    + Nouvel utilisateur
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            <th className="px-6 py-4">Nom</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Rôle</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users?.data?.map((user) => (
                            <tr key={user.id} className={`hover:bg-gray-50 transition ${user.id === auth?.user?.id ? 'bg-blue-50/50' : ''}`}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-white text-xs font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{user.name}</p>
                                            {user.id === auth?.user?.id && <span className="text-[10px] text-blue-600 font-medium">Vous</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    {user.is_admin ? (
                                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">Admin</span>
                                    ) : (
                                        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">Utilisateur</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-xs">
                                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={route('admin.users.edit', user.id)} className="text-blue-600 hover:text-blue-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
                                            Modifier
                                        </Link>
                                        {user.id !== auth?.user?.id && (
                                            <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
                                                Supprimer
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users?.data?.length === 0 && (
                    <div className="py-16 text-center text-gray-500">Aucun utilisateur.</div>
                )}
            </div>

            {/* Pagination */}
            {users?.last_page > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {users.links?.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                                link.active ? 'bg-blue-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
