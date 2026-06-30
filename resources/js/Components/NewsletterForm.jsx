import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function NewsletterForm({ className = '' }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') },
                body: JSON.stringify({ email, locale }),
            });
            const data = await res.json();
            setStatus(data.success ? 'success' : 'error');
            if (data.success) setEmail('');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm p-5 text-center animate-in">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-white font-semibold">Inscription réussie !</p>
                <p className="text-emerald-200 text-sm mt-1">Merci de votre abonnement à notre newsletter.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={className}>
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="votre@email.dz"
                        required
                        className="w-full rounded-xl border border-white/20 bg-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-blue-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition"
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 disabled:opacity-50 whitespace-nowrap"
                >
                    {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            ...
                        </span>
                    ) : 'S\'abonner'}
                </button>
            </div>
            {status === 'error' && (
                <p className="text-red-400 text-xs mt-2">Erreur lors de l'inscription. Veuillez réessayer.</p>
            )}
        </form>
    );
}
