import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function AdminUsersForm({ user }) {
    const { errors, auth } = usePage().props;
    const isEdit = !!user;

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        is_admin: user?.is_admin ?? false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            router.put(route('admin.users.update', user.id), form);
        } else {
            router.post(route('admin.users.store'), form);
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Modifier utilisateur' : 'Nouvel utilisateur'} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">Edition utilisateur</p>
                        <h1 className="mt-2 text-3xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                            {isEdit ? 'Modifier utilisateur' : 'Nouvel utilisateur'}
                        </h1>
                        <p className="mt-2 text-sm text-[#5C7184]">
                            {isEdit ? 'Modifiez les informations de l\'utilisateur.' : 'Ajoutez un nouvel utilisateur.'}
                        </p>
                    </div>
                    <Link href={route('admin.users.index')}
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
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Nom complet *</label>
                                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom et prénom"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">Email *</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@exemple.com"
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">
                                        Mot de passe {isEdit ? '(laisser vide pour ne pas changer)' : ''} *
                                    </label>
                                    <input type="password" name="password" value={form.password} onChange={handleChange}
                                        placeholder={isEdit ? 'Nouveau mot de passe' : 'Mot de passe'}
                                        className="w-full rounded-xl border border-[#DCE6EF] px-4 py-3 text-sm outline-none focus:border-[#0F4C81]" />
                                    {!isEdit && (
                                        <p className="mt-2 text-xs text-[#94A3B8]">Minimum 8 caractères.</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Rôle</p>
                                    {(auth?.user?.id !== user?.id) && (
                                        <div className="mt-4">
                                            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#334155]">
                                                <input type="checkbox" name="is_admin" checked={form.is_admin} onChange={handleChange}
                                                    className="rounded border-[#CBD5E1] text-[#0F4C81] focus:ring-[#0F4C81]" />
                                                <div>
                                                    <span className="text-sm font-medium text-[#334155]">Administrateur</span>
                                                    <p className="text-xs text-[#94A3B8] mt-0.5">Accès à l'ensemble du panneau</p>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                    {auth?.user?.id === user?.id && (
                                        <p className="mt-2 text-xs text-[#94A3B8]">Vous ne pouvez pas modifier votre propre rôle.</p>
                                    )}
                                </div>

                                <div className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B92A8]">Actions</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button type="submit"
                                            className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0A2540]">
                                            {isEdit ? 'Mettre à jour' : 'Créer'}
                                        </button>
                                        <Link href={route('admin.users.index')}
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

AdminUsersForm.layout = (page) => <AdminLayout children={page} />;
