import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function AdminDashboard({
    stats,
    recentArticles = [],
    recentReclamations = [],
    recentContacts = [],
    recentTenders = [],
}) {
    const { messages } = usePage().props;
    const m = (key) => messages?.[key] || key;

    const topCards = [
        {
            label: 'Articles publies',
            value: stats.articles_published,
            secondary: `${stats.articles} total`,
            href: route('admin.articles.index'),
            tone: 'blue',
        },
        {
            label: 'Reclamations en attente',
            value: stats.reclamations_pending,
            secondary: `${stats.reclamations} total`,
            href: route('admin.reclamations.index'),
            tone: 'amber',
        },
        {
            label: 'Messages non lus',
            value: stats.contacts_non_lus,
            secondary: `${stats.contacts_total} total`,
            href: route('admin.contacts.index'),
            tone: 'rose',
        },
        {
            label: "Appels d'offres",
            value: stats.appels_offres,
            secondary: `${stats.prevention_topics} sujets prevention`,
            href: route('admin.appels-offres.index'),
            tone: 'emerald',
        },
    ];

    const toneClasses = {
        blue: 'from-[#0F4C81] to-[#1D6FA5] text-[#0F4C81] bg-blue-50 border-blue-100',
        amber: 'from-[#C67B12] to-[#E8A23B] text-[#9A5D05] bg-amber-50 border-amber-100',
        rose: 'from-[#C2416D] to-[#E879A0] text-[#9F1D4D] bg-rose-50 border-rose-100',
        emerald: 'from-[#0E7C66] to-[#24A287] text-[#0E7C66] bg-emerald-50 border-emerald-100',
        slate: 'from-[#334155] to-[#64748B] text-[#334155] bg-slate-50 border-slate-200',
    };

    const quickActions = [
        { label: 'Nouvel article', href: route('admin.articles.create'), tone: 'blue' },
        { label: 'Nouvel etablissement', href: route('admin.etablissements.create'), tone: 'emerald' },
        { label: 'Gerer les appels d offres', href: route('admin.appels-offres.index'), tone: 'slate' },
        { label: 'Voir le site public', href: route('home'), tone: 'amber' },
    ];

    const adminModules = [
        { label: 'Articles', href: route('admin.articles.index'), count: stats.articles, note: 'Contenu et communiques' },
        { label: 'Etablissements', href: route('admin.etablissements.index'), count: stats.etablissements, note: 'Carte sanitaire et structures' },
        { label: 'Documents', href: route('admin.documents.index'), count: null, note: 'Fichiers et formulaires' },
        { label: "Appels d'offres", href: route('admin.appels-offres.index'), count: stats.appels_offres, note: 'Marches publics et publications' },
        { label: 'Prevention', href: route('admin.prevention.index'), count: stats.prevention_topics, note: 'Campagnes et conseils' },
        { label: 'Professionnels', href: route('admin.professionnels.index'), count: null, note: 'Notes et espace pro' },
        { label: 'FAQ', href: route('admin.faqs.index'), count: null, note: 'Questions frequentes' },
        { label: 'Utilisateurs', href: route('admin.users.index'), count: stats.users, note: 'Acces et comptes admin' },
    ];

    return (
        <>
            <Head title={m('admin_panel')} />

            <div className="space-y-8">
                <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B1F33] via-[#13344F] to-[#0B1F33] px-6 py-8 text-white shadow-[0_20px_50px_-24px_rgba(2,6,23,0.55)] md:px-8 md:py-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_28%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_25%)]" />
                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9DC2E6]">
                                Administration DSP
                            </p>
                            <h1
                                className="mt-3 text-3xl md:text-4xl"
                                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                            >
                                Tableau de pilotage operationnel
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#C7D9E8] md:text-base">
                                Supervisez le contenu public, priorisez les demandes citoyennes et pilotez les actions
                                d administration depuis une vue plus claire et plus exploitable.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[430px]">
                            {quickActions.map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/12"
                                >
                                    {action.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {topCards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className={`rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_-16px_rgba(10,37,64,0.16)] ${toneClasses[card.tone].split(' ').slice(3).join(' ')}`}
                        >
                            <div className={`inline-flex rounded-2xl bg-gradient-to-r px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white ${toneClasses[card.tone].split(' ').slice(0, 2).join(' ')}`}>
                                KPI
                            </div>
                            <div className="mt-5 text-4xl font-bold tracking-tight" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                {card.value}
                            </div>
                            <h2 className={`mt-3 text-lg font-semibold ${toneClasses[card.tone].split(' ')[2]}`} style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                {card.label}
                            </h2>
                            <p className="mt-2 text-sm text-[#5C7184]">{card.secondary}</p>
                        </Link>
                    ))}
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">
                                    Priorites
                                </p>
                                <h2 className="mt-2 text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                    Suivi des demandes et alertes
                                </h2>
                            </div>
                            <Link href={route('admin.reclamations.index')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                                Voir les reclamations
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            {[
                                { label: 'En attente', value: stats.reclamations_pending, tone: 'amber' },
                                { label: 'En cours', value: stats.reclamations_in_progress, tone: 'blue' },
                                { label: 'Resolues', value: stats.reclamations_resolved, tone: 'emerald' },
                            ].map((item) => (
                                <div key={item.label} className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-5">
                                    <div className="text-sm text-[#5C7184]">{item.label}</div>
                                    <div className="mt-2 text-3xl font-bold text-[#13243A]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-3">
                            {recentReclamations.length > 0 ? recentReclamations.map((reclamation) => (
                                <div key={reclamation.id} className="flex flex-col gap-3 rounded-2xl border border-[#E8EEF4] bg-white p-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <div className="text-sm font-semibold text-[#13243A]">{reclamation.nom}</div>
                                        <div className="mt-1 text-sm text-[#5C7184]">
                                            {reclamation.type} · {reclamation.numero_suivi || 'Sans suivi'}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            reclamation.statut === 'resolu'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : reclamation.statut === 'en_cours'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {reclamation.statut}
                                        </span>
                                        <span className="text-xs text-[#7B92A8]">{reclamation.created_at?.substring(0, 10)}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="rounded-2xl border border-dashed border-[#DCE6EF] px-4 py-8 text-center text-sm text-[#7B92A8]">
                                    Aucune reclamation recente.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">
                                Boite de reception
                            </p>
                            <h2 className="mt-2 text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                Messages de contact
                            </h2>
                            <div className="mt-5 space-y-3">
                                {recentContacts.length > 0 ? recentContacts.map((contact) => (
                                    <div key={contact.id} className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="text-sm font-semibold text-[#13243A]">{contact.nom}</div>
                                                <div className="mt-1 text-sm text-[#5C7184]">{contact.sujet || 'Sans sujet'}</div>
                                            </div>
                                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${contact.lu ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {contact.lu ? 'Lu' : 'Nouveau'}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="rounded-2xl border border-dashed border-[#DCE6EF] px-4 py-8 text-center text-sm text-[#7B92A8]">
                                        Aucun message recent.
                                    </div>
                                )}
                            </div>
                            <Link href={route('admin.contacts.index')} className="mt-5 inline-flex text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                                Ouvrir la messagerie
                            </Link>
                        </div>

                        <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">
                                Activite contenu
                            </p>
                            <h2 className="mt-2 text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                Dernieres publications
                            </h2>
                            <div className="mt-5 space-y-3">
                                {recentArticles.length > 0 ? recentArticles.map((article) => (
                                    <div key={article.id} className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-4">
                                        <div className="text-sm font-semibold text-[#13243A]">{article.title_fr}</div>
                                        <div className="mt-1 flex items-center justify-between gap-3 text-xs text-[#7B92A8]">
                                            <span>{article.published_at?.substring(0, 10) || article.created_at?.substring(0, 10)}</span>
                                            <span className={`rounded-full px-2.5 py-1 ${article.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {article.is_published ? 'Publie' : 'Brouillon'}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="rounded-2xl border border-dashed border-[#DCE6EF] px-4 py-8 text-center text-sm text-[#7B92A8]">
                                        Aucun article recent.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">
                                    Administration
                                </p>
                                <h2 className="mt-2 text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                    Modules de gestion
                                </h2>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                            {adminModules.map((module) => (
                                <Link
                                    key={module.label}
                                    href={module.href}
                                    className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-4 transition hover:border-[#B7CCDE] hover:bg-white"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-sm font-semibold text-[#13243A]">{module.label}</h3>
                                        {module.count !== null && (
                                            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[#0F4C81] shadow-sm">
                                                {module.count}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-[#5C7184]">{module.note}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,37,64,0.14)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B92A8]">
                                    Marches publics
                                </p>
                                <h2 className="mt-2 text-2xl text-[#13243A]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                    Publications recentes
                                </h2>
                            </div>
                            <Link href={route('admin.appels-offres.index')} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                                Gerer
                            </Link>
                        </div>

                        <div className="mt-6 space-y-3">
                            {recentTenders.length > 0 ? recentTenders.map((item) => (
                                <div key={item.id} className="rounded-2xl border border-[#E8EEF4] bg-[#F8FBFD] p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-sm font-semibold text-[#13243A]">{item.titre_fr}</div>
                                            <div className="mt-1 text-sm text-[#5C7184]">
                                                {item.type} · {item.date_publication}
                                            </div>
                                        </div>
                                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${item.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {item.is_published ? 'Publie' : 'Archive'}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="rounded-2xl border border-dashed border-[#DCE6EF] px-4 py-8 text-center text-sm text-[#7B92A8]">
                                    Aucune publication recente.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

AdminDashboard.layout = (page) => <AdminLayout children={page} />;
